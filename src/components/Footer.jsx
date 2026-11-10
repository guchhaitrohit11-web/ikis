import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, MapPin, Sparkles, Heart } from 'lucide-react';

export default function Footer({ onOpenBoutiques, onOpenConcierge, onSelectCategory }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#111111] text-[#FAF8F5] pt-16 sm:pt-20 pb-12 border-t-4 border-[#0F3B2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup (Gucci editorial aesthetic) */}
        <div className="border-b border-white/10 pb-12 mb-12 text-center max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C5A059] font-semibold block mb-2">
            PRIVATE CLIENT INVITATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif tracking-[0.06em] text-white uppercase font-normal">
            SIGN UP FOR IKIS DISPATCHES
          </h3>
          <p className="text-xs text-white/60 font-light mt-2 max-w-md mx-auto leading-relaxed">
            Receive exclusive invitations to private salon presentations, seasonal bag drops, and bespoke atelier appointments.
          </p>

          <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md mx-auto border-b border-white/30 focus-within:border-[#C5A059] transition-colors pb-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL ADDRESS"
              className="bg-transparent flex-1 text-xs tracking-[0.2em] uppercase text-white placeholder:text-white/40 outline-none py-2 px-1"
            />
            <button
              type="submit"
              className="text-xs tracking-[0.25em] uppercase font-semibold text-[#C5A059] hover:text-white px-3 py-2 transition-colors flex items-center space-x-1"
            >
              <span>{subscribed ? 'REGISTERED' : 'SUBSCRIBE'}</span>
              {subscribed && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </form>

          {subscribed && (
            <p className="text-[10px] text-emerald-400 tracking-wider mt-2">
              Welcome to the IKIS Circle. Our client portfolio has been updated.
            </p>
          )}
        </div>

        {/* 4 Column Directory Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10 text-xs">
          {/* Col 1: May We Help You */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C5A059] font-semibold mb-4">
              MAY WE HELP YOU?
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <button onClick={onOpenConcierge} className="hover:text-white transition-colors">
                  Contact Client Advisors
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Track Consignment Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Complimentary Shipping & Returns
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Italian Leather Spa & Care
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Authentication & RFID Chips
                </span>
              </li>
            </ul>
          </div>

          {/* Col 2: The House of IKIS */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C5A059] font-semibold mb-4">
              THE HOUSE OF IKIS
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Florentine Heritage (1921)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Tuscan Leather Ateliers
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainable Sourcing & Ethics
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  The Bamboo 1947 Archive
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Exhibitions & Runway
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Services */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C5A059] font-semibold mb-4">
              SIGNATURE SERVICES
            </h4>
            <ul className="space-y-2.5 text-white/70">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  24K Gold Leaf Hot-Stamping
                </span>
              </li>
              <li>
                <button onClick={onOpenBoutiques} className="hover:text-white transition-colors">
                  Private Salon Appointments
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Bespoke Made-to-Order Handles
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Signature Emerald Packaging
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  VIP Corporate Gifting
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: India Boutiques & Currency */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-[#C5A059] font-semibold mb-4">
              BOUTIQUE NETWORK
            </h4>
            <div className="space-y-3 text-white/70">
              <div>
                <strong className="text-white block">MUMBAI</strong>
                <p className="text-[11px]">Jio World Plaza, BKC • +91 (22) 6982 7000</p>
              </div>
              <div>
                <strong className="text-white block">NEW DELHI</strong>
                <p className="text-[11px]">DLF Emporio, Vasant Kunj • +91 (11) 4610 8800</p>
              </div>
              <div>
                <strong className="text-white block">BENGALURU</strong>
                <p className="text-[11px]">UB City, Vittal Mallya Road • +91 (80) 4173 9900</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBoutiques}
                  className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#C5A059] hover:underline"
                >
                  VIEW ALL BOUTIQUE DETAILS →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Bar & Official Currency Information */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-white/50 text-[10px] tracking-[0.15em] space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="font-cinzel text-lg tracking-[0.3em] font-semibold text-white">
              IKIS
            </span>
            <span>•</span>
            <span>SETTLEMENT CURRENCY: <strong>INDIAN RUPEES (₹ INR)</strong></span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">TERMS OF SALE</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">GST COMPLIANCE</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">COOKIE SETTINGS</span>
          </div>

          <div className="text-center md:text-right">
            © 2026 IKIS S.p.A. ALL RIGHTS RESERVED. HAUTE MAROQUINERIE.
          </div>
        </div>
      </div>
    </footer>
  );
}
