

import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

const TESTIMONIALS = [
  {
    name: 'Rajesh Patel',
    company: 'Patel Fabrics',
    location: 'Ahmedabad',
    rating: 5,
    text: 'Shree Narayani Thread & Jari has been our trusted supplier for over 2 years. Their gold zari quality is exceptional and the consistency is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Priya Sharma',
    company: 'Sharma Couture',
    location: 'Mumbai',
    rating: 5,
    text: 'The fancy cords and metallic threads are simply outstanding. The color range is extensive and quality exceeds expectations. A reliable partner!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Mohammed Khan',
    company: 'Khan Embroidery',
    location: 'Surat',
    rating: 5,
    text: 'Competitive pricing without compromising on quality. Their team is responsive and delivery is always on time.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Anita Desai',
    company: 'Desai Textiles',
    location: 'Vadodara',
    rating: 5,
    text: 'We have been sourcing zari threads from Shree Narayani for our bridal collection. The shine and durability are absolutely remarkable.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Vikram Mehta',
    company: 'Mehta Weavers',
    location: 'Rajkot',
    rating: 5,
    text: 'Best quality polyester zari in the market. Their customer support team is always helpful and the bulk pricing is very competitive.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
];

export default function Testimonials() {
  const [testimonialIndex, setTestimonialIndex] = React.useState(0);
  const totalSlides = Math.max(1, TESTIMONIALS.length - 2);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const idx = (testimonialIndex + i) % TESTIMONIALS.length;
      result.push(TESTIMONIALS[idx]);
    }
    return result;
  };

  const displayTestimonials = getVisibleTestimonials();

  return (
    <section className="section-pad bg-stone-50">
      <div className="container-max">
        <ScrollToTop className="text-center mb-12">
          <div className="eyebrow justify-center">
            <span className="w-7 h-0.5 bg-amber-600" /> Testimonials
            <span className="w-7 h-0.5 bg-amber-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
            What Our <span className="text-gold">Customers Say</span>
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Trusted by textile manufacturers, designers and businesses across India.
          </p>
        </ScrollToTop>

        <div className="grid md:grid-cols-3 gap-7">
          {displayTestimonials.map((t, i) => (
            <ScrollToTop
              key={`${testimonialIndex}-${i}`}
              delay={i * 0.12}
              className="card group overflow-hidden"
            >
              <div className="p-5">
                <div className="text-amber-400 text-5xl font-serif leading-none mb-2">"</div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{t.text}</p>
              </div>
              <div className="px-5 pb-5 pt-4 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-200"
                />
                <div>
                  <div className="font-bold text-stone-900 text-sm">{t.name}</div>
                  <div className="text-stone-500 text-xs">{t.company}</div>
                  <div className="text-stone-400 text-xs">{t.location}</div>
                </div>
              </div>
            </ScrollToTop>
          ))}
        </div>

        <ScrollToTop delay={0.2} className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === testimonialIndex ? 'w-8 bg-amber-500' : 'w-2.5 bg-stone-300 hover:bg-amber-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-500 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </ScrollToTop>
      </div>
    </section>
  );
}