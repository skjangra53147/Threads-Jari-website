
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Factory, Users, Globe, TrendingUp } from 'lucide-react';
import ScrollToTop from './ScrollToTop'; // ScrollReveal wrapper

const FEATURES = [
  { icon: Factory, title: 'Modern Infrastructure', desc: 'State-of-the-art machinery for precision thread production.' },
  { icon: Users, title: 'Expert Team', desc: 'Skilled artisans with generations of traditional zari expertise.' },
  { icon: Globe, title: 'Pan India Presence', desc: 'Serving clients across 25+ states with timely delivery.' },
  { icon: TrendingUp, title: 'Growing Rapidly', desc: 'Trusted name in the textile industry since 2023.' },
];

export default function AboutPreview() {
  return (
    <section id="about-preview" className="section-pad bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <ScrollToTop y={32}>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/public/images/image4.png"
                  alt="Manufacturing"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
              </div>
              <ScrollToTop as="div" delay={0.25} y={16} className="absolute -bottom-8 right-6 bg-white rounded-2xl shadow-xl p-5 border-l-4 border-amber-500">
                <div className="text-4xl font-bold text-amber-600 mb-1">5+</div>
                <div className="text-stone-700 font-semibold text-sm">Years of Excellence</div>
                <div className="text-stone-500 text-xs mt-0.5">In Thread & Jari Manufacturing</div>
              </ScrollToTop>
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-amber-300 rounded-2xl -z-10" />
            </div>
          </ScrollToTop>

          <div>
            <ScrollToTop y={20}>
              <div className="eyebrow">
                <span className="w-7 h-0.5 bg-amber-600" /> About Us
              </div>
            </ScrollToTop>

            <ScrollToTop delay={0.1} y={20}>
              <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-5 leading-tight">
                Crafting Threads That <span className="text-gold">Define Luxury</span>
              </h2>
            </ScrollToTop>

            <ScrollToTop delay={0.18} y={16}>
              <p className="text-stone-600 text-lg leading-relaxed mb-4">
                Founded in 2023, <strong>Shree Narayani Thread & Jari</strong> has emerged as a leading
                manufacturer of premium quality zari threads, cording threads, and embroidery materials
                in Surat, Gujarat.
              </p>
            </ScrollToTop>

            <ScrollToTop delay={0.24} y={16}>
              <p className="text-stone-600 leading-relaxed mb-8">
                We specialize in Gold Zari, Silver Zari, Polyester Zari, Nylon Zari, Fancy Cords, and
                Metallic Threads — trusted by textile manufacturers, embroidery houses, and fashion
                designers across the country.
              </p>
            </ScrollToTop>

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {FEATURES.map((f, i) => (
                <ScrollToTop key={i} delay={0.28 + i * 0.08} y={18}>
                  <div className="flex gap-3 group">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <f.icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-900 text-sm mb-0.5">{f.title}</h3>
                      <p className="text-stone-500 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </ScrollToTop>
              ))}
            </div>

            <ScrollToTop delay={0.5} y={14}>
              <Link to="/about" className="btn-primary">
                Learn More <ChevronRight size={16} />
              </Link>
            </ScrollToTop>
          </div>
        </div>
      </div>
    </section>
  );
}
