import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';

// ----------------------------------------------------------------------------
// Single source of truth for the top-bar / mobile-menu contact snippet.
// Kept identical to Contact.jsx and CTABanner.jsx — if these ever change,
// update all three files together so the whole site stays consistent.
// ----------------------------------------------------------------------------
const PRIMARY_PHONE = '+91 97288 25494'
const LOCATION_LABEL = 'Adajan, Surat, Gujarat'

// Legal is now a grouping dropdown (Privacy Policy + Terms & Conditions)
// instead of two separate flat links, same pattern used on our other site.
const navLinks = [
  { name: 'Home',         path: '/' },
  { name: 'About',        path: '/about' },
  { name: 'Products',     path: '/products' },
  { name: 'Services',     path: '/services' },
  { name: 'Testimonials', path: '/testimonials' },
  {
    name: 'Legal',
    path: '/privacy-policy',
    dropdownItems: [
      { name: 'Privacy Policy',      path: '/privacy-policy' },
      { name: 'Terms & Conditions',  path: '/terms-conditions' },
    ],
  },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)
  const location = useLocation()
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setActiveMobileDropdown(null)
  }, [location])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close an open desktop dropdown on outside click / Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveDropdown(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const isActive = useCallback(
    (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)),
    [location.pathname]
  )

  const isItemActive = (item) =>
    item.dropdownItems ? item.dropdownItems.some(d => isActive(d.path)) : isActive(item.path)

  return (
    <>
      {/* Top Bar */}
      <div className="bg-stone-900 text-stone-300 py-2 px-4 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <Phone size={12} className="text-amber-500" />
              {PRIMARY_PHONE}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-amber-500" />
              {LOCATION_LABEL}
            </span>
          </div>
          <div className="flex items-center gap-3 text-stone-500">
            <span>GST: 24*******1ZE</span>
            <span className="text-amber-700">|</span>
            <span>Est. 2023</span>
          </div>
        </div>
      </div>

      {/* Main Nav — always a solid white bar, on every page including the home hero */}
      <nav
        ref={navRef}
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-500 ${
          scrolled ? 'shadow-md py-2.5' : 'shadow-sm py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 flex justify-between items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0 min-w-0">
            <img
              src="/images/logo.png"
              alt="Shree Narayani Thread & Jari logo"
              width={44}
              height={44}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover ring-2 ring-amber-600/20 shadow-sm transition-all duration-300 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="font-serif font-bold text-sm sm:text-base leading-tight text-stone-900 transition-colors truncate">
                Shree Narayani
              </p>
              <p className="text-[9px] sm:text-[10px] tracking-widest uppercase text-amber-600 transition-colors truncate">
                Thread &amp; Jari
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-shrink-0">
            {navLinks.map((link, index) => {
              const hasDropdown = !!link.dropdownItems
              const dropdownOpen = activeDropdown === index
              const active = isItemActive(link)

              if (!hasDropdown) {
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive: navActive }) =>
                      `px-3 xl:px-3.5 py-2 text-[13px] font-semibold uppercase whitespace-nowrap transition-all duration-300 relative group
                      ${navActive ? 'text-amber-600' : 'text-stone-700 hover:text-amber-600'}`
                    }
                  >
                    {({ isActive: navActive }) => (
                      <>
                        {link.name}
                        <span className={`absolute -bottom-0.5 left-3 right-3 xl:left-3.5 xl:right-3.5 h-0.5 bg-amber-500 transition-all duration-300 ${
                          navActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`} />
                      </>
                    )}
                  </NavLink>
                )
              }

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(dropdownOpen ? null : index)}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                    className={`flex items-center gap-1 px-3 xl:px-3.5 py-2 text-[13px] font-semibold uppercase whitespace-nowrap transition-all duration-300 relative group
                      ${active ? 'text-amber-600' : 'text-stone-700 hover:text-amber-600'}`}
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                    <span className={`absolute -bottom-0.5 left-3 right-3 xl:left-3.5 xl:right-3.5 h-0.5 bg-amber-500 transition-all duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50">
                      <div className="relative min-w-[220px] overflow-hidden rounded-xl border border-stone-100 bg-white py-2 shadow-2xl">
                        {/* little triangle pointer */}
                        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-stone-100 bg-white" />
                        <ul role="menu">
                          {link.dropdownItems.map((d) => (
                            <li key={d.path} role="none">
                              <NavLink
                                role="menuitem"
                                to={d.path}
                                className={({ isActive: navActive }) =>
                                  `block px-5 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                    navActive
                                      ? 'bg-amber-50 text-amber-700'
                                      : 'text-stone-700 hover:bg-amber-50 hover:text-amber-700'
                                  }`
                                }
                              >
                                {d.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <Link
            to="/contact"
            className="hidden lg:inline-flex bg-amber-600 hover:bg-amber-700 text-white text-[13px] font-semibold uppercase rounded-full py-2.5 px-5 whitespace-nowrap shadow-md shadow-amber-600/20 transition-colors duration-300 ml-2 xl:ml-3"
          >
            Get Quote
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 rounded-lg transition-colors flex-shrink-0 text-stone-800 hover:bg-stone-100"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ===== Full-Screen Mobile Menu Overlay — white themed, matches the rest of the site ===== */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-white transition-all duration-500 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
      >
        {/* subtle warm glow accents, kept soft on a white background */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative h-full flex flex-col px-6 pt-6 pb-8 overflow-y-auto">
          {/* Header row: same logo as desktop + Close button */}
          <div className="flex items-center justify-between mb-6 border-b border-stone-200 pb-5">
            <Link to="/" className="flex items-center gap-3 min-w-0">
              <img
                src="/images/logo.png"
                alt="Shree Narayani Thread & Jari logo"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-600/20 shadow-sm flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-serif font-bold text-lg leading-tight text-stone-900 truncate">Shree Narayani</p>
                <p className="text-xs tracking-widest uppercase text-amber-600 truncate">Thread &amp; Jari</p>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 transition-colors flex-shrink-0"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Big Nav Links — starts from the top so Home/About are never hidden above the fold on short screens */}
          <div className="flex-1 flex flex-col justify-start gap-0.5 overflow-y-auto">
            {navLinks.map((link, i) => {
              const hasDropdown = !!link.dropdownItems
              const mobileOpenState = activeMobileDropdown === i
              const active = isItemActive(link)

              if (!hasDropdown) {
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive: navActive }) =>
                      `group py-3 border-b border-stone-200 transition-colors ${
                        navActive ? 'text-amber-600' : 'text-stone-800'
                      }`
                    }
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <span className="text-base sm:text-xl font-serif font-semibold tracking-wide group-hover:text-amber-600 transition-colors">
                      {link.name}
                    </span>
                  </NavLink>
                )
              }

              return (
                <div key={link.name} className="border-b border-stone-200">
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={link.path}
                      end
                      className={`flex-1 py-3 text-base sm:text-xl font-serif font-semibold tracking-wide transition-colors ${
                        active ? 'text-amber-600' : 'text-stone-800 hover:text-amber-600'
                      }`}
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      {link.name}
                    </NavLink>
                    <button
                      onClick={() => setActiveMobileDropdown(mobileOpenState ? null : i)}
                      aria-expanded={mobileOpenState}
                      aria-label={`Toggle ${link.name} submenu`}
                      className="p-3 text-stone-500"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${mobileOpenState ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      mobileOpenState ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <ul className="overflow-hidden">
                      {link.dropdownItems.map((d) => (
                        <li key={d.path}>
                          <NavLink
                            to={d.path}
                            className={({ isActive: navActive }) =>
                              `block py-2.5 pl-4 text-sm font-medium transition-colors ${
                                navActive ? 'text-amber-600' : 'text-stone-600 hover:text-amber-600'
                              }`
                            }
                          >
                            {d.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom: CTA + Contact info */}
          <div className="mt-4 space-y-5 flex-shrink-0">
            <Link
              to="/contact"
              className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-semibold uppercase tracking-wide text-sm py-4 rounded-full transition-colors shadow-md shadow-amber-600/20"
            >
              Get Quote →
            </Link>

            <div className="flex flex-col gap-2 text-sm text-stone-500">
              <a href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-amber-700 transition-colors w-fit">
                <Phone size={14} className="text-amber-600" />
                {PRIMARY_PHONE}
              </a>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-amber-600" />
                {LOCATION_LABEL}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}