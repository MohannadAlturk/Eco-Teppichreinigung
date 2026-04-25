'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: 'Wie lange dauert die Reinigung meines Teppichs?',
    answer:
      'Die Reinigung dauert je nach Teppichart und Verschmutzungsgrad in der Regel 3–5 Werktage. Hinzu kommt die Versandzeit. Insgesamt können Sie Ihren Teppich innerhalb von 7–10 Werktagen sauber zurückerwarten.',
  },
  {
    question: 'Entstehen mir Kosten, wenn meine Anfrage abgelehnt wird?',
    answer:
      'Nein – absolut nicht. Jede Anfrage wird zunächst von unserem Team geprüft. Kosten entstehen ausschließlich nach unserer ausdrücklichen Bestätigung. Bei Ablehnung – z. B. wenn der Teppich nicht reinigbar ist – entstehen Ihnen keinerlei Kosten.',
  },
  {
    question: 'Welche Teppicharten können Sie reinigen?',
    answer:
      'Wir reinigen alle gängigen Teppicharten: Orientteppiche, Wollteppiche, Kunstfaserteppiche sowie allgemeine Teppiche jeder Größe. Bei Unsicherheiten bzgl. Ihres Teppichs können Sie uns vorab kontaktieren – wir beraten Sie gerne.',
  },
  {
    question: 'Wie funktioniert der Versand?',
    answer:
      'Nach Bestätigung Ihrer Anfrage erhalten Sie per E-Mail ein kostenloses DHL-Versandlabel. Sie geben den Teppich einfach bei einer DHL-Filiale ab. Nach der Reinigung senden wir ihn kostenlos zu Ihnen zurück. Hin- und Rückversand sind vollständig kostenlos.',
  },
  {
    question: 'Sind Ihre Reinigungsmittel umweltfreundlich?',
    answer:
      'Ja. Wir setzen ausschließlich biologisch abbaubare und schadstofffreie Reinigungsmittel ein – schonend für Ihren Teppich, Ihre Familie und die Umwelt. Alle verwendeten Mittel sind dermatologisch getestet und REACH-konform.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Häufig gestellte Fragen
          </h2>
          <p className="text-gray-500">
            Haben Sie weitere Fragen? Schreiben Sie uns jederzeit.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${
                  isOpen ? 'border-primary-300 shadow-sm' : 'border-gray-200'
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-150"
                >
                  <span className={`font-semibold text-base leading-snug ${isOpen ? 'text-primary-600' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>

                  {/* +/– Icon */}
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                    isOpen ? 'border-primary-500 bg-primary-500' : 'border-gray-300 bg-white'
                  }`}>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      className={`w-3.5 h-3.5 ${isOpen ? 'text-white' : 'text-gray-500'}`}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </motion.svg>
                  </span>
                </button>

                {/* Answer – slides down */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
