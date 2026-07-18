
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ScrollToTop from './ScrollToTop'; // ScrollReveal wrapper


// ----------------------------------------------------------------------------
// PRODUCT CATEGORIES — real catalog, not stock placeholders
// ----------------------------------------------------------------------------
// Matches the actual product line-up (see Products.jsx / PRODUCTS array):
// 15 cording variants, 8 zari (jari) variants, 7 nylon variants.
// Exactly 6 cards are shown here — the 3 core categories plus 3 curated
// highlights pulled from inside those categories, so every card links to
// something that genuinely exists in the catalog.
//
// `img` follows the same /images/<file>.png convention already used
// in Products.jsx, so these pick up real product photos automatically —
// no external/stock URLs.
// ----------------------------------------------------------------------------
const PRODUCT_CATEGORIES = [
  {
    slug: 'cording',
    name: 'Cording Threads',
    count: '15+ Varieties',
    desc: 'Pita, vall, kat, jardosi & more — our full range of decorative and embroidery cording.',
    img: '/images/cording2.png',
  },
  {
    slug: 'jari',
    name: 'Zari (Jari) Threads',
    count: '8+ Varieties',
    desc: 'Kasab, rasal, chapat & multi-colour zari with rich, consistent metallic shine.',
    img: '/images/jari1.png',
  },
  {
    slug: 'nylon',
    name: 'Nylon Threads',
    count: '7+ Varieties',
    desc: 'Monofilament and polyester-nylon blends across every common gauge.',
    img: '/images/nylon1.png',
  },
  {
    slug: 'fancy-cording',
    name: 'Fancy & Sparkle Cording',
    count: '5+ Designs',
    desc: 'Galiter, diamond-cut and fancy cording for standout festive and fashion pieces.',
    img: '/images/cording7.png',
  },
  {
    slug: 'premium-jari',
    name: 'Premium Kasab Zari',
    count: '3+ Finishes',
    desc: 'Kasab, sequence chapat and diamond-finish zari for high-shine premium work.',
    img: '/images/jari8.png',
  },
  {
    slug: 'fine-nylon',
    name: 'Fine Gauge Nylon',
    count: '6 Gauges',
    desc: 'Precision nylon threads from 0.09mm to 0.16mm for delicate to heavy-duty work.',
    img: '/images/nylon6.png',
  },
];

// Local, dependency-free fallback — a small branded SVG data URI, using the
// site's amber palette so a missing/broken category photo still looks
// intentional instead of a blank box or a mismatched network placeholder.
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFFBEB'/%3E%3Ccircle cx='200' cy='120' r='40' fill='none' stroke='%23D97706' stroke-width='3' opacity='0.4'/%3E%3Cpath d='M170 140 L200 110 L230 140' fill='none' stroke='%23D97706' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='0.4'/%3E%3Ctext x='200' y='190' font-family='sans-serif' font-size='15' fill='%23D97706' text-anchor='middle' opacity='0.6'%3EPhoto coming soon%3C/text%3E%3C/svg%3E";

// ----------------------------------------------------------------------------
// Category card image — never cropped.
// ----------------------------------------------------------------------------
// object-cover was zooming/cropping tightly into the spool so only a sliver
// of it was ever visible. Switched to object-contain on a soft tinted
// backdrop (same technique as Products.jsx's ProductImage) so the whole
// photo is always visible, with a shimmer while loading and a graceful SVG
// fallback on error.
// ----------------------------------------------------------------------------
const CategoryImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 bg-amber-50">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 bg-[length:200%_100%] animate-[pc-shimmer_1.6s_ease-in-out_infinite]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        className="absolute inset-0 h-full w-full object-contain p-6 sm:p-8 transition-transform duration-500 group-hover:scale-105"
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

export default function ProductCategories() {
  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <ScrollToTop y={20}>
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">
              <span className="w-7 h-0.5 bg-amber-600" /> Our Categories
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Explore Our <span className="text-gold">Product Range</span>
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-sm sm:text-base">
              From cording and zari to precision nylon threads — everything your textile
              business needs, in one place.
            </p>
          </div>
        </ScrollToTop>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <ScrollToTop key={cat.slug} delay={(i % 3) * 0.12} y={26}>
              <Link
                to={`/products?category=${cat.slug}`}
                aria-label={`View ${cat.name} — ${cat.count}`}
                className="group relative block aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden rounded-2xl
                           shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                           focus:outline-none focus-visible:outline focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                <CategoryImage src={cat.img} alt={cat.name} />

                {/* Legibility scrim — always present, slightly deeper on hover.
                    A solid gradient block behind the text (not just the scrim)
                    keeps the caption readable even where the contained image
                    leaves light backdrop showing through. */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/10 to-transparent transition-opacity duration-300 group-hover:from-stone-900/95" />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/90 to-transparent p-5 pt-10 sm:p-6 sm:pt-12">
                  <div className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
                    {cat.count}
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-1 group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-snug line-clamp-2">
                    {cat.desc}
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute top-4 right-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full
                             bg-white/10 backdrop-blur-sm opacity-0 transition-opacity duration-300
                             group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </div>
              </Link>
            </ScrollToTop>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pc-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .group, .group * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}