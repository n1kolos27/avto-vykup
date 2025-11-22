import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import Breadcrumbs from "~/components/Breadcrumbs";
import SchemaMarkup from "~/components/SchemaMarkup";
import { APP_CONFIG } from "~/lib/config/index";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "Статья не найдена" }];
  }
  return [
    { title: `${data.title} | Блог о выкупе авто` },
    { name: "description", content: data.excerpt },
  ];
};

// В реальном приложении это будет загрузка из базы данных
const blogPosts: Record<string, any> = {
  'kak-pravilno-otsenit-avtomobil': {
    slug: 'kak-pravilno-otsenit-avtomobil',
    title: 'Как правильно оценить автомобиль перед продажей',
    excerpt: 'Узнайте, какие факторы влияют на стоимость автомобиля.',
    date: '20.03.2024',
    category: 'Советы',
    content: '<p>Содержание статьи...</p>',
  },
  // Добавьте больше статей
};

export async function loader({ params }: LoaderFunctionArgs) {
  const post = blogPosts[params.slug || ''];
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return post;
}

export default function BlogPostRoute() {
  const post = useLoaderData<typeof loader>();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Выкуп авто',
    },
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-neutral-500 mb-8">
            <span>{post.date}</span> • <span>{post.category}</span>
          </div>
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
      <SchemaMarkup schema={articleSchema} />
    </div>
  );
}

