

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Users, Globe, TrendingUp, CheckCircle, ChevronRight, Home, Award, Truck, ShieldCheck } from 'lucide-react';
import ScrollReveal from '../components/ScrollToTop';

const VALUES = [
  { title: 'Quality First', desc: 'Every thread undergoes rigorous quality checks before leaving our facility.' },
  { title: 'Innovation', desc: 'Constantly improving processes and products to meet evolving industry needs.' },
  { title: 'Customer Focus', desc: 'Your requirements drive our manufacturing — custom solutions always available.' },
  { title: 'Reliability', desc: 'Consistent quality and on-time delivery, every single order.' },
]

const MILESTONES = [
  { year: '2023', title: 'Founded', desc: 'Shree Narayani Thread & Jari established in Surat, Gujarat.' },
  { year: '2023', title: 'First 50 Clients', desc: 'Rapidly gained trust of textile manufacturers across Gujarat.' },
  { year: '2024', title: '25+ States', desc: 'Expanded distribution network pan-India with timely delivery.' },
  { year: '2024', title: '500+ Products', desc: 'Launched comprehensive range covering all thread and jari needs.' },
]

const FEATURES = [
  { icon: Factory, title: 'Modern Infrastructure', desc: 'State-of-the-art manufacturing facility with latest machinery for precision production.' },
  { icon: Users, title: 'Expert Team', desc: 'Skilled artisans and technicians with generations of traditional zari expertise.' },
  { icon: Globe, title: 'Pan India Presence', desc: 'Reliable distribution across 25+ states with timely delivery guaranteed.' },
  { icon: TrendingUp, title: 'Rapid Growth', desc: 'From startup to trusted industry name in under 2 years.' },
]

// New section: manufacturing highlights shown alongside the facility photo
const MANUFACTURING_POINTS = [
  { icon: ShieldCheck, title: 'Strict Quality Control', desc: 'Every batch is tested for strength, shine, and colorfastness before packing.' },
  { icon: Factory, title: 'Advanced Machinery', desc: 'Automated winding and twisting lines ensure uniform thickness on every reel.' },
  { icon: Truck, title: 'Fast Dispatch', desc: 'In-house packing team keeps standard orders dispatch-ready within 24 hours.' },
  { icon: Award, title: 'Skilled Craftsmanship', desc: 'A team with generations of zari-making experience oversees every production run.' },
]

const STATS = [
  { value: '2+', label: 'Years of Trust' },
  { value: '500+', label: 'Product Range' },
  { value: '25+', label: 'States Served' },
]

