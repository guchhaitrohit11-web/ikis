import React, { useState } from 'react';
import { X, Send, Sparkles, Phone, MessageSquare, Bot, User, Clock, Check } from 'lucide-react';

export default function ConciergeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      sender: 'advisor',
      text: 'Good day. Welcome to the IKIS Private Client Suite. I am Marco, your personal Florentine client advisor. How may I assist your handbag selection or boutique experience today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'How do I customize my bag with 24K gold foil initials?',
    'What are the payment options in Indian Rupees (₹)?',
    'How fast is White-Glove delivery in India?',
    'Which bag fits a laptop for everyday elegance?'
  ];

  const handleSend = (userQuery) => {
    const textToSend = userQuery || inputText;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'client', text: textToSend }];
    setMessages(newMsgs);
    if (!userQuery) setInputText('');

    setTimeout(() => {
      let response = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('gold') || lower.includes('initial') || lower.includes('monogram') || lower.includes('foil')) {
        response = 'Our bespoke hot-stamping service is completely complimentary! You can select up to 3 initials in 24K Gold Leaf, Palladium Silver, or Blind Deboss directly on the bag page before adding to your bag.';
      } else if (lower.includes('rupee') || lower.includes('inr') || lower.includes('payment') || lower.includes('cod')) {
        response = 'All IKIS pieces are priced strictly in Indian Rupees (₹ INR) with all customs import duties and 18% GST fully included. We accept UPI (Google Pay, PhonePe, Paytm), Credit Cards (Visa, Amex, Master, RuPay), NetBanking, and VIP Cash on Delivery with phone verification.';
      } else if (lower.includes('delivery') || lower.includes('fast') || lower.includes('shipping') || lower.includes('pincode')) {
        response = 'Every order enjoys Complimentary Pan-India White-Glove Express Courier. Deliveries across metropolitan hubs (Mumbai, Delhi NCR, Bengaluru) take 24–48 hours, and 3–4 business days across all other Indian PIN codes in tamper-proof seal packaging.';
      } else if (lower.includes('laptop') || lower.includes('work') || lower.includes('tote')) {
        response = 'The IKIS Diana Medium Tote and the IKIS Ophidia Webbing Tote both comfortably house laptops up to 13–14 inches alongside your tablet, makeup pouch, and daily diary.';
      } else {
        response = 'Thank you for your inquiry. Your request has been relayed to our Senior Client Director at our Mumbai flagship (Jio World Plaza). We would be delighted to arrange a private appointment or provide personalized styling guidance at your convenience.';
      }

      setMessages(prev => [...prev, { sender: 'advisor', text: response }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-[#FAF8F5] w-full max-w-2xl shadow-2xl border border-[#E5E0D8] overflow-hidden my-auto flex flex-col h-[650px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F3B2E] text-white p-5 flex items-center justify-between border-b border-[#1A5341]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059] text-[#0F3B2E] flex items-center justify-center font-bold font-cinzel text-lg shadow">
              IK
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#F5F2EB]">
                  IKIS CLIENT CONCIERGE
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] tracking-wider text-[#C5A059] block">
                Live Advisor • Florence & Mumbai Flagship
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF8F5]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3.5 text-xs leading-relaxed ${
                  m.sender === 'client'
                    ? 'bg-[#0F3B2E] text-white rounded-t-lg rounded-bl-lg'
                    : 'bg-[#F0ECE1] text-[#111111] border border-[#E0DACE] rounded-t-lg rounded-br-lg'
                }`}
              >
                {m.sender === 'advisor' && (
                  <div className="text-[9px] text-[#9E7E3C] uppercase tracking-wider font-semibold mb-1 flex items-center space-x-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Client Advisor</span>
                  </div>
                )}
                <p>{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#F5F2EB] border-t border-[#E5E0D8] overflow-x-auto whitespace-nowrap space-x-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-[10px] bg-white border border-[#D9D3C7] hover:border-[#0F3B2E] text-[#444444] px-2.5 py-1 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-[#E5E0D8]">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }} 
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about bag sizing, leathers, delivery across India..."
              className="flex-1 bg-[#FAF8F5] border border-[#D9D3C7] px-4 py-2.5 text-xs outline-none focus:border-[#0F3B2E]"
            />
            <button
              type="submit"
              className="bg-[#0F3B2E] text-white hover:bg-[#1A5341] p-2.5 transition-colors"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4 text-[#C5A059]" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-[#737373] mt-2 px-1">
            <span>Direct Client Advisor Line: +91 (22) 6982 7000</span>
            <span>10:00 AM – 10:00 PM IST</span>
          </div>
        </div>
      </div>
    </div>
  );
}
