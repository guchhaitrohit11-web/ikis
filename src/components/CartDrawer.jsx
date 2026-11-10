import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Gift, 
  ShieldCheck, 
  ArrowRight, 
  Tag, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { formatRupees } from '../data/bagsData';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout
}) {
  if (!isOpen) return null;

  const [giftBox, setGiftBox] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'IKISVIP' || code === 'ROYAL10' || code === 'IKIS10') {
      setDiscountPercent(10);
      setPromoMessage('VIP 10% Privilege Applied');
    } else if (code === 'FLORENCE') {
      setDiscountPercent(15);
      setPromoMessage('Florentine Heritage 15% Privilege Applied');
    } else {
      setPromoMessage('Invalid Privilege Code. Try: IKISVIP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E5E0D8]">
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E5E0D8] bg-[#F5F2EB] flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-[#0F3B2E]" />
                <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#111111]">
                  SHOPPING BAG ({items.reduce((acc, it) => acc + it.quantity, 0)})
                </h2>
              </div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#737373] mt-0.5">
                Complimentary Pan-India Delivery
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#111111] hover:text-[#8B1E26] rounded-full hover:bg-white/60 transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#F0ECE1] rounded-full flex items-center justify-center text-[#737373]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#111111]">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-[#737373] mt-1 max-w-xs mx-auto font-light">
                  Explore our iconic leather collections and curate your timeless wardrobe.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 inline-block bg-[#0F3B2E] text-white px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-[#1A5341] transition-colors"
                >
                  DISCOVER BAGS
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div 
                  key={`${item.id}-${item.selectedColor}-${index}`}
                  className="flex space-x-4 pb-6 border-b border-[#E5E0D8] last:border-b-0"
                >
                  {/* Item Image */}
                  <div className="w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 bg-[#F0ECE1] border border-[#E5E0D8] overflow-hidden">
                    <img 
                      src={item.image || item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-semibold tracking-[0.1em] uppercase text-[#111111] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item)}
                          className="text-[#999999] hover:text-[#8B1E26] ml-2 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#737373] mt-0.5">
                        Color: <span className="text-[#111111]">{item.selectedColor || 'Signature'}</span>
                      </div>

                      {/* Monogram tag if configured */}
                      {item.monogram && (
                        <div className="inline-flex items-center space-x-1 bg-[#F0ECE1] border border-[#C5A059]/40 px-2 py-0.5 mt-1 text-[9px] uppercase tracking-wider text-[#9E7E3C]">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Hot-stamp: <strong>{item.monogram.initials}</strong> ({item.monogram.foilColor})</span>
                        </div>
                      )}

                      <div className="text-xs font-semibold text-[#111111] mt-2">
                        {formatRupees(item.price)}
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-3 mt-3">
                      <div className="flex items-center border border-[#D9D3C7] bg-white">
                        <button
                          onClick={() => onUpdateQty(item, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-[#F0ECE1] text-[#737373] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-medium text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item, item.quantity + 1)}
                          className="p-1 hover:bg-[#F0ECE1] text-[#737373] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Complimentary Signature Packaging Options */}
            {items.length > 0 && (
              <div className="bg-[#F5F2EB] p-4 border border-[#E5E0D8] space-y-3">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => setGiftBox(e.target.checked)}
                    className="mt-0.5 accent-[#0F3B2E] w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#111111] block">
                      Signature IKIS Gift Packaging
                    </span>
                    <span className="text-[10px] text-[#737373] font-light block">
                      Complimentary emerald luxury box, grosgrain silk ribbon & dust bag.
                    </span>
                  </div>
                </label>

                <div className="pt-2 border-t border-[#E5E0D8]">
                  <button
                    onClick={() => setShowNoteInput(!showNoteInput)}
                    className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#0F3B2E] hover:underline flex items-center space-x-1"
                  >
                    <Gift className="w-3 h-3 text-[#C5A059]" />
                    <span>{showNoteInput ? 'Hide Gift Note' : 'Add Complimentary Handwritten Note'}</span>
                  </button>

                  {showNoteInput && (
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your personalized gift message here..."
                      rows={2}
                      className="w-full mt-2 p-2 text-xs bg-white border border-[#D9D3C7] focus:border-[#0F3B2E] outline-none"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Promo / Privilege Code */}
            {items.length > 0 && (
              <div className="border border-[#E5E0D8] p-3 bg-white">
                <form onSubmit={handleApplyPromo} className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-[#C5A059]" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Privilege Code (e.g. IKISVIP)"
                    className="flex-1 text-xs uppercase tracking-wider outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#111111] hover:bg-[#0F3B2E] text-white px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoMessage && (
                  <p className={`text-[10px] mt-1.5 ${discountPercent > 0 ? 'text-[#0F3B2E] font-medium' : 'text-[#8B1E26]'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Drawer Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5E0D8] bg-[#F5F2EB] space-y-3">
              <div className="space-y-1.5 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111111]">{formatRupees(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#0F3B2E] font-medium">
                    <span>Privilege Privilege ({discountPercent}%)</span>
                    <span>-{formatRupees(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span className="text-[#0F3B2E] font-semibold tracking-wider uppercase">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-[10px] text-[#737373]">
                  <span>Estimated Taxes (18% GST)</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E0D8] flex items-baseline justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                  Total (INR)
                </span>
                <span className="text-xl font-serif font-bold text-[#111111]">
                  {formatRupees(finalTotal)}
                </span>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  onProceedCheckout({
                    items,
                    subtotal,
                    discountAmount,
                    finalTotal,
                    giftBox,
                    giftNote
                  });
                }}
                className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white py-3.5 px-4 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg"
              >
                <span>PROCEED TO CLIENT CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-[#737373] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F3B2E]" />
                <span>Encrypted 256-bit Flagship Gateway • 100% Secure</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
