
import React from 'react';
import { Award } from 'lucide-react';
import ScrollToTop from './ScrollToTop'; // ScrollReveal wrapper


const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Raw Material',
    desc: 'High quality metallic yarn, polyester & nylon selected carefully.',
    img: '/public/images/image15.png',
  },
  {
    step: '02',
    title: 'Thread Making',
    desc: 'Yarns are twisted and wound to ensure strength & shine.',
    img: '/public/images/image11.png',
  },
  {
    step: '03',
    title: 'Zari Wrapping',
    desc: 'Metallic strips are precisely wrapped to create zari.',
    img: '/public/images/image19.png',
  },
  {
    step: '04',
    title: 'Dyeing & Finishing',
    desc: 'Dyed with skin-friendly colors and finished for long lasting shine.',
    img: '/public/images/image17.png',
  },
  {
    step: '05',
    title: 'Quality Check',
    desc: 'Every spool is tested for strength, color fastness & shine.',
    img: '/public/images/image9.png',
  },
  {
    step: '06',
    title: 'Packing & Delivery',
    desc: 'Carefully packed and delivered across India with trust.',
    img: '/public/images/image10.png',
  },
];

export default function ProcessTimeline() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-max">
        <ScrollToTop y={20}>
          <div className="text-center mb-16">
            <div className="eyebrow justify-center">
              <span className="w-7 h-0.5 bg-amber-600" /> How We Make
              <span className="w-7 h-0.5 bg-amber-600" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
              How <span className="text-gold">Thread & Jari</span> Is Made
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              A perfect blend of traditional craftsmanship and modern technology to deliver the finest
              quality.
            </p>
          </div>
        </ScrollToTop>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[60px] left-[8%] right-[8%] h-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 rounded-full" />
          <div className="grid grid-cols-6 gap-4 relative">
            {PROCESS_STEPS.map((p, i) => (
              <ScrollToTop key={i} delay={i * 0.1} y={24}>
                <div className="text-center group">
                  <div className="relative mx-auto mb-6">
                    <div className="w-[120px] h-[120px] mx-auto rounded-full overflow-hidden border-4 border-amber-100 group-hover:border-amber-400 transition-all duration-300 shadow-lg">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-bold shadow-md border-2 border-white">
                      {p.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm mb-2 group-hover:text-amber-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed px-1">{p.desc}</p>
                </div>
              </ScrollToTop>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet - Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 rounded-full" />
            <div className="space-y-8">
              {PROCESS_STEPS.map((p, i) => (
                <ScrollToTop key={i} delay={i * 0.08} y={20}>
                  <div className="flex gap-6 group">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-amber-100 group-hover:border-amber-400 transition-all shadow-md">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                        {p.step}
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-stone-900 text-base mb-1 group-hover:text-amber-700 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </ScrollToTop>
              ))}
            </div>
          </div>
        </div>

        <ScrollToTop delay={0.3} y={16}>
          <div className="mt-16 flex justify-center">
            <div className="bg-amber-50 rounded-2xl px-10 py-6 border border-amber-100 inline-flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xl">Crafted with Precision,</div>
                <div className="font-bold text-stone-900 text-xl">Delivered with Trust.</div>
              </div>
            </div>
          </div>
        </ScrollToTop>
      </div>
    </section>
  );
}