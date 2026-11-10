import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { formatRupees } from '../data/bagsData';

export default function WishlistDrawer({
  isOpen,
  onClose,
  items,
  onRemoveWishlist,
  onAddToCart,
  onOpenQuickView
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E5E0D8]">
          {/* Header */}
          <div className="p-6 border-b border-[#E5E0D8] bg-[#F5F2EB] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-[#8B1E26] fill-[#8B1E26]" />
              <h2 className="text-xs font-semibold tracking-[0.25em] uppercase text-[#111111]">
                SAVED CREATIONS ({items.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#111111] hover:text-[#8B1E26] rounded-full hover:bg-white/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#F0ECE1] rounded-full flex items-center justify-center text-[#737373]">
                  <Heart className="w-8 h-8 opacity-30" />
                </div>
                <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#111111]">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-[#737373] mt-1 max-w-xs mx-auto font-light">
                  Save your most cherished bags to review anytime or request a boutique presentation.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="flex space-x-4 pb-6 border-b border-[#E5E0D8] last:border-b-0"
                >
                  <div 
                    className="w-20 h-24 bg-[#F0ECE1] border border-[#E5E0D8] overflow-hidden cursor-pointer"
                    onClick={() => {
                      onOpenQuickView(item);
                      onClose();
                    }}
                  >
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 
                          onClick={() => {
                            onOpenQuickView(item);
                            onClose();
                          }}
                          className="text-xs font-semibold tracking-[0.1em] uppercase text-[#111111] line-clamp-1 cursor-pointer hover:text-[#0F3B2E]"
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(item.id)}
                          className="text-[#999999] hover:text-[#8B1E26] ml-2 p-1"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#737373] mt-0.5 italic">
                        {item.material}
                      </p>

                      <div className="text-xs font-serif font-bold text-[#111111] mt-2">
                        {formatRupees(item.price)}
                      </div>
                    </div>

                    <div className="mt-3">
                      <button
                        onClick={() => {
                          onAddToCart({
                            ...item,
                            selectedColor: item.colors[0]?.name,
                            selectedHex: item.colors[0]?.hex,
                            image: item.images[0]
                          });
                          onRemoveWishlist(item.id);
                        }}
                        className="w-full bg-[#111111] hover:bg-[#0F3B2E] text-white py-2 px-3 text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
