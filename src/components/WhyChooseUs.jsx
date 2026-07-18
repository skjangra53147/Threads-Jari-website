

import React from 'react';
import { Shield, Clock, Headphones, Package, Zap, BarChart3 } from 'lucide-react';
import ScrollToTop from './ScrollToTop'; // ScrollReveal wrapper



const WHY_CHOOSE_US = [
  {
    icon: Shield,
    title: 'Premium Quality Assurance',
    desc: 'Every batch undergoes rigorous quality testing for color fastness, strength & shine before dispatch.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'We understand deadlines matter. Our logistics ensure your orders reach you within promised timelines.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    desc: 'Our expert team is always available to help you choose the right thread for your specific needs.',
  },
  {
    icon: Package,
    title: 'Bulk Order Specialists',
    desc: 'From 10 kg to 10,000 kg — we handle orders of all sizes with the same commitment to excellence.',
  },
  {
    icon: Zap,
    title: 'Custom Color Matching',
    desc: 'Need a specific shade? We offer custom dyeing services to match your exact color requirements.',
  },
  {
    icon: BarChart3,
    title: 'Competitive Pricing',
    desc: 'Direct from manufacturer pricing ensures you get the best rates without compromising on quality.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-stone-50">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <ScrollToTop y={20}>
              <div className="eyebrow">
                <span className="w-7 h-0.5 bg-amber-600" /> Why Choose Us
              </div>
            </ScrollToTop>

            <ScrollToTop delay={0.1} y={20}>
              <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-5 leading-tight">
                What Makes Us <span className="text-gold">Different</span>
              </h2>
            </ScrollToTop>

            <ScrollToTop delay={0.18} y={16}>
              <p className="text-stone-600 text-lg leading-relaxed mb-8">
                We don't just sell threads — we deliver trust, quality, and partnership that helps
                your business grow.
              </p>
            </ScrollToTop>

            <div className="grid sm:grid-cols-2 gap-6">
              {WHY_CHOOSE_US.map((item, i) => (
                <ScrollToTop key={i} delay={0.24 + i * 0.08} y={18}>
                  <div className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollToTop>
              ))}
            </div>
          </div>

          <ScrollToTop y={32}>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/public/images/image6.png"
                  alt="Quality Manufacturing"
                  className="w-full h-[560px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              </div>
              {/* Floating Stats Card */}
              <ScrollToTop as="div" delay={0.3} y={16} className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border-l-4 border-amber-500">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-stone-900">100%</div>
                    <div className="text-stone-500 text-sm">Quality Assured</div>
                  </div>
                </div>
              </ScrollToTop>
            </div>
          </ScrollToTop>
        </div>
      </div>
    </section>
  );
}
