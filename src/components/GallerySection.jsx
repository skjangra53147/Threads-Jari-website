
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Plus, X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import ScrollToTop from './ScrollToTop'


// ============================================================================
// IMAGES
// ----------------------------------------------------------------------------
// If any file here 404s or is the wrong/corrupt photo, the row no longer
// falls back to an external network call — the fallback is now a local,
// brand-colored inline SVG (see FALLBACK_SVG below), so a bad file degrades
// gracefully even with no internet access, and it never shows a mismatched
// placeholder photo. If the *content* of a file itself is wrong (not a load
// error), replace that file in your assets — no code change is needed here,
// the row will pick up the new file.
// ============================================================================
const GALLERY_IMAGES = [
  './images/image1.png',
  './images/image2.png',
  './images/image3.png',
  './images/image4.png',
  './images/image5.png',
  './images/image6.png',
  './images/image7.png',
  './images/image8.png',
  './images/image9.png',
  './images/image10.png',
  './images/image11.png',
  './images/image12.png',
  './images/image13.png',
  './images/image15.png',
  './images/image16.png',
  './images/image17.png',
  './images/image18.png',
  './images/image19.png',
]

// Local, dependency-free fallback — a small branded SVG data URI, using the
// site's amber palette so a broken image still looks intentional.
const FALLBACK_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FFFBEB'/%3E%3Ccircle cx='200' cy='120' r='40' fill='none' stroke='%23D97706' stroke-width='3' opacity='0.4'/%3E%3Cpath d='M170 140 L200 110 L230 140' fill='none' stroke='%23D97706' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='0.4'/%3E%3Ctext x='200' y='190' font-family='sans-serif' font-size='15' fill='%23D97706' text-anchor='middle' opacity='0.6'%3EPhoto unavailable%3C/text%3E%3C/svg%3E"

// Split one image pool into N rows, each with a different starting offset
// so the rows don't all show the same images lined up vertically.
const splitIntoRows = (images, rowCount) => {
  return Array.from({ length: rowCount }, (_, rowIndex) => {
    const offset = rowIndex * Math.ceil(images.length / rowCount)
    return [...images.slice(offset), ...images.slice(0, offset)]
  })
}

const ROWS_CONFIG = [
  { direction: 'left', durationSec: 42 },
  { direction: 'right', durationSec: 52 },
  { direction: 'left', durationSec: 60 },
]

const LIGHTBOX_TRANSITION_MS = 220

// ----------------------------------------------------------------------------
// A single thumbnail: fades in once loaded (with a soft shimmer placeholder
// behind it while it's loading), swaps to the local branded fallback if the
// source ever errors, and is hidden from assistive tech when it's part of
// the duplicated (visual-only) half of a marquee track.
// ----------------------------------------------------------------------------
const Thumb = ({ src, alt, onClick, isDuplicate }) => {
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => setLoaded(true)
  const handleError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = FALLBACK_SVG
    setLoaded(true)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate || undefined}
      aria-label={alt}
      className="group relative flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 aspect-[4/3] overflow-hidden rounded-xl
                 bg-amber-50 ring-1 ring-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
    >
      {/* Soft shimmer placeholder shown until the real photo has painted,
          so slow-loading rows never show a flat dead rectangle. */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 bg-[length:200%_100%] animate-[sn-shimmer_1.6s_ease-in-out_infinite]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable="false"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.45s ease' }}
        className="relative w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        onLoad={handleLoad}
        onError={handleError}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/0 to-stone-900/0 group-hover:from-stone-900/50 group-hover:to-stone-900/10 transition-all duration-300 flex items-center justify-center">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
          <Plus size={20} className="text-white" aria-hidden="true" />
        </div>
      </div>
    </button>
  )
}

// ----------------------------------------------------------------------------
// One infinitely-scrolling row. The track is rendered twice back-to-back and
// animated by exactly -50%, so the loop point is seamless. The second half
// is marked aria-hidden / untabbable since it's a visual duplicate.
// ----------------------------------------------------------------------------
const MarqueeRow = ({ images, direction, durationSec, isPaused, onImageClick, rowIndex }) => {
  const track = [...images, ...images]

  return (
    <div
      className="flex gap-3 md:gap-4 w-max will-change-transform"
      style={{
        animation: `sn-scroll-${direction} ${durationSec}s linear infinite`,
        animationPlayState: isPaused ? 'paused' : 'running',
      }}
    >
      {track.map((img, idx) => {
        const originalIdx = idx % images.length
        return (
          <Thumb
            key={`${rowIndex}-${idx}`}
            src={img}
            alt={`Shree Narayani Thread & Jari — moment ${originalIdx + 1}`}
            onClick={() => onImageClick(images[originalIdx])}
            isDuplicate={idx >= images.length}
          />
        )
      })}
    </div>
  )
}

