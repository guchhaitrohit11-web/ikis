import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  MapPin, 
  Info, 
  ChevronRight,
  Gift
} from 'lucide-react';
import { formatRupees } from '../data/bagsData';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onInstantBuy,
  isWishlisted,
  onToggleWishlist
}) {
  if (!product) return null;

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'specs' | 'care'
  
  // Bespoke Monogramming
  const [enableMonogram, setEnableMonogram] = useState(false);
  const [monogramInitials, setMonogramInitials] = useState('');
  const [foilColor, setFoilColor] = useState('Gold'); // 'Gold' | 'Palladium' | 'Blind'

  // Indian Pincode check
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  const currentColor = product.colors[selectedColorIdx] || product.colors[0];
  const allImages = [
    currentColor?.image || product.images[0],
    ...product.images.slice(1)
  ];
  const activeImage = allImages[activeImageIdx] || allImages[0];

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setPincodeResult({
        valid: true,
        date: 'Thursday, November 12, 2026',
        city: pincode.startsWith('11') ? 'New Delhi & NCR' :
              pincode.startsWith('40') ? 'Mumbai & Western Coast' :
              pincode.startsWith('56') ? 'Bengaluru & South Hub' :
              pincode.startsWith('70') ? 'Kolkata & East Region' : 'Pan-India Flagship Courier'
      });
    } else {
      setPincodeResult({
        valid: false,
        msg: 'Please enter a valid 6-digit Indian PIN code.'
      });
    }
  };

  const handleAddToBag = () => {
    onAddToCart({
      ...product,
      selectedColor: currentColor.name,
      selectedHex: currentColor.hex,
      image: currentColor.image,
      monogram: enableMonogram && monogramInitials.trim() ? {
        initials: monogramInitials.toUpperCase().slice(0, 3),
        foilColor
      } : null
    });
  };

  const handleBuyNow = () => {
    onInstantBuy({
      ...product,
      selectedColor: currentColor.name,
      selectedHex: currentColor.hex,
      image: currentColor.image,
      monogram: enableMonogram && monogramInitials.trim() ? {
        initials: monogramInitials.toUpperCase().slice(0, 3),
        foilColor
      } : null
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div 
        className="relative bg-[#FAF8F5] w-full max-w-5xl rounded-none shadow-2xl overflow-hidden my-auto border border-[#E5E0D8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#111111] hover:text-[#8B1E26] bg-white/80 backdrop-blur-md rounded-full shadow-sm transition-colors"
          aria-label="Close Product View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Gallery (7 Cols on desktop) */}
          <div className="lg:col-span-7 bg-[#F4F1EA] p-4 sm:p-6 flex flex-col justify-between">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-white/40 flex items-center justify-center border border-[#E5E0D8]">
              {product.badge && (
                <div className="absolute top-3 left-3 z-10 bg-[#0F3B2E] text-white text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1">
                  {product.badge}
                </div>
              )}

              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Monogram Preview Overlay if configured */}
              {enableMonogram && monogramInitials.trim() && (
                <div className="absolute bottom-6 right-6 bg-black/85 backdrop-blur-md border border-[#C5A059] p-3 text-center shadow-2xl">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-[#C5A059] block">
                    Bespoke Hot Stamp
                  </span>
                  <span className={`text-xl font-cinzel font-bold tracking-[0.3em] block mt-0.5 ${
                    foilColor === 'Gold' ? 'text-[#D4AF37]' :
                    foilColor === 'Palladium' ? 'text-[#E5E7EB]' : 'text-[#888888]'
                  }`}>
                    {monogramInitials.toUpperCase().slice(0, 3)}
                  </span>
                  <span className="text-[7px] text-[#A0A0A0] uppercase tracking-wider block mt-0.5">
                    {foilColor} Leaf
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-1">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border-2 overflow-hidden bg-white transition-all ${
                    activeImageIdx === idx ? 'border-[#0F3B2E] scale-105' : 'border-[#D9D3C7] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Origin & Authenticity footer note */}
            <div className="mt-4 pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-[11px] text-[#737373]">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0F3B2E]" />
                <span>{product.origin}</span>
              </span>
              <span className="font-mono text-[10px]">STYLE #{product.styleCode}</span>
            </div>
          </div>

          {/* Right Ordering & Spec Details (5 Cols on desktop) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF8F5]">
            <div>
              {/* Category Breadcrumb */}
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#9E7E3C] font-semibold mb-2">
                IKIS • {product.categoryName}
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-serif text-[#111111] uppercase tracking-[0.08em] font-normal leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-[#737373] mt-1 font-light italic">
                {product.tagline}
              </p>

              {/* Price in Rupees */}
              <div className="mt-4 pb-4 border-b border-[#E5E0D8] flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-serif font-semibold text-[#111111] tracking-wide">
                  {formatRupees(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#999999] line-through">
                    {formatRupees(product.originalPrice)}
                  </span>
                )}
                <span className="text-[10px] tracking-wider uppercase text-[#0F3B2E] font-medium bg-[#0F3B2E]/10 px-2 py-0.5 rounded">
                  GST & Duties Included
                </span>
              </div>

              {/* Color Selection */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="tracking-[0.2em] uppercase font-semibold text-[#111111]">
                    Leather Finish:
                  </span>
                  <span className="text-[#0F3B2E] font-medium tracking-wide">
                    {currentColor.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColorIdx(idx);
                        setActiveImageIdx(0);
                      }}
                      className={`group relative p-0.5 rounded-full border-2 transition-all ${
                        selectedColorIdx === idx ? 'border-[#0F3B2E] scale-110' : 'border-transparent'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Complimentary Bespoke Hot Stamping Monogram Section */}
              <div className="mt-6 p-3.5 bg-[#F5F2EB] border border-[#E5E0D8]">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableMonogram}
                      onChange={(e) => setEnableMonogram(e.target.checked)}
                      className="accent-[#0F3B2E] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs uppercase tracking-[0.18em] font-medium text-[#111111]">
                      Add Free Monogram Hot-Stamp
                    </span>
                  </label>
                  <span className="text-[9px] tracking-widest text-[#C5A059] uppercase font-bold">
                    ATELIER COMPLIMENTARY
                  </span>
                </div>

                {enableMonogram && (
                  <div className="mt-3 pt-3 border-t border-[#E5E0D8] space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <label className="text-[10px] tracking-[0.15em] uppercase text-[#737373] block mb-1">
                          Initials (Max 3 letters):
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          value={monogramInitials}
                          onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                          placeholder="e.g. RK"
                          className="w-full bg-white border border-[#D9D3C7] px-3 py-1.5 text-xs font-cinzel tracking-[0.25em] uppercase focus:border-[#0F3B2E] outline-none"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="text-[10px] tracking-[0.15em] uppercase text-[#737373] block mb-1">
                          Foil Type:
                        </label>
                        <select
                          value={foilColor}
                          onChange={(e) => setFoilColor(e.target.value)}
                          className="w-full bg-white border border-[#D9D3C7] px-2 py-1.5 text-xs uppercase tracking-wider focus:border-[#0F3B2E] outline-none cursor-pointer"
                        >
                          <option value="Gold">24K Gold Leaf</option>
                          <option value="Palladium">Palladium Silver</option>
                          <option value="Blind">Blind Emboss</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Estimation in Indian Pincodes */}
              <div className="mt-4">
                <form onSubmit={handlePincodeCheck} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit Indian PIN code"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-[#D9D3C7] bg-white focus:border-[#0F3B2E] outline-none tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#111111] text-white hover:bg-[#0F3B2E] px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeResult && (
                  <div className="mt-2 text-xs">
                    {pincodeResult.valid ? (
                      <div className="text-[#0F3B2E] flex items-center space-x-1.5 font-medium">
                        <Check className="w-4 h-4 text-[#0F3B2E]" />
                        <span>Available in {pincodeResult.city}! Delivery by {pincodeResult.date}</span>
                      </div>
                    ) : (
                      <div className="text-[#8B1E26] text-[11px]">{pincodeResult.msg}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Specification Tabs */}
              <div className="mt-6">
                <div className="flex border-b border-[#E5E0D8]">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 text-[11px] tracking-[0.2em] uppercase font-semibold mr-6 border-b-2 transition-all ${
                      activeTab === 'details' ? 'border-[#0F3B2E] text-[#0F3B2E]' : 'border-transparent text-[#737373]'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`py-2 text-[11px] tracking-[0.2em] uppercase font-semibold mr-6 border-b-2 transition-all ${
                      activeTab === 'specs' ? 'border-[#0F3B2E] text-[#0F3B2E]' : 'border-transparent text-[#737373]'
                    }`}
                  >
                    Dimensions & Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`py-2 text-[11px] tracking-[0.2em] uppercase font-semibold border-b-2 transition-all ${
                      activeTab === 'care' ? 'border-[#0F3B2E] text-[#0F3B2E]' : 'border-transparent text-[#737373]'
                    }`}
                  >
                    Packaging & Spa
                  </button>
                </div>

                <div className="py-3 text-xs text-[#555555] leading-relaxed max-h-36 overflow-y-auto">
                  {activeTab === 'details' && (
                    <div>
                      <p className="mb-2">{product.description}</p>
                      <ul className="list-disc pl-4 space-y-1 text-[#666666]">
                        {product.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-1.5">
                      <div><strong className="text-[#111111]">Dimensions:</strong> {product.dimensions}</div>
                      <div><strong className="text-[#111111]">Strap Drop:</strong> {product.strapDrop}</div>
                      <div><strong className="text-[#111111]">Weight:</strong> {product.weight}</div>
                      <div><strong className="text-[#111111]">Hardware:</strong> {product.hardware}</div>
                      <div><strong className="text-[#111111]">Lining:</strong> {product.lining}</div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-1.5">
                      <p>• Delivered in the signature IKIS emerald green rigid box with satin ribbon and protective organic cotton dust bag.</p>
                      <p>• Includes Complimentary 2-Year Leather Spa & Polishing privilege at our Mumbai, Delhi, and Bengaluru boutiques.</p>
                      <p>• Protect from direct sunlight, humidity, and alcohol-based perfumes.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons (Add to Bag, Instant Buy, Wishlist) */}
            <div className="mt-6 pt-4 border-t border-[#E5E0D8] space-y-2.5">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 bg-white hover:bg-[#111111] text-[#111111] hover:text-white border-2 border-[#111111] py-3.5 px-4 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-3.5 border-2 border-[#E5E0D8] hover:border-[#8B1E26] text-[#111111] hover:text-[#8B1E26] transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#8B1E26] text-[#8B1E26]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#0F3B2E] hover:bg-[#1A5341] text-white py-3.5 px-4 text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <span>ORDER NOW • {formatRupees(product.price)}</span>
                <ChevronRight className="w-4 h-4 text-[#C5A059]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
