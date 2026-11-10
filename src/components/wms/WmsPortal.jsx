import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  Package, 
  Truck, 
  ClipboardCheck, 
  AlertTriangle, 
  RotateCcw, 
  QrCode, 
  Barcode, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Printer, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  RefreshCw, 
  Plus, 
  Eye, 
  X, 
  MapPin, 
  Phone, 
  TrendingUp, 
  Clock, 
  ArrowDownToLine,
  SlidersHorizontal,
  ChevronRight,
  KeyRound,
  Layers
} from 'lucide-react';
import { 
  WMS_ROLES, 
  WMS_BINS, 
  INITIAL_INVENTORY, 
  INITIAL_ORDERS, 
  INITIAL_PUTAWAY_TASKS, 
  INITIAL_STOCK_TAKE_SESSIONS, 
  INITIAL_INF_LOGS, 
  INITIAL_RETURNS 
} from '../../data/wmsData';
import { formatRupees } from '../../data/bagsData';

export default function WmsPortal({ onBackToStorefront }) {
  // Active Role and Active Tab
  const [activeRole, setActiveRole] = useState('owner'); // 'owner' | 'picker' | 'packer' | 'rider' | 'inventory'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'picking' | 'packing' | 'putaway' | 'stocktake' | 'inf' | 'returns' | 'inventory' | 'rider'
  
  // Persistent or Dynamic Data States
  const [orders, setOrders] = useState(() => {
    const savedClientOrders = JSON.parse(localStorage.getItem('ikis_client_orders') || '[]');
    // Transform any client orders from frontend to match WMS format
    const transformedClientOrders = savedClientOrders.map((co) => ({
      orderId: co.orderId,
      orderDate: co.orderDate,
      customer: co.shipping,
      items: co.items.map(it => ({
        ...it,
        sku: it.styleCode || 'IK-STD-LUX',
        bin: it.category === 'handbags' ? 'VAULT-A-01' : 'FV-B-01'
      })),
      finalTotal: co.finalTotal,
      paymentMethod: co.shipping?.paymentMethod?.toUpperCase() || 'UPI',
      status: 'ALLOCATED',
      picker: 'Unassigned',
      packer: 'Unassigned',
      awbNumber: `IKIS-EXP-${Math.floor(10000 + Math.random() * 90000)}`,
      deliveryOtp: String(Math.floor(1000 + Math.random() * 9000))
    }));
    return [...transformedClientOrders, ...INITIAL_ORDERS];
  });

  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [putawayTasks, setPutawayTasks] = useState(INITIAL_PUTAWAY_TASKS);
  const [stockTakeSessions, setStockTakeSessions] = useState(INITIAL_STOCK_TAKE_SESSIONS);
  const [infLogs, setInfLogs] = useState(INITIAL_INF_LOGS);
  const [returnsList, setReturnsList] = useState(INITIAL_RETURNS);

  // Scanner Simulator State
  const [scannedCode, setScannedCode] = useState('');
  const [scanFeedback, setScanFeedback] = useState(null);

  // Picking Station State (FlowLite HHT View)
  const [activePickOrder, setActivePickOrder] = useState(null);
  const [pickStep, setPickStep] = useState(0); // 0: Bin Scan, 1: Item Scan, 2: Done
  const [showInfModal, setShowInfModal] = useState(false);
  const [infReason, setInfReason] = useState('Item Missing from Bin Shelf');

  // Packing Station State
  const [activePackOrder, setActivePackOrder] = useState(null);
  const [qcChecklist, setQcChecklist] = useState({
    leatherPristine: false,
    hardwareIntact: false,
    monogramVerified: false,
    rfidScanned: false,
    emeraldBoxSealed: false
  });

  // Putaway Station State
  const [activePutaway, setActivePutaway] = useState(null);

  // Stock Take Active Session
  const [auditBin, setAuditBin] = useState('VAULT-A-01');
  const [auditPhysicalCount, setAuditPhysicalCount] = useState('');
  const [auditNote, setAuditNote] = useState('');

  // Rider Delivery State
  const [riderInputOtp, setRiderInputOtp] = useState('');
  const [activeDeliveryOrder, setActiveDeliveryOrder] = useState(null);

  // Quick stats calculation
  const totalValuation = inventory.reduce((acc, it) => acc + (it.physicalStock * it.mrp), 0);
  const pendingOrders = orders.filter(o => o.status !== 'DELIVERED').length;
  const infCount = infLogs.length;

  // Sound beep simulator for barcode scans
  const playScanBeep = (isSuccess = true) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = isSuccess ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(isSuccess ? 880 : 300, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.start();
      osc.stop(audioCtx.currentTime + (isSuccess ? 0.12 : 0.3));
    } catch {
      // AudioContext not allowed without user gesture
    }
  };

  // ----------------------------------------------------
  // WORKFLOW 1: PICKING (FLOWLITE HHT SIMULATOR)
  // ----------------------------------------------------
  const handleStartPicking = (order) => {
    setActivePickOrder(order);
    setPickStep(0);
    setActiveTab('picking');
  };

  const handleScanBin = () => {
    playScanBeep(true);
    setScanFeedback({ type: 'success', msg: `Bin Verified: ${activePickOrder.items[0]?.bin || 'FV-B-01'}` });
    setPickStep(1);
    setTimeout(() => setScanFeedback(null), 2500);
  };

  const handleScanItem = () => {
    playScanBeep(true);
    setScanFeedback({ type: 'success', msg: `SKU & RFID Chip Verified: ${activePickOrder.items[0]?.sku}` });
    setPickStep(2);
    setTimeout(() => setScanFeedback(null), 2500);
  };

  const handleCompletePick = () => {
    setOrders(prev => prev.map(o => {
      if (o.orderId === activePickOrder.orderId) {
        return { ...o, status: 'PICKED', picker: `${WMS_ROLES.find(r => r.id === activeRole)?.name} (HHT)` };
      }
      return o;
    }));
    setActivePickOrder(null);
    setPickStep(0);
    setActiveTab('orders');
  };

  const handleTriggerInf = () => {
    playScanBeep(false);
    const newInf = {
      id: `INF-2026-${Math.floor(100 + Math.random() * 900)}`,
      orderId: activePickOrder.orderId,
      sku: activePickOrder.items[0]?.sku,
      bagName: activePickOrder.items[0]?.name,
      binAttempted: activePickOrder.items[0]?.bin || 'VAULT-A-01',
      pickerName: 'FlowLite Floor Picker (HHT)',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      reason: infReason,
      resolution: 'Re-routed to Secondary Reserve Bin; Emergency Cycle Count Triggered',
      resolvedBy: 'Hub Manager Auto-Override'
    };
    setInfLogs([newInf, ...infLogs]);
    setShowInfModal(false);
    alert(`INF Incident Logged! System has notified Hub Manager and adjusted live inventory to protect website orders.`);
    setActivePickOrder(null);
    setPickStep(0);
    setActiveTab('orders');
  };

  // ----------------------------------------------------
  // WORKFLOW 2: PACKING & QC BENCH
  // ----------------------------------------------------
  const handleStartPacking = (order) => {
    setActivePackOrder(order);
    setQcChecklist({
      leatherPristine: false,
      hardwareIntact: false,
      monogramVerified: false,
      rfidScanned: false,
      emeraldBoxSealed: false
    });
    setActiveTab('packing');
  };

  const handleConfirmPack = () => {
    playScanBeep(true);
    setOrders(prev => prev.map(o => {
      if (o.orderId === activePackOrder.orderId) {
        return { ...o, status: 'PACKED', packer: 'QC Bench Marshall' };
      }
      return o;
    }));
    setActivePackOrder(null);
    setActiveTab('orders');
  };

  // ----------------------------------------------------
  // WORKFLOW 3: DISPATCH & RIDER OTP HANDOVER
  // ----------------------------------------------------
  const handleDispatchOrder = (orderId) => {
    playScanBeep(true);
    setOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return { ...o, status: 'OUT_FOR_DELIVERY', rider: 'Arjun Das (Delivery Marshall)' };
      }
      return o;
    }));
  };

  const handleVerifyDeliveryOtp = (order) => {
    if (riderInputOtp === order.deliveryOtp || riderInputOtp === '1234') {
      playScanBeep(true);
      setOrders(prev => prev.map(o => {
        if (o.orderId === order.orderId) {
          return { ...o, status: 'DELIVERED', deliveredAt: new Date().toLocaleTimeString('en-IN') };
        }
        return o;
      }));
      setRiderInputOtp('');
      setActiveDeliveryOrder(null);
      alert(`OTP Verified! Order ${order.orderId} successfully delivered into client hands.`);
    } else {
      playScanBeep(false);
      alert(`Invalid OTP! Please request client for 4-digit SMS OTP (Hint: ${order.deliveryOtp})`);
    }
  };

  // ----------------------------------------------------
  // WORKFLOW 4: PUTAWAY (INWARD GOODS RECEIVING)
  // ----------------------------------------------------
  const handleExecutePutaway = (task) => {
    playScanBeep(true);
    setPutawayTasks(prev => prev.filter(t => t.id !== task.id));
    setInventory(prev => prev.map(item => {
      if (item.sku === task.sku) {
        return {
          ...item,
          physicalStock: item.physicalStock + task.quantity,
          available: item.available + task.quantity
        };
      }
      return item;
    }));
    alert(`Putaway Complete! ${task.quantity} units of ${task.bagName} placed in Bin ${task.suggestedBin}. Available stock updated live!`);
  };

  // ----------------------------------------------------
  // WORKFLOW 5: STOCK TAKE & AUDIT
  // ----------------------------------------------------
  const handleSaveStockAudit = (e) => {
    e.preventDefault();
    const count = parseInt(auditPhysicalCount, 10);
    if (isNaN(count)) return;

    playScanBeep(true);
    const targetItem = inventory.find(i => i.bin === auditBin) || inventory[0];
    const variance = count - targetItem.physicalStock;

    const newAuditSession = {
      id: `ST-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: `Cycle Count - Bin ${auditBin}`,
      zone: targetItem.bin.startsWith('VAULT') ? 'Vault Zone (High Value)' : 'Fast Velocity',
      assignedWorker: 'Inventory Audit Officer',
      targetBins: [auditBin],
      itemsAudited: count,
      discrepancyCount: Math.abs(variance),
      varianceNotes: variance === 0 ? 'Exact Match (0 Discrepancy)' : `${variance > 0 ? '+' : ''}${variance} Units Variance (${auditNote || 'Count discrepancy logged'})`,
      status: variance === 0 ? 'Reconciled & Closed' : 'Manager Override Required',
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setStockTakeSessions([newAuditSession, ...stockTakeSessions]);

    // Reconcile inventory
    if (variance !== 0) {
      setInventory(prev => prev.map(i => {
        if (i.sku === targetItem.sku) {
          return { ...i, physicalStock: count, available: count - i.allocated };
        }
        return i;
      }));
    }

    setAuditPhysicalCount('');
    setAuditNote('');
    alert(`Stock Take Recorded for ${auditBin}. Variance: ${variance === 0 ? '0 (Clean)' : variance} units.`);
  };

  // ----------------------------------------------------
  // WORKFLOW 6: RETURNS & REVERSE QC
  // ----------------------------------------------------
  const handleProcessReturn = (retId, passQc) => {
    playScanBeep(passQc);
    setReturnsList(prev => prev.map(r => {
      if (r.id === retId) {
        return {
          ...r,
          qcStatus: passQc ? 'Passed (Grade A - Pristine)' : 'Failed (Scratch / Defect)',
          status: passQc ? 'Restocked into Bin ' + r.restockBin : 'Sent to Restoration Spa',
          refundStatus: 'Refund Released to Client UPI (INR)'
        };
      }
      return r;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#0F3B2E] selection:text-white">
      {/* Top Operations Header Bar */}
      <header className="bg-[#1E293B] border-b border-[#334155] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        {/* Left Brand & Hub Identifier */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-[#0F3B2E] border border-[#C5A059] flex items-center justify-center font-cinzel font-bold text-white text-base">
              IK
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-cinzel text-lg tracking-[0.2em] font-bold text-white">
                  IKIS
                </span>
                <span className="bg-[#0F3B2E] text-[#C5A059] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest border border-[#C5A059]/40">
                  FLOWLITE WMS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
                Warehouse Fulfillment & Dark Store Operating System
              </span>
            </div>
          </div>

          {/* Hub Badge */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-full text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-slate-300 font-medium">MUMBAI-BKC-HUB-01 (Flagship)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          </div>
        </div>

        {/* Right Role Switcher & Back to Storefront */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Active Role Selector */}
          <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-2 sm:px-3 py-1.5 rounded text-xs">
            <UserCheck className="w-4 h-4 text-[#C5A059]" />
            <div className="hidden sm:block text-left">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Access Role:</span>
              <select
                value={activeRole}
                onChange={(e) => {
                  setActiveRole(e.target.value);
                  if (e.target.value === 'picker') setActiveTab('picking');
                  else if (e.target.value === 'packer') setActiveTab('packing');
                  else if (e.target.value === 'rider') setActiveTab('rider');
                  else if (e.target.value === 'inventory') setActiveTab('putaway');
                  else setActiveTab('dashboard');
                }}
                className="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer"
              >
                {WMS_ROLES.map(r => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Return to Customer Luxury Storefront */}
          <button
            onClick={onBackToStorefront}
            className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] px-3 sm:px-4 py-2 rounded text-xs tracking-wider uppercase font-semibold flex items-center space-x-1.5 transition-colors shadow"
          >
            <span>CLIENT STORE</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>
      </header>

      {/* Secondary Navigation Ribbon (Tabs for flowlite) */}
      <div className="bg-[#1E293B]/70 border-b border-[#334155] px-4 sm:px-6 overflow-x-auto scrollbar-none flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'dashboard' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Hub Command</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'orders' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders Pipeline ({pendingOrders})</span>
        </button>

        <button
          onClick={() => setActiveTab('picking')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'picking' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Barcode className="w-4 h-4" />
          <span>FlowLite Pick (HHT)</span>
        </button>

        <button
          onClick={() => setActiveTab('packing')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'packing' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>QC & Packing Bench</span>
        </button>

        <button
          onClick={() => setActiveTab('putaway')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'putaway' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <ArrowDownToLine className="w-4 h-4" />
          <span>Putaway ({putawayTasks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('stocktake')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'stocktake' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Stock Take & Audit</span>
        </button>

        <button
          onClick={() => setActiveTab('inf')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'inf' ? 'border-rose-500 text-rose-400' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>INF Incidents ({infCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'returns' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Returns ({returnsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rider')}
          className={`py-3 px-3 text-xs tracking-wider uppercase font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center space-x-2 ${
            activeTab === 'rider' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Rider OTP Handover</span>
        </button>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* ======================================================== */}
        {/* TAB 1: HUB COMMAND DASHBOARD                             */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider">
                  <span>Inventory Valuation</span>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-2xl font-serif font-bold text-white mt-2">
                  {formatRupees(totalValuation)}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1">
                  <span>100% Certified Florence Luxury Stock</span>
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider">
                  <span>Active Fulfillment Orders</span>
                  <Package className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-2xl font-bold text-white mt-2">
                  {pendingOrders}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  SLA Compliance: 99.4% Handover
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider">
                  <span>INF / PNA Rate (Item Not Found)</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-bold text-rose-400 mt-2">
                  0.32%
                </div>
                <div className="text-[11px] text-rose-300 mt-1">
                  Dark store target: &lt; 0.50%
                </div>
              </div>

              <div className="bg-[#1E293B] border border-[#334155] p-5 rounded-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs uppercase tracking-wider">
                  <span>Stock Take Accuracy</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-400 mt-2">
                  99.88%
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Daily Vault Cycle Count Reconciled
                </div>
              </div>
            </div>

            {/* Warehouse Bin Capacity Overview */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                    Dark Store Bin Slotting & Capacity Matrix
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live telemetry across Vaults, Fast Velocity (FV), Bulk, and Quarantine Bays
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('stocktake')}
                  className="text-xs text-[#C5A059] hover:underline font-semibold tracking-wider uppercase"
                >
                  Start Cycle Count Audit →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {WMS_BINS.map(b => (
                  <div key={b.id} className="bg-slate-900/70 border border-slate-700/80 p-3.5 rounded flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#C5A059]">{b.id}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                        b.security === 'Biometric' ? 'bg-purple-900/60 text-purple-300 border border-purple-700' :
                        b.security === 'Quarantine' ? 'bg-rose-900/60 text-rose-300 border border-rose-700' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {b.security}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 mt-2 font-medium">
                      {b.zone}
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Capacity: {b.current} / {b.capacity} units</span>
                        <span>{Math.round((b.current / b.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            (b.current / b.capacity) > 0.85 ? 'bg-amber-400' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${(b.current / b.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Station Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                onClick={() => setActiveTab('picking')}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-5 rounded-lg cursor-pointer transition-all hover:border-[#C5A059]"
              >
                <Barcode className="w-8 h-8 text-[#C5A059] mb-3" />
                <h4 className="text-sm font-semibold uppercase text-white">FlowLite Picker Mode (HHT)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Step-by-step bin routing, SKU barcode scanning, and instant INF escalation.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('packing')}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-5 rounded-lg cursor-pointer transition-all hover:border-[#C5A059]"
              >
                <ClipboardCheck className="w-8 h-8 text-sky-400 mb-3" />
                <h4 className="text-sm font-semibold uppercase text-white">QC & Luxury Packaging Bench</h4>
                <p className="text-xs text-slate-400 mt-1">
                  4-point leather inspection, wax seal verification, emerald box packaging, and AWB generation.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('putaway')}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 p-5 rounded-lg cursor-pointer transition-all hover:border-[#C5A059]"
              >
                <ArrowDownToLine className="w-8 h-8 text-emerald-400 mb-3" />
                <h4 className="text-sm font-semibold uppercase text-white">Inbound Putaway & GRN</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Receive Florence atelier consignments and place them into system-allocated bins.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: LIVE ORDERS PIPELINE                              */}
        {/* ======================================================== */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                  Customer Orders Pipeline ({orders.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Synchronized live with customer storefront checkouts in Indian Rupees (₹)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Total Pipeline Value:</span>
                <span className="text-sm font-serif font-bold text-[#C5A059]">
                  {formatRupees(orders.reduce((acc, o) => acc + o.finalTotal, 0))}
                </span>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Client Details</th>
                    <th className="py-3 px-4">Items / Bin Location</th>
                    <th className="py-3 px-4">Valuation (INR)</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                    <th className="py-3 px-4 text-right">Workflow Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-white block">{o.orderId}</span>
                        <span className="text-[10px] text-slate-400 block">{o.orderDate}</span>
                        <span className="text-[9px] bg-slate-800 text-[#C5A059] px-1.5 py-0.5 rounded font-mono mt-1 inline-block">
                          AWB: {o.awbNumber}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-white block">{o.customer?.fullName || 'Client'}</span>
                        <span className="text-[10px] text-slate-400 block">{o.customer?.city}, {o.customer?.state}</span>
                        <span className="text-[10px] text-slate-500 font-mono block">OTP: {o.deliveryOtp}</span>
                      </td>

                      <td className="py-3 px-4">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="mb-1">
                            <span className="text-slate-200 font-medium block">{it.name}</span>
                            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                              <span className="text-[#C5A059] font-mono">Bin: {it.bin || 'VAULT-A-01'}</span>
                              <span>•</span>
                              <span>Color: {it.selectedColor}</span>
                              {it.monogram && (
                                <>
                                  <span>•</span>
                                  <span className="text-amber-300 font-bold">Stamp: {it.monogram.initials}</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-serif font-bold text-white text-sm">
                          {formatRupees(o.finalTotal)}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{o.paymentMethod}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded inline-block ${
                          o.status === 'ALLOCATED' ? 'bg-amber-900/60 text-amber-300 border border-amber-700' :
                          o.status === 'PICKED' ? 'bg-sky-900/60 text-sky-300 border border-sky-700' :
                          o.status === 'PACKED' ? 'bg-purple-900/60 text-purple-300 border border-purple-700' :
                          o.status === 'OUT_FOR_DELIVERY' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700' :
                          'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                        }`}>
                          {o.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {o.status === 'ALLOCATED' && (
                          <button
                            onClick={() => handleStartPicking(o)}
                            className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                          >
                            Assign Pick Wave
                          </button>
                        )}

                        {o.status === 'PICKED' && (
                          <button
                            onClick={() => handleStartPacking(o)}
                            className="bg-sky-700 hover:bg-sky-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                          >
                            Send to Packing Bench
                          </button>
                        )}

                        {o.status === 'PACKED' && (
                          <button
                            onClick={() => handleDispatchOrder(o.orderId)}
                            className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                          >
                            Dispatch with Rider
                          </button>
                        )}

                        {o.status === 'OUT_FOR_DELIVERY' && (
                          <button
                            onClick={() => {
                              setActiveDeliveryOrder(o);
                              setActiveTab('rider');
                            }}
                            className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                          >
                            Enter Client OTP
                          </button>
                        )}

                        {o.status === 'DELIVERED' && (
                          <span className="text-emerald-400 text-xs font-semibold flex items-center justify-end space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Handover Complete</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: FLOWLITE PICK WAVE (HHT PDA SIMULATOR)            */}
        {/* ======================================================== */}
        {activeTab === 'picking' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-2xl">
              {/* HHT Screen Header */}
              <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-white">
                    HHT #08 • FLOWLITE PICKER CONSOLE
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  WAVE #W-904
                </span>
              </div>

              {!activePickOrder ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-12 h-12 text-slate-500 mx-auto" />
                  <h3 className="text-base font-bold uppercase text-white">No Active Pick Wave</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Select any allocated customer order to begin step-by-step shelf picking with barcode verification.
                  </p>
                  <button
                    onClick={() => {
                      const firstAllocated = orders.find(o => o.status === 'ALLOCATED') || orders[0];
                      if (firstAllocated) handleStartPicking(firstAllocated);
                    }}
                    className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow mt-2"
                  >
                    Load Next Available Order
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Order and Item Target */}
                  <div className="bg-slate-900/90 border border-slate-700 p-5 rounded-lg space-y-3">
                    <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Picking for Order</span>
                        <span className="font-mono font-bold text-white text-sm">{activePickOrder.orderId}</span>
                      </div>
                      <span className="text-xs bg-[#0F3B2E] text-[#C5A059] px-2.5 py-1 rounded font-bold uppercase">
                        Priority Pick
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 uppercase">Target Bag Item:</span>
                      <h4 className="text-base font-serif font-bold text-white">
                        {activePickOrder.items[0]?.name}
                      </h4>
                      <p className="text-xs text-slate-300">
                        Color: <strong className="text-white">{activePickOrder.items[0]?.selectedColor}</strong> • Qty: 1
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">
                        SKU: {activePickOrder.items[0]?.sku}
                      </p>
                    </div>

                    {/* Step-by-step navigation prompt */}
                    <div className="p-4 bg-slate-800 rounded border border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                          NAVIGATE TO LOCATION:
                        </span>
                        <span className="text-xl font-mono font-extrabold text-[#C5A059] tracking-wider">
                          {activePickOrder.items[0]?.bin || 'VAULT-A-01'}
                        </span>
                      </div>
                      <MapPin className="w-6 h-6 text-[#C5A059]" />
                    </div>
                  </div>

                  {/* Feedback Banner */}
                  {scanFeedback && (
                    <div className="p-3 bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs rounded text-center font-medium animate-pulse">
                      {scanFeedback.msg}
                    </div>
                  )}

                  {/* FlowLite 2-Step Scan Verification */}
                  <div className="space-y-3">
                    {/* Step 1: Scan Bin Barcode */}
                    <div className={`p-4 rounded-lg border transition-all ${
                      pickStep === 0 ? 'bg-slate-900 border-[#C5A059]' : 'bg-slate-900/40 border-slate-800 opacity-60'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase text-white flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px]">1</span>
                          <span>Scan Shelf Bin QR Code</span>
                        </span>
                        {pickStep > 0 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>

                      {pickStep === 0 && (
                        <button
                          onClick={handleScanBin}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                        >
                          <QrCode className="w-4 h-4 text-[#C5A059]" />
                          <span>SIMULATE SCAN: BIN {activePickOrder.items[0]?.bin || 'VAULT-A-01'}</span>
                        </button>
                      )}
                    </div>

                    {/* Step 2: Scan Bag Barcode & RFID */}
                    <div className={`p-4 rounded-lg border transition-all ${
                      pickStep === 1 ? 'bg-slate-900 border-[#C5A059]' : 'bg-slate-900/40 border-slate-800 opacity-60'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase text-white flex items-center space-x-2">
                          <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px]">2</span>
                          <span>Scan Bag Barcode & RFID Tag</span>
                        </span>
                        {pickStep === 2 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>

                      {pickStep === 1 && (
                        <button
                          onClick={handleScanItem}
                          className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow"
                        >
                          <Barcode className="w-4 h-4 text-[#C5A059]" />
                          <span>SIMULATE SCAN: SKU {activePickOrder.items[0]?.sku}</span>
                        </button>
                      )}
                    </div>

                    {/* Step 3: Complete Pick or Report INF */}
                    {pickStep === 2 ? (
                      <button
                        onClick={handleCompletePick}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>CONFIRM PICK & SEND TO PACK BENCH</span>
                      </button>
                    ) : (
                      <div className="pt-2">
                        <button
                          onClick={() => setShowInfModal(true)}
                          className="w-full bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-700/60 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                        >
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>MARK ITEM NOT FOUND (INF / PNA)</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* INF Escalation Modal */}
            {showInfModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#1E293B] border border-rose-600 rounded-xl p-6 max-w-md w-full space-y-4">
                  <div className="flex items-center space-x-3 text-rose-400">
                    <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold uppercase">Item Not Found (INF) Escalation</h4>
                      <p className="text-[11px] text-slate-300">Dark Store Zero Phantom Inventory Protocol</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    You are reporting that <strong>{activePickOrder?.items[0]?.name}</strong> is physically absent from bin <strong>{activePickOrder?.items[0]?.bin}</strong>.
                  </p>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                      Reason for INF:
                    </label>
                    <select
                      value={infReason}
                      onChange={(e) => setInfReason(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 p-2.5 text-xs text-white rounded outline-none"
                    >
                      <option value="Item Missing from Bin Shelf">Item Missing from Bin Shelf</option>
                      <option value="Physical Leather Scratch / Transit Damage">Physical Leather Scratch / Defect</option>
                      <option value="Barcode Mismatch on Packaging">Barcode Mismatch on Packaging</option>
                      <option value="Theft / Unlogged Discrepancy">Theft / Unlogged Discrepancy</option>
                    </select>
                  </div>

                  <div className="p-3 bg-rose-950/40 border border-rose-800 text-[11px] text-rose-200 rounded">
                    ⚠️ Marking INF will alert the Hub Manager, delist the item from website search, and trigger a Cycle Count audit.
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={() => setShowInfModal(false)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded text-xs uppercase font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleTriggerInf}
                      className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2 rounded text-xs font-bold uppercase tracking-wider"
                    >
                      Submit INF Alarm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: QC & LUXURY PACKING BENCH                         */}
        {/* ======================================================== */}
        {activeTab === 'packing' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <div>
                  <h3 className="text-base font-bold uppercase text-white">
                    QC Inspection & Luxury Packaging Bench
                  </h3>
                  <p className="text-xs text-slate-400">
                    Station #03 • White-Glove Tamper Seal & Signature Gift Packaging
                  </p>
                </div>
                <ClipboardCheck className="w-6 h-6 text-[#C5A059]" />
              </div>

              {!activePackOrder ? (
                <div className="text-center py-12 space-y-3">
                  <ClipboardCheck className="w-12 h-12 text-slate-500 mx-auto" />
                  <h3 className="text-base font-bold uppercase text-white">No Order at Packing Bench</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Select any picked order to initiate the 5-point physical quality check and print thermal shipping labels.
                  </p>
                  <button
                    onClick={() => {
                      const firstPicked = orders.find(o => o.status === 'PICKED') || orders[0];
                      if (firstPicked) handleStartPacking(firstPicked);
                    }}
                    className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow mt-2"
                  >
                    Take Next Picked Order
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Order Spec */}
                  <div className="bg-slate-900 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Order ID</span>
                      <span className="font-mono font-bold text-white block text-sm">{activePackOrder.orderId}</span>
                      <span className="text-xs text-slate-300">{activePackOrder.customer?.fullName} • {activePackOrder.customer?.city}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">AWB Consignment</span>
                      <span className="font-mono font-bold text-[#C5A059] block">{activePackOrder.awbNumber}</span>
                    </div>
                  </div>

                  {/* 5-Point Quality Check Checklist */}
                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      5-Point White-Glove Quality Verification:
                    </h4>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={qcChecklist.leatherPristine}
                        onChange={(e) => setQcChecklist({ ...qcChecklist, leatherPristine: e.target.checked })}
                        className="w-4 h-4 accent-[#0F3B2E] cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">
                        Leather Surface: Zero scratches, moisture marks or stitch defects
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={qcChecklist.hardwareIntact}
                        onChange={(e) => setQcChecklist({ ...qcChecklist, hardwareIntact: e.target.checked })}
                        className="w-4 h-4 accent-[#0F3B2E] cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">
                        Hardware Protective Film: Peel seals intact on gold/silver emblems
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={qcChecklist.monogramVerified}
                        onChange={(e) => setQcChecklist({ ...qcChecklist, monogramVerified: e.target.checked })}
                        className="w-4 h-4 accent-[#0F3B2E] cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">
                        Bespoke Initial Hot-Stamp: Verified accuracy of gold/palladium initials
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={qcChecklist.rfidScanned}
                        onChange={(e) => setQcChecklist({ ...qcChecklist, rfidScanned: e.target.checked })}
                        className="w-4 h-4 accent-[#0F3B2E] cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">
                        RFID & Certificate of Authenticity: Embedded inside internal pocket
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={qcChecklist.emeraldBoxSealed}
                        onChange={(e) => setQcChecklist({ ...qcChecklist, emeraldBoxSealed: e.target.checked })}
                        className="w-4 h-4 accent-[#0F3B2E] cursor-pointer"
                      />
                      <span className="text-xs text-slate-300">
                        Emerald Gift Box: Tied with silk ribbon and wax seal tamper sticker
                      </span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => alert(`Printing Thermal Shipping Label for AWB ${activePackOrder.awbNumber}...`)}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Printer className="w-4 h-4 text-[#C5A059]" />
                      <span>PRINT AWB LABEL</span>
                    </button>

                    <button
                      onClick={handleConfirmPack}
                      disabled={!qcChecklist.leatherPristine || !qcChecklist.emeraldBoxSealed}
                      className="flex-1 bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow disabled:opacity-40"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                      <span>COMPLETE PACKING</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PUTAWAY & INWARD GRN                             */}
        {/* ======================================================== */}
        {activeTab === 'putaway' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                  Inbound Putaway Tasks ({putawayTasks.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Goods Receipt Note (GRN) inwarding from Florence Atelier and customer return restocks
                </p>
              </div>

              <button
                onClick={() => {
                  const newTask = {
                    id: `PUT-${Math.floor(8000 + Math.random() * 1000)}`,
                    inboundGrn: `GRN-AIR-FLORENCE-${Math.floor(100 + Math.random() * 900)}`,
                    sku: 'IK-602204-1DB0G-1000',
                    bagName: 'IKIS Horsebit 1955 Small Shoulder Bag',
                    color: 'Onyx Black',
                    quantity: 5,
                    suggestedBin: 'FV-B-01',
                    status: 'Pending',
                    priority: 'Standard'
                  };
                  setPutawayTasks([newTask, ...putawayTasks]);
                  playScanBeep(true);
                }}
                className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow"
              >
                <Plus className="w-4 h-4 text-[#C5A059]" />
                <span>Simulate Inbound Air Consignment</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {putawayTasks.map((task) => (
                <div key={task.id} className="bg-[#1E293B] border border-[#334155] p-5 rounded-lg flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs font-bold text-[#C5A059]">{task.id}</span>
                      <span className="text-[9px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                        {task.inboundGrn}
                      </span>
                    </div>

                    <h4 className="text-sm font-serif font-bold text-white mb-1">
                      {task.bagName}
                    </h4>
                    <p className="text-xs text-slate-300">
                      Color: {task.color} • Inward Qty: <strong className="text-emerald-400">{task.quantity} Pieces</strong>
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">
                      SKU: {task.sku}
                    </p>
                  </div>

                  <div className="bg-slate-900 p-3 rounded border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">
                        Assigned Putaway Bin:
                      </span>
                      <span className="text-base font-mono font-bold text-white">
                        {task.suggestedBin}
                      </span>
                    </div>
                    <ArrowDownToLine className="w-5 h-5 text-emerald-400" />
                  </div>

                  <button
                    onClick={() => handleExecutePutaway(task)}
                    className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                    <span>Confirm Putaway into {task.suggestedBin}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: STOCK TAKE & CYCLE COUNT AUDIT                   */}
        {/* ======================================================== */}
        {activeTab === 'stocktake' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Stock Take Session Form */}
            <div className="lg:col-span-5 bg-[#1E293B] border border-[#334155] p-6 rounded-xl space-y-4">
              <div className="border-b border-slate-700 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Execute Directed Cycle Count Audit
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Blind count verification to eliminate physical vs system discrepancy
                </p>
              </div>

              <form onSubmit={handleSaveStockAudit} className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Select Target Storage Bin *
                  </label>
                  <select
                    value={auditBin}
                    onChange={(e) => setAuditBin(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-xs text-white rounded font-mono outline-none"
                  >
                    {WMS_BINS.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.id} ({b.zone}) - System: {b.current} Units
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Physical Count Verified on Shelf *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={auditPhysicalCount}
                    onChange={(e) => setAuditPhysicalCount(e.target.value)}
                    placeholder="Enter total physical count counted by hand"
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-xs text-white rounded outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    Auditor Notes & Discrepancy Reason (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={auditNote}
                    onChange={(e) => setAuditNote(e.target.value)}
                    placeholder="e.g. 1 bag moved to restoration spa or barcode sticker rubbed off"
                    className="w-full bg-slate-900 border border-slate-700 p-2.5 text-xs text-white rounded outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  Record Audit & Reconcile Inventory
                </button>
              </form>
            </div>

            {/* Right Past Audits Log */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Cycle Count History & Discrepancy Reconciliation
              </h3>

              <div className="space-y-3">
                {stockTakeSessions.map((session) => (
                  <div key={session.id} className="bg-[#1E293B] border border-[#334155] p-4 rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#C5A059]">{session.id}</span>
                        <h4 className="text-xs font-semibold text-white mt-0.5">{session.title}</h4>
                      </div>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                        session.discrepancyCount === 0 ? 'bg-emerald-900/60 text-emerald-300' : 'bg-rose-900/60 text-rose-300'
                      }`}>
                        {session.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <div>Auditor: <strong className="text-white">{session.assignedWorker}</strong></div>
                      <div>Counted: <strong className="text-white">{session.itemsAudited} Units</strong></div>
                      <div>Discrepancy: <strong className={session.discrepancyCount > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                        {session.discrepancyCount} Pieces
                      </strong></div>
                    </div>

                    {session.varianceNotes && (
                      <p className="text-[10px] text-slate-400 italic">
                        Note: {session.varianceNotes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: INF (ITEM NOT FOUND) INCIDENTS                    */}
        {/* ======================================================== */}
        {activeTab === 'inf' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <span>Item Not Found (INF / PNA) Operations Registry</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time dark store picker escalations to eliminate phantom inventory leaks
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {infLogs.map((log) => (
                <div key={log.id} className="bg-[#1E293B] border border-rose-900/50 p-5 rounded-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-rose-400">{log.id}</span>
                      <span className="text-xs text-slate-300 font-mono">Order: {log.orderId}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Bag Creation:</span>
                      <strong className="text-white">{log.bagName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Bin Attempted:</span>
                      <span className="font-mono text-[#C5A059] font-bold">{log.binAttempted}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Picker Reporter:</span>
                      <span className="text-slate-300">{log.pickerName}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div><strong>Root Cause:</strong> {log.reason}</div>
                    <div className="text-emerald-400"><strong>WMS Automatic Mitigation:</strong> {log.resolution}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 8: RETURNS & REVERSE LOGISTICS                      */}
        {/* ======================================================== */}
        {activeTab === 'returns' && (
          <div className="space-y-6">
            <div className="border-b border-slate-700 pb-4">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                Customer Returns & Reverse QC Gate
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Authenticity re-verification, condition grading, and automatic refund release in ₹ INR
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {returnsList.map((ret) => (
                <div key={ret.id} className="bg-[#1E293B] border border-[#334155] p-5 rounded-lg space-y-3">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#C5A059]">{ret.id}</span>
                      <span className="text-xs text-slate-300 ml-2 font-mono">Ref: {ret.orderId}</span>
                    </div>
                    <span className="text-xs font-serif font-bold text-white">
                      {formatRupees(ret.amount)}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <h4 className="font-serif font-bold text-white">{ret.bagName}</h4>
                    <p className="text-slate-300">Client: <strong>{ret.customerName}</strong> ({ret.customerPhone})</p>
                    <p className="text-slate-400 text-[11px]">Return Reason: {ret.reason}</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">QC Status:</span>
                      <strong className="text-white">{ret.qcStatus}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Inventory Status:</span>
                      <span className="text-emerald-400 font-medium">{ret.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Settlement:</span>
                      <span className="text-[#C5A059] font-medium">{ret.refundStatus}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => handleProcessReturn(ret.id, true)}
                      className="flex-1 bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-colors shadow"
                    >
                      Pass QC (Restock)
                    </button>
                    <button
                      onClick={() => handleProcessReturn(ret.id, false)}
                      className="flex-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700 py-2 rounded text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Route to Leather Spa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 9: RIDER OUT-FOR-DELIVERY & OTP HANDOVER             */}
        {/* ======================================================== */}
        {activeTab === 'rider' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <div>
                  <h3 className="text-base font-bold uppercase text-white">
                    Delivery Marshall Console (Rider App)
                  </h3>
                  <p className="text-xs text-slate-400">
                    White-Glove Doorstep Delivery with 4-Digit Customer OTP Verification
                  </p>
                </div>
                <Truck className="w-6 h-6 text-[#C5A059]" />
              </div>

              {/* Find active out for delivery orders */}
              {(() => {
                const targetOrder = activeDeliveryOrder || orders.find(o => o.status === 'OUT_FOR_DELIVERY') || orders[0];
                return (
                  <div className="space-y-6">
                    <div className="bg-slate-900 p-5 rounded-lg space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="font-mono text-sm font-bold text-white">{targetOrder.orderId}</span>
                        <span className="text-xs bg-indigo-900 text-indigo-300 font-bold px-2 py-0.5 rounded uppercase">
                          Out for Delivery
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1">
                        <div><strong>Client Name:</strong> {targetOrder.customer?.fullName}</div>
                        <div><strong>Phone:</strong> {targetOrder.customer?.phone}</div>
                        <div><strong>Address:</strong> {targetOrder.customer?.address}, {targetOrder.customer?.city} – {targetOrder.customer?.pincode}</div>
                        <div><strong>Bag Item:</strong> {targetOrder.items[0]?.name}</div>
                        <div className="text-[#C5A059] font-bold text-sm pt-1">
                          Amount: {formatRupees(targetOrder.finalTotal)} ({targetOrder.paymentMethod})
                        </div>
                      </div>
                    </div>

                    {/* OTP Entry Box */}
                    <div className="p-5 bg-slate-900/70 border border-slate-700 rounded-lg text-center space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
                        <KeyRound className="w-4 h-4 text-[#C5A059]" />
                        <span>ENTER 4-DIGIT CLIENT OTP RECEIVED ON SMS</span>
                      </div>

                      <input
                        type="text"
                        maxLength={4}
                        value={riderInputOtp}
                        onChange={(e) => setRiderInputOtp(e.target.value)}
                        placeholder="••••"
                        className="w-44 text-center font-mono text-3xl font-bold tracking-[0.5em] bg-slate-800 border-2 border-[#C5A059] p-3 text-white rounded outline-none mx-auto block"
                      />

                      <p className="text-[10px] text-slate-500">
                        (Demo Hint: Client OTP for this order is: <strong className="text-[#C5A059]">{targetOrder.deliveryOtp}</strong> or 1234)
                      </p>

                      <button
                        onClick={() => handleVerifyDeliveryOtp(targetOrder)}
                        className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white border border-[#C5A059] py-3 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-lg"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                        <span>VERIFY OTP & CONFIRM DELIVERY</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
