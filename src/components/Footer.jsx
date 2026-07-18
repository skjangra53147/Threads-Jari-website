
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, ArrowUp } from 'lucide-react';
import ScrollToTop from './ScrollToTop';


const quickLinks = [
  { name: 'Home',               path: '/' },
  { name: 'About Us',           path: '/about' },
  { name: 'Products',           path: '/products' },
  { name: 'Services',           path: '/services' },
  { name: 'Testimonials',       path: '/testimonials' },
  { name: 'Terms & Conditions', path: '/terms-conditions' },
  { name: 'Privacy Policy',     path: '/privacy-policy' },
  { name: 'Contact',            path: '/contact' },
]

const products = [
  'Gold Zari Thread', 'Silver Zari Thread',
  'Polyester Zari', 'Nylon Zari',
  'Cording Threads', 'Fancy Cords',
]

// ----------------------------------------------------------------------------
// Contact details — kept in one place so Footer, Navbar, and the Contact
// page all stay in sync. Confirmed current address/numbers (Adajan, Surat).
// ----------------------------------------------------------------------------
const CONTACT = {
  addressLines: ['New Rander Road, Muktanand Nagar,', 'Adajan, Surat, Gujarat'],
  phones: ['+91 97288 25494', '+91 99745 87475'],
  emails: ['info@narayanijari.com', 'info@shreenarayani.com'],
}

const SocialIcon = ({ children, label, href = '#' }) => (
  
  <a  href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-stone-400 transition-all duration-300 hover:bg-amber-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
  >
    {children}
  </a>
)

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Only show the scroll-to-top button once the user has actually scrolled
  // down a bit, instead of it sitting there from the very first paint.
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScrollTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mb-14 lg:grid-cols-4">

          {/* Brand */}
          <ScrollToTop y={16} className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="mb-5 flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded-lg w-fit">
              <img
                src="/images/logo.png"
                alt="Shree Narayani Thread & Jari logo"
                width={44}
                height={44}
                className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-amber-500/20"
              />
              <div>
                <p className="font-serif text-lg font-bold text-white">Shree Narayani</p>
                <p className="text-xs uppercase tracking-widest text-amber-500">Thread & Jari</p>
              </div>
            </Link>
            <p className="mb-5 max-w-sm text-sm leading-relaxed text-stone-400">
              Premium manufacturer of zari threads, cording threads, and embroidery materials.
              Crafting excellence since 2023 from Surat, Gujarat.
            </p>
            <div className="flex gap-3">
              <SocialIcon label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </SocialIcon>
            </div>
          </ScrollToTop>

          {/* Quick Links */}
          <ScrollToTop y={16} delay={0.08}>
            <h4 className="mb-5 text-base font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-700 transition-colors group-hover:bg-amber-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollToTop>

          {/* Products */}
          <ScrollToTop y={16} delay={0.16}>
            <h4 className="mb-5 text-base font-semibold text-white">Our Products</h4>
            <ul className="space-y-2.5">
              {products.map(p => (
                <li key={p}>
                  <Link
                    to="/products"
                    className="group flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-700 transition-colors group-hover:bg-amber-400" />
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollToTop>

          {/* Contact */}
          <ScrollToTop y={16} delay={0.24}>
            <h4 className="mb-5 text-base font-semibold text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                <span className="text-sm leading-relaxed text-stone-400">
                  {CONTACT.addressLines.map((line) => (
                    <React.Fragment key={line}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </li>
              <li className="flex flex-col gap-1.5">
                {CONTACT.phones.map((phone) => (
                  
                 <a   key={phone}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 text-sm text-stone-400 transition-colors hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                  >
                    <Phone className="h-4 w-4 flex-shrink-0 text-amber-500" />
                    {phone}
                  </a>
                ))}
              </li>
              <li className="flex flex-col gap-1.5">
                {CONTACT.emails.map((email) => (
                  
                 <a   key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-sm text-stone-400 transition-colors hover:text-amber-400 break-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0 text-amber-500" />
                    {email}
                  </a>
                ))}
              </li>
            </ul>
          </ScrollToTop>
        </div>

        {/* Bottom Bar */}
        <ScrollToTop
          as="div"
          y={12}
          className="flex flex-col items-center gap-4 border-t border-stone-800 pt-7 sm:flex-row sm:justify-between"
        >
          <p className="flex flex-wrap items-center justify-center gap-1 text-center text-sm text-stone-500 sm:justify-start sm:text-left">
            © {new Date().getFullYear()} Shree Narayani Thread & Jari. Made with
            <Heart size={12} className="mx-1 fill-red-500 text-red-500" />
            in Surat
          </p>

          <p className="pr-0 text-sm text-stone-500 sm:pr-16 lg:pr-20">
            Made by{' '}
            
            <a  href="https://noshinfotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-400 transition-colors hover:text-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 rounded"
            >
              Noshinfotech❤️
            </a>
          </p>
        </ScrollToTop>
      </div>

      {/* Scroll to Top — fades in only once the user has scrolled down */}
      <button
        onClick={handleScrollTop}
        className={`fixed bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-7 sm:right-7 ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  )
}