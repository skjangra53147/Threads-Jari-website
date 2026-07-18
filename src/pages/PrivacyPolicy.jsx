

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Lock, Database, Eye, Share2, Cookie, ShieldCheck,
  UserCheck, RefreshCw, Mail, Phone, ChevronRight, Home
} from 'lucide-react';
import ScrollReveal from '../components/ScrollToTop';

const SECTIONS = [
  {
    icon: Database,
    title: '1. Information We Collect',
    body: [
      `We collect information you voluntarily provide to us, such as your name, email address, phone number, company name, and shipping/billing address, when you fill out our contact form, request a quote, or place an order.`,
      `We may also automatically collect limited technical information — such as browser type, device type, IP address, and pages visited — through standard website analytics to help us improve our services.`,
      `We do not knowingly collect sensitive personal information such as payment card details, financial account numbers, or government ID numbers through our website.`,
    ],
  },
  {
    icon: Eye,
    title: '2. How We Use Your Information',
    body: [
      `We use the information collected to process and fulfil orders, respond to enquiries, provide quotations, arrange sample and bulk delivery, and offer customer support.`,
      `We may also use your contact details to send order updates, service-related notifications, and — where you have consented — occasional updates about new products or offers. You can opt out of marketing communications at any time.`,
      `Aggregated, non-identifiable data may be used internally to analyze website performance and improve user experience.`,
    ],
  },
  {
    icon: Share2,
    title: '3. How We Share Your Information',
    body: [
      `We do not sell, rent, or trade your personal information to third parties for their marketing purposes.`,
      `We may share necessary information with trusted third parties who support our operations, including courier and logistics partners (for delivery), payment processors (for transactions), and IT service providers (for website hosting and maintenance) — strictly for the purpose of fulfilling our services to you.`,
      `We may also disclose information if required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of our company, clients, or others.`,
    ],
  },
  {
    icon: Cookie,
    title: '4. Cookies & Tracking Technologies',
    body: [
      `Our website may use cookies and similar tracking technologies to remember your preferences, understand how visitors use our site, and improve overall functionality.`,
      `Most web browsers allow you to control cookies through their settings. Disabling cookies may affect certain features of the website, but the site will remain generally accessible.`,
    ],
  },
  {
    icon: Lock,
    title: '5. Data Security',
    body: [
      `We implement reasonable administrative, technical, and physical safeguards designed to protect your personal information from unauthorized access, disclosure, alteration, or destruction.`,
      `However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your data, we cannot guarantee absolute security.`,
    ],
  },
  {
    icon: UserCheck,
    title: '6. Your Rights & Choices',
    body: [
      `You have the right to request access to, correction of, or deletion of the personal information we hold about you, subject to applicable legal requirements and legitimate business needs (such as order records and tax compliance).`,
      `You may withdraw consent for marketing communications at any time by contacting us directly using the details below.`,
    ],
  },
  {
    icon: ShieldCheck,
    title: '7. Data Retention',
    body: [
      `We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy, including order processing, accounting, and legal or regulatory compliance obligations. Records may be retained longer where required by applicable law (such as GST/tax record-keeping requirements).`,
    ],
  },
  {
    icon: RefreshCw,
    title: '8. Changes to This Policy',
    body: [
      `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The "Last updated" date at the top of this page indicates when the policy was last revised. Continued use of our website after changes are posted constitutes acceptance of the updated policy.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div>
      {/* ── HEADER ── */}
      <section className="privacy-header relative overflow-hidden bg-[url('/images/image7.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:py-12 md:py-14">
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
          className="privacy-header__thread absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="privacyThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
              <stop offset="20%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="80%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="privacy-header__thread-path"
            d="M0,42 Q 240,10 480,38 T 960,34 T 1440,44"
            fill="none"
            stroke="url(#privacyThreadGrad)"
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
            <span className="text-stone-500">Legal</span>
            <ChevronRight size={12} className="text-stone-600" />
            <span className="font-medium text-amber-300">Privacy Policy</span>
          </nav>

          {/* Icon badge */}
          <div className="privacy-header__badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-900/40 ring-1 ring-amber-200/40">
            <Lock className="h-5 w-5 text-stone-900" strokeWidth={2.25} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
            Legal
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-bold leading-tight text-white">
            Privacy{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Your privacy matters to us. Here's how we collect, use, and protect your information.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="privacy-header__dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-300 sm:text-sm">
              Last updated: July 14, 2026
            </span>
          </div>
        </div>

        <style>{`
          .privacy-header__thread-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: privacyThreadDraw 2.2s ease-out 0.15s forwards;
          }
          @keyframes privacyThreadDraw {
            to { stroke-dashoffset: 0; }
          }
          .privacy-header__badge {
            animation: privacyBadgeIn 0.6s ease-out both;
          }
          @keyframes privacyBadgeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .privacy-header__dot {
            animation: privacyDotPulse 2s ease-in-out infinite;
          }
          @keyframes privacyDotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .privacy-header__thread-path,
            .privacy-header__badge,
            .privacy-header__dot {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      {/* ── INTRO STRIP ── */}
      <ScrollReveal as="section" className="py-10 px-4 sm:px-6 lg:px-8 bg-amber-50 border-b border-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            This Privacy Policy explains how{' '}
            <strong className="text-stone-800">Shree Narayani Thread & Jari</strong> collects,
            uses, and safeguards your personal information when you visit our website or interact
            with our business.
          </p>
        </div>
      </ScrollReveal>

      {/* ── CONTENT ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          {SECTIONS.map((s, i) => (
            <div key={i} className="scroll-mt-24" id={`section-${i + 1}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 pt-1.5">
                  {s.title}
                </h2>
              </div>
              {/* pl-[3.75rem] = icon width (2.75rem) + gap-4 (1rem), so body text lines up under the title.
                  (Original used `pl-15`, which isn't a real Tailwind class and had no effect.) */}
              <div className="pl-0 sm:pl-[3.75rem] space-y-3">
                {s.body.map((p, j) => (
                  <p key={j} className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── CONTACT CTA ── */}
      <ScrollReveal as="section" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-100 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-3">
              Questions About Your Privacy?
            </h3>
            <p className="text-stone-600 text-sm sm:text-base mb-7 max-w-lg mx-auto">
              If you'd like to access, correct, or delete your personal information, or have any
              privacy-related concerns, contact us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:info@shreenarayani.com"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-7 py-3 shadow-md shadow-amber-600/20 transition-colors duration-300 text-sm sm:text-base"
              >
                <Mail size={16} /> info@shreenarayani.com
              </a>
              <a
                href="tel:+917942553748"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border-2 border-amber-300 text-amber-700 font-semibold rounded-full hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 text-sm sm:text-base"
              >
                <Phone size={16} /> +91 79425 53748
              </a>
            </div>
            <Link
              to="/terms-conditions"
              className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-800 text-sm font-medium mt-6"
            >
              View our Terms & Conditions <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}