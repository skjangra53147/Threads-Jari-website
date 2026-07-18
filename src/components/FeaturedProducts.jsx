
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';
import EnquiryModal from './EnquiryModal';
import ScrollToTop from './ScrollToTop'; // ScrollReveal wrapper


// ----------------------------------------------------------------------------
// FEATURED PRODUCTS
// ----------------------------------------------------------------------------
// Layout matches the approved design exactly (image → badge → star rating →
// title → desc → price → Enquire).
//
// NOTE — price & rating are PLACEHOLDER DUMMY VALUES, not real data:
//   • `price` isn't wired to any real pricing system (bulk/per-client
//     pricing varies — see Products.jsx).
//   • `rating` isn't wired to any real review system.
// Swap these for real numbers the moment they exist; until then they're
// just there to match the visual design. `img` follows the same
// /public/images/<file>.png convention as Products.jsx, so these pick up
// real product photos automatically.
// ----------------------------------------------------------------------------
const FEATURED_PRODUCTS = [
  {
    id: 'kasab-jari-180d',
    name: 'Kasab Jari 180D',
    price: '₹1,250/kg', // placeholder — replace with real price
    badge: 'Best Seller',
    rating: 4.9, // placeholder — replace with real rating
    img: '/public/images/jari1.png',
    desc: 'Premium 180 denier kasab jari, prized for its rich metallic shine.',
  },
  {
    id: 'nylon-jari-110d',
    name: 'Nylon Jari 110D',
    price: '₹1,100/kg', // placeholder — replace with real price
    badge: 'Popular',
    rating: 4.8, // placeholder — replace with real rating
    img: '/public/images/jari2.png',
    desc: '110 denier nylon jari offering strength with a fine, smooth finish.',
  },
  {
    id: 'galiter-cording',
    name: 'Galiter Cording',
    price: '₹1,500/kg', // placeholder — replace with real price
    badge: 'Trending',
    rating: 4.9, // placeholder — replace with real rating
    img: '/public/images/cording7.png',
    desc: 'Glittery galiter cording with a bright, eye-catching sparkle.',
  },
];

// Local, dependency-free fallback — matches Products.jsx, so a missing
// photo still looks intentional instead of a blank/broken box.
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFFBEB'/%3E%3Ccircle cx='200' cy='120' r='40' fill='none' stroke='%23D97706' stroke-width='3' opacity='0.4'/%3E%3Cpath d='M170 140 L200 110 L230 140' fill='none' stroke='%23D97706' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='0.4'/%3E%3Ctext x='200' y='190' font-family='sans-serif' font-size='15' fill='%23D97706' text-anchor='middle' opacity='0.6'%3EPhoto coming soon%3C/text%3E%3C/svg%3E";

const FeaturedImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-amber-50">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 bg-[length:200%_100%] animate-[fp-shimmer_1.6s_ease-in-out_infinite]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
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

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openEnquiry = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeEnquiry = () => {
    setModalOpen(false);
    // Wait for the close transition before clearing the product, so the
    // modal doesn't visibly flash empty while it's fading out.
    setTimeout(() => setSelectedProduct(null), 200);
  };

  return (
    <section className="section-pad bg-stone-50">
      <div className="container-max">
        <ScrollToTop y={20}>
          <div className="text-center mb-12">
            <div className="eyebrow justify-center">
              <span className="w-7 h-0.5 bg-amber-600" /> Featured Products
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Premium <span className="text-gold">Thread Collection</span>
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base">
              Discover our most popular zari threads and fancy cords, trusted by leading
              textile manufacturers.
            </p>
          </div>
        </ScrollToTop>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {FEATURED_PRODUCTS.map((p, i) => (
            <ScrollToTop key={p.id} delay={i * 0.12} y={28}>
              <div
                className="card group overflow-hidden rounded-2xl border border-stone-100 bg-white
                           shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <FeaturedImage src={p.img} alt={p.name} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                      {p.badge}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm text-stone-500">{p.rating}</span>
                  </div>
                  <h3 className="mb-2 font-serif text-base sm:text-lg font-bold text-stone-900 transition-colors group-hover:text-amber-700">
                    {p.name}
                  </h3>
                  <p className="mb-4 text-sm text-stone-500">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-700">{p.price}</span>
                    <button
                      type="button"
                      onClick={() => openEnquiry(p)}
                      className="flex items-center gap-1 text-sm font-medium text-amber-600 transition-colors hover:text-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                    >
                      Enquire <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollToTop>
          ))}
        </div>

        <ScrollToTop delay={0.4} y={16}>
          <div className="mt-12 text-center">
            <Link to="/products" className="btn-outline">
              View All Products <ChevronRight size={16} />
            </Link>
          </div>
        </ScrollToTop>
      </div>

      <style>{`
        @keyframes fp-shimmer {
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

      <EnquiryModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={closeEnquiry}
      />
    </section>
  );
}