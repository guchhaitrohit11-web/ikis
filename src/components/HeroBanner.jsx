import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ShieldCheck, Gift, Truck } from 'lucide-react';

export default function HeroBanner({ onExploreClick, onBoutiqueClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      subtitle: 'SPRING / SUMMER 2026 FLORENTINE CAMPAIGN',
      title: 'THE IKIS 1955 HORSEBIT',
      desc: 'An enduring equestrian symbol reimagined in supple box calfskin with burnished antique gold hardware.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2000&q=85',
      primaryBtn: 'EXPLORE THE COLLECTION',
      secondaryBtn: 'THE HERITAGE STORY',
      accent: 'ICONIC SILHOUETTE'
    },
    {
      subtitle: 'FLORENCE ATELIER • MASTER CRAFTSMANSHIP',
      title: 'THE BAMBOO 1947 & DIANA',
      desc: 'Curved by hand over Florentine flames. No two handles alike. The pinnacle of Italian haute maroquinerie.',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=2000&q=85',
      primaryBtn: 'DISCOVER HANDBAGS',
      secondaryBtn: 'BOOK BOUTIQUE PREVIEW',
      accent: 'ARTISANAL RARITY'
    },
    {
      subtitle: 'HAUTE MAROQUINERIE FOR MODERN ROYALS',
      title: 'THE JACKIE 1961 HOBO',
      desc: 'Sculpted contours, signature piston lock clasp, and rich vegetable-tanned leathers in bold Florentine tones.',
      image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=2000&q=85',
      primaryBtn: 'SHOP SHOULDER BAGS',
      secondaryBtn: 'BESPOKE MONOGRAMMING',
      accent: 'TIMELESS GLAMOUR'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-[#0A1A14] mt-28 md:mt-32">
      {/* Background Campaign Visual */}
      <div className="relative h-[560px] sm:h-[640px] md:h-[720px] lg:h-[780px] w-full">
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
            />
            {/* Elegant Luxury Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
          </div>
        ))}

        {/* Campaign Editorial Copy Overlay */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 z-10">
          <div className="max-w-2xl text-white">
            {/* Tagline / Accent Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#FAF8F5]/10 backdrop-blur-md border border-[#C5A059]/40 py-1 px-3.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#EAD8B1] font-semibold">
                {slide.accent}
              </span>
            </div>

            <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#E5E0D8]/90 font-light mb-2">
              {slide.subtitle}
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-[0.08em] font-normal text-white uppercase leading-none drop-shadow-md">
              {slide.title}
            </h1>

            <p className="mt-4 text-xs sm:text-base text-[#FAF8F5]/80 font-light max-w-lg leading-relaxed hidden sm:block">
              {slide.desc}
            </p>

            {/* CTAs */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="bg-[#FAF8F5] text-[#111111] hover:bg-[#C5A059] hover:text-black transition-all duration-300 py-3.5 px-6 sm:px-8 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium flex items-center space-x-2 group shadow-xl"
              >
                <span>{slide.primaryBtn}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onBoutiqueClick}
                className="border border-[#FAF8F5]/60 hover:border-[#C5A059] text-white hover:text-[#C5A059] bg-black/20 backdrop-blur-sm transition-all duration-300 py-3.5 px-6 sm:px-8 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium"
              >
                {slide.secondaryBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center space-x-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-3 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/20 transition-all hover:border-[#C5A059]"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-white text-xs tracking-[0.25em] px-2 font-light">
            0{currentSlide + 1} / 0{slides.length}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="p-3 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-md border border-white/20 transition-all hover:border-[#C5A059]"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Gucci Signature Stripe Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 ikis-stripe z-20" />
      </div>

      {/* Luxury Value Pillars Banner (Auto responsive) */}
      <div className="bg-[#0F3B2E] border-t border-[#1A5341] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-[#F5F2EB]">
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <Truck className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase">Complimentary Delivery</p>
              <p className="text-[10px] text-[#FAF8F5]/70">Pan-India express white-glove</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <Gift className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase">Signature Gift Box</p>
              <p className="text-[10px] text-[#FAF8F5]/70">Emerald box & silk ribbon</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <ShieldCheck className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase">Certified Authentic</p>
              <p className="text-[10px] text-[#FAF8F5]/70">Florentine craftsmanship & RFID</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <Sparkles className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold tracking-[0.15em] uppercase">Rupees Pricing (₹)</p>
              <p className="text-[10px] text-[#FAF8F5]/70">All duties & 18% GST inclusive</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
