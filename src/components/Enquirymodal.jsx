
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Send, CheckCircle2, Package, User, Phone, Mail, Boxes,
  MessageSquare, Tag, ShieldCheck, Palette, Truck,
} from 'lucide-react';


/**
 * EnquiryModal — "Spool & Seam" layout
 * ------------------------------------------------------------------
 * v2 — Image sizing fix + polish pass:
 *
 *   1. IMAGE FIX (the actual bug): the old version forced the product
 *      photo into a short fixed-height box (h-36 → h-56) with
 *      object-cover, which zoomed/cropped thread & spool photos
 *      unpredictably — sometimes cutting off half the product.
 *      Now it uses the SAME aspect-ratio + object-contain pattern as
 *      the Products grid (ProductImage), on a soft tinted backdrop,
 *      so the *entire* photo is always visible, never cropped, and
 *      scales cleanly at every breakpoint.
 *
 *   2. Because object-contain no longer guarantees a dark region for
 *      white overlay text, the title/category block has been moved
 *      OFF the image and into its own header strip below it — more
 *      reliable for legibility and reads as more "premium catalog",
 *      less "poster overlay".
 *
 *   3. Added the same shimmer loading state used on the Products page
 *      for visual consistency between grid → modal.
 *
 *   4. Kept the hand-stitched "seam" divider (unique brand touch for
 *      a thread business) and the amber/stone palette, tightened
 *      spacing and focus states throughout.
 *
 * Props:
 * - product   : { id, name, img, desc, cat, price?, rating? } | null
 * - isOpen    : boolean
 * - onClose   : () => void
 */

// Kept in sync with the category ids used in Products.jsx
const CATEGORY_LABELS = {
  cording: 'Cording Threads',
  jari: 'Zari (Jari) Threads',
  nylon: 'Nylon Threads',
};

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: 'Premium, colorfast material' },
  { icon: Boxes, label: 'Bulk orders welcome' },
  { icon: Palette, label: 'Custom shades on request' },
  { icon: Truck, label: 'Pan-India shipping' },
];

// Local, dependency-free fallback — matches the one used on the Products
// grid, so a broken/missing product photo never shows a blank box here either.
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFFBEB'/%3E%3Ccircle cx='200' cy='120' r='40' fill='none' stroke='%23D97706' stroke-width='3' opacity='0.4'/%3E%3Cpath d='M170 140 L200 110 L230 140' fill='none' stroke='%23D97706' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='0.4'/%3E%3Ctext x='200' y='190' font-family='sans-serif' font-size='15' fill='%23D97706' text-anchor='middle' opacity='0.6'%3EPhoto coming soon%3C/text%3E%3C/svg%3E"

