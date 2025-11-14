'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { APP_CONFIG, FOOTER_NAV_ITEMS } from '@/lib/config';

export default function Footer() {
  const phone1 = APP_CONFIG.PHONE_1;
  const phone2 = APP_CONFIG.PHONE_2;
  const email = APP_CONFIG.EMAIL;
  const domain = APP_CONFIG.DOMAIN;
  const navItems = FOOTER_NAV_ITEMS;

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-br from-primary-600 to-primary-700 px-4 py-2 rounded-lg shadow-lg inline-block">
                ТОП-1
              </span>
            </h3>
            <p className="text-gray-300 leading-relaxed mt-4">
              Профессиональный выкуп автомобилей в Москве и Московской области.
              Быстро, честно, выгодно.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Навигация</h4>
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                  >
                    <span className="group-hover:text-primary-400">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + navItems.length * 0.05 }}
              >
                <Link
                  href="/sitemap-page"
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                >
                  <span className="group-hover:text-primary-400">Карта сайта</span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-white">Контакты</h4>
            <ul className="space-y-4">
                     <li>
                       <motion.a
                         href={`tel:${phone1}`}
                         className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group"
                         whileHover={{ x: 4 }}
                       >
                         <div className="bg-primary-600/20 p-2 rounded-lg group-hover:bg-primary-600/30 transition-colors">
                           <FiPhone className="text-primary-400" />
                         </div>
                         <address className="not-italic font-medium">{phone1}</address>
                       </motion.a>
                     </li>
                     <li>
                       <motion.a
                         href={`tel:${phone2}`}
                         className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group"
                         whileHover={{ x: 4 }}
                       >
                         <div className="bg-primary-600/20 p-2 rounded-lg group-hover:bg-primary-600/30 transition-colors">
                           <FiPhone className="text-primary-400" />
                         </div>
                         <address className="not-italic font-medium">{phone2}</address>
                       </motion.a>
                     </li>
                     <li>
                       <motion.a
                         href={`mailto:${email}`}
                         className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 group"
                         whileHover={{ x: 4 }}
                       >
                         <div className="bg-primary-600/20 p-2 rounded-lg group-hover:bg-primary-600/30 transition-colors">
                           <FiMail className="text-primary-400" />
                         </div>
                         <address className="not-italic font-medium break-all">{email}</address>
                       </motion.a>
                     </li>
                     <li className="flex items-start space-x-3 text-gray-300">
                       <div className="bg-primary-600/20 p-2 rounded-lg mt-1">
                         <FiMapPin className="text-primary-400" />
                       </div>
                       <address className="not-italic">Москва и Московская область</address>
                     </li>
            </ul>
          </motion.div>
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

