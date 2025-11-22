const defaultSiteName = 'Выкуп авто | Московский Авто Альянс';
const defaultImage = 'https://mos-avto-alyans.ru/og-image.png';
const defaultLocale = 'ru_RU';
export function generateMetadata(metadata) {
    const title = metadata.title || 'Выкуп авто в Москве и МО';
    const description = metadata.description || 'Профессиональный выкуп автомобилей';
    const url = metadata.url || 'https://mos-avto-alyans.ru';
    const image = metadata.image || defaultImage;
    const keywords = metadata.keywords || 'выкуп авто, выкуп автомобилей, Москва, МО, срочный выкуп, выкуп битых авто';
    const locale = metadata.locale || defaultLocale;
    const siteName = metadata.siteName || defaultSiteName;
    // Экранируем HTML для безопасности
    const escapeHtml = (text) => {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };
    return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(url)}">
    <meta property="og:image" content="${escapeHtml(image)}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${locale}">
    <meta property="og:site_name" content="${escapeHtml(siteName)}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(image)}">
    <link rel="canonical" href="${escapeHtml(url)}">
  `.trim();
}
