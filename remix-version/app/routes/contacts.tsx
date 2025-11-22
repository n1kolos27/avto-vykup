import type { MetaFunction } from "react-router";
import Breadcrumbs from "~/components/Breadcrumbs";
import CarEvaluationForm from "~/components/CarEvaluationForm";
import { APP_CONFIG } from "~/lib/config/index";

export const meta: MetaFunction = () => {
  return [
    { title: "Контакты | Выкуп авто в Москве и МО" },
    { name: "description", content: "Свяжитесь с нами для выкупа вашего автомобиля. Телефоны, email и форма обратной связи." },
  ];
};

export default function ContactsRoute() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Контакты</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Свяжитесь с нами</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Телефон</h3>
                <a href={`tel:${APP_CONFIG.PHONE_1}`} className="text-primary-600 hover:underline">
                  {APP_CONFIG.PHONE_1}
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a href={`mailto:${APP_CONFIG.EMAIL}`} className="text-primary-600 hover:underline">
                  {APP_CONFIG.EMAIL}
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <CarEvaluationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

