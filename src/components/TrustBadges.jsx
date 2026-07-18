import React, { useEffect, useRef, useState } from 'react';
import { Shield, CheckCircle2, Truck, Clock, Users, Award } from 'lucide-react';


const TRUST_BADGES = [
  { icon: Shield,       label: 'ISO Certified',        desc: 'Quality Management' },
  { icon: CheckCircle2, label: '100% Quality Check',   desc: 'Every Batch Tested' },
  { icon: Truck,        label: 'Pan India Delivery',   desc: '25+ States Covered' },
  { icon: Clock,        label: 'Fast Turnaround',      desc: '3–5 Days Dispatch' },
  { icon: Users,        label: '500+ Happy Clients',   desc: 'Across India' },
  { icon: Award,        label: '5+ Years Experience',  desc: 'Since 2023' },
];

export default function TrustBadges() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  // Reveal the row with a gentle stagger once it scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-50 py-12 sm:py-14"
    >
      {/* Faint dot texture, kept subtle on the light background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, rgba(180,131,0,0.15) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />
      {/* Hairline amber edges, top and bottom, to frame the row */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-x-4">
          {TRUST_BADGES.map((badge, i) => (
            <div
              key={badge.label}
              className={`trust-badge group relative flex flex-col items-center gap-3 px-2 text-center transition-all duration-500 ease-out
                ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
                lg:border-l lg:border-amber-900/10 lg:first:border-l-0`}
              style={{ transitionDelay: revealed ? `${i * 90}ms` : '0ms' }}
            >
              {/* Icon circle carries the site's amber-to-gold gradient, matching the
                  brand's primary buttons and accents elsewhere on the site */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-yellow-500 shadow-md shadow-amber-500/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/40">
                <badge.icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>

              <div>
                <p className="text-sm font-semibold leading-snug text-stone-900">
                  {badge.label}
                </p>
                <p className="mt-0.5 text-xs text-stone-500">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .trust-badge {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}