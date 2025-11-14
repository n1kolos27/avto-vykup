'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { APP_CONFIG } from '@/lib/config';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const defaultLabels: Record<string, string> = {
  '/': 'Главная',
  '/calculator': 'Калькулятор',
  '/services': 'Услуги',
  '/reviews': 'Отзывы',
  '/blog': 'Блог',
  '/faq': 'FAQ',
  '/contacts': 'Контакты',
  '/about': 'О нас',
  '/documents': 'Документы',
  '/prices': 'Цены',
  '/guarantees': 'Гарантии',
  '/how-we-work': 'Как мы работаем',
  '/why-us': 'Почему мы',
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  const baseUrl = APP_CONFIG.BASE_URL;

  // Если items не переданы, генерируем из pathname
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const paths = pathname.split('/').filter(Boolean);
    const result: BreadcrumbItem[] = [{ label: 'Главная', href: '/' }];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = defaultLabels[currentPath] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      result.push({ label, href: currentPath });
    });

    return result;
  })();

  // Генерируем BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Хлебные крошки"
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <div key={item.href} className="flex items-center space-x-2">
              {index === 0 ? (
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                  aria-label={item.label}
                >
                  <FiHome size={16} />
                </Link>
              ) : (
                <>
                  <FiChevronRight size={14} className="text-gray-400" />
                  {isLast ? (
                    <span className="text-gray-800 font-medium" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}