// ----------------------------------------------------------------------------
// Lightbox for viewing a selected photo full-size with prev/next.
// Supports keyboard (Esc / arrows), touch swipe, and returns focus to the
// thumbnail that opened it when closed. Fades and scales in on open, and
// plays the same transition in reverse before actually unmounting, so it
// never just snaps in/out. Switching photos crossfades rather than popping.
// ----------------------------------------------------------------------------
const Lightbox = ({ images, activeSrc, activeIndex, onClose, onNavigate, returnFocusRef }) => {
  const closeBtnRef = useRef(null)
  const touchStartX = useRef(null)
  const [visible, setVisible] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const requestClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, LIGHTBOX_TRANSITION_MS)
  }, [onClose])

  useEffect(() => {
    // Defer to next frame so the initial render paints at opacity/scale 0
    // first, and the transition to visible actually has something to animate from.
    const raf = requestAnimationFrame(() => setVisible(true))

    // { preventScroll: true } is critical here — without it, some browsers
    // scroll the whole page to bring the focused close button into view,
    // which visually looks like the page jumping back up to the hero
    // section the instant the lightbox opens.
    closeBtnRef.current?.focus({ preventScroll: true })

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') requestClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    document.addEventListener('keydown', handleKeyDown)

    // Lock scroll the simple, reliable way: just prevent scrolling, without
    // ever moving the page (no position:fixed, no scrollY offset math).
    // The earlier position:fixed trick had to "fake" the scroll position and
    // restore it on close — on this site that restore was landing back at
    // the wrong spot (jumping to the hero section) because something else
    // on the page (e.g. the sticky/transparent navbar) also reacts to
    // scroll position. Since we never move the page now, there's nothing
    // to jump back to incorrectly — the page simply stays exactly where it was.
    const htmlStyle = document.documentElement.style
    const bodyStyle = document.body.style
    const prevHtmlOverflow = htmlStyle.overflow
    const prevBodyOverflow = bodyStyle.overflow

    htmlStyle.overflow = 'hidden'
    bodyStyle.overflow = 'hidden'

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', handleKeyDown)
      htmlStyle.overflow = prevHtmlOverflow
      bodyStyle.overflow = prevBodyOverflow
      returnFocusRef?.current?.focus?.({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reset the fade-in state on every photo switch so the new image
  // crossfades in rather than popping in at full opacity immediately.
  useEffect(() => {
    setImgLoaded(false)
  }, [activeSrc])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) onNavigate(delta > 0 ? -1 : 1)
    touchStartX.current = null
  }

  // NOTE: every visual property below is set with inline `style` rather than
  // Tailwind classes. This lightbox is rendered in a portal-like fixed
  // overlay on top of everything else, so it must never depend on whether
  // this particular file happens to be included in the project's Tailwind
  // content/purge scan — inline styles always work regardless of build config.
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(15, 15, 15, 0.92)',
    padding: '16px',
    opacity: visible ? 1 : 0,
    transition: `opacity ${LIGHTBOX_TRANSITION_MS}ms ease-out`,
  }

  const iconButtonStyle = (extra) => ({
    position: 'absolute',
    zIndex: 10000,
    width: 44,
    height: 44,
    borderRadius: '9999px',
    border: 'none',
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s ease, transform 0.15s ease',
    ...extra,
  })

  const figureStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    transform: visible ? 'scale(1)' : 'scale(0.95)',
    transition: `transform ${LIGHTBOX_TRANSITION_MS}ms ease-out`,
    maxWidth: '90vw',
  }

  const imgStyle = {
    maxHeight: '80vh',
    maxWidth: '90vw',
    borderRadius: 12,
    boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
    objectFit: 'contain',
    userSelect: 'none',
    opacity: imgLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-out',
    display: 'block',
  }

  return createPortal(
    <div
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-label="View photo"
      onClick={requestClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        ref={closeBtnRef}
        onClick={requestClose}
        aria-label="Close"
        style={iconButtonStyle({ top: 16, right: 16 })}
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNavigate(-1) }}
        aria-label="Previous photo"
        style={iconButtonStyle({ left: 12, top: '50%', transform: 'translateY(-50%)' })}
      >
        <ChevronLeft size={22} />
      </button>

      <figure style={figureStyle} onClick={(e) => e.stopPropagation()}>
        <img
          key={activeSrc}
          src={activeSrc}
          alt="Shree Narayani Thread & Jari — moment"
          style={imgStyle}
          draggable="false"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = FALLBACK_SVG
            setImgLoaded(true)
          }}
        />
        {images.length > 0 && (
          <figcaption style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, letterSpacing: '0.02em' }}>
            {activeIndex + 1} / {images.length}
          </figcaption>
        )}
      </figure>

      <button
        onClick={(e) => { e.stopPropagation(); onNavigate(1) }}
        aria-label="Next photo"
        style={iconButtonStyle({ right: 12, top: '50%', transform: 'translateY(-50%)' })}
      >
        <ChevronRight size={22} />
      </button>
    </div>,
    document.body
  )
}

