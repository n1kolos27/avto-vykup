/**
 * Доменные типы приложения
 */

// Типы для блога
export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  category: string;
  excerpt: string;
  author?: string;
  image?: string;
  tags?: string[];
}

// Типы для отзывов
export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  carModel?: string;
  verified?: boolean;
}

// Типы для услуг
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
}

// Типы для статистики
export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon?: React.ComponentType;
}

// Типы для кейсов
export interface Case {
  title: string;
  description: string;
  result: string;
  time: string;
  client: string;
  features: string[];
  category: string;
}

// Типы для FAQ
export interface FAQ {
  question: string;
  answer: string;
}

// Типы для преимуществ
export interface Advantage {
  title: string;
  description: string;
  icon?: React.ComponentType;
}

// Типы для процесса работы
export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: React.ComponentType;
}

// Типы для гарантий
export interface Guarantee {
  title: string;
  description: string;
  icon?: React.ComponentType;
}

