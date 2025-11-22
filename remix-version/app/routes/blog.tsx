import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import BlogCard from "~/components/BlogCard";
import Breadcrumbs from "~/components/Breadcrumbs";
import SchemaMarkup from "~/components/SchemaMarkup";
import { APP_CONFIG } from "~/lib/config/index";

export const meta: MetaFunction = () => {
  return [
    { title: "Блог о выкупе автомобилей | Полезные статьи" },
    { name: "description", content: "Полезные статьи о выкупе автомобилей, оценке стоимости, документах и других важных вопросах." },
  ];
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'kak-pravilno-otsenit-avtomobil',
    title: 'Как правильно оценить автомобиль перед продажей',
    excerpt: 'Узнайте, какие факторы влияют на стоимость автомобиля и как самостоятельно провести предварительную оценку.',
    date: '20.03.2024',
    category: 'Советы',
  },
  {
    slug: 'dokumenty-dlya-vykupa-avto',
    title: 'Какие документы нужны для выкупа автомобиля',
    excerpt: 'Полный список документов, необходимых для быстрой и легальной продажи автомобиля.',
    date: '18.03.2024',
    category: 'Документы',
  },
  // Добавьте больше статей по необходимости
];

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Блог о выкупе автомобилей',
  description: 'Полезные статьи о выкупе автомобилей',
  url: `${APP_CONFIG.BASE_URL}/blog`,
};

export default function BlogRoute() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Блог</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <BlogCard post={post} />
            </Link>
          ))}
        </div>
      </div>
      <SchemaMarkup schema={blogSchema} />
    </div>
  );
}