// ----------------------------------------------------------------------------
// Main section
// ----------------------------------------------------------------------------
const GallerySection = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeSrc, setActiveSrc] = useState(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const lastFocusedRef = useRef(null)
  const sectionRef = useRef(null)

  // Respect the user's OS-level motion preference automatically.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(query.matches)
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Reveals the heading block with a gentle fade + rise the first time the
  // section scrolls into view, instead of it just sitting there static on
  // load. Skipped entirely under reduced-motion.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const rows = useMemo(() => splitIntoRows(GALLERY_IMAGES, ROWS_CONFIG.length), [])
  const flatImages = useMemo(() => rows.flat(), [rows])
  const activeIndex = flatImages.indexOf(activeSrc)

  const openImage = useCallback((src) => {
    lastFocusedRef.current = document.activeElement
    setActiveSrc(src)
  }, [])

  const navigate = useCallback((delta) => {
    setActiveSrc((current) => {
      const idx = flatImages.indexOf(current)
      if (idx === -1) return current
      const next = (idx + delta + flatImages.length) % flatImages.length
      return flatImages[next]
    })
  }, [flatImages])

  const paused = isPaused || prefersReducedMotion

  return (
    <section ref={sectionRef} className="section-pad bg-white overflow-hidden" aria-labelledby="gallery-heading">
      {/* Keyframes for the two scroll directions and the thumbnail shimmer.
          Rendered once, scoped by unique names. */}
      <style>{`
        @keyframes sn-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes sn-scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes sn-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="container-max">
        <div
          className={`text-center mb-10 sm:mb-12 md:mb-14 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* Same "eyebrow" pattern used in AboutPreview: short amber dash + label, centered here */}
          <div className="eyebrow justify-center">
            <span className="w-7 h-0.5 bg-amber-600" /> Our Gallery
          </div>
          <h2 id="gallery-heading" className="text-4xl sm:text-5xl font-bold text-stone-900 mb-5 leading-tight">
            Threads &amp; Zari, <span className="text-gold">Crafted with Care</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            A glimpse inside Shree Narayani Thread &amp; Jari — our production floor, raw materials,
            finished spools, and the craftsmanship behind every batch we ship across India.
          </p>
        </div>
      </div>

      {/* Full-bleed scrolling rows — intentionally break out of container-max so images run edge-to-edge */}
      <div
        className={`relative space-y-3 md:space-y-4 transition-all duration-700 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* Edge fades so images feel like they're flowing in/out, not clipped */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {rows.map((rowImages, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden">
            <MarqueeRow
              images={rowImages}
              direction={ROWS_CONFIG[rowIndex].direction}
              durationSec={ROWS_CONFIG[rowIndex].durationSec}
              isPaused={paused}
              onImageClick={openImage}
              rowIndex={rowIndex}
            />
          </div>
        ))}
      </div>

      <ScrollToTop className="container-max mt-6 md:mt-8 flex justify-center">
        <button
          onClick={() => setIsPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-500 hover:text-amber-600 transition-colors px-3 py-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          {paused ? 'Resume scrolling' : 'Pause scrolling'}
        </button>
      </ScrollToTop>

      {activeSrc && (
        <Lightbox
          images={flatImages}
          activeSrc={activeSrc}
          activeIndex={activeIndex}
          onClose={() => setActiveSrc(null)}
          onNavigate={navigate}
          returnFocusRef={lastFocusedRef}
        />
      )}
    </section>
  )
}

export default GallerySection