
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, ShieldCheck, Package, CreditCard, Truck, RotateCcw,
  AlertTriangle, Scale, Mail, Phone, ChevronRight, Home
} from 'lucide-react';
import ScrollReveal from '../components/ScrollToTop';

const SECTIONS = [
  {
    icon: FileText,
    title: '1. Introduction',
    body: [
      `Welcome to Shree Narayani Thread & Jari ("Company", "we", "us", "our"). These Terms & Conditions govern your use of our website, products, and services. By accessing our website, placing an order, or engaging with us in any capacity, you agree to be bound by these Terms.`,
      `If you do not agree with any part of these Terms, please discontinue use of our website and services immediately.`,
    ],
  },
  {
    icon: Package,
    title: '2. Products & Orders',
    body: [
      `All product descriptions, images, specifications, and pricing displayed on our website are for general reference only. Actual products (zari threads, cording threads, fancy cords, metallic threads) may vary slightly in shade, texture, or finish due to the nature of manufacturing and screen display differences.`,
      `Orders are confirmed only after written or verbal acknowledgment from our sales team. We reserve the right to accept, modify, or reject any order at our discretion, including in cases of pricing errors, stock unavailability, or suspected fraudulent activity.`,
      `Minimum Order Quantity (MOQ) applies to most products and varies by item. Custom orders may require additional lead time and sample approval before bulk production begins.`,
    ],
  },
  {
    icon: CreditCard,
    title: '3. Pricing & Payment',
    body: [
      `All prices are quoted in Indian Rupees (INR) and are subject to change without prior notice due to raw material cost fluctuations, market conditions, or order customization.`,
      `Payment terms will be communicated at the time of quotation and may include advance payment, partial payment, or credit terms for established clients. Full payment must be received before dispatch unless otherwise agreed in writing.`,
      `Applicable taxes (GST) will be charged as per prevailing government regulations and shown separately in the invoice.`,
    ],
  },
  {
    icon: Truck,
    title: '4. Shipping & Delivery',
    body: [
      `We aim to dispatch standard orders within 5–7 business days and express orders within 2–3 business days, subject to product availability and order volume. Delivery timelines are estimates and not guaranteed, as they depend on courier/logistics partners and factors beyond our control.`,
      `Risk of loss or damage to goods passes to the buyer upon dispatch from our facility. We recommend buyers inspect shipments immediately upon receipt and report any discrepancies within 48 hours.`,
    ],
  },
  {
    icon: RotateCcw,
    title: '5. Returns, Replacement & Cancellation',
    body: [
      `Due to the customized and bulk nature of our manufacturing, orders once confirmed and put into production generally cannot be cancelled or returned, except in cases of manufacturing defects verified by our quality team.`,
      `Claims for defective, damaged, or incorrect products must be raised in writing within 3 business days of delivery, accompanied by photographic evidence. Approved claims will be resolved via replacement, credit note, or refund at our discretion.`,
      `Samples provided prior to bulk order approval are non-refundable, though sample charges (where applicable) may be adjusted against a confirmed bulk order.`,
    ],
  },
  {
    icon: ShieldCheck,
    title: '6. Quality Assurance',
    body: [
      `Every batch undergoes internal quality checks for tensile strength, color fastness, and consistency before dispatch. However, minor variations inherent to textile manufacturing (batch-to-batch shade variation, natural fiber characteristics) are not considered defects.`,
      `We are not liable for issues arising from improper storage, handling, or use of products after delivery, or from machine incompatibility not disclosed to us prior to order confirmation.`,
    ],
  },
  {
    icon: AlertTriangle,
    title: '7. Limitation of Liability',
    body: [
      `To the maximum extent permitted by law, Shree Narayani Thread & Jari shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of our products or services, including but not limited to loss of profits, production delays, or business interruption.`,
      `Our total liability for any claim relating to a specific order shall not exceed the invoice value of that order.`,
    ],
  },
  {
    icon: Scale,
    title: '8. Intellectual Property & Governing Law',
    body: [
      `All content on this website, including text, images, logos, and design elements, is the property of Shree Narayani Thread & Jari and may not be reproduced or used without prior written consent.`,
      `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.`,
    ],
  },
];

export default function TermsConditions() {
  return (
    <div>
      {/* ── HEADER ── */}
      <section className="terms-header relative overflow-hidden bg-[url('/public/images/image2.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:py-12 md:py-14">
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
          className="terms-header__thread absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="termsThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
              <stop offset="20%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="80%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="terms-header__thread-path"
            d="M0,42 Q 240,10 480,38 T 960,34 T 1440,44"
            fill="none"
            stroke="url(#termsThreadGrad)"
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
            <span className="font-medium text-amber-300">Terms & Conditions</span>
          </nav>

          {/* Icon badge */}
          <div className="terms-header__badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-900/40 ring-1 ring-amber-200/40">
            <FileText className="h-5 w-5 text-stone-900" strokeWidth={2.25} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
            Legal
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-bold leading-tight text-white">
            Terms &{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Please read these terms carefully before using our website or placing an order.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="terms-header__dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-300 sm:text-sm">
              Last updated: July 14, 2026
            </span>
          </div>
        </div>

        <style>{`
          .terms-header__thread-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: termsThreadDraw 2.2s ease-out 0.15s forwards;
          }
          @keyframes termsThreadDraw {
            to { stroke-dashoffset: 0; }
          }
          .terms-header__badge {
            animation: termsBadgeIn 0.6s ease-out both;
          }
          @keyframes termsBadgeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .terms-header__dot {
            animation: termsDotPulse 2s ease-in-out infinite;
          }
          @keyframes termsDotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @media (prefers-reduced-motion: reduce) {
            .terms-header__thread-path,
            .terms-header__badge,
            .terms-header__dot {
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
            These Terms & Conditions apply to all visitors, clients, and buyers of{' '}
            <strong className="text-stone-800">Shree Narayani Thread & Jari</strong>, Surat, Gujarat.
            By using our website or placing an order with us, you accept these terms in full.
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
              <Mail className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mb-3">
              Questions About These Terms?
            </h3>
            <p className="text-stone-600 text-sm sm:text-base mb-7 max-w-lg mx-auto">
              If you have any questions regarding our Terms & Conditions, feel free to reach out to our team.
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
              to="/privacy-policy"
              className="inline-flex items-center gap-1.5 text-amber-600 hover:text-amber-800 text-sm font-medium mt-6"
            >
              View our Privacy Policy <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}


