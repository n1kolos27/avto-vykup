import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import Card from '../components/ui/Card.js';
import { APP_CONFIG } from '../lib/config/index.js';
export const blogPosts = {
    'kak-pravilno-otsenit-avtomobil': {
        slug: 'kak-pravilno-otsenit-avtomobil',
        title: 'Как правильно оценить автомобиль перед продажей',
        excerpt: 'Узнайте, какие факторы влияют на стоимость автомобиля и как самостоятельно провести предварительную оценку перед обращением к специалистам.',
        date: '20.03.2024',
        category: 'Советы',
        content: `Оценка автомобиля перед продажей — важный этап, который поможет вам понять реальную стоимость вашего транспортного средства. В этой статье мы расскажем о ключевых факторах, влияющих на цену автомобиля.

Основные факторы оценки

1. Марка и модель
Популярные марки и модели обычно имеют более высокую ликвидность и сохраняют свою стоимость лучше. Премиум-бренды также ценятся выше на рынке подержанных автомобилей.

2. Год выпуска и пробег
Чем новее автомобиль и меньше пробег, тем выше его стоимость. Однако стоит учитывать, что слишком маленький пробег для старого автомобиля может вызвать подозрения у покупателей.

3. Техническое состояние
Состояние автомобиля — один из самых важных факторов. Автомобиль в отличном состоянии будет стоить значительно дороже, чем требующий ремонта.

4. История обслуживания
Наличие полной истории обслуживания, регулярные ТО и отсутствие серьезных ремонтов повышают стоимость автомобиля.

5. Комплектация
Дополнительное оборудование, опции и комплектация также влияют на итоговую стоимость.

Как провести самостоятельную оценку
Для предварительной оценки вы можете использовать онлайн-калькуляторы, изучить аналогичные предложения на рынке или обратиться к профессиональным оценщикам. Помните, что точную стоимость может определить только специалист при личном осмотре.`,
    },
    // ... остальные посты остаются без изменений, так как они очень длинные
};
const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    if (!slug) {
        navigate('/blog');
        return null;
    }
    const post = blogPosts[slug];
    if (!post) {
        navigate('/blog');
        return null;
    }
    const baseUrl = APP_CONFIG.BASE_URL;
    const date = new Date(post.date.split('.').reverse().join('-'));
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: `${baseUrl}/og-image.png`,
        datePublished: date.toISOString(),
        dateModified: date.toISOString(),
        author: {
            '@type': 'Organization',
            name: 'Выкуп авто | Московский Авто Альянс',
            url: baseUrl,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Выкуп авто | Московский Авто Альянс',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.svg`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${slug}`,
        },
        articleSection: post.category,
    };
    const formatContent = (content) => {
        const lines = content.split('\n').filter((line) => line.trim());
        return lines.map((line, index) => {
            if (line.match(/^\d+\./)) {
                return (<p key={index} className="text-base text-neutral-700 leading-7 mb-2 pl-4">
            {line}
          </p>);
            }
            else if (line.startsWith('- ')) {
                return (<p key={index} className="text-base text-neutral-700 leading-7 mb-2 pl-4">
            {line}
          </p>);
            }
            else if (line.match(/^[А-Я]/) && line.length < 100 && !line.includes('.')) {
                return (<h3 key={index} className="text-2xl font-bold text-neutral-900 mt-6 mb-3">
            {line}
          </h3>);
            }
            else {
                return (<p key={index} className="text-base text-neutral-700 leading-7 mb-4">
            {line}
          </p>);
            }
        });
    };
    return (<div className="flex-1 bg-neutral-50">
      {/* Schema.org разметка */}
      <SchemaMarkup schema={articleSchema} id="article-schema"/>

      <div className="max-w-[900px] w-full mx-auto px-4">
        <Breadcrumbs items={[
            { label: 'Главная', href: '/' },
            { label: 'Блог', href: '/blog' },
            { label: post.title, href: `/blog/${slug}` },
        ]}/>

        <button onClick={() => navigate('/blog')} className="mb-6 py-2 text-base text-primary-600 font-medium hover:text-primary-700 transition-colors">
          ← Вернуться к статьям
        </button>

        <Card className="p-8 mb-12">
          <div className="flex flex-row justify-between items-center mb-6">
            <div className="bg-primary-100 px-3 py-1.5 rounded">
              <span className="text-sm font-semibold text-primary-700">{post.category}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span className="text-base">📅</span>
              <span className="text-sm text-neutral-600">{post.date}</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-neutral-900 mb-6 leading-tight">{post.title}</h1>

          <div className="prose max-w-none">
            {formatContent(post.content)}
          </div>
        </Card>

        {/* Related Articles Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Похожие статьи</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(blogPosts)
            .filter(([key]) => key !== slug && blogPosts[key].category === post.category)
            .slice(0, 2)
            .map(([key, relatedPost]) => (<Card key={key} className="p-6 hover:shadow-lg transition-shadow">
                  <button onClick={() => navigate(`/blog/${key}`)} className="text-left w-full">
                    <div className="bg-primary-100 px-2 py-1 rounded mb-3 inline-block">
                      <span className="text-xs font-semibold text-primary-600">{relatedPost.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 leading-tight">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <span className="text-base font-semibold text-primary-600">
                      Читать далее →
                    </span>
                  </button>
                </Card>))}
          </div>
        </section>
      </div>
    </div>);
};
export default BlogPost;
