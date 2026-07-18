
import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutPreview from '../components/AboutPreview';
import TrustBadges from '../components/TrustBadges';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductCategories from '../components/ProductCategories';
import WhyChooseUs from '../components/WhyChooseUs';

import ProcessTimeline from '../components/ProcessTimeline';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import CTABanner from '../components/CTABanner';
import GallerySection from '../components/GallerySection';

export default function Home() {
  return (
    <div className="page-enter">
      <HeroSection />
      <AboutPreview />
      <TrustBadges />
      <FeaturedProducts />
      <ProcessTimeline />
      <ProductCategories />
      <WhyChooseUs />
   
      
      <Testimonials />
      <GallerySection />
      <FAQSection />
      <CTABanner />
    </div>
  );
}