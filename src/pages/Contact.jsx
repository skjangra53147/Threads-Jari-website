
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Home, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollToTop';

// ----------------------------------------------------------------------------
// Single source of truth for location/contact details.
// Kept identical to CTABanner.jsx — if these ever change, update both files
// together so the whole site stays consistent.
// ----------------------------------------------------------------------------
const LOCATION = {
  addressLines: ['New Rander Road, Muktanand Nagar', 'Adajan, Surat, Gujarat'],
  phones: ['+91 97288 25494', '+91 99745 87475'],
  emails: ['info@narayanijari.com', 'info@shreenarayani.com'],
  mapsQuery: 'New Rander Road, Muktanand Nagar, Adajan, Surat, Gujarat',
};

const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  LOCATION.mapsQuery
)}&output=embed`;

const CONTACT_INFO = [
  {
    icon: MapPin, title: 'Visit Us',
    lines: LOCATION.addressLines
  },
  {
    icon: Phone, title: 'Call Us',
    lines: LOCATION.phones
  },
  {
    icon: Mail, title: 'Email Us',
    lines: LOCATION.emails
  },
  {
    icon: Clock, title: 'Business Hours',
    lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sunday: Closed']
  },
]

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    if (!form.subject)        e.subject = 'Please select a subject'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = e => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setErrors({})
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setForm(EMPTY) }, 4000)
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const inputClass = name =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
      errors[name]
        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
        : 'border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
    }`

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="contact-header relative overflow-hidden bg-[url('/images/image5.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:py-12 md:py-14">
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
          className="contact-header__thread absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="contactThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
              <stop offset="20%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="80%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="contact-header__thread-path"
            d="M0,42 Q 240,10 480,38 T 960,34 T 1440,44"
            fill="none"
            stroke="url(#contactThreadGrad)"
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
            <span className="font-medium text-amber-300">Contact</span>
          </nav>

          {/* Icon badge */}
          <div className="contact-header__badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-900/40 ring-1 ring-amber-200/40">
            <Mail className="h-5 w-5 text-stone-900" strokeWidth={2.25} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
            Contact
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-bold leading-tight text-white">
            Get In{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Have a question or need a custom quote? We'll get back within 24 hours.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="contact-header__dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-300 sm:text-sm">
              We reply within 24 hours
            </span>
          </div>
        </div>

        <style>{`
          .contact-header__thread-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: contactThreadDraw 2.2s ease-out 0.15s forwards;
          }
          @keyframes contactThreadDraw {
            to { stroke-dashoffset: 0; }
          }
          .contact-header__badge {
            animation: contactBadgeIn 0.6s ease-out both;
          }
          @keyframes contactBadgeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .contact-header__dot {
            animation: contactDotPulse 2s ease-in-out infinite;
          }
          @keyframes contactDotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .contact-header__thread-path,
            .contact-header__badge,
            .contact-header__dot {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Info Panel */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                Contact{' '}
                <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  Information
                </span>
              </h2>
              {CONTACT_INFO.map((info, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-stone-100 hover:shadow-md hover:border-amber-200 transition-all duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors">
                    <info.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 text-sm mb-1">{info.title}</h3>
                    {info.title === 'Call Us' && info.lines.map((l, j) => (
                      <a key={j} href={`tel:${l.replace(/\s+/g, '')}`} className="block text-stone-600 text-sm hover:text-amber-700 transition-colors w-fit">{l}</a>
                    ))}
                    {info.title === 'Email Us' && info.lines.map((l, j) => (
                      <a key={j} href={`mailto:${l}`} className="block text-stone-600 text-sm hover:text-amber-700 transition-colors break-all w-fit">{l}</a>
                    ))}
                    {info.title !== 'Call Us' && info.title !== 'Email Us' && info.lines.map((l, j) => (
                      <p key={j} className="text-stone-600 text-sm">{l}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-md h-56 mt-6">
                <iframe
                  src={mapEmbedSrc}
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  title="Shree Narayani Thread & Jari Location"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-stone-100">
                {submitted ? (
                  <div className="text-center py-12 sm:py-14">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                    <p className="text-stone-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl font-bold text-stone-900 mb-7">
                      Send Us a{' '}
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                        Message
                      </span>
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name *</label>
                          <input type="text" name="name" value={form.name} onChange={handleChange}
                            className={inputClass('name')} placeholder="Rajesh Patel" />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address *</label>
                          <input type="email" name="email" value={form.email} onChange={handleChange}
                            className={inputClass('email')} placeholder="rajesh@example.com" />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number</label>
                          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                            className={inputClass('phone')} placeholder="+91 98765 43210" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1.5">Subject *</label>
                          <select name="subject" value={form.subject} onChange={handleChange}
                            className={inputClass('subject')}>
                            <option value="">Select Subject</option>
                            <option value="product-inquiry">Product Inquiry</option>
                            <option value="custom-order">Custom Order</option>
                            <option value="bulk-quote">Bulk Quote</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1.5">Message *</label>
                        <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                          className={`${inputClass('message')} resize-none`}
                          placeholder="Tell us about your requirements, quantity needed, and any specific customization..." />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>

                      <button type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full text-base py-4 shadow-md shadow-amber-600/20 transition-colors duration-300">
                        <Send size={18} /> Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── FAQ STRIP ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>
          {[
            { q: 'What is the minimum order quantity?', a: 'MOQ varies by product type — typically 5 kg for standard threads and 10 kg for custom orders. Contact us for specific product MOQs.' },
            { q: 'Do you provide samples before bulk ordering?', a: 'Yes, we send physical samples for approval before processing bulk orders. Sample charges may apply and are adjusted against the final order.' },
            { q: 'How long does delivery take?', a: 'Standard orders: 5–7 business days pan-India. Express orders: 2–3 business days. Same-day dispatch available for orders placed before 12 PM.' },
            { q: 'Can you match a specific color for my order?', a: 'Absolutely. We offer professional color matching services. Send us your reference swatch or Pantone code and we\'ll match it precisely.' },
          ].map((faq, i) => (
            <details key={i} className="group border-b border-stone-100 py-5 cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-stone-900 list-none">
                {faq.q}
                <span className="text-amber-600 group-open:rotate-45 transition-transform duration-200 text-xl font-light flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="text-stone-600 text-sm mt-3 leading-relaxed pr-8">{faq.a}</p>
            </details>
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}