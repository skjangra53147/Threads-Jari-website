
import React from 'react';
import { ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import ScrollToTop from './ScrollToTop';

// ----------------------------------------------------------------------------
// Single source of truth for location/contact details.
// Kept identical to Contact.jsx / CTABanner.jsx / Navbar.jsx — if these ever
// change, update all of them together so the whole site stays consistent.
// ----------------------------------------------------------------------------
const LOCATION = {
  addressLine: 'Adajan, Surat, Gujarat',
  phones: ['+91 97288 25494', '+91 99745 87475'],
  emails: ['info@narayanijari.com', 'info@shreenarayani.com'],
};

const FAQS = [
  {
    question: 'What types of zari threads do you manufacture?',
    answer:
      'We manufacture a wide range including Gold Zari, Silver Zari, Polyester Zari, Nylon Zari, Fancy Cords, Metallic Threads, Kasab Zari, and more. We also offer custom colors and specifications.',
  },
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'Our MOQ starts from 10 kg per color/variant for standard products. For custom orders, the MOQ may vary depending on the complexity and color matching requirements.',
  },
  {
    question: 'Do you deliver across India?',
    answer:
      'Yes, we deliver to all 28 states and 8 union territories of India. We have partnered with reliable logistics providers to ensure safe and timely delivery of your orders.',
  },
  {
    question: 'Can I request a sample before placing a bulk order?',
    answer:
      'Absolutely! We provide free samples for serious buyers. You can request samples through our contact form or by calling us directly. Sample dispatch typically takes 2-3 business days.',
  },
  {
    question: 'What is your quality assurance process?',
    answer:
      'Every batch undergoes multi-stage testing including color fastness, tensile strength, shine consistency, and dimensional accuracy. We follow strict ISO-compliant quality protocols.',
  },
  {
    question: 'Do you offer custom color matching?',
    answer:
      'Yes, we specialize in custom color matching. Share your reference sample or Pantone code, and our team will create the exact shade you need with a quick turnaround time.',
  },
];

export default function FAQSection() {
  const [openFaq, setOpenFaq] = React.useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="section-pad bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <ScrollToTop>
            <div className="eyebrow">
              <span className="w-7 h-0.5 bg-amber-600" /> FAQ
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-5 leading-tight">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              Got questions? We've got answers. If you don't find what you're looking for, feel
              free to contact us directly.
            </p>
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <h3 className="font-bold text-stone-900 mb-3">Still have questions?</h3>
              <p className="text-stone-600 text-sm mb-4">
                Our team is happy to help you with any queries about our products or services.
              </p>
              <div className="space-y-3">
                {LOCATION.phones.map((phone) => (
                  
                  <a  key={phone}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 text-stone-700 hover:text-amber-600 transition-colors w-fit"
                 >
                    <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{phone}</span>
                  </a>
                ))}
                {LOCATION.emails.map((email) => (
                  
                 <a   key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-stone-700 hover:text-amber-600 transition-colors w-fit"
                  >
                    <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-sm font-medium break-all">{email}</span>
                  </a>
                ))}
                <div className="flex items-center gap-3 text-stone-700">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-sm">{LOCATION.addressLine}</span>
                </div>
              </div>
            </div>
          </ScrollToTop>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <ScrollToTop key={i} delay={i * 0.08} className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
                >
                  <span className="font-semibold text-stone-900 text-sm pr-4">{faq.question}</span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-amber-600" />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-stone-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </ScrollToTop>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}