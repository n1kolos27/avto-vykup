import React, { useState } from 'react';
import AnimatedSection from '../AnimatedSection';
import AnimatedCard from '../AnimatedCard';
import Card from '../ui/Card';

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

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 md:py-20 md:px-6 transition-colors relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />
      
      <div className="max-w-[1200px] w-full mx-auto">
        <AnimatedSection animationType="fade-slide" delay={0}>
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 text-center heading-accent">
              Честные ответы на важные вопросы
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 text-center max-w-[600px]">
              Ответы на самые популярные вопросы о выкупе автомобилей
            </p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <AnimatedCard key={index} delay={index * 50}>
              <Card hover className="overflow-hidden">
              <button
                className="flex flex-row justify-between items-center p-5 w-full text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-label={`${faq.question}. Нажмите для ${openIndex === index ? 'закрытия' : 'открытия'} ответа`}
              >
                <span className="flex-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100 mr-4">
                  {faq.question}
                </span>
                <span
                  className={`text-base text-primary-600 dark:text-primary-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5 border-t border-neutral-100 dark:border-neutral-700">
                  <p className="text-base text-neutral-600 dark:text-neutral-300 leading-6 mt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQSection);
