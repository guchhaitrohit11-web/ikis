import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CampaignStories({ onSelectCategory, onOpenConcierge }) {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#9E7E3C] block mb-2">
            HERITAGE & CRAFTSMANSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-[0.06em] text-[#111111] uppercase font-normal">
            ICONIC HOUSE CODES
          </h2>
          <div className="w-16 h-0.5 bg-[#0F3B2E] mx-auto mt-4" />
        </div>

        {/* 2-Column Split Editorial Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Story 1 */}
          <div className="group relative bg-[#F5F2EB] overflow-hidden flex flex-col justify-between border border-[#E5E0D8]">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"
                alt="Florentine Bamboo Artistry"
                className="w-full h-full object-cover object-center zoom-effect"
              />
              <div className="absolute top-4 left-4 bg-[#0F3B2E] text-white text-[9px] tracking-[0.25em] uppercase font-semibold py-1 px-3">
                ARTISANAL REVOLUTION
              </div>
            </div>

            <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#737373]">
                  HISTORIC ATELIER 1947
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#111111] uppercase mt-2 mb-3">
                  THE SCULPTED BAMBOO
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                  Born from wartime ingenuity in post-war Florence, master artisans learned to soften natural bamboo over open flame to create curved, indestructible handles. Today, each handle is unique in color grain and curve.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                <button
                  onClick={() => onSelectCategory('handbags')}
                  className="text-xs tracking-[0.2em] uppercase font-semibold text-[#0F3B2E] hover:text-[#C5A059] flex items-center space-x-2 transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>EXPLORE BAMBOO BAGS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-[#737373] italic">Handmade in Italy</span>
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="group relative bg-[#F5F2EB] overflow-hidden flex flex-col justify-between border border-[#E5E0D8]">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-stone-200">
              <img
                src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85"
                alt="Bespoke Hot Stamping Personalization"
                className="w-full h-full object-cover object-center zoom-effect"
              />
              <div className="absolute top-4 left-4 bg-[#8B1E26] text-white text-[9px] tracking-[0.25em] uppercase font-semibold py-1 px-3">
                BESPOKE PRIVILEGE
              </div>
            </div>

            <div className="p-8 sm:p-10 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#737373]">
                  COMPLIMENTARY INITIAL EMBOSSING
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#111111] uppercase mt-2 mb-3">
                  YOUR INITIALS IN 24K GOLD FOIL
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                  Every IKIS handbag ordered online can be personalized with complimentary hot-stamping. Imprint your initials in gleaming gold leaf, palladium silver, or blind debossing for an heirloom masterpiece.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                <button
                  onClick={onOpenConcierge}
                  className="text-xs tracking-[0.2em] uppercase font-semibold text-[#0F3B2E] hover:text-[#C5A059] flex items-center space-x-2 transition-colors group-hover:translate-x-1 duration-300"
                >
                  <span>SPEAK WITH ATELIER ADVISOR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-[#737373] italic">Zero Surcharge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
