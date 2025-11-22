import type { MetaFunction } from "react-router";
import { Link } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Страница не найдена | Выкуп авто" },
    { name: "description", content: "Запрашиваемая страница не найдена." },
  ];
};

export default function NotFoundRoute() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Страница не найдена</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

