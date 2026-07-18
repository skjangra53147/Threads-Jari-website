

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Home, Package, Star } from 'lucide-react';
import ScrollReveal from '../components/ScrollToTop';
import EnquiryModals from '../components/EnquiryModals';

const CATEGORIES = [
  { id: 'all',     name: 'All Products' },
  { id: 'cording', name: 'Cording Threads' },
  { id: 'jari',    name: 'Zari (Jari) Threads' },
  { id: 'nylon',   name: 'Nylon Threads' },
]

// Local, dependency-free fallback — a small branded SVG data URI, using the
// site's amber palette so a missing/broken product photo still looks
// intentional instead of a blank box or a mismatched network placeholder.
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFFBEB'/%3E%3Ccircle cx='200' cy='120' r='40' fill='none' stroke='%23D97706' stroke-width='3' opacity='0.4'/%3E%3Cpath d='M170 140 L200 110 L230 140' fill='none' stroke='%23D97706' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='0.4'/%3E%3Ctext x='200' y='190' font-family='sans-serif' font-size='15' fill='%23D97706' text-anchor='middle' opacity='0.6'%3EPhoto coming soon%3C/text%3E%3C/svg%3E"

// ----------------------------------------------------------------------------
// PRODUCT CATALOG
// ----------------------------------------------------------------------------
// `img` follows a predictable /images/products/<slug>.png pattern — drop your
// real product photos into public/images/products/ using these exact
// filenames and they'll pick up automatically.
//
// `price` and `rating` are PLACEHOLDER DUMMY VALUES added purely to match
// the approved card design — they are NOT wired to any real pricing or
// review system (bulk/per-client pricing genuinely varies). Replace them
// with real numbers the moment they exist. `badge` is only set on a
// handful of items as a merchandising accent, same as the design reference.
// ----------------------------------------------------------------------------
const PRODUCTS = [
  // ── Cording Threads ──
  { id: 1,  name: 'Pita Cording',        cat: 'cording', img: '/public/images/cording2.png',
    price: '₹950/kg', rating: 4.7, badge: 'Popular', // placeholder — replace with real data
    desc: 'Classic flat pita cording, widely used for borders and decorative trims.' },
  { id: 2,  name: 'Vall Cording',        cat: 'cording', img: '/public/images/cording1.png',
    price: '₹880/kg', rating: 4.6, // placeholder — replace with real data
    desc: 'Twisted vall cording with a smooth, even finish for everyday embroidery work.' },
  { id: 3,  name: 'Kat Cording',         cat: 'cording', img: '/public/images/cording3.png',
    price: '₹820/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Fine kat cording, popular for lightweight embellishment and edging.' },
  { id: 4,  name: 'Jardosi Cording',     cat: 'cording', img: '/public/images/cording4.png',
    price: '₹1,050/kg', rating: 4.7, // placeholder — replace with real data
    desc: 'Rich jardosi-finish cording that adds a traditional, festive shine.' },
  { id: 5,  name: 'Battan Cording',      cat: 'cording', img: '/public/images/cording5.png',
    price: '₹900/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Sturdy battan cording built for durable decorative applications.' },
  { id: 6,  name: 'Fancy Cording',       cat: 'cording', img: '/public/images/cording6.png',
    price: '₹1,150/kg', rating: 4.8, // placeholder — replace with real data
    desc: 'Multi-colour fancy cording for standout fashion and festive designs.' },
  { id: 7,  name: 'Galiter Cording',     cat: 'cording', img: '/public/images/cording7.png',
    price: '₹1,500/kg', rating: 4.9, badge: 'Trending', // placeholder — replace with real data
    desc: 'Glittery galiter cording with a bright, eye-catching sparkle.' },
  { id: 8,  name: 'Galiter Jardosi',     cat: 'cording', img: '/public/images/cording8.png',
    price: '₹1,350/kg', rating: 4.6, // placeholder — replace with real data
    desc: 'Galiter and jardosi combination finish for a richer, layered shine.' },
  { id: 9,  name: 'Galiter TPM',         cat: 'cording', img: '/public/images/cording9.png',
    price: '₹1,300/kg', rating: 4.6, // placeholder — replace with real data
    desc: 'Galiter TPM cording, a fine-twist variant suited to detailed embroidery.' },
  { id: 10, name: 'Salmo Cording',       cat: 'cording', img: '/public/images/cording10.png',
    price: '₹880/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Smooth salmo cording in warm tones, ideal for traditional wear.' },
  { id: 11, name: 'Diamond Cording',     cat: 'cording', img: '/public/images/cording11.png',
    price: '₹1,600/kg', rating: 4.8, // placeholder — replace with real data
    desc: 'Diamond-cut cording with a faceted sparkle for premium finishes.' },
  { id: 12, name: 'Jutt TPM',            cat: 'cording', img: '/public/images/cording12.png',
    price: '₹950/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Textured jutt TPM cording woven for a distinct multi-tone look.' },
  { id: 13, name: 'Bullet Dori',         cat: 'cording', img: '/public/images/cording13.png',
    price: '₹1,020/kg', rating: 4.6, // placeholder — replace with real data
    desc: 'Beaded bullet dori with a rounded, uniform bead pattern.' },
  { id: 14, name: 'Bullet TPM',          cat: 'cording', img: '/public/images/cording14.png',
    price: '₹1,080/kg', rating: 4.6, // placeholder — replace with real data
    desc: 'Bullet TPM cording combining bead texture with twisted strength.' },
  { id: 15, name: 'Anarkali Cording',    cat: 'cording', img: '/public/images/cording15.png',
    price: '₹1,200/kg', rating: 4.7, // placeholder — replace with real data
    desc: 'Anarkali-style cording, a graceful finish suited to ethnic garments.' },

  // ── Zari (Jari) Threads ──
  { id: 16, name: 'Kasab Jari 180D',        cat: 'jari', img: '/public/images/jari1.png',
    price: '₹1,250/kg', rating: 4.9, badge: 'Best Seller', // placeholder — replace with real data
    desc: 'Premium 180 denier kasab jari, prized for its rich metallic shine.' },
  { id: 17, name: 'Nylon Jari 110D',        cat: 'jari', img: '/public/images/jari2.png',
    price: '₹1,100/kg', rating: 4.8, // placeholder — replace with real data
    desc: '110 denier nylon jari offering strength with a fine, smooth finish.' },
  { id: 18, name: 'Neem Jari',              cat: 'jari', img: '/public/images/jari3.png',
    price: '₹980/kg', rating: 4.6, // placeholder — replace with real data
    desc: 'Neem jari with a soft, subtle sheen for everyday embroidery.' },
  { id: 19, name: 'Rasal Jari',             cat: 'jari', img: '/public/images/jari4.png',
    price: '₹1,020/kg', rating: 4.6, // placeholder — replace with real data
    desc: 'Rasal jari known for its smooth texture and consistent finish.' },
  { id: 20, name: 'Chapat Jari',            cat: 'jari', img: '/public/images/jari5.png',
    price: '₹1,080/kg', rating: 4.7, // placeholder — replace with real data
    desc: 'Flat chapat jari, well suited to broad decorative embroidery work.' },
  { id: 21, name: 'Sequence Chapat Jari',   cat: 'jari', img: '/public/images/jari6.png',
    price: '₹1,300/kg', rating: 4.8, // placeholder — replace with real data
    desc: 'Chapat jari with a sequence-style shimmer for statement pieces.' },
  { id: 22, name: 'Multi Colour Jari',      cat: 'jari', img: '/public/images/jari7.png',
    price: '₹1,150/kg', rating: 4.7, // placeholder — replace with real data
    desc: 'Multi-colour jari for vibrant, contemporary embroidery designs.' },
  { id: 23, name: 'Diamond Jari',           cat: 'jari', img: '/public/images/jari8.png',
    price: '₹1,450/kg', rating: 4.9, // placeholder — replace with real data
    desc: 'Diamond-finish jari with a faceted, high-shine appearance.' },

  // ── Nylon Threads ──
  { id: 24, name: 'Nylon Mono',              cat: 'nylon', img: '/public/images/nylon1.png',
    price: '₹650/kg', rating: 4.6, badge: 'New', // placeholder — replace with real data
    desc: 'Monofilament nylon thread valued for its strength and clarity.' },
  { id: 25, name: 'Polyester Nylon 0.11mm',  cat: 'nylon', img: '/public/images/nylon2.png',
    price: '₹700/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Polyester-nylon blend at 0.11mm gauge for fine, precise work.' },
  { id: 26, name: 'Polyester Nylon 0.10mm',  cat: 'nylon', img: '/public/images/nylon3.png',
    price: '₹680/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Polyester-nylon blend at 0.10mm gauge for lightweight applications.' },
  { id: 27, name: 'Nylon 0.12mm',            cat: 'nylon', img: '/public/images/nylon4.png',
    price: '₹620/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Standard 0.12mm nylon thread, a versatile everyday gauge.' },
  { id: 28, name: 'Nylon 0.14mm',            cat: 'nylon', img: '/public/images/nylon5.png',
    price: '₹660/kg', rating: 4.6, // placeholder — replace with real data
    desc: '0.14mm nylon thread offering extra strength for heavier work.' },
  { id: 29, name: 'Nylon 0.16mm',            cat: 'nylon', img: '/public/images/nylon6.png',
    price: '₹700/kg', rating: 4.6, // placeholder — replace with real data
    desc: '0.16mm nylon thread, our thickest gauge for demanding applications.' },
  { id: 30, name: 'Nylon 0.09mm',            cat: 'nylon', img: '/public/images/nylon7.png',
    price: '₹600/kg', rating: 4.5, // placeholder — replace with real data
    desc: 'Fine 0.09mm nylon thread suited to delicate, detailed embroidery.' },
]

