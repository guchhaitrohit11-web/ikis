// IKIS FlowLite Warehouse Management System (WMS) Data Store
// Modeled after Flipkart FlowLite and Blinkit Dark Store Operations

export const WMS_ROLES = [
  { id: 'owner', name: 'Hub Director & Owner', access: 'Full Command Center' },
  { id: 'picker', name: 'FlowLite Picker (Floor Worker)', access: 'Scan-to-Pick HHT Terminal' },
  { id: 'packer', name: 'Packing & QC Marshall', access: 'Luxury Packaging & Label Station' },
  { id: 'rider', name: 'Delivery Marshall', access: 'Out-For-Delivery & OTP Handover' },
  { id: 'inventory', name: 'Inventory & Putaway Lead', access: 'Putaway, Stock Take & Returns' }
];

export const WMS_BINS = [
  { id: 'VAULT-A-01', zone: 'Vault Zone (High Value)', capacity: 15, current: 8, security: 'Biometric' },
  { id: 'VAULT-A-02', zone: 'Vault Zone (High Value)', capacity: 15, current: 6, security: 'Biometric' },
  { id: 'VAULT-A-03', zone: 'Vault Zone (High Value)', capacity: 12, current: 4, security: 'Biometric' },
  { id: 'FV-B-01', zone: 'Fast Velocity (Shoulder Bags)', capacity: 25, current: 18, security: 'Standard' },
  { id: 'FV-B-02', zone: 'Fast Velocity (Shoulder Bags)', capacity: 25, current: 14, security: 'Standard' },
  { id: 'FV-B-03', zone: 'Fast Velocity (Crossbody)', capacity: 30, current: 22, security: 'Standard' },
  { id: 'BULK-C-01', zone: 'Luggage & Large Totes', capacity: 20, current: 11, security: 'Standard' },
  { id: 'BULK-C-02', zone: 'Luggage & Large Totes', capacity: 20, current: 9, security: 'Standard' },
  { id: 'QC-HOLD-01', zone: 'Returns & Inspection Bay', capacity: 10, current: 3, security: 'Quarantine' }
];

export const INITIAL_INVENTORY = [
  {
    sku: 'IK-602204-1DB0G-1000',
    bagId: 'ikis-horsebit-1955',
    name: 'IKIS Horsebit 1955 Small Shoulder Bag',
    color: 'Onyx Black',
    bin: 'FV-B-01',
    physicalStock: 18,
    allocated: 2,
    available: 16,
    mrp: 245000,
    minThreshold: 5,
    status: 'In Stock'
  },
  {
    sku: 'IK-636706-10O0G-3154',
    bagId: 'ikis-jackie-1961',
    name: 'IKIS Jackie 1961 Small Hobo Shoulder Bag',
    color: 'Signature Forest Green',
    bin: 'FV-B-02',
    physicalStock: 14,
    allocated: 1,
    available: 13,
    mrp: 285000,
    minThreshold: 4,
    status: 'In Stock'
  },
  {
    sku: 'IK-675797-10O0G-1000',
    bagId: 'ikis-bamboo-1947',
    name: 'IKIS Bamboo 1947 Small Top Handle Bag',
    color: 'Emerald Jewel',
    bin: 'VAULT-A-01',
    physicalStock: 8,
    allocated: 1,
    available: 7,
    mrp: 395000,
    minThreshold: 3,
    status: 'In Stock'
  },
  {
    sku: 'IK-400249-KHNRN-8642',
    bagId: 'ikis-dionysus-chain',
    name: 'IKIS Dionysus Small Shoulder & Chain Bag',
    color: 'Taupe Monogram',
    bin: 'FV-B-03',
    physicalStock: 22,
    allocated: 3,
    available: 19,
    mrp: 265000,
    minThreshold: 6,
    status: 'In Stock'
  },
  {
    sku: 'IK-655663-17Q0T-2535',
    bagId: 'ikis-diana-tote',
    name: 'IKIS Diana Medium Bamboo Tote Bag',
    color: 'Cuir Caramel',
    bin: 'VAULT-A-02',
    physicalStock: 6,
    allocated: 0,
    available: 6,
    mrp: 360000,
    minThreshold: 2,
    status: 'In Stock'
  },
  {
    sku: 'IK-631685-96IWB-8745',
    bagId: 'ikis-ophidia-tote',
    name: 'IKIS Ophidia Webbing Medium Tote',
    color: 'Beige & Forest Webbing',
    bin: 'BULK-C-01',
    physicalStock: 11,
    allocated: 2,
    available: 9,
    mrp: 195000,
    minThreshold: 5,
    status: 'In Stock'
  },
  {
    sku: 'IK-443497-DTDIT-1000',
    bagId: 'ikis-marmont-matelasse',
    name: 'IKIS Marmont Matelassé Shoulder Bag',
    color: 'Pure Noir',
    bin: 'FV-B-01',
    physicalStock: 15,
    allocated: 1,
    available: 14,
    mrp: 210000,
    minThreshold: 4,
    status: 'In Stock'
  },
  {
    sku: 'IK-500781-0GRET-8000',
    bagId: 'ikis-broadway-evening',
    name: 'IKIS Broadway Evening Crystal Minaudière',
    color: 'Champagne Gold',
    bin: 'VAULT-A-03',
    physicalStock: 4,
    allocated: 0,
    available: 4,
    mrp: 320000,
    minThreshold: 2,
    status: 'Low Stock'
  },
  {
    sku: 'IK-724642-FACN4-8465',
    bagId: 'ikis-savoy-duffle',
    name: 'IKIS Savoy Large Duffle Travel Bag',
    color: 'Ebony Monogram & Tan',
    bin: 'BULK-C-02',
    physicalStock: 9,
    allocated: 1,
    available: 8,
    mrp: 275000,
    minThreshold: 3,
    status: 'In Stock'
  }
];