export default function About() {
  // Measures the "Our Facility" content column so the photo beside it can be
  // set to the exact same height on desktop — CSS grid stretch fights the
  // photo's own tall/portrait aspect ratio, so we do it precisely in JS instead.
  const facilityContentRef = useRef(null)
  const [facilityImgHeight, setFacilityImgHeight] = useState(null)

  useEffect(() => {
    const measure = () => {
      if (window.innerWidth >= 1024 && facilityContentRef.current) {
        setFacilityImgHeight(facilityContentRef.current.offsetHeight)
      } else {
        setFacilityImgHeight(null)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="about-header relative overflow-hidden bg-[url('/public/images/image6.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:py-12 md:py-14">
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
          className="about-header__thread absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="aboutThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
              <stop offset="20%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="80%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="about-header__thread-path"
            d="M0,42 Q 240,10 480,38 T 960,34 T 1440,44"
            fill="none"
            stroke="url(#aboutThreadGrad)"
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
            <span className="font-medium text-amber-300">About Us</span>
          </nav>

          {/* Icon badge */}
          <div className="about-header__badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-900/40 ring-1 ring-amber-200/40">
            <Factory className="h-5 w-5 text-stone-900" strokeWidth={2.25} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
            About Us
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-bold leading-tight text-white">
            Our{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Story
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            From a small workshop in Surat to a pan-India thread manufacturer — the journey of Shree Narayani.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="about-header__dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-300 sm:text-sm">
              Est. 2023 · Surat, Gujarat
            </span>
          </div>
        </div>

        <style>{`
          .about-header__thread-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: aboutThreadDraw 2.2s ease-out 0.15s forwards;
          }
          @keyframes aboutThreadDraw {
            to { stroke-dashoffset: 0; }
          }
          .about-header__badge {
            animation: aboutBadgeIn 0.6s ease-out both;
          }
          @keyframes aboutBadgeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .about-header__dot {
            animation: aboutDotPulse 2s ease-in-out infinite;
          }
          @keyframes aboutDotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .about-header__thread-path,
            .about-header__badge,
            .about-header__dot {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── WHO WE ARE ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <div className="flex items-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                <span className="w-7 h-0.5 bg-amber-600" /> Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-5 leading-tight">
                Crafting Threads That{' '}
                <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Define Luxury
                </span>
              </h2>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-4">
                Founded in 2023, <strong>Shree Narayani Thread & Jari</strong> has quickly emerged as a leading manufacturer
                of premium quality zari threads, cording threads, and embroidery materials in Surat, Gujarat — the textile hub of India.
              </p>
              <p className="text-stone-600 leading-relaxed mb-6 text-sm sm:text-base">
                We specialize in producing a wide range of products including Gold Zari, Silver Zari, Polyester Zari, Nylon Zari,
                Fancy Cords, and Metallic Threads. Our commitment to quality, innovation, and customer satisfaction has made us
                a preferred choice for textile manufacturers, embroidery houses, and fashion designers across the country.
              </p>
              <div className="space-y-3 mb-8">
                {['ISO quality standards followed', 'Pan-India delivery network', 'Custom orders accepted', '200+ happy clients'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-stone-700 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-6 py-3 shadow-md shadow-amber-600/20 transition-colors duration-300">
                Get In Touch <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48">
                <img src="/public/images/image15.png"
                  alt="Thread" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48 mt-6">
                <img src="/public/images/image4.png"
                  alt="Zari" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48">
                <img src="/public/images/image13.png"
                  alt="Manufacturing" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48 mt-6">
                <img src="/public/images/image10.png"
                  alt="Thread" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── VALUES ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="w-7 h-0.5 bg-amber-600" /> Our Values
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              What{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Drives Us
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 text-center group">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-colors">
                  <span className="text-amber-700 group-hover:text-white font-bold text-lg transition-colors">{i + 1}</span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg mb-2">{v.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>



       {/* ── MANUFACTURING EXCELLENCE — image left / content right ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Centered section header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="w-7 h-0.5 bg-amber-600" /> Our Facility
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              Where Tradition Meets{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Modern Manufacturing
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="relative mb-10 sm:mb-8 lg:mb-0">
              {/* Decorative offset backing panel — adds depth behind the photo */}
              <div
                className="hidden sm:block absolute -top-4 -right-4 w-full h-full rounded-2xl bg-amber-100"
                aria-hidden="true"
              />

              <div
                className="relative rounded-2xl overflow-hidden shadow-xl h-64 sm:h-80 ring-1 ring-stone-900/5"
                style={facilityImgHeight ? { height: `${facilityImgHeight}px` } : undefined}
              >
                <img
                  src="/public/images/image3.png"
                  alt="Shree Narayani manufacturing facility"
                  className="w-full h-full object-cover"
                />
                {/* Subtle bottom gradient so a floating card never fights the photo for contrast */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/40 to-transparent pointer-events-none" />
              </div>

              {/* Stats — a plain row under the photo on mobile, a floating overlap card from sm up */}
              <div className="relative mt-4 sm:mt-0 sm:absolute sm:-bottom-7 sm:left-6 sm:right-6 lg:right-auto lg:w-auto rounded-2xl bg-white shadow-xl border border-amber-100 px-5 py-4 sm:px-7 sm:py-5">
                <div className="flex items-center justify-between sm:justify-start sm:gap-0 w-full divide-x divide-stone-100">
                  {STATS.map((s, i) => (
                    <div key={i} className={`text-center flex-1 sm:flex-none ${i > 0 ? 'pl-4 sm:pl-8' : 'sm:pr-8'}`}>
                      <p className="font-serif text-xl sm:text-2xl font-bold text-amber-600">{s.value}</p>
                      <p className="text-[10px] sm:text-xs text-stone-500 whitespace-nowrap">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content side — ref used to measure this column's real height in JS */}
            <div ref={facilityContentRef} className="lg:pl-4 sm:pt-4 lg:pt-0">
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-6">
                Our Surat facility blends time-tested zari craftsmanship with modern winding and twisting
                machinery, so every reel that leaves our floor meets the same high standard — whether it's
                an order of 5 kg or 5,000 kg.
              </p>

              <div className="space-y-4">
                {MANUFACTURING_POINTS.map((point, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-stone-100 hover:border-amber-200 hover:bg-amber-50/50 transition-colors duration-300 group">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors duration-300">
                      <point.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 text-sm sm:text-base mb-0.5">{point.title}</h3>
                      <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── MILESTONES ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <div className="flex items-center justify-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="w-7 h-0.5 bg-amber-600" /> Our Journey
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              Milestones &{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 -translate-x-1/2" />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-6 items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="inline-block bg-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm">
                      <div className="text-amber-600 font-bold text-sm mb-1">{m.year}</div>
                      <h3 className="font-serif font-bold text-xl text-stone-900 mb-2">{m.title}</h3>
                      <p className="text-stone-600 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-amber-500 border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0 z-10">
                    <span className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── WHY CHOOSE US ── */}
    <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="w-7 h-0.5 bg-amber-600" /> Why Choose Us
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              Our{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Strengths
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl bg-white border border-amber-100 shadow-sm hover:shadow-xl hover:border-amber-300 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors duration-300">
                  <f.icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}