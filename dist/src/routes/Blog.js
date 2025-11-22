import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import SchemaMarkup from '../components/SchemaMarkup.js';
import { APP_CONFIG } from '../lib/config/index.js';
const blogPosts = [
    {
        slug: 'kak-pravilno-otsenit-avtomobil',
        title: 'Как правильно оценить автомобиль перед продажей',
        excerpt: 'Узнайте, какие факторы влияют на стоимость автомобиля и как самостоятельно провести предварительную оценку перед обращением к специалистам.',
        date: '20.03.2024',
        category: 'Советы',
    },
    {
        slug: 'dokumenty-dlya-vykupa-avto',
        title: 'Какие документы нужны для выкупа автомобиля',
        excerpt: 'Полный список документов, необходимых для быстрой и легальной продажи автомобиля. Убедитесь, что у вас все готово заранее.',
        date: '15.03.2024',
        category: 'Информация',
    },
    {
        slug: 'vykup-avto-posle-dtp',
        title: 'Выкуп автомобилей после ДТП: что нужно знать',
        excerpt: 'Особенности выкупа автомобилей, побывавших в аварии. Как получить справедливую цену за поврежденное авто.',
        date: '10.03.2024',
        category: 'Советы',
    },
    {
        slug: 'rynok-podderzhannyh-avto-2024',
        title: 'Рынок подержанных автомобилей в 2024 году',
        excerpt: 'Анализ текущей ситуации на рынке подержанных автомобилей в Москве и МО. Тренды и прогнозы на ближайшее время.',
        date: '05.03.2024',
        category: 'Аналитика',
    },
    {
        slug: 'kak-izbezhat-obmana-pri-prodazhe-avto',
        title: 'Как избежать обмана при продаже автомобиля',
        excerpt: 'Полезные советы по безопасности при продаже автомобиля. Как защитить себя от мошенников и недобросовестных покупателей.',
        date: '28.02.2024',
        category: 'Безопасность',
    },
    {
        slug: 'preimushchestva-vykupa-avto',
        title: 'Преимущества выкупа автомобиля через специализированную компанию',
        excerpt: 'Почему выгоднее продать автомобиль через компанию по выкупу, а не искать покупателя самостоятельно. Сравнение вариантов.',
        date: '22.02.2024',
        category: 'Информация',
    },
    {
        slug: 'kak-podgotovit-avto-k-prodazhe',
        title: 'Как правильно подготовить автомобиль к продаже',
        excerpt: 'Детальное руководство по подготовке автомобиля к продаже. Что нужно сделать, чтобы увеличить стоимость и ускорить продажу.',
        date: '18.02.2024',
        category: 'Советы',
    },
    {
        slug: 'vykup-kreditnyh-avtomobilej',
        title: 'Выкуп кредитных автомобилей: особенности и нюансы',
        excerpt: 'Все о выкупе автомобилей, находящихся в кредите или залоге. Как оформить сделку, какие документы нужны, как решить вопрос с банком.',
        date: '15.02.2024',
        category: 'Информация',
    },
    {
        slug: 'vykup-bityh-avto',
        title: 'Выкуп битых авто: что нужно знать',
        excerpt: 'Особенности выкупа сильно поврежденных автомобилей. Как оценивается остаточная стоимость, что влияет на цену битого авто.',
        date: '12.02.2024',
        category: 'Советы',
    },
    {
        slug: 'kak-uvelichit-stoimost-avto',
        title: 'Как увеличить стоимость авто перед продажей',
        excerpt: 'Практические советы по увеличению стоимости автомобиля перед продажей. Что сделать, чтобы получить максимальную цену.',
        date: '08.02.2024',
        category: 'Советы',
    },
    {
        slug: 'sravnenie-vykup-vs-prodazha',
        title: 'Сравнение: выкуп vs продажа самостоятельно',
        excerpt: 'Детальное сравнение продажи через компанию по выкупу и самостоятельной продажи. Плюсы и минусы каждого варианта.',
        date: '05.02.2024',
        category: 'Аналитика',
    },
    {
        slug: 'yuridicheskie-aspekty-vykupa',
        title: 'Юридические аспекты выкупа авто',
        excerpt: 'Правовые вопросы при выкупе автомобиля. Какие документы нужны, как оформить сделку правильно, что нужно проверить.',
        date: '01.02.2024',
        category: 'Информация',
    },
    {
        slug: 'vykup-elitnyh-avtomobilej',
        title: 'Выкуп элитных и премиум автомобилей',
        excerpt: 'Особенности выкупа премиум и элитных автомобилей. Как оцениваются такие авто, что влияет на их стоимость.',
        date: '28.01.2024',
        category: 'Информация',
    },
    {
        slug: 'vykup-kommercheskogo-transporta',
        title: 'Выкуп коммерческого транспорта',
        excerpt: 'Особенности выкупа грузовиков, микроавтобусов и спецтехники. Как оценивается коммерческий транспорт, какие нюансы учесть.',
        date: '25.01.2024',
        category: 'Информация',
    },
    {
        slug: 'sezonnost-rynka-avto',
        title: 'Сезонность на рынке подержанных авто',
        excerpt: 'Как сезон влияет на спрос и цены на подержанные автомобили. Когда лучше продавать авто, чтобы получить максимальную цену.',
        date: '22.01.2024',
        category: 'Аналитика',
    },
    {
        slug: 'kak-otsenit-realnuyu-stoimost',
        title: 'Как оценить реальную стоимость авто',
        excerpt: 'Методы оценки реальной стоимости автомобиля. Какие факторы учитывать, как не продешевить при продаже.',
        date: '18.01.2024',
        category: 'Советы',
    },
    {
        slug: 'psihologiya-prodazhi-avto',
        title: 'Психология продажи: как не продешевить',
        excerpt: 'Психологические аспекты продажи автомобиля. Как вести переговоры, как не поддаться на давление, как получить справедливую цену.',
        date: '15.01.2024',
        category: 'Советы',
    },
];
const baseUrl = APP_CONFIG.BASE_URL;
const blogPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Блог о выкупе автомобилей',
    description: 'Полезные статьи о выкупе автомобилей, советы по продаже авто, новости автомобильного рынка',
    url: `${baseUrl}/blog`,
    mainEntity: {
        '@type': 'ItemList',
        numberOfItems: blogPosts.length,
        itemListElement: blogPosts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Article',
                name: post.title,
                description: post.excerpt,
                url: `${baseUrl}/blog/${post.slug}`,
                datePublished: post.date,
                articleSection: post.category,
            },
        })),
    },
};
const Blog = () => {
    const navigate = useNavigate();
    const handleLinkPress = (path) => {
        navigate(path);
    };
    return (_jsxs("div", { className: "flex-1 bg-neutral-50", children: [_jsx(SchemaMarkup, { schema: blogPageSchema, id: "blog-schema" }), _jsxs("div", { className: "max-w-[1200px] w-full mx-auto px-4", children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: "flex flex-col items-center mb-12 mt-4", children: [_jsx("h1", { className: "text-4xl font-bold text-neutral-900 mb-4 text-center", children: "\u0411\u043B\u043E\u0433 \u043E \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439" }), _jsxs("p", { className: "text-lg text-neutral-600 text-center max-w-[800px] leading-6", children: ["\u041F\u043E\u043B\u0435\u0437\u043D\u044B\u0435 \u0441\u0442\u0430\u0442\u044C\u0438, \u0441\u043E\u0432\u0435\u0442\u044B \u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u043E \u0432\u044B\u043A\u0443\u043F\u0435 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0438\u043B\u0435\u0439 \u0432 \u041C\u043E\u0441\u043A\u0432\u0435 \u0438 \u041C\u041E. \u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u043D\u0430\u0448\u0438\u0445 \u0443\u0441\u043B\u0443\u0433\u0430\u0445:", ' ', _jsx("button", { onClick: () => handleLinkPress('/services/urgent-buyback'), className: "text-primary-600 underline", children: "\u0441\u0440\u043E\u0447\u043D\u044B\u0439 \u0432\u044B\u043A\u0443\u043F" }), ",", ' ', _jsx("button", { onClick: () => handleLinkPress('/services/damaged-cars'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u0431\u0438\u0442\u044B\u0445 \u0430\u0432\u0442\u043E" }), ",", ' ', _jsx("button", { onClick: () => handleLinkPress('/services/after-accident'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043F\u043E\u0441\u043B\u0435 \u0414\u0422\u041F" }), ",", ' ', _jsx("button", { onClick: () => handleLinkPress('/services/credit-cars'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043A\u0440\u0435\u0434\u0438\u0442\u043D\u044B\u0445 \u0430\u0432\u0442\u043E" }), ",", ' ', _jsx("button", { onClick: () => handleLinkPress('/services/premium-cars'), className: "text-primary-600 underline", children: "\u0432\u044B\u043A\u0443\u043F \u043F\u0440\u0435\u043C\u0438\u0443\u043C \u0430\u0432\u0442\u043E" }), "."] })] }), _jsx("div", { className: "flex flex-row flex-wrap gap-6 mb-12", children: blogPosts.map((post) => (_jsx(BlogCard, { post: post, index: 0 }, post.slug))) })] })] }));
};
export default Blog;
