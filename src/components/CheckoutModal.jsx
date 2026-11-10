import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  Printer, 
  Sparkles,
  ArrowRight,
  PackageCheck,
  ChevronLeft
} from 'lucide-react';
import { formatRupees } from '../data/bagsData';
import { triggerLuxuryConfetti } from '../utils/confetti';

const INDIAN_STATES = [
  "Maharashtra", "Delhi NCR", "Karnataka", "Tamil Nadu", "Gujarat", 
  "West Bengal", "Telangana", "Rajasthan", "Uttar Pradesh", "Kerala", 
  "Punjab", "Haryana", "Madhya Pradesh", "Goa", "Andhra Pradesh", 
  "Assam", "Bihar", "Chhattisgarh", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Odisha", "Uttarakhand"
];

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutData,
  onOrderSuccess
}) {
  if (!isOpen || !checkoutData) return null;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    deliverySpeed: 'white-glove', // 'white-glove' | 'express'
    paymentMethod: 'upi', // 'upi' | 'card' | 'netbanking' | 'cod'
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    bank: 'HDFC Bank'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fulfill all essential client shipping fields.");
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `IKIS-IND-${Math.floor(100000 + Math.random() * 900000)}`;
      const order = {
        orderId: generatedOrderId,
        orderDate: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        estimatedDelivery: '3 - 5 Business Days (White Glove)',
        items: checkoutData.items,
        subtotal: checkoutData.subtotal,
        discountAmount: checkoutData.discountAmount,
        finalTotal: checkoutData.finalTotal,
        giftBox: checkoutData.giftBox,
        giftNote: checkoutData.giftNote,
        shipping: formData
      };

      // Save to localStorage for persistent order history
      const prevOrders = JSON.parse(localStorage.getItem('ikis_client_orders') || '[]');
      localStorage.setItem('ikis_client_orders', JSON.stringify([order, ...prevOrders]));

      setCompletedOrder(order);
      setStep(3);
      triggerLuxuryConfetti();
      onOrderSuccess();
    }, 1800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF8F5] w-full max-w-4xl shadow-2xl border border-[#E5E0D8] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0F3B2E] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#1A5341]">
          <div className="flex items-center space-x-3">
            <span className="text-xl sm:text-2xl font-cinzel tracking-[0.3em] font-semibold text-[#F5F2EB]">
              IKIS
            </span>
            <span className="text-white/40">|</span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-light text-[#C5A059]">
              {step === 3 ? 'ORDER CONFIRMATION' : 'CLIENT CHECKOUT (₹ INR)'}
            </span>
          </div>

          {step !== 3 && (
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Steps Progress Indicator (for steps 1 & 2) */}
        {step < 3 && (
          <div className="bg-[#F5F2EB] px-6 py-3 border-b border-[#E5E0D8] flex items-center justify-between text-xs tracking-[0.2em] uppercase font-medium">
            <div className="flex items-center space-x-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 1 ? 'bg-[#0F3B2E] text-white' : 'bg-[#C5A059] text-white'
              }`}>1</span>
              <span className={step === 1 ? 'text-[#0F3B2E] font-semibold' : 'text-[#737373]'}>
                Shipping & Concierge
              </span>
            </div>

            <div className="w-12 h-px bg-[#D9D3C7]" />

            <div className="flex items-center space-x-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 2 ? 'bg-[#0F3B2E] text-white' : 'bg-[#D9D3C7] text-[#737373]'
              }`}>2</span>
              <span className={step === 2 ? 'text-[#0F3B2E] font-semibold' : 'text-[#737373]'}>
                Payment & Authorization
              </span>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* STEP 1: SHIPPING & CLIENT INFO */}
          {step === 1 && (
            <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form inputs */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-[#E5E0D8] pb-2 mb-4">
                  <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#111111]">
                    Client & Delivery Credentials
                  </h3>
                  <p className="text-[11px] text-[#737373]">
                    Complimentary White-Glove delivery to any PIN code across India.
                  </p>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Maharani Radhika Singh / Mr. Aditya Birla"
                    className="w-full bg-white border border-[#D9D3C7] px-3.5 py-2.5 text-xs focus:border-[#0F3B2E] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="client@luxury.in"
                      className="w-full bg-white border border-[#D9D3C7] px-3.5 py-2.5 text-xs focus:border-[#0F3B2E] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                      Mobile Number (For VIP Courier) *
                    </label>
                    <div className="flex">
                      <span className="bg-[#F0ECE1] border border-r-0 border-[#D9D3C7] px-2.5 py-2.5 text-xs text-[#555555]">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98200 12345"
                        className="w-full bg-white border border-[#D9D3C7] px-3.5 py-2.5 text-xs focus:border-[#0F3B2E] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                    Street Address & Apartment / Residence *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Penthouse 42, Imperial Towers, Tardeo Road"
                    className="w-full bg-white border border-[#D9D3C7] px-3.5 py-2.5 text-xs focus:border-[#0F3B2E] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Mumbai / New Delhi"
                      className="w-full bg-white border border-[#D9D3C7] px-3 py-2.5 text-xs focus:border-[#0F3B2E] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                      State / UT *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#D9D3C7] px-2 py-2.5 text-xs focus:border-[#0F3B2E] outline-none"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                      PIN Code (6 Digits) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="400034"
                      className="w-full bg-white border border-[#D9D3C7] px-3 py-2.5 text-xs focus:border-[#0F3B2E] outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Delivery Option */}
                <div className="pt-3">
                  <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-2">
                    Dispatch Mode:
                  </label>
                  <div className="p-3 bg-[#F5F2EB] border border-[#0F3B2E] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-[#0F3B2E]" />
                      <div>
                        <div className="text-xs font-semibold uppercase text-[#111111]">
                          IKIS White-Glove Signature Courier
                        </div>
                        <div className="text-[10px] text-[#737373]">
                          Tamper-proof sealed security box with direct hand delivery
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#0F3B2E] uppercase">
                      COMPLIMENTARY
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white py-3.5 px-4 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg"
                  >
                    <span>CONTINUE TO PAYMENT IN ₹ INR</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>
              </div>

              {/* Order summary sidebar */}
              <div className="lg:col-span-5 bg-[#F5F2EB] p-5 border border-[#E5E0D8] space-y-4 h-fit">
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] border-b border-[#E5E0D8] pb-2">
                  ORDER OVERVIEW ({checkoutData.items.length})
                </h4>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {checkoutData.items.map((item, idx) => (
                    <div key={idx} className="flex space-x-3 text-xs">
                      <img src={item.image} alt={item.name} className="w-12 h-14 object-cover border border-[#D9D3C7]" />
                      <div className="flex-1">
                        <div className="font-semibold text-[#111111] line-clamp-1">{item.name}</div>
                        <div className="text-[10px] text-[#737373]">
                          Qty: {item.quantity} • {item.selectedColor}
                        </div>
                        {item.monogram && (
                          <div className="text-[9px] text-[#C5A059] font-medium">
                            Stamp: {item.monogram.initials} ({item.monogram.foilColor})
                          </div>
                        )}
                        <div className="font-medium text-[#111111] mt-0.5">
                          {formatRupees(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E5E0D8] space-y-1.5 text-xs text-[#555555]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#111111]">{formatRupees(checkoutData.subtotal)}</span>
                  </div>
                  {checkoutData.discountAmount > 0 && (
                    <div className="flex justify-between text-[#0F3B2E] font-medium">
                      <span>Privilege Deduction</span>
                      <span>-{formatRupees(checkoutData.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>White-Glove Pan-India Shipping</span>
                    <span className="text-[#0F3B2E] font-semibold uppercase">FREE</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#737373]">
                    <span>Goods & Services Tax (18% GST)</span>
                    <span>Included in MRP</span>
                  </div>
                  <div className="pt-2 border-t border-[#E5E0D8] flex justify-between items-baseline font-semibold text-sm text-[#111111]">
                    <span className="uppercase tracking-wider">Total Payable:</span>
                    <span className="text-xl font-serif text-[#0F3B2E] font-bold">
                      {formatRupees(checkoutData.finalTotal)}
                    </span>
                  </div>
                </div>

                {checkoutData.giftBox && (
                  <div className="p-2.5 bg-white border border-[#D9D3C7] text-[10px] text-[#555555] flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                    <span>Signature IKIS Emerald Box & Wax-Sealed Ribbon included</span>
                  </div>
                )}
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT IN RUPEES */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#737373] hover:text-[#111111] flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Client Details</span>
                </button>

                <div className="border-b border-[#E5E0D8] pb-2">
                  <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#111111]">
                    Select Indian Payment Method
                  </h3>
                  <p className="text-[11px] text-[#737373]">
                    All transactions are authorized in Indian Rupees (₹ INR) with Reserve Bank of India 2FA compliance.
                  </p>
                </div>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                    className={`p-3 border text-center transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-[#0F3B2E] bg-[#0F3B2E]/5 font-semibold text-[#0F3B2E]'
                        : 'border-[#D9D3C7] hover:border-[#111111]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 mx-auto mb-1 text-[#0F3B2E]" />
                    <span className="text-[10px] tracking-wider uppercase block">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 border text-center transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-[#0F3B2E] bg-[#0F3B2E]/5 font-semibold text-[#0F3B2E]'
                        : 'border-[#D9D3C7] hover:border-[#111111]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#0F3B2E]" />
                    <span className="text-[10px] tracking-wider uppercase block">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                    className={`p-3 border text-center transition-all ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-[#0F3B2E] bg-[#0F3B2E]/5 font-semibold text-[#0F3B2E]'
                        : 'border-[#D9D3C7] hover:border-[#111111]'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-1 text-[#0F3B2E]" />
                    <span className="text-[10px] tracking-wider uppercase block">NetBanking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 border text-center transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#0F3B2E] bg-[#0F3B2E]/5 font-semibold text-[#0F3B2E]'
                        : 'border-[#D9D3C7] hover:border-[#111111]'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mx-auto mb-1 text-[#0F3B2E]" />
                    <span className="text-[10px] tracking-wider uppercase block">VIP COD</span>
                  </button>
                </div>

                {/* Sub-form based on selected payment method */}
                <div className="bg-[#F5F2EB] p-5 border border-[#E5E0D8]">
                  {/* UPI / QR */}
                  {formData.paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 bg-white p-4 border border-[#D9D3C7]">
                        <div className="w-24 h-24 bg-stone-100 p-2 border border-stone-300 flex items-center justify-center">
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=ikis.luxury@hdfcbank%26pn=IKIS%20Luxury%20Flagship"
                            alt="Scan UPI QR"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase text-[#111111]">
                            Scan using any UPI App
                          </div>
                          <div className="text-[10px] text-[#737373] mt-0.5">
                            Google Pay • PhonePe • Paytm • CRED • BHIM
                          </div>
                          <div className="mt-2 text-xs font-semibold text-[#0F3B2E]">
                            Payable: {formatRupees(checkoutData.finalTotal)}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                          Or Enter UPI VPA / ID:
                        </label>
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleChange}
                          placeholder="client@okhdfcbank"
                          className="w-full bg-white border border-[#D9D3C7] px-3.5 py-2 text-xs focus:border-[#0F3B2E] outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Cards */}
                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName || formData.fullName}
                          onChange={handleChange}
                          placeholder="NAME ON CARD"
                          className="w-full bg-white border border-[#D9D3C7] px-3 py-2 text-xs uppercase focus:border-[#0F3B2E] outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                          Card Number (Visa / Master / Amex / RuPay)
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          maxLength={19}
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="4532 •••• •••• 8890"
                          className="w-full bg-white border border-[#D9D3C7] px-3 py-2 text-xs font-mono focus:border-[#0F3B2E] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            maxLength={5}
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="12/28"
                            className="w-full bg-white border border-[#D9D3C7] px-3 py-2 text-xs font-mono focus:border-[#0F3B2E] outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                            CVV (3 or 4 digits)
                          </label>
                          <input
                            type="password"
                            name="cardCvv"
                            maxLength={4}
                            value={formData.cardCvv}
                            onChange={handleChange}
                            placeholder="•••"
                            className="w-full bg-white border border-[#D9D3C7] px-3 py-2 text-xs font-mono focus:border-[#0F3B2E] outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NetBanking */}
                  {formData.paymentMethod === 'netbanking' && (
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-[0.15em] uppercase font-semibold text-[#111111] block mb-1">
                        Select Premier Banking Partner:
                      </label>
                      <select
                        name="bank"
                        value={formData.bank}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#D9D3C7] px-3 py-2.5 text-xs focus:border-[#0F3B2E] outline-none"
                      >
                        <option value="HDFC Bank">HDFC Bank (Imperia / Preferred)</option>
                        <option value="ICICI Bank">ICICI Bank Wealth Management</option>
                        <option value="State Bank of India">State Bank of India (Global)</option>
                        <option value="Axis Bank">Axis Bank Burgundy</option>
                        <option value="Kotak Mahindra Bank">Kotak Wealth Banking</option>
                        <option value="Standard Chartered">Standard Chartered Private Bank</option>
                      </select>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  {formData.paymentMethod === 'cod' && (
                    <div className="p-3 bg-white border border-[#D9D3C7] text-xs text-[#555555] space-y-2">
                      <p className="font-semibold text-[#111111]">
                        VIP Doorstep Verification on Delivery
                      </p>
                      <p className="text-[11px] text-[#737373]">
                        Our armored concierge will reach out via telephone prior to arrival with an encrypted verification code. Cash or doorstep mobile POS terminal cards accepted.
                      </p>
                    </div>
                  )}
                </div>

                {/* Final Order Placement Button */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white py-4 px-4 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all shadow-xl disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>AUTHORIZING TRANSACTION IN ₹ INR...</span>
                  ) : (
                    <>
                      <span>CONFIRM & PLACE ORDER • {formatRupees(checkoutData.finalTotal)}</span>
                      <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    </>
                  )}
                </button>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5 bg-[#F5F2EB] p-5 border border-[#E5E0D8] space-y-3 h-fit">
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] border-b border-[#E5E0D8] pb-2">
                  CLIENT BILLING SUMMARY
                </h4>
                <div className="text-xs text-[#555555] space-y-1">
                  <div><strong>Client:</strong> {formData.fullName}</div>
                  <div><strong>Phone:</strong> +91 {formData.phone}</div>
                  <div><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</div>
                </div>

                <div className="pt-3 border-t border-[#E5E0D8] text-xs space-y-1 text-[#555555]">
                  <div className="flex justify-between">
                    <span>Items Total:</span>
                    <span>{formatRupees(checkoutData.subtotal)}</span>
                  </div>
                  {checkoutData.discountAmount > 0 && (
                    <div className="flex justify-between text-[#0F3B2E]">
                      <span>Privilege Deduction:</span>
                      <span>-{formatRupees(checkoutData.discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Courier Service:</span>
                    <span className="text-[#0F3B2E] font-medium">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#111111] pt-2 border-t border-[#E5E0D8]">
                    <span>Amount Charged:</span>
                    <span className="text-[#0F3B2E]">{formatRupees(checkoutData.finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS / CONFIRMATION */}
          {step === 3 && completedOrder && (
            <div className="text-center py-6 max-w-2xl mx-auto space-y-6">
              <div className="w-20 h-20 bg-[#0F3B2E] text-[#C5A059] rounded-full mx-auto flex items-center justify-center shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#9E7E3C] font-semibold block mb-1">
                  TRANSACTION CONFIRMED
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#111111] uppercase tracking-[0.06em]">
                  THANK YOU FOR YOUR PATRONAGE
                </h3>
                <p className="text-xs text-[#737373] mt-2 max-w-md mx-auto">
                  Your order has been registered at our Florence atelier and Mumbai client dispatch hub. A certified email confirmation has been dispatched to <strong>{completedOrder.shipping.email}</strong>.
                </p>
              </div>

              {/* Order ID & Details Card */}
              <div className="bg-[#F5F2EB] p-6 border border-[#E5E0D8] text-left space-y-3 font-sans text-xs">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <div>
                    <span className="text-[10px] text-[#737373] tracking-[0.15em] uppercase block">
                      OFFICIAL ORDER REFERENCE
                    </span>
                    <span className="font-mono text-sm font-bold text-[#0F3B2E]">
                      {completedOrder.orderId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#737373] tracking-[0.15em] uppercase block">
                      DATE OF ISSUANCE
                    </span>
                    <span className="font-medium text-[#111111]">{completedOrder.orderDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                  <div>
                    <span className="text-[10px] text-[#737373] tracking-[0.15em] uppercase block">
                      DELIVERY ADDRESS
                    </span>
                    <p className="text-[#111111] font-medium leading-relaxed">
                      {completedOrder.shipping.fullName}<br />
                      {completedOrder.shipping.address}<br />
                      {completedOrder.shipping.city}, {completedOrder.shipping.state} – {completedOrder.shipping.pincode}<br />
                      Phone: +91 {completedOrder.shipping.phone}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#737373] tracking-[0.15em] uppercase block">
                      ORDER VALUATION
                    </span>
                    <p className="text-xl font-serif font-bold text-[#0F3B2E] mt-1">
                      {formatRupees(completedOrder.finalTotal)}
                    </p>
                    <span className="text-[10px] text-[#737373] block mt-1">
                      Payment Mode: {completedOrder.shipping.paymentMethod.toUpperCase()} (INR)
                    </span>
                    <span className="text-[10px] text-[#0F3B2E] font-medium block">
                      White-Glove Status: Confirmed & Dispatched
                    </span>
                  </div>
                </div>

                {/* Items in the order */}
                <div className="pt-3 border-t border-[#E5E0D8] space-y-2">
                  <span className="text-[10px] text-[#737373] tracking-[0.15em] uppercase block">
                    REGISTERED PIECES ({completedOrder.items.length})
                  </span>
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span>{it.name} ({it.selectedColor}) x{it.quantity}</span>
                      <span className="font-medium">{formatRupees(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrintReceipt}
                  className="bg-white hover:bg-[#111111] hover:text-white text-[#111111] border border-[#111111] px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold flex items-center space-x-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT TAX INVOICE</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold flex items-center space-x-2 transition-colors shadow-lg"
                >
                  <span>CONTINUE SHOPPING</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
