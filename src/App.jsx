import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CampaignStories from './components/CampaignStories';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import SearchModal from './components/SearchModal';
import WishlistDrawer from './components/WishlistDrawer';
import BoutiqueLocatorModal from './components/BoutiqueLocatorModal';
import ConciergeModal from './components/ConciergeModal';
import Footer from './components/Footer';
import { BAGS_DATA, CATEGORIES, formatRupees } from './data/bagsData';
import { SlidersHorizontal, ArrowUpDown, Sparkles, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation & Category
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  
  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [boutiquesOpen, setBoutiquesOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Cart State (Persisted in LocalStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ikis_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in LocalStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ikis_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const catalogRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('ikis_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ikis_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart Handlers
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => 
          item.id === productToAdd.id && 
          item.selectedColor === productToAdd.selectedColor &&
          JSON.stringify(item.monogram) === JSON.stringify(productToAdd.monogram)
      );

      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx].quantity += (productToAdd.quantity || 1);
        return next;
      } else {
        return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
      }
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (itemToUpdate, newQty) => {
    setCart((prev) => 
      prev.map((item) => {
        if (
          item.id === itemToUpdate.id &&
          item.selectedColor === itemToUpdate.selectedColor &&
          JSON.stringify(item.monogram) === JSON.stringify(itemToUpdate.monogram)
        ) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prev) => 
      prev.filter((item) => !(
        item.id === itemToRemove.id &&
        item.selectedColor === itemToRemove.selectedColor &&
        JSON.stringify(item.monogram) === JSON.stringify(itemToRemove.monogram)
      ))
    );
  };

  // Instant Buy from modal
  const handleInstantBuy = (product) => {
    setQuickViewProduct(null);
    setCheckoutData({
      items: [{ ...product, quantity: 1 }],
      subtotal: product.price,
      discountAmount: 0,
      finalTotal: product.price,
      giftBox: true,
      giftNote: ''
    });
    setCheckoutOpen(true);
  };

  // Proceed to Checkout from Cart
  const handleProceedCheckout = (data) => {
    setCartOpen(false);
    setCheckoutData(data);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    // Clear cart once order is confirmed
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...BAGS_DATA];

    if (activeCategory !== 'all') {
      list = list.filter((b) => b.category === activeCategory);
    }

    if (selectedMaterial !== 'all') {
      list = list.filter((b) => b.material.toLowerCase().includes(selectedMaterial.toLowerCase()));
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, sortBy, selectedMaterial]);

  const scrollToCatalog = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    scrollToCatalog();
  };

  const cartTotal = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] flex flex-col font-sans selection:bg-[#0F3B2E] selection:text-white">
      {/* Gucci-style Luxury Top Navigation */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBoutiques={() => setBoutiquesOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Hero Campaign Banner */}
      <HeroBanner
        onExploreClick={scrollToCatalog}
        onBoutiqueClick={() => setBoutiquesOpen(true)}
      />

      {/* Editorial Split Stories */}
      <CampaignStories
        onSelectCategory={handleSelectCategory}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Bags Catalog Section */}
      <section ref={catalogRef} className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        {/* Collection Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E0D8] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] tracking-[0.3em] uppercase text-[#9E7E3C] font-semibold mb-1">
              <Sparkles className="w-3 h-3" />
              <span>OFFICIAL CATALOGUE • SETTLED IN ₹ INR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-[0.05em] text-[#111111] font-normal">
              {CATEGORIES.find((c) => c.id === activeCategory)?.name || 'ALL BAGS'}
            </h2>
            <p className="text-xs text-[#737373] mt-1 font-light">
              Showing {filteredProducts.length} certified handcrafted pieces with complimentary delivery across India
            </p>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-white border border-[#D9D3C7] px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#737373]" />
              <label htmlFor="sort-select" className="text-[10px] uppercase tracking-wider text-[#737373]">Sort By:</label>
              <select
                id="sort-select"
                aria-label="Sort bags by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-medium text-[#111111] outline-none cursor-pointer"
              >
                <option value="featured">Featured Heritage</option>
                <option value="price-asc">Price: Low to High (₹)</option>
                <option value="price-desc">Price: High to Low (₹)</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Quick Category filter buttons on mobile/tablet */}
            <div className="flex items-center space-x-1 overflow-x-auto py-1 md:hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-[10px] tracking-wider uppercase px-2.5 py-1.5 border whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-[#0F3B2E] text-white border-[#0F3B2E]'
                      : 'bg-white text-[#555555] border-[#D9D3C7]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Product Grid: auto adjusts for mobile (1-2), laptop (3-4), tabs (2-3) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E5E0D8] p-8">
            <h3 className="text-lg font-serif uppercase tracking-widest text-[#111111]">
              No creations found in this category
            </h3>
            <p className="text-xs text-[#737373] mt-2">
              Please view our All Collections or contact our Client Advisor for bespoke atelier sourcing.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-6 bg-[#0F3B2E] text-white px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold"
            >
              VIEW ALL BAGS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={(prod) => setQuickViewProduct(prod)}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* Luxury Client Reassurance Section */}
      <section className="bg-[#F5F2EB] border-y border-[#E5E0D8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
              <div className="w-12 h-12 bg-[#0F3B2E] text-[#C5A059] flex items-center justify-center rounded-full flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                  FLORENTINE ORIGIN & AUTHENTICITY
                </h4>
                <p className="text-xs text-[#666666] mt-1 font-light leading-relaxed">
                  Every IKIS handbag is created in our Tuscan ateliers using certified full-grain leathers, equipped with encrypted RFID microchips and physical certificates of authenticity.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
              <div className="w-12 h-12 bg-[#0F3B2E] text-[#C5A059] flex items-center justify-center rounded-full flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                  WHITE-GLOVE CONCIERGE (₹ INR)
                </h4>
                <p className="text-xs text-[#666666] mt-1 font-light leading-relaxed">
                  Prices include all customs duties and 18% GST. Hand-delivered in our signature emerald gift box with sealed satin ribbons and personalized embossed card.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
              <div className="w-12 h-12 bg-[#0F3B2E] text-[#C5A059] flex items-center justify-center rounded-full flex-shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111]">
                  2-YEAR LEATHER SPA PRIVILEGE
                </h4>
                <p className="text-xs text-[#666666] mt-1 font-light leading-relaxed">
                  Complimentary leather cleaning, nourishing, and hardware restoration available at our flagship boutiques in Mumbai (Jio World Plaza), New Delhi, and Bengaluru.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Client Advisor Trigger (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end space-y-2">
        <button
          onClick={() => setConciergeOpen(true)}
          className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white py-3 px-4 shadow-2xl flex items-center space-x-2.5 transition-all duration-300 border border-[#C5A059]/40 hover:scale-105"
          aria-label="Client Concierge"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-[#C5A059]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#F5F2EB]">
              IKIS CONCIERGE
            </span>
            <span className="text-[9px] text-[#C5A059]">Live Advisor</span>
          </div>
        </button>
      </div>

      {/* Mobile Sticky Order Bar when Cart has items */}
      {cartCount > 0 && !cartOpen && !checkoutOpen && (
        <div className="sm:hidden fixed bottom-0 left-0 w-full bg-[#111111] text-white p-3 z-30 border-t border-[#C5A059]/40 flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-semibold tracking-wider">
              {cartCount} {cartCount === 1 ? 'PIECE' : 'PIECES'} IN BAG
            </span>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="bg-[#0F3B2E] text-white px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold flex items-center space-x-1.5"
          >
            <span>VIEW BAG • {formatRupees(cartTotal)}</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer
        onOpenBoutiques={() => setBoutiquesOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setQuickViewProduct(null);
        }}
        onInstantBuy={handleInstantBuy}
        isWishlisted={quickViewProduct ? wishlist.some((w) => w.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={handleProceedCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderSuccess={handleOrderSuccess}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={handleAddToCart}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
      />

      <BoutiqueLocatorModal
        isOpen={boutiquesOpen}
        onClose={() => setBoutiquesOpen(false)}
      />

      <ConciergeModal
        isOpen={conciergeOpen}
        onClose={() => setConciergeOpen(false)}
      />
    </div>
  );
}
