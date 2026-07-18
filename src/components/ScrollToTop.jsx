// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function ScrollToTop() {
//   const { pathname } = useLocation()
//   useEffect(() => { window.scrollTo(0, 0) }, [pathname])
//   return null
// }       






import React, { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------------------
// ScrollReveal
// ----------------------------------------------------------------------------
// A tiny, dependency-free wrapper that fades + slides its children in the
// first time they scroll into view. Nothing else about the wrapped content
// changes — it just adds a smooth entrance animation.
//
// - Respects prefers-reduced-motion (content shows immediately, no motion).
// - Only animates once per element (unobserves itself after revealing).
// - Uses plain inline styles/transitions, so it needs no extra CSS file and
//   won't clash with existing animations already defined in each page
//   (e.g. the header thread-line draw, badge, and pulsing dot).
// ----------------------------------------------------------------------------
export default function ScrollToTop({ children, className = '', delay = 0, y = 24, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
