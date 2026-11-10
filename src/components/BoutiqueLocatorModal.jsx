import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Sparkles, CheckCircle2, Calendar } from 'lucide-react';
import { BOUTIQUES } from '../data/bagsData';

export default function BoutiqueLocatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedBoutique, setSelectedBoutique] = useState(BOUTIQUES[0]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [apptData, setApptData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '1'
  });

  const handleBookAppt = (e) => {
    e.preventDefault();
    setAppointmentBooked(true);
    setTimeout(() => {
      setAppointmentBooked(false);
      setShowAppointmentForm(false);
      setApptData({ name: '', phone: '', date: '', guests: '1' });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF8F5] w-full max-w-4xl shadow-2xl border border-[#E5E0D8] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F3B2E] text-white p-6 flex items-center justify-between border-b border-[#1A5341]">
          <div>
            <span className="text-xl sm:text-2xl font-cinzel tracking-[0.3em] font-semibold text-[#F5F2EB]">
              IKIS FLAGSHIP BOUTIQUES
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#C5A059] mt-0.5">
              INDIA • MUMBAI | NEW DELHI | BENGALURU
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* City Selector Pills */}
          <div className="flex border-b border-[#E5E0D8] pb-4 space-x-3 overflow-x-auto">
            {BOUTIQUES.map((b) => (
              <button
                key={b.city}
                onClick={() => {
                  setSelectedBoutique(b);
                  setShowAppointmentForm(false);
                }}
                className={`py-2 px-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all whitespace-nowrap rounded ${
                  selectedBoutique.city === b.city
                    ? 'bg-[#0F3B2E] text-white shadow'
                    : 'bg-[#F5F2EB] text-[#555555] hover:bg-[#EBE6DD]'
                }`}
              >
                {b.city} • {b.mall.split(',')[0]}
              </button>
            ))}
          </div>

          {/* Boutique Details Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6">
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#9E7E3C] font-semibold block mb-1">
                  OFFICIAL FLAGSHIP
                </span>
                <h3 className="text-2xl font-serif text-[#111111] uppercase">
                  IKIS {selectedBoutique.city}
                </h3>
                <h4 className="text-xs text-[#737373] uppercase tracking-wider mt-0.5">
                  {selectedBoutique.mall}
                </h4>
              </div>

              <div className="space-y-3 text-xs text-[#333333] pt-2">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#0F3B2E] flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{selectedBoutique.address}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-[#0F3B2E] flex-shrink-0" />
                  <a href={`tel:${selectedBoutique.phone}`} className="font-mono text-[#0F3B2E] hover:underline font-semibold">
                    {selectedBoutique.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-[#0F3B2E] flex-shrink-0" />
                  <span>{selectedBoutique.hours}</span>
                </div>
              </div>

              {/* In-Store Bespoke Services */}
              <div className="pt-4 border-t border-[#E5E0D8]">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#111111] font-semibold block mb-2">
                  COMPLIMENTARY BOUTIQUE SERVICES:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#555555]">
                  {selectedBoutique.services.map((srv, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <Sparkles className="w-3 h-3 text-[#C5A059]" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowAppointmentForm(!showAppointmentForm)}
                  className="bg-[#0F3B2E] hover:bg-[#1A5341] text-white px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-all shadow-md"
                >
                  {showAppointmentForm ? 'Close Appointment Booking' : 'Book Private VIP Viewing'}
                </button>
              </div>
            </div>

            {/* Right Map Image / Appointment Form */}
            <div className="md:col-span-5 bg-[#F5F2EB] p-5 border border-[#E5E0D8]">
              {showAppointmentForm ? (
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#111111] mb-1">
                    VIP Viewing Reservation
                  </h4>
                  <p className="text-[10px] text-[#737373] mb-4">
                    Enjoy champagne service and one-on-one styling with an IKIS Client Advisor.
                  </p>

                  {appointmentBooked ? (
                    <div className="p-4 bg-[#0F3B2E] text-white text-center rounded space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-[#C5A059] mx-auto" />
                      <div className="text-xs font-semibold uppercase tracking-wider">
                        Appointment Confirmed
                      </div>
                      <p className="text-[10px] text-white/80">
                        Our Senior Client Advisor will reach out 2 hours before your visit.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookAppt} className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-semibold text-[#111111] block mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={apptData.name}
                          onChange={(e) => setApptData({ ...apptData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-white border border-[#D9D3C7] p-2 text-xs outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-semibold text-[#111111] block mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={apptData.phone}
                          onChange={(e) => setApptData({ ...apptData, phone: e.target.value })}
                          placeholder="+91 98200 00000"
                          className="w-full bg-white border border-[#D9D3C7] p-2 text-xs outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-semibold text-[#111111] block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={apptData.date}
                          onChange={(e) => setApptData({ ...apptData, date: e.target.value })}
                          className="w-full bg-white border border-[#D9D3C7] p-2 text-xs outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#111111] hover:bg-[#0F3B2E] text-white py-2.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors mt-2"
                      >
                        CONFIRM APPOINTMENT
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="aspect-[4/3] bg-stone-200 overflow-hidden border border-[#D9D3C7]">
                    <img
                      src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85"
                      alt="Flagship Boutique Interior"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[11px] text-[#737373] italic text-center">
                    IKIS Haute Maroquinerie Salon • {selectedBoutique.city}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
