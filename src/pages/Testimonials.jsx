
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Star, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import ScrollReveal from '../components/ScrollToTop';

const TESTIMONIALS = [
  {
    name: 'Rajesh Patel', role: 'Textile Manufacturer', company: 'Patel Fabrics, Ahmedabad',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    content: 'Shree Narayani Thread & Jari has been our trusted supplier for over 2 years. Their gold zari quality is exceptional and the consistency across batches is remarkable. Highly recommended for any serious textile manufacturer.',
    rating: 5,
  },
  {
    name: 'Priya Sharma', role: 'Fashion Designer', company: 'Sharma Couture, Mumbai',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    content: 'The fancy cords and metallic threads are simply outstanding. The color range is extensive and quality exceeds expectations. A reliable partner for our design house — we\'ve reduced material waste by 30% since switching.',
    rating: 5,
  },
  {
    name: 'Mohammed Khan', role: 'Embroidery Unit Owner', company: 'Khan Embroidery, Surat',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    content: 'We have tried many thread suppliers but Shree Narayani stands out for competitive pricing without compromising on quality. Their cording threads work perfectly with our multi-head machines without a single breakage.',
    rating: 5,
  },
  {
    name: 'Anita Desai', role: 'Export House Manager', company: 'Desai Exports, Delhi',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    content: 'For export orders we need consistent quality and timely delivery. Shree Narayani delivers on both fronts. Their nylon zari is durable and meets international standards. We\'ve received zero rejections from our buyers.',
    rating: 4,
  },
  {
    name: 'Suresh Mehta', role: 'Saree Manufacturer', company: 'Mehta Textiles, Varanasi',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    content: 'The gold and silver zari from Shree Narayani has elevated the quality of our Banarasi sarees. Customers notice the difference and are willing to pay more. A game-changer for our business.',
    rating: 5,
  },
  {
    name: 'Kavita Joshi', role: 'Boutique Owner', company: 'Joshi Collections, Jaipur',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    content: 'Small orders are handled with the same care as bulk orders. The team is responsive and always willing to help with color matching for my custom lehenga designs. Truly customer-centric.',
    rating: 5,
  },
]

const STATS = [
  { target: 200, suffix: '+', label: 'Happy Clients' },
  { target: 25,  suffix: '+', label: 'States Covered' },
  { target: 500, suffix: '+', label: 'Orders Delivered' },
  { target: 99,  suffix: '%', label: 'Satisfaction Rate' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent(v => (v + 1) % TESTIMONIALS.length)
  const prev = () => setCurrent(v => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  const statsRef = useRef(null)
  const [counts, setCounts] = useState(STATS.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            STATS.forEach((stat, idx) => {
              const duration = 1600
              const steps = 60
              const stepVal = stat.target / steps
              let curr = 0
              const interval = setInterval(() => {
                curr += stepVal
                if (curr >= stat.target) {
                  curr = stat.target
                  clearInterval(interval)
                }
                setCounts(prev => {
                  const next = [...prev]
                  next[idx] = Math.floor(curr)
                  return next
                })
              }, duration / steps)
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    if (statsRef.current) io.observe(statsRef.current)
    return () => io.disconnect()
  }, [hasAnimated])

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="testimonials-header relative overflow-hidden bg-[url('/images/image15.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:py-12 md:py-14">
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
          className="testimonials-header__thread absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="testimonialsThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
              <stop offset="20%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="80%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="testimonials-header__thread-path"
            d="M0,42 Q 240,10 480,38 T 960,34 T 1440,44"
            fill="none"
            stroke="url(#testimonialsThreadGrad)"
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
            <span className="font-medium text-amber-300">Testimonials</span>
          </nav>

          {/* Icon badge */}
          <div className="testimonials-header__badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-900/40 ring-1 ring-amber-200/40">
            <Quote className="h-5 w-5 text-stone-900" strokeWidth={2.25} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
            Testimonials
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-bold leading-tight text-white">
            Client{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Trusted by hundreds of textile manufacturers and designers across India.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="testimonials-header__dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-300 sm:text-sm">
              200+ happy clients
            </span>
          </div>
        </div>

        <style>{`
          .testimonials-header__thread-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: testimonialsThreadDraw 2.2s ease-out 0.15s forwards;
          }
          @keyframes testimonialsThreadDraw {
            to { stroke-dashoffset: 0; }
          }
          .testimonials-header__badge {
            animation: testimonialsBadgeIn 0.6s ease-out both;
          }
          @keyframes testimonialsBadgeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .testimonials-header__dot {
            animation: testimonialsDotPulse 2s ease-in-out infinite;
          }
          @keyframes testimonialsDotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .testimonials-header__thread-path,
            .testimonials-header__badge,
            .testimonials-header__dot {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="bg-amber-600 py-12 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ease-out ${
                  hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
                  {counts[i]}{s.suffix}
                </div>
                <div className="text-amber-100 text-xs sm:text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TESTIMONIAL CAROUSEL ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="hidden sm:block absolute top-10 left-10 text-stone-100 pointer-events-none">
          <Quote size={160} />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center gap-2 text-amber-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
              <span className="w-7 h-0.5 bg-amber-600" /> What Clients Say
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">
              Real{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Feedback
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-stone-50 rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-stone-100">
              <div className="absolute -top-5 left-8 w-11 h-11 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className="flex justify-center gap-1 mb-5 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < TESTIMONIALS[current].rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`} />
                  ))}
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-stone-700 font-serif italic leading-relaxed mb-6 sm:mb-8">
                  "{TESTIMONIALS[current].content}"
                </p>
                <img src={TESTIMONIALS[current].img} alt={TESTIMONIALS[current].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-amber-200 mx-auto mb-4" />
                <h4 className="font-bold text-stone-900 text-base sm:text-lg">{TESTIMONIALS[current].name}</h4>
                <p className="text-amber-600 font-medium text-sm">{TESTIMONIALS[current].role}</p>
                <p className="text-stone-500 text-xs mt-0.5">{TESTIMONIALS[current].company}</p>
              </div>
              {/* Nav */}
              <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 items-center">
                <button onClick={prev} aria-label="Previous testimonial"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-stone-200 flex items-center justify-center hover:border-amber-500 hover:text-amber-600 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'w-7 bg-amber-500' : 'w-2.5 bg-stone-300 hover:bg-stone-400'}`} />
                  ))}
                </div>
                <button onClick={next} aria-label="Next testimonial"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-stone-200 flex items-center justify-center hover:border-amber-500 hover:text-amber-600 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── GRID OF ALL TESTIMONIALS ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              More{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'}`} />
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-5 italic">"{t.content.slice(0, 140)}..."</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-amber-100" />
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                    <p className="text-stone-500 text-xs">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-14">
            <p className="text-stone-600 mb-6 text-base sm:text-lg">Ready to join our growing family of satisfied clients?</p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg shadow-md shadow-amber-600/20 transition-colors duration-300">
              Get In Touch <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}