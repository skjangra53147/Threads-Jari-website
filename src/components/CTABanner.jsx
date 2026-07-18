
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

// ----------------------------------------------------------------------------
// Location details
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

const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  LOCATION.mapsQuery
)}`;

export default function CTABanner() {
  return (
    <section className="cta-banner relative overflow-hidden bg-amber-50 px-4 py-16 sm:py-20">
      {/* Faint amber dot texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, #B45309 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />

      <ScrollToTop y={20}>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
            Ready to Order? Get a{' '}
            <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Custom Quote
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Tell us your requirements and our team will provide you the best pricing and fastest
            delivery.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-amber-600/30 transition-transform duration-300 hover:scale-[1.03] hover:shadow-amber-600/40"
            >
              Request Quote
              <ArrowRight size={18} />
            </Link>

            
            <a  href={`tel:${LOCATION.phones[0].replace(/\s+/g, '')}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-300 bg-white px-10 py-4 text-lg font-semibold text-amber-700 transition-all duration-300 hover:border-amber-600 hover:bg-amber-600 hover:text-white"
            >
              <Phone size={18} />
              Call: {LOCATION.phones[0]}
            </a>
          </div>
        </div>
      </ScrollToTop>

      {/* ── Find Us — map + contact details ── */}
      <ScrollToTop y={32} delay={0.15}>
        <div className="relative z-10 mx-auto mt-14 max-w-5xl sm:mt-16">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl shadow-amber-900/5 lg:grid-cols-2">
            {/* Map */}
            <div className="relative h-64 w-full lg:h-full lg:min-h-[320px]">
              <iframe
                title="Shree Narayani Thread & Jari — location map"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
              
               <a href={mapsOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-stone-800 shadow-md transition-colors hover:bg-amber-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                <ExternalLink size={13} />
                Open in Maps
              </a>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center gap-6 p-7 sm:p-9">
              <div>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.15em] text-amber-600">
                  Visit Us
                </p>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Find Our Facility</h3>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                <address className="text-sm not-italic leading-relaxed text-stone-600">
                  {LOCATION.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                <div className="flex flex-col gap-1 text-sm text-stone-600">
                  {LOCATION.phones.map((phone) => (
                    
                   <a   key={phone}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded w-fit"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                <div className="flex flex-col gap-1 text-sm text-stone-600">
                  {LOCATION.emails.map((email) => (
                    
                    <a  key={email}
                      href={`mailto:${email}`}
                      className="break-all transition-colors hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded w-fit"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              
              <a  href={mapsOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber-600/20 transition-colors duration-300 hover:bg-amber-700"
              >
                Get Directions <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </ScrollToTop>
    </section>
  );
}