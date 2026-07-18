import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-stone-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-amber-400 font-serif text-2xl">Shree Narayani</h2>
          <p className="text-stone-400 text-sm mt-1 tracking-widest uppercase">Thread & Jari</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/products"    element={<Products />} />
          <Route path="/services"    element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="*"            element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App