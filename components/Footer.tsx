'use client';

import { APP_CONFIG, FOOTER_NAV_ITEMS } from '@/lib/config';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const socialNetworks = [
  { name: 'VKontakte', url: '#', icon: 'VK', color: 'bg-blue-600' },
  { name: 'Facebook', url: '#', icon: 'FB', color: 'bg-blue-800' },
  { name: 'Instagram', url: '#', icon: 'IG', color: 'bg-gradient-to-r from-purple-600 to-pink-600' },
  { name: 'YouTube', url: '#', icon: 'YT', color: 'bg-red-600' },
];

const directions = [
  { href: '/services/buyback-cars', label: 'Выкуп автомобилей' },
  { href: '/services/urgent-buyback', label: 'Срочный выкуп автомобилей' },
  { href: '/services/damaged-cars', label: 'Выкуп битых автомобилей' },
  { href: '/services/after-accident', label: 'Выкуп после ДТП' },
  { href: '/services/credit-cars', label: 'Выкуп кредитных автомобилей' },
  { href: '/services/premium-cars', label: 'Выкуп премиум автомобилей' },
];

const sections = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О нас' },
  { href: '/how-we-work', label: 'Как мы работаем' },
  { href: '/reviews', label: 'Отзывы' },
  { href: '/blog', label: 'Статьи' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/car-brands', label: 'Марки авто' },
];

export default function Footer() {
  const phone1 = APP_CONFIG.PHONE_1;
  const phone2 = APP_CONFIG.PHONE_2;
  const email = APP_CONFIG.EMAIL;
  const navItems = FOOTER_NAV_ITEMS;

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Social Networks Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-6">Вступайте в наши группы</h3>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {socialNetworks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${social.color} text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[64px] min-h-[64px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                aria-label={`Перейти в ${social.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            aria-labelledby="footer-about-heading"
          >
            <h3 id="footer-about-heading" className="mb-4">
              <Link
                href="/"
                className="inline-block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                aria-label="Выкуп авто | Московский Авто Альянс - Главная страница"
              >
                <img
                  src="/logo-white.svg"
                  alt="Выкуп авто | Московский Авто Альянс - Логотип компании"
                  className="h-16 w-auto max-w-[280px]"
                  width={280}
                  height={64}
                  loading="lazy"
                />
              </Link>
            </h3>
            <p className="text-gray-300 leading-relaxed mt-4">
              Профессиональный выкуп автомобилей в Москве и Московской области.
              Быстро, честно, выгодно.
            </p>
          </motion.section>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            aria-labelledby="footer-directions-heading"
          >
            <h4 id="footer-directions-heading" className="text-lg font-semibold mb-6 text-white">НАПРАВЛЕНИЯ</h4>
            <ul className="space-y-3">
              {directions.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded min-h-[44px] flex items-center"
                    aria-label={`Перейти на страницу: ${item.label}`}
                  >
                    <span className="group-hover:text-primary-400">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-labelledby="footer-sections-heading"
          >
            <h4 id="footer-sections-heading" className="text-lg font-semibold mb-6 text-white">РАЗДЕЛЫ</h4>
            <ul className="space-y-3">
              {sections.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded min-h-[44px] flex items-center"
                    aria-label={`Перейти на страницу: ${item.label}`}
                  >
                    <span className="group-hover:text-primary-400">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-labelledby="footer-contacts-heading"
          >
            <h4 id="footer-contacts-heading" className="text-lg font-semibold mb-6 text-white">Контакты</h4>
            <ul className="space-y-4">
                     <li>
                       <motion.a
                         href={`tel:${phone1}`}
                         className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-2 min-h-[44px]"
                         whileHover={{ x: 4 }}
                         aria-label={`Позвонить по телефону ${phone1}`}
                       >
                         <div className="bg-primary-600/20 p-2 rounded-lg group-hover:bg-primary-600/30 transition-colors" aria-hidden="true">
                           <FiPhone className="text-primary-400" aria-hidden="true" />
                         </div>
                         <address className="not-italic font-medium">{phone1}</address>
                       </motion.a>
                     </li>
                     <li>
                       <motion.a
                         href={`tel:${phone2}`}
                         className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-2 min-h-[44px]"
                         whileHover={{ x: 4 }}
                         aria-label={`Позвонить по телефону ${phone2}`}
                       >
                         <div className="bg-primary-600/20 p-2 rounded-lg group-hover:bg-primary-600/30 transition-colors" aria-hidden="true">
                           <FiPhone className="text-primary-400" aria-hidden="true" />
                         </div>
                         <address className="not-italic font-medium">{phone2}</address>
                       </motion.a>
                     </li>
                     <li>
                       <motion.a
                         href={`mailto:${email}`}
                         className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-2 min-h-[44px]"
                         whileHover={{ x: 4 }}
                         aria-label={`Написать письмо на ${email}`}
                       >
                         <div className="bg-primary-600/20 p-2 rounded-lg group-hover:bg-primary-600/30 transition-colors" aria-hidden="true">
                           <FiMail className="text-primary-400" aria-hidden="true" />
                         </div>
                         <address className="not-italic font-medium break-all">{email}</address>
                       </motion.a>
                     </li>
                     <li className="flex items-start space-x-3 text-gray-300">
                       <div className="bg-primary-600/20 p-2 rounded-lg mt-1" aria-hidden="true">
                         <FiMapPin className="text-primary-400" aria-hidden="true" />
                       </div>
                       <address className="not-italic">Москва и Московская область</address>
                     </li>
            </ul>
          </motion.section>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} {APP_CONFIG.SITE_NAME}. Все права защищены.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
