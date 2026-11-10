import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { BAGS_DATA, formatRupees } from '../data/bagsData';

export default function SearchModal({
  isOpen,
  onClose,
  onSelectProduct
}) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const suggestions = [
    'Horsebit 1955',
    'Bamboo 1947',
    'Jackie 1961',
    'Dionysus',
    'Ophidia Tote',
    'Matelassé',
    'Black Leather',
    'Travel Duffle'
  ];

  const filteredBags = query.trim() === '' ? [] : BAGS_DATA.filter((b) => {
    const q = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.tagline.toLowerCase().includes(q) ||
      b.categoryName.toLowerCase().includes(q) ||
      b.material.toLowerCase().includes(q) ||
      b.styleCode.toLowerCase().includes(q) ||
      b.colors.some(c => c.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-12 md:pt-20">
      <div 
        className="relative bg-[#FAF8F5] w-full max-w-3xl shadow-2xl border border-[#E5E0D8] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E5E0D8] bg-[#F5F2EB] flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#0F3B2E] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by collection name, style code (e.g. 1955, Bamboo), or leather color..."
            className="w-full bg-transparent text-sm sm:text-base font-light text-[#111111] placeholder:text-[#888888] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#111111] hover:text-[#8B1E26] rounded-full hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E5E0D8]">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#737373] font-semibold block mb-2.5">
            TRENDING IN FLORENTINE COLLECTIONS
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setQuery(item)}
                className="text-xs bg-[#FAF8F5] hover:bg-[#0F3B2E] hover:text-white border border-[#D9D3C7] py-1.5 px-3 rounded-full transition-colors font-medium text-[#333333]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-xs text-[#737373] font-light">
              Type to explore the IKIS luxury leather archives. Prices indexed in Indian Rupees (₹).
            </div>
          ) : filteredBags.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold tracking-wider text-[#111111] uppercase">
                No matching creations found for "{query}"
              </p>
              <p className="text-xs text-[#737373] mt-1 font-light">
                Our Client Concierge is available to source bespoke archival designs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBags.map((bag) => (
                <div
                  key={bag.id}
                  onClick={() => {
                    onSelectProduct(bag);
                    onClose();
                  }}
                  className="flex items-center space-x-3 p-3 border border-[#E5E0D8] bg-[#FAF8F5] hover:border-[#0F3B2E] cursor-pointer transition-all group"
                >
                  <img
                    src={bag.images[0]}
                    alt={bag.name}
                    className="w-16 h-20 object-cover bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-[#9E7E3C] font-semibold block">
                      {bag.categoryName}
                    </span>
                    <h4 className="text-xs font-semibold text-[#111111] uppercase truncate group-hover:text-[#0F3B2E] transition-colors">
                      {bag.name}
                    </h4>
                    <p className="text-[11px] text-[#737373] truncate">{bag.material}</p>
                    <div className="text-xs font-serif font-bold text-[#111111] mt-1">
                      {formatRupees(bag.price)}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#737373] group-hover:text-[#0F3B2E] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
