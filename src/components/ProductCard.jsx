import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { formatRupees } from '../data/bagsData';

export default function ProductCard({
  product,
  onOpenQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const primaryImage = currentColor?.image || product.images[0];
  const secondaryImage = product.images[1] || primaryImage;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedColor: currentColor.name,
      selectedHex: currentColor.hex,
      image: primaryImage
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div 
      className="group relative bg-[#FAF8F5] border border-[#EBE6DD] hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EFE9] cursor-pointer"
        onClick={() => onOpenQuickView(product)}
      >
        {/* Luxury Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#0F3B2E] text-white text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white text-[#111111] backdrop-blur-sm rounded-full transition-transform hover:scale-110 shadow-sm"
          aria-label="Save to Wishlist"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#8B1E26] text-[#8B1E26]' : 'text-[#111111]'
            }`} 
          />
        </button>

        {/* Primary & Hover Images */}
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick View Button Pill (Center overlay on hover) */}
        <div className="absolute inset-x-0 bottom-3 px-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="w-full bg-[#111111]/90 hover:bg-[#0F3B2E] text-white backdrop-blur-sm py-2.5 px-4 text-[10px] tracking-[0.25em] uppercase font-medium flex items-center justify-center space-x-2 transition-all shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>DISCOVER DETAILS</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#FAF8F5]">
        <div>
          {/* Color Swatch Dots */}
          <div className="flex items-center space-x-1.5 mb-2.5">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx
                    ? 'ring-1 ring-offset-1 ring-[#0F3B2E] scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-[10px] tracking-wider text-[#737373] ml-1 uppercase">
              {currentColor?.name}
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onOpenQuickView(product)}
            className="text-xs sm:text-sm font-medium tracking-[0.12em] text-[#111111] uppercase line-clamp-2 cursor-pointer hover:text-[#0F3B2E] transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Material & Origin */}
          <p className="text-[11px] text-[#737373] font-light mt-1 line-clamp-1 italic">
            {product.material}
          </p>
        </div>

        {/* Pricing & Add to Bag */}
        <div className="mt-4 pt-3 border-t border-[#EBE6DD] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#111111]">
              {formatRupees(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-[#999999] line-through">
                {formatRupees(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`py-2 px-3 sm:px-4 text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center space-x-1.5 ${
              isAdded 
                ? 'bg-[#0F3B2E] text-white' 
                : 'bg-white hover:bg-[#111111] hover:text-white text-[#111111] border border-[#111111]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden sm:inline">IN BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
