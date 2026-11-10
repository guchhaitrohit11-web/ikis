import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  MapPin, 
  PhoneCall, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { CATEGORIES, formatRupees } from '../data/bagsData';

export default function Header({
  activeCategory,
  onSelectCategory,
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenSearch,
  onOpenBoutiques,
  onOpenConcierge
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    "COMPLIMENTARY WHITE-GLOVE EXPRESS DELIVERY ACROSS ALL PIN CODES IN INDIA",
    "SIGNATURE IKIS GIFT BOX & HANDWRITTEN EMBOSSED NOTE INCLUDED WITH EVERY ORDER",
    "PERSONALIZED COMPLIMENTARY GOLD-FOIL INITIAL HOT STAMPING ON SELECTED LEATHERS",
    "PRIVATE BOUTIQUE APPOINTMENTS NOW AVAILABLE IN MUMBAI, NEW DELHI & BENGALURU"
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <header className="w-full fixed top-0 left-0 z-40 transition-all duration-300">
      {/* Top Luxury Announcement Banner */}
      <div className="bg-[#0F3B2E] text-[#F5F2EB] text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium py-2 px-4 border-b border-[#1A5341] flex items-center justify-between">
        <div className="hidden lg:flex items-center space-x-2 text-[#C5A059]">
          <Sparkles className="w-3 h-3" />
          <span>IKIS HAUTE MAROQUINERIE</span>
        </div>

        <div className="mx-auto text-center font-normal transition-opacity duration-500 max-w-2xl truncate">
          {announcements[announcementIndex]}
        </div>

        <div className="hidden lg:flex items-center space-x-4 text-[10px]">
          <span className="text-[#C5A059] font-medium">CURRENCY: ₹ INR</span>
          <span className="text-[#E5E0D8]/40">|</span>
          <button 
            onClick={onOpenConcierge}
            className="hover:text-[#C5A059] transition-colors flex items-center space-x-1"
          >
            <PhoneCall className="w-3 h-3 text-[#C5A059]" />
            <span>CLIENT ADVISOR</span>
          </button>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E5E0D8]' 
            : 'bg-[#FAF8F5] border-b border-[#EAE5DD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Nav Actions */}
            <div className="flex items-center space-x-2 md:space-x-6 flex-1">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#0F3B2E] p-2 transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
                <span className="hidden sm:inline">Menu</span>
              </button>

              <button 
                onClick={onOpenSearch}
                className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#0F3B2E] p-2 transition-colors"
                aria-label="Search Collection"
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline">Search</span>
              </button>

              <button 
                onClick={onOpenBoutiques}
                className="hidden lg:flex items-center space-x-1.5 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#0F3B2E] p-2 transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span>Boutiques</span>
              </button>
            </div>

            {/* Center Brand Identity (Gucci Typography Proportions) */}
            <div className="text-center flex-shrink-0 cursor-pointer" onClick={() => onSelectCategory('all')}>
              <div className="group inline-block">
                <span className="text-3xl sm:text-4xl md:text-5xl font-cinzel tracking-[0.35em] text-[#111111] font-semibold block transition-transform group-hover:scale-[1.02]">
                  IKIS
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.45em] uppercase text-[#737373] block mt-0.5">
                  FIRENZE • EST. 1921
                </span>
              </div>
            </div>

            {/* Right Nav Actions (Rupees, Wishlist, Bag Drawer) */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-4 md:space-x-6 flex-1">
              <button 
                onClick={onOpenConcierge}
                className="hidden xl:flex items-center space-x-1.5 text-xs uppercase tracking-[0.15em] text-[#737373] hover:text-[#0F3B2E] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Services</span>
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={onOpenWishlist}
                className="relative p-2 text-[#111111] hover:text-[#0F3B2E] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#8B1E26] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Drawer Trigger */}
              <button 
                onClick={onOpenCart}
                className="relative flex items-center space-x-2 py-2 px-2.5 sm:px-3 border border-[#111111] hover:bg-[#111111] hover:text-[#FAF8F5] transition-all group"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#0F3B2E] text-[#F5F2EB] group-hover:bg-[#C5A059] group-hover:text-[#111111] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-[10px] tracking-[0.15em] uppercase font-semibold">BAG</span>
                  {cartTotal > 0 && (
                    <span className="text-[11px] font-medium text-[#C5A059] group-hover:text-[#F5F2EB] leading-none mt-0.5">
                      {formatRupees(cartTotal)}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Category Bar */}
        <div className="hidden md:block border-t border-[#EAE5DD] bg-[#FAF8F5]/80">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center space-x-6 lg:space-x-10 py-2.5 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-[11px] tracking-[0.25em] uppercase font-medium transition-all py-1 border-b-2 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'border-[#0F3B2E] text-[#0F3B2E] font-semibold'
                    : 'border-transparent text-[#555555] hover:text-[#111111] hover:border-[#C5A059]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Full Screen Slide Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Top drawer header */}
            <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between bg-[#F5F2EB]">
              <div>
                <span className="text-2xl font-cinzel tracking-[0.3em] font-semibold text-[#111111]">
                  IKIS
                </span>
                <p className="text-[9px] tracking-[0.25em] text-[#737373] uppercase">
                  Flagship Boutique Selection
                </p>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#111111] hover:text-[#8B1E26] rounded-full hover:bg-white/60 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Search inside Mobile Menu */}
            <div className="p-6 border-b border-[#E5E0D8]">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between p-3.5 bg-white border border-[#DCD6CA] text-xs tracking-[0.15em] text-[#737373] uppercase rounded hover:border-[#0F3B2E] transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-[#C5A059]" />
                  <span>Search bags, codes, colors...</span>
                </span>
                <span className="text-[10px] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5E0D8]">₹ INR</span>
              </button>
            </div>

            {/* Categories List */}
            <div className="py-4 px-6 flex-1">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E7E3C] font-semibold block mb-3">
                COLLECTIONS & STYLES
              </span>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-3 px-3 flex items-center justify-between text-sm tracking-[0.18em] uppercase transition-colors rounded ${
                        activeCategory === cat.id
                          ? 'bg-[#0F3B2E] text-white font-medium'
                          : 'text-[#222222] hover:bg-[#F0ECE1]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Curated Special Services */}
              <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#9E7E3C] font-semibold block mb-3">
                  CLIENT HOSPITALITY
                </span>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBoutiques();
                    }}
                    className="w-full flex items-center space-x-3 text-xs tracking-[0.15em] uppercase text-[#222222] hover:text-[#0F3B2E] p-2 hover:bg-[#F0ECE1] rounded transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium">Flagship Boutiques</div>
                      <div className="text-[10px] tracking-normal text-[#737373] capitalize">Mumbai (BKC) • Delhi (DLF) • Bengaluru</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenConcierge();
                    }}
                    className="w-full flex items-center space-x-3 text-xs tracking-[0.15em] uppercase text-[#222222] hover:text-[#0F3B2E] p-2 hover:bg-[#F0ECE1] rounded transition-colors text-left"
                  >
                    <PhoneCall className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <div className="font-medium">Private Client Concierge</div>
                      <div className="text-[10px] tracking-normal text-[#737373] capitalize">Direct VIP Assistance & Bespoke Orders</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Footer Status */}
            <div className="p-6 bg-[#0F3B2E] text-[#FAF8F5] text-xs">
              <div className="flex items-center space-x-2 text-[#C5A059] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="tracking-[0.15em] uppercase text-[10px] font-semibold">100% Certified Authentic</span>
              </div>
              <p className="text-[11px] text-[#FAF8F5]/80 font-light leading-relaxed">
                Handcrafted Italian leather accessories delivered safely with White-Glove verification.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
