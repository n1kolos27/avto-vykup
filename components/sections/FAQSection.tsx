'use client';

import { getReducedMotionConfig } from '@/lib/utils/accessibility';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'Как быстро можно продать автомобиль?',
    answer:
      'В среднем сделка занимает 2 часа от момента звонка до получения денег. Мы приезжаем на место, осматриваем автомобиль, оформляем документы и сразу производим оплату. В некоторых случаях это может занять еще меньше времени.',
  },
  {
    question: 'Какие документы нужны для выкупа?',
    answer:
      'Для выкупа автомобиля вам понадобятся: паспорт транспортного средства (ПТС), свидетельство о регистрации (СТС), паспорт владельца. Если автомобиль в залоге или есть ограничения, нужно предоставить соответствующие документы. Мы поможем оформить все необходимые бумаги.',
  },
  {
    question: 'Выкупаете ли вы автомобили после ДТП?',
    answer:
      'Да, мы выкупаем автомобили в любом состоянии, включая те, что побывали в ДТП. Мы оцениваем остаточную стоимость, возможность восстановления или разбора на запчасти. Даже сильно поврежденные автомобили могут иметь хорошую стоимость.',
  },
  {
    question: 'Как вы определяете цену автомобиля?',
    answer:
      'Мы учитываем множество факторов: марку и модель, год выпуска, пробег, техническое состояние, наличие повреждений, комплектацию, рыночную стоимость на момент оценки. Наши специалисты имеют большой опыт и знают реальные цены на рынке.',
  },
  {
    question: 'Можно ли продать автомобиль в кредите?',
    answer:
      'Да, мы работаем с кредитными автомобилями. В этом случае нужно погасить кредит или мы можем помочь с оформлением перевода долга. Все зависит от конкретной ситуации и условий кредитного договора.',
  },
  {
    question: 'Какие способы оплаты вы предлагаете?',
    answer:
      'Мы предлагаем несколько способов оплаты: наличными, переводом на банковскую карту, банковским переводом. Вы можете выбрать наиболее удобный для вас вариант. Оплата производится сразу после подписания документов.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={getReducedMotionConfig({ opacity: 0, y: 20 }, { opacity: 0 })}
          whileInView={getReducedMotionConfig({ opacity: 1, y: 0 }, { opacity: 1 })}
          viewport={{ once: true }}
          transition={getReducedMotionConfig({ duration: 0.6 }, { duration: 0 })}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о выкупе автомобилей
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={getReducedMotionConfig({ opacity: 0, y: 20 }, { opacity: 0 })}
              whileInView={getReducedMotionConfig({ opacity: 1, y: 0 }, { opacity: 1 })}
              viewport={{ once: true }}
              transition={getReducedMotionConfig({ duration: 0.4, delay: index * 0.1 }, { duration: 0 })}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                <FiChevronDown
                  className={`flex-shrink-0 text-primary-600 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={getReducedMotionConfig({ height: 0, opacity: 0 }, { height: 0, opacity: 0 })}
                    animate={getReducedMotionConfig({ height: 'auto', opacity: 1 }, { height: 'auto', opacity: 1 })}
                    exit={getReducedMotionConfig({ height: 0, opacity: 0 }, { height: 0, opacity: 0 })}
                    transition={getReducedMotionConfig({ duration: 0.3 }, { duration: 0 })}
                    className="overflow-hidden"
                  >
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className="px-6 py-4 text-gray-600 border-t"
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={getReducedMotionConfig({ opacity: 0 }, { opacity: 0 })}
          whileInView={getReducedMotionConfig({ opacity: 1 }, { opacity: 1 })}
          viewport={{ once: true }}
          transition={getReducedMotionConfig({ duration: 0.6, delay: 0.6 }, { duration: 0 })}
          className="text-center mt-8"
        >
          <Link
            href="/faq"
            className="inline-flex items-center space-x-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            <span>Посмотреть все вопросы</span>
            <FiChevronDown className="transform -rotate-90" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
