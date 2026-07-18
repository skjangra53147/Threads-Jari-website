
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Phone,
  MessageCircle,
  Award,
  Settings,
  Truck,
  Users,
} from 'lucide-react';

// ----------------------------------------------------------------------------
// Contact numbers — keep identical to Navbar.jsx / Contact.jsx / CTABanner.jsx
// so the whole site stays consistent.
// ----------------------------------------------------------------------------
const PRIMARY_PHONE = '+91 97288 25494';
const WHATSAPP_NUMBER = '919728825494'; // digits only, for the wa.me link

// Full-bleed background-image slides
const SLIDES = [
  {
    eyebrow: 'Welcome To',
    titleLine1: 'Shree Narayani',
    titleLine2: 'Thread & Jari',
    description:
      'Manufacturer of Premium Fancy Cording Dori, Metallic Yarn & Jari',
    image: '/images/image7.png',
  },
 {
  eyebrow: "India's Leading Thread & Jari Brand",
  titleLine1: "Premium Quality",
  titleLine2: "Threads & Jari",
  description:
    "Delivering world-class thread and jari solutions with unmatched quality, precision, and trusted service across India.",
  image: "/images/image10.png",
},
  {
    eyebrow: 'Made To Match',
    titleLine1: 'Custom Color',
    titleLine2: 'Matching Available',
    description:
      "Share your reference swatch or Pantone code — we'll match it precisely",
    image: '/images/image15.png',
  },
];

const FEATURES = [
  { icon: Award, title: 'Premium Quality', desc: 'Finest quality raw material and perfect finish.' },
  { icon: Settings, title: 'Modern Machinery', desc: 'Advanced machines for smooth production.' },
  { icon: Truck, title: 'Timely Delivery', desc: 'On-time delivery with safe packaging.' },
  { icon: Users, title: 'Customer Satisfaction', desc: 'Customer trust is our strength.' },
];

const SLIDE_INTERVAL = 6000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  // Auto-advance, paused on hover/focus/touch so it never fights the user
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  // Keyboard navigation (left / right arrow keys) while the hero is focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
  };

  // Basic swipe support on mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goPrev() : goNext();
    }
    touchStartX.current = null;
  };

  const slide = SLIDES[current];

  return (
    <section
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Shree Narayani Thread & Jari highlights"
    >
      {/* ============ HERO SLIDER ============ */}
      {/* min-h + generous py (instead of a fixed px height) so long content,
          small screens, or big system fonts never get clipped. */}
      <div className="relative w-full min-h-[600px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px] overflow-hidden bg-amber-100">
        {/* Stacked background images, cross-fading between slides */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            aria-hidden={i !== current}
            className={`absolute inset-0 bg-cover bg-center scale-105 transition-opacity duration-700 ease-in-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}

        {/* Vignette shadow — darkens the image gently so text stays crisp,
            without turning the whole hero into a flat black panel. */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/35 to-stone-950/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/30 via-transparent to-stone-950/30" />

        {/* ── Centered content ── */}
        <div className="relative z-10 flex min-h-[600px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px] items-center justify-center px-4 sm:px-6 pt-0 pb-24 sm:pb-28">
          <div key={current} className="hero-fade-in max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              <Sparkles size={16} />
              {slide.eyebrow}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-white mb-2 drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
              <span className="text-amber-400">{slide.titleLine1}</span>
            </h1>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] text-white mb-6 drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]">
              {slide.titleLine2}
            </h1>

            {/* Decorative divider with center diamond */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-16 bg-amber-400/70" />
              <span className="w-2 h-2 rotate-45 bg-amber-400" />
              <span className="h-px w-16 bg-amber-400/70" />
            </div>

            <p className="text-stone-100 text-base sm:text-lg leading-relaxed mb-9 max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-full px-7 py-3.5 shadow-lg shadow-black/30 transition-colors duration-300"
              >
                <Phone size={18} />
                Contact Now
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/70 hover:border-amber-400 hover:text-amber-300 text-white font-semibold rounded-full px-7 py-3.5 shadow-lg shadow-black/20 transition-colors duration-300"
              >
                <MessageCircle size={18} />
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>

        {/* ── Circular prev / next arrows ──
            Mobile: pinned to the bottom corners (out of the way of the text/CTAs),
            small + subtle. From `sm:` up, restored to the original vertically
            centered, larger desktop position — completely unchanged. */}
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="group absolute z-20 flex items-center justify-center text-white rounded-full bg-black/35 sm:bg-black/25 border border-white/40 sm:border-white/30 backdrop-blur-sm shadow-lg hover:bg-amber-600 hover:border-amber-600 transition-colors duration-300 bottom-5 left-3 top-auto translate-y-0 w-9 h-9 sm:bottom-auto sm:top-[42%] sm:-translate-y-1/2 sm:left-6 lg:left-10 sm:w-12 sm:h-12"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="group absolute z-20 flex items-center justify-center text-white rounded-full bg-black/35 sm:bg-black/25 border border-white/40 sm:border-white/30 backdrop-blur-sm shadow-lg hover:bg-amber-600 hover:border-amber-600 transition-colors duration-300 bottom-5 right-3 top-auto translate-y-0 w-9 h-9 sm:bottom-auto sm:top-[42%] sm:-translate-y-1/2 sm:right-6 lg:right-10 sm:w-12 sm:h-12"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-6 sm:bottom-8 top-[500px] left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              className={`h-2.5 rounded-full border border-white/70 transition-all duration-300 ${
                i === current ? 'w-7 bg-amber-500 border-amber-500' : 'w-2.5 bg-transparent hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    {/* ============ FEATURE STRIP ============ */}
      <div className="relative z-10 bg-gradient-to-br from-amber-600 via-amber-600 to-amber-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 -mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 lg:gap-x-0 lg:divide-x lg:divide-white/20">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-4 lg:px-8 first:lg:pl-0 last:lg:pr-0"
              >
                <div className="w-12 h-12 rounded-full bg-white/15 border-2 border-white/70 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-amber-50/90 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600" />

      <style>{`
        .hero-fade-in {
          animation: heroFadeIn 0.6s ease-out both;
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-fade-in {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}