export const INITIAL_PUTAWAY_TASKS = [
  {
    id: 'PUT-8941',
    inboundGrn: 'GRN-FLORENCE-10492',
    sku: 'IK-675797-10O0G-1000',
    bagName: 'IKIS Bamboo 1947 Small Top Handle Bag',
    color: 'Warm Crema',
    quantity: 4,
    suggestedBin: 'VAULT-A-01',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 'PUT-8942',
    inboundGrn: 'GRN-FLORENCE-10493',
    sku: 'IK-602204-1DB0G-1000',
    bagName: 'IKIS Horsebit 1955 Small Shoulder Bag',
    color: 'Cognac Cuir',
    quantity: 6,
    suggestedBin: 'FV-B-01',
    status: 'Pending',
    priority: 'Normal'
  },
  {
    id: 'PUT-8943',
    inboundGrn: 'GRN-RETURNS-4012',
    sku: 'IK-636706-10O0G-3154',
    bagName: 'IKIS Jackie 1961 Small Hobo Bag',
    color: 'Crimson Rosso',
    quantity: 1,
    suggestedBin: 'FV-B-02',
    status: 'Pending',
    priority: 'High (Restock Return)'
  }
];

export const INITIAL_STOCK_TAKE_SESSIONS = [
  {
    id: 'ST-2026-001',
    title: 'Daily High-Value Vault Cycle Count',
    zone: 'Vault Zone (High Value)',
    assignedWorker: 'Dev Sharma (ID #4092)',
    targetBins: ['VAULT-A-01', 'VAULT-A-02', 'VAULT-A-03'],
    itemsAudited: 18,
    discrepancyCount: 0,
    status: 'Completed',
    date: '10 Nov 2026, 11:30 AM'
  },
  {
    id: 'ST-2026-002',
    title: 'Aisle B Fast-Velocity Shoulder Bags Count',
    zone: 'Fast Velocity (Shoulder Bags)',
    assignedWorker: 'Pooja Verma (ID #3811)',
    targetBins: ['FV-B-01', 'FV-B-02'],
    itemsAudited: 32,
    discrepancyCount: 1,
    status: 'Discrepancy Under Review',
    date: '10 Nov 2026, 01:15 PM'
  }
];

export const INITIAL_INF_LOGS = [
  {
    id: 'INF-2026-104',
    orderId: 'IKIS-IND-928411',
    sku: 'IK-500781-0GRET-8000',
    bagName: 'IKIS Broadway Evening Crystal Minaudière',
    binAttempted: 'VAULT-A-03',
    pickerName: 'Vikram Patel (ID #2944)',
    timestamp: '10 Nov 2026, 10:45 AM',
    reason: 'Physical item missing from assigned vault tray',
    resolution: 'Re-routed to Secondary Bin VAULT-A-01; Stock adjustment triggered',
    resolvedBy: 'Rajesh K. (Hub Manager)'
  }
];

export const INITIAL_RETURNS = [
  {
    id: 'RET-IND-501',
    orderId: 'IKIS-IND-712903',
    customerName: 'Aishwarya Kapoor',
    customerPhone: '+91 98200 44551',
    bagName: 'IKIS Jackie 1961 Small Hobo Shoulder Bag',
    color: 'Crimson Rosso',
    sku: 'IK-636706-10O0G-3154',
    amount: 285000,
    reason: 'Client requested exchange for Onyx Black',
    qcStatus: 'Passed (Grade A - Pristine)',
    restockBin: 'FV-B-02',
    status: 'Restocked into Inventory',
    refundStatus: 'Store Credit / Exchange Issued'
  },
  {
    id: 'RET-IND-502',
    orderId: 'IKIS-IND-881920',
    customerName: 'Vikramaditya Roy',
    customerPhone: '+91 99100 22334',
    bagName: 'IKIS Ophidia Webbing Medium Tote',
    color: 'Beige & Forest Webbing',
    sku: 'IK-631685-96IWB-8745',
    amount: 195000,
    reason: 'Corner transit rub mark on canvas',
    qcStatus: 'In-House Leather Spa Repair',
    restockBin: 'QC-HOLD-01',
    status: 'At Restoration Bench',
    refundStatus: 'Full Refund Processed (₹1,95,000)'
  }
];

