import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import Layout from "./components/Layout";
import Analytics from "./components/Analytics";
import stylesheet from "./styles/globals.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Выкуп авто в Москве и МО | Быстро и Выгодно" },
    { name: "description", content: "Профессиональный выкуп автомобилей в Москве и Московской области. Срочный выкуп за 2 часа, быстрая оценка, честная цена." },
  ];
};

export default function App() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <Analytics 
          googleAnalyticsId={process.env.GOOGLE_ANALYTICS_ID}
          yandexMetrikaId={process.env.YANDEX_METRIKA_ID}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

