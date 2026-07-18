

import React from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Palette, Truck, HeadphonesIcon, ShieldCheck, Clock, ChevronRight, CheckCircle, Home } from 'lucide-react';
import ScrollReveal from '../components/ScrollToTop';

const SERVICES = [
  {
    icon: Ruler, color: 'from-amber-500 to-orange-500',
    title: 'Custom Manufacturing',
    desc: 'Tailored thread solutions designed to meet your specific requirements. We customize thickness, color, and material composition.',
    features: ['Custom denier & count', 'Specific color matching', 'Material composition control', 'MOQ flexibility'],
  },
  {
    icon: Palette, color: 'from-yellow-500 to-amber-500',
    title: 'Color Matching',
    desc: 'Expert color matching services to ensure your threads perfectly complement your designs and brand identity.',
    features: ['Pantone color matching', 'Sample approval process', 'Batch consistency', 'Special effect finishes'],
  },
  {
    icon: Truck, color: 'from-orange-500 to-red-500',
    title: 'Bulk Supply & Logistics',
    desc: 'Reliable bulk ordering with pan-India delivery. We ensure timely delivery to keep your production running smoothly.',
    features: ['Pan-India delivery', 'Bulk discounts available', 'Packaging customization', 'Freight optimization'],
  },
  {
    icon: HeadphonesIcon, color: 'from-amber-600 to-yellow-600',
    title: 'Technical Support',
    desc: 'Dedicated support team to help you choose the right thread for your application and troubleshoot any issues.',
    features: ['Product selection guidance', 'Machine compatibility advice', 'Post-sale support', 'Sampling assistance'],
  },
  {
    icon: ShieldCheck, color: 'from-yellow-600 to-amber-700',
    title: 'Quality Assurance',
    desc: 'Rigorous quality control at every stage. Each batch is tested for strength, color fastness, and durability.',
    features: ['Tensile strength testing', 'Color fastness checks', 'Batch testing reports', 'Certificate of quality'],
  },
  {
    icon: Clock, color: 'from-amber-700 to-orange-600',
    title: 'Express Delivery',
    desc: 'Urgent order processing with express delivery options for time-sensitive projects and deadlines.',
    features: ['Same-day dispatch option', 'Express courier tie-ups', 'Order tracking', '24hr urgent processing'],
  },
]

const PROCESS = [
  { step: '01', title: 'Inquiry', desc: 'Share your requirements via call, email or contact form.' },
  { step: '02', title: 'Quotation', desc: 'Receive a detailed quote within 24 hours with pricing & timelines.' },
  { step: '03', title: 'Sample', desc: 'We send physical samples for your approval before bulk production.' },
  { step: '04', title: 'Production', desc: 'Full batch manufactured under strict quality control supervision.' },
  { step: '05', title: 'Delivery', desc: 'Securely packed and dispatched with tracking to your doorstep.' },
]

export default function Services() {
  return (
    <div>
      {/* ── HEADER ── */}
      <section className="services-header relative overflow-hidden bg-[url('/public/images/image11.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:py-12 md:py-14">
        {/* Dark scrim so text stays legible over the photo on any screen size */}
        <div className="absolute inset-0 bg-stone-950/70" />

        {/* Faint dot texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Signature thread line — nods to the client's thread/zari business */}
        <svg
          className="services-header__thread absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="servicesThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
              <stop offset="20%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="80%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="services-header__thread-path"
            d="M0,42 Q 240,10 480,38 T 960,34 T 1440,44"
            fill="none"
            stroke="url(#servicesThreadGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-stone-400 transition-colors hover:text-amber-300"
            >
              <Home size={13} className="opacity-80" />
              Home
            </Link>
            <ChevronRight size={12} className="text-stone-600" />
            <span className="font-medium text-amber-300">Services</span>
          </nav>

          {/* Icon badge */}
          <div className="services-header__badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-900/40 ring-1 ring-amber-200/40">
            <HeadphonesIcon className="h-5 w-5 text-stone-900" strokeWidth={2.25} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
            Services
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-bold leading-tight text-white">
            Our{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Beyond manufacturing — comprehensive thread solutions for every textile need.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="services-header__dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-300 sm:text-sm">
              Quotes answered within 24 hours
            </span>
          </div>
        </div>

        <style>{`
          .services-header__thread-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: servicesThreadDraw 2.2s ease-out 0.15s forwards;
          }
          @keyframes servicesThreadDraw {
            to { stroke-dashoffset: 0; }
          }
          .services-header__badge {
            animation: servicesBadgeIn 0.6s ease-out both;
          }
          @keyframes servicesBadgeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .services-header__dot {
            animation: servicesDotPulse 2s ease-in-out infinite;
          }
          @keyframes servicesDotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .services-header__thread-path,
            .services-header__badge,
            .services-header__dot {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── SERVICES GRID ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="w-7 h-0.5 bg-amber-600" /> What We Offer
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Complete{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Thread Solutions
              </span>
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
              From custom manufacturing to express delivery — we handle every aspect of your thread requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {s.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                      <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

   {/* ── PROCESS ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(180,131,0,0.15) 1px, transparent 0)',
          backgroundSize: '36px 36px'
        }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-14">
            <div className="flex items-center justify-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="w-7 h-0.5 bg-amber-600" /> How It Works
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">Simple, transparent, and designed around your convenience.</p>
          </div>

          <div className="relative">
            {/* Single continuous connector line running behind all step circles.
                Positioned to start exactly at the first circle's center and end
                exactly at the last circle's center, regardless of how many
                steps are in PROCESS — no per-item math to get out of sync. */}
            <div
              className="hidden lg:block absolute top-8 h-0.5 bg-amber-300/70 -translate-y-1/2 z-0"
              style={{ left: `${100 / (2 * PROCESS.length)}%`, right: `${100 / (2 * PROCESS.length)}%` }}
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {PROCESS.map((p, i) => (
                <div key={i} className="relative text-center group">
                  {/* Gold gradient is now the default state (not just on hover) —
                      hover only adds a subtle lift + glow for interactivity. */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-500 border border-amber-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-500/25 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/40 transition-all duration-300">
                    <span className="text-white font-bold text-xl">{p.step}</span>
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 mb-2">{p.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── CTA ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-8 sm:p-10 md:p-14 border border-amber-100 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-stone-600 mb-8 max-w-lg mx-auto text-base sm:text-lg">
              Share your specific requirements and our experts will craft the perfect thread solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg shadow-md shadow-amber-600/20 transition-colors duration-300">
                Request Custom Quote <ChevronRight size={16} />
              </Link>
              <a href="tel:+917942553748"
                className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-amber-300 text-amber-700 font-semibold rounded-full hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 text-base sm:text-lg">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}