// ----------------------------------------------------------------------------
// Product image for the modal — aspect-ratio box, object-contain, shimmer.
// Never crops. Mirrors ProductImage from Products.jsx for consistency.
// ----------------------------------------------------------------------------
const ModalProductImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  // Reset the loaded state whenever the image source changes (new product)
  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] overflow-hidden bg-gradient-to-br from-amber-50 to-stone-100">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 bg-[length:200%_100%] animate-[enq-shimmer_1.6s_ease-in-out_infinite]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.35s ease' }}
        className="absolute inset-0 h-full w-full object-contain p-5 sm:p-6"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMG;
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default function EnquiryModal({ product, isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', quantity: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', phone: '', email: '', quantity: '', message: '' });
      setStatus('idle');
      const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen, product]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const API_BASE = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: `Product Enquiry: ${product.name}`,
          message: `Product: ${product.name}\nQuantity needed: ${form.quantity || 'N/A'}\n\n${form.message}`,
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch (err) {
      console.error('Enquiry submit failed:', err);
      setStatus('error');
    }
  };

  const inputClass =
    'w-full pl-9 pr-3 py-2 rounded-lg border border-stone-200 bg-stone-50 ' +
    'focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none transition-all ' +
    'text-[13px] text-stone-900 placeholder:text-stone-400';

  const modalContent = (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <style>{`
        @keyframes enquiryFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes enquiryPopIn { from { transform: scale(0.97) translateY(10px); opacity: 0.6; } to { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes enq-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .enquiry-fade { animation: enquiryFadeIn 0.2s ease-out; }
        .enquiry-pop { animation: enquiryPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

        .enquiry-desc-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Scrollable panel — thin, on-brand scrollbar instead of the browser default */
        .enquiry-scroll { scrollbar-width: thin; scrollbar-color: #D97706 transparent; }
        .enquiry-scroll::-webkit-scrollbar { width: 6px; }
        .enquiry-scroll::-webkit-scrollbar-track { background: transparent; }
        .enquiry-scroll::-webkit-scrollbar-thumb { background: #D97706; border-radius: 9999px; }

        /* The seam: a hand-stitched dashed line between the two columns,
           two offset dash-runs in gold + cream to read as twin threads. */
        .enquiry-seam-v { position: absolute; top: 0; bottom: 0; left: 0; width: 3px; }
        .enquiry-seam-v .thread-a { position: absolute; inset: 0; left: 0; width: 1.5px;
          background: repeating-linear-gradient(180deg, #D97706 0 7px, transparent 7px 15px); }
        .enquiry-seam-v .thread-b { position: absolute; inset: 0; left: 1.5px; width: 1.5px;
          background: repeating-linear-gradient(180deg, transparent 0 7px, #FCD34D 7px 15px); }

        .enquiry-seam-h { position: relative; height: 3px; width: 100%; flex-shrink: 0; }
        .enquiry-seam-h .thread-a { position: absolute; inset: 0; top: 0; height: 1.5px;
          background: repeating-linear-gradient(90deg, #D97706 0 7px, transparent 7px 15px); }
        .enquiry-seam-h .thread-b { position: absolute; inset: 0; top: 1.5px; height: 1.5px;
          background: repeating-linear-gradient(90deg, transparent 0 7px, #FCD34D 7px 15px); }

        .enquiry-bobbin {
          width: 22px; height: 22px; border-radius: 9999px;
          background: radial-gradient(circle at 35% 30%, #FCD34D, #D97706 55%, #92400E 100%);
          box-shadow: 0 0 0 3px #FFFFFF, 0 1px 3px rgba(41,37,36,0.25);
        }
        .enquiry-bobbin::after {
          content: ''; position: absolute; inset: 6px; border-radius: 9999px;
          border: 1.5px dashed rgba(217,119,6,0.55);
        }

        @media (prefers-reduced-motion: reduce) {
          .enquiry-fade, .enquiry-pop { animation: none; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm enquiry-fade"
        onClick={onClose}
      />

      {/* Close button — fixed to the viewport corner (a sibling of the scrollable
          panel below), so it stays reachable no matter how far the form scrolls. */}
      <button
        onClick={onClose}
        aria-label="Close enquiry form"
        className="fixed top-4 right-4 sm:top-5 sm:right-5 z-[1000] w-9 h-9 flex items-center justify-center rounded-full
                   bg-white shadow-md hover:bg-stone-100 active:bg-stone-200 text-stone-600
                   transition-all hover:rotate-90 duration-300
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
      >
        <X size={16} />
      </button>

      {/* Modal panel — equal 50/50 columns from md upward. Capped at 92vh and
          scrolls internally (enquiry-scroll) instead of clipping content. */}
      <div
        ref={dialogRef}
        className="enquiry-scroll relative w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
                   bg-white rounded-2xl sm:rounded-[28px] shadow-2xl
                   ring-1 ring-stone-200
                   max-h-[92vh] overflow-y-auto
                   flex flex-col md:flex-row md:items-stretch enquiry-pop"
      >
        {status === 'success' ? (
          /* ---------- Success state ---------- */
          <div
            className="w-full p-8 sm:p-12 text-center m-auto"
            role="status"
            aria-live="polite"
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-stone-900 mb-2">Enquiry sent</h3>
            <p className="text-stone-500 text-sm mb-7 leading-relaxed">
              Thanks for your interest in <strong className="text-stone-700">{product.name}</strong>.
              <br />Our team will get back to you shortly.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-2.5 rounded-full bg-amber-600 text-white text-sm font-semibold
                         hover:bg-amber-700 transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* ================= LEFT: product panel ================= */}
            <div className="relative md:w-1/2 flex-shrink-0 flex flex-col bg-white text-stone-800">
              {/* Vertical bobbin mark, sits on the seam (desktop only) */}
              <div className="hidden md:flex absolute -right-[11px] top-6 z-20 items-center justify-center enquiry-bobbin" />

              {/* Image — full photo always visible, no cropping */}
              <ModalProductImage src={product.img} alt={product.name} />

              {/* Title + category — moved below the image for reliable
                  legibility now that the photo isn't cropped/zoomed */}
              <div className="px-4 sm:px-5 pt-3.5 pb-1">
                {product.cat && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mb-1.5">
                    <Tag size={10} /> {CATEGORY_LABELS[product.cat] || product.cat}
                  </span>
                )}
                <h3
                  id="enquiry-modal-title"
                  className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight flex items-center gap-2"
                >
                  <Package size={16} className="text-amber-600 flex-shrink-0" />
                  {product.name}
                </h3>
              </div>

              {/* Description / highlights */}
              <div className="p-4 sm:p-5 pt-2">
                {product.desc && (
                  <p className="enquiry-desc-clamp text-stone-600 text-xs md:text-[13px] leading-relaxed mb-3">
                    {product.desc}
                  </p>
                )}

                <div className="border-t border-stone-100 pt-3">
                  <p className="text-[10px] font-semibold text-stone-500 uppercase tracking-[0.12em] mb-2">
                    Why buy from us
                  </p>
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
                    {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-start gap-1.5 text-[11px] md:text-xs text-stone-600">
                        <span className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                          <Icon size={11} className="text-amber-600" />
                        </span>
                        <span className="pt-0.5 leading-snug">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Seam divider — horizontal stitch on mobile, vertical on desktop */}
            <div className="enquiry-seam-h md:hidden">
              <div className="thread-a" />
              <div className="thread-b" />
            </div>
            <div className="hidden md:block relative">
              <div className="enquiry-seam-v">
                <div className="thread-a" />
                <div className="thread-b" />
              </div>
            </div>

            {/* ================= RIGHT: form panel ================= */}
            <div className="md:w-1/2 bg-white flex flex-col">
              <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-2.5 sm:space-y-3 flex-1 flex flex-col">
                <p className="text-[10px] font-semibold text-stone-500 uppercase tracking-[0.12em]">
                  Your Details
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="name" className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
                      <input
                        ref={firstFieldRef}
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      inputMode="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Quantity Required
                  </label>
                  <div className="relative">
                    <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 kg"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-semibold text-stone-600 mb-1">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-2.5 text-stone-400 pointer-events-none" size={14} />
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Any specific requirements..."
                      className={`${inputClass} resize-none py-2`}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p
                    role="alert"
                    className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2"
                  >
                    Something went wrong. Please try again or contact us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-full
                             bg-amber-600 text-white text-sm font-semibold
                             hover:bg-amber-700 transition-colors
                             disabled:opacity-60 disabled:cursor-not-allowed
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Enquiry <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}