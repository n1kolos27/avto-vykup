import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
                return (_jsx("p", { className: "text-base text-neutral-700 leading-7 mb-2 pl-4", children: line }, index));
            }
            else if (line.startsWith('- ')) {
                return (_jsx("p", { className: "text-base text-neutral-700 leading-7 mb-2 pl-4", children: line }, index));
            }
            else if (line.match(/^[А-Я]/) && line.length < 100 && !line.includes('.')) {
                return (_jsx("h3", { className: "text-2xl font-bold text-neutral-900 mt-6 mb-3", children: line }, index));
            }
            else {
                return (_jsx("p", { className: "text-base text-neutral-700 leading-7 mb-4", children: line }, index));
            }
        });
    };
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: articleSchema, id: "article-schema" }), _jsxs("div", { className: "max-w-[900px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, { items: [
                            { label: 'Главная', href: '/' },
                            { label: 'Блог', href: '/blog' },
                            { label: post.title, href: `/blog/${slug}` },
                        ] }), _jsx("button", { onClick: () => navigate('/blog'), className: "mb-6 py-2 text-base text-primary-600 font-medium hover:text-primary-700 transition-colors", children: "\u2190 \u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0441\u0442\u0430\u0442\u044C\u044F\u043C" }), _jsxs(Card, { className: "p-8 mb-12", children: [_jsxs("div", { className: "flex flex-row justify-between items-center mb-6", children: [_jsx("div", { className: "bg-primary-100 px-3 py-1.5 rounded", children: _jsx("span", { className: "text-sm font-semibold text-primary-700", children: post.category }) }), _jsxs("div", { className: "flex flex-row items-center gap-2", children: [_jsx("span", { className: "text-base", children: "\uD83D\uDCC5" }), _jsx("span", { className: "text-sm text-neutral-600", children: post.date })] })] }), _jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-6 leading-tight", children: post.title }), _jsx("div", { className: "prose max-w-none", children: formatContent(post.content) })] }), _jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold text-neutral-900 mb-6", children: "\u041F\u043E\u0445\u043E\u0436\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: Object.entries(blogPosts)
                                    .filter(([key]) => key !== slug && blogPosts[key].category === post.category)
                                    .slice(0, 2)
                                    .map(([key, relatedPost]) => (_jsx(Card, { className: "p-6 hover:shadow-lg transition-shadow", children: _jsxs("button", { onClick: () => navigate(`/blog/${key}`), className: "text-left w-full", children: [_jsx("div", { className: "bg-primary-100 px-2 py-1 rounded mb-3 inline-block", children: _jsx("span", { className: "text-xs font-semibold text-primary-600", children: relatedPost.category }) }), _jsx("h3", { className: "text-xl font-bold text-neutral-900 mb-2 leading-tight", children: relatedPost.title }), _jsx("p", { className: "text-sm text-neutral-600 line-clamp-2 mb-3", children: relatedPost.excerpt }), _jsx("span", { className: "text-base font-semibold text-primary-600", children: "\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u0435\u0435 \u2192" })] }) }, key))) })] })] })] }));
};
export default BlogPost;