// ----------------------------------------------------------------------------
// Product image — responsive, never cropped
// ----------------------------------------------------------------------------
// Key changes from the previous version:
//   1. A fixed pixel height (h-48 / h-52) is replaced with an aspect-ratio
//      box. Aspect ratio scales fluidly with the card's width at *every*
//      screen size, instead of jumping between two fixed heights.
//   2. object-cover (which crops/zooms the photo to fill the box) is
//      replaced with object-contain on a soft tinted backdrop, so the
//      whole product photo is always visible — nothing gets cut off.
//   3. `sizes` tells the browser roughly how large the image will render at
//      each breakpoint, matching the grid below (1 / 2 / 3 / 4 columns),
//      so mobile devices don't download unnecessarily large images.
// ----------------------------------------------------------------------------
const ProductImage = ({ src, alt, badge }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-amber-50">
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 bg-[length:200%_100%] animate-[sn-product-shimmer_1.6s_ease-in-out_infinite]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
        className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = FALLBACK_IMG
          setLoaded(true)
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {badge && (
        <span className="absolute top-4 left-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          {badge}
        </span>
      )}
    </div>
  )
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // ---- Enquiry modal state ----
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openEnquiry = (product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const closeEnquiry = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 200)
  }

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return PRODUCTS.filter(p => {
      const matchesCat = activeCategory === 'all' || p.cat === activeCategory
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="products-header relative overflow-hidden bg-[url('/images/image15.png')] bg-cover bg-center bg-no-repeat px-4 py-10 sm:py-12 md:py-14">
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
          className="products-header__thread absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="productsThreadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0" />
              <stop offset="20%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="80%" stopColor="#F5A623" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="products-header__thread-path"
            d="M0,42 Q 240,10 480,38 T 960,34 T 1440,44"
            fill="none"
            stroke="url(#productsThreadGrad)"
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
            <span className="font-medium text-amber-300">Products</span>
          </nav>

          {/* Icon badge */}
          <div className="products-header__badge mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-900/40 ring-1 ring-amber-200/40">
            <Package className="h-5 w-5 text-stone-900" strokeWidth={2.25} />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
            Products
          </p>

          <h1 className="font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-bold leading-tight text-white">
            Our{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Products
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base md:text-lg">
            Explore our complete range of cording threads, zari threads, and nylon threads.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="products-header__dot h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-stone-300 sm:text-sm">
              {PRODUCTS.length}+ products available
            </span>
          </div>
        </div>

        <style>{`
          .products-header__thread-path {
            stroke-dasharray: 1600;
            stroke-dashoffset: 1600;
            animation: productsThreadDraw 2.2s ease-out 0.15s forwards;
          }
          @keyframes productsThreadDraw {
            to { stroke-dashoffset: 0; }
          }
          .products-header__badge {
            animation: productsBadgeIn 0.6s ease-out both;
          }
          @keyframes productsBadgeIn {
            from { opacity: 0; transform: translateY(-6px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .products-header__dot {
            animation: productsDotPulse 2s ease-in-out infinite;
          }
          @keyframes productsDotPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.35; }
          }
          @keyframes sn-product-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @media (prefers-reduced-motion: reduce) {
            .products-header__thread-path,
            .products-header__badge,
            .products-header__dot {
              animation: none !important;
              stroke-dashoffset: 0 !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Search & Filter */}
          <ScrollReveal className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search products"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-white text-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product categories">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 ${
                    activeCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25'
                      : 'bg-white text-stone-600 hover:bg-amber-50 border border-stone-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Result Count */}
          <p className="text-stone-500 text-sm mb-7">
            Showing <strong className="text-stone-800">{filtered.length}</strong> of{' '}
            <strong className="text-stone-800">{PRODUCTS.length}</strong> products
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filtered.map((p, i) => (
                <ScrollReveal key={p.id} delay={Math.min(i % 4, 3) * 0.08} y={16}>
                  <div
                    className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full"
                  >
                    <ProductImage src={p.img} alt={p.name} badge={p.badge} />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-stone-500">{p.rating}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-stone-500 text-xs mb-4 line-clamp-2 flex-1">{p.desc}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-bold text-amber-700">{p.price}</span>
                        <button
                          onClick={() => openEnquiry(p)}
                          className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                        >
                          Enquire <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="w-14 h-14 text-stone-300 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-stone-600 mb-2">No products found</h3>
              <p className="text-stone-400 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* CTA */}
          <ScrollReveal className="mt-14 sm:mt-16 bg-amber-50 rounded-3xl p-8 sm:p-10 md:p-12 border border-amber-100 text-center">
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              Can't find what you're looking for?
            </h3>
            <p className="text-stone-600 mb-7 max-w-lg mx-auto text-sm sm:text-base">
              We offer custom manufacturing for specific thread requirements. Share your specifications and we'll create the perfect solution.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full px-8 sm:px-10 py-3.5 sm:py-4 shadow-md shadow-amber-600/20 transition-colors duration-300">
              Request Custom Order <ChevronRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Enquiry Popup */}
      <EnquiryModals
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={closeEnquiry}
      />
    </div>
  )
}