export const INITIAL_ORDERS = [
  {
    orderId: 'IKIS-IND-891402',
    orderDate: '10 Nov 2026, 02:15 PM',
    customer: {
      fullName: 'Maharani Gayatri Singhania',
      phone: '+91 98111 20202',
      email: 'singhania.g@royalty.in',
      address: 'Villa 14, Amrita Shergill Marg, Lutyens Delhi',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pincode: '110003'
    },
    items: [
      {
        name: 'IKIS Bamboo 1947 Small Top Handle Bag',
        sku: 'IK-675797-10O0G-1000',
        selectedColor: 'Emerald Jewel',
        bin: 'VAULT-A-01',
        quantity: 1,
        price: 395000,
        monogram: { initials: 'GS', foilColor: '24K Gold' }
      }
    ],
    finalTotal: 395000,
    paymentMethod: 'UPI (Google Pay)',
    status: 'ALLOCATED', // 'ALLOCATED' | 'PICKED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED'
    picker: 'Ramesh K. (HHT #12)',
    packer: 'Sunita M.',
    awbNumber: 'IKIS-EXP-DEL-89412',
    deliveryOtp: '7491'
  },
  {
    orderId: 'IKIS-IND-891403',
    orderDate: '10 Nov 2026, 02:40 PM',
    customer: {
      fullName: 'Karan Mehra',
      phone: '+91 98200 88771',
      email: 'karan.m@investments.in',
      address: 'Sky Villa 41B, Lodha World One, Lower Parel',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400013'
    },
    items: [
      {
        name: 'IKIS Horsebit 1955 Small Shoulder Bag',
        sku: 'IK-602204-1DB0G-1000',
        selectedColor: 'Onyx Black',
        bin: 'FV-B-01',
        quantity: 1,
        price: 245000,
        monogram: null
      }
    ],
    finalTotal: 245000,
    paymentMethod: 'Credit Card (Amex)',
    status: 'PICKED',
    picker: 'Dev Sharma (HHT #08)',
    packer: 'Unassigned',
    awbNumber: 'IKIS-EXP-BOM-10294',
    deliveryOtp: '3819'
  },
  {
    orderId: 'IKIS-IND-891404',
    orderDate: '10 Nov 2026, 01:20 PM',
    customer: {
      fullName: 'Dr. Ananya Sen',
      phone: '+91 97480 33119',
      email: 'ananya.sen@apollo.org',
      address: 'Flat 12A, Queens Court, Ballygunge Circular Rd',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700019'
    },
    items: [
      {
        name: 'IKIS Dionysus Small Shoulder & Chain Bag',
        sku: 'IK-400249-KHNRN-8642',
        selectedColor: 'Taupe Monogram',
        bin: 'FV-B-03',
        quantity: 1,
        price: 265000,
        monogram: { initials: 'AS', foilColor: 'Palladium' }
      }
    ],
    finalTotal: 265000,
    paymentMethod: 'NetBanking (HDFC)',
    status: 'PACKED',
    picker: 'Dev Sharma',
    packer: 'Anita Rao (Bench 3)',
    awbNumber: 'IKIS-EXP-CCU-99014',
    deliveryOtp: '5192'
  },
  {
    orderId: 'IKIS-IND-891405',
    orderDate: '10 Nov 2026, 11:00 AM',
    customer: {
      fullName: 'Rohit Verma',
      phone: '+91 98450 66120',
      email: 'rohit.v@techventures.co',
      address: 'Penthouse 9, Embassy Boulevard, Yelahanka',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560064'
    },
    items: [
      {
        name: 'IKIS Savoy Large Duffle Travel Bag',
        sku: 'IK-724642-FACN4-8465',
        selectedColor: 'Ebony Monogram & Tan',
        bin: 'BULK-C-02',
        quantity: 1,
        price: 275000,
        monogram: { initials: 'RV', foilColor: '24K Gold' }
      }
    ],
    finalTotal: 275000,
    paymentMethod: 'UPI (PhonePe)',
    status: 'OUT_FOR_DELIVERY',
    picker: 'Dev Sharma',
    packer: 'Anita Rao',
    rider: 'Arjun Das (Rider #41)',
    awbNumber: 'IKIS-EXP-BLR-40112',
    deliveryOtp: '9842'
  }
];
