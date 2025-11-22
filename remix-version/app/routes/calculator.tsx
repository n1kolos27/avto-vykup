import type { MetaFunction } from "react-router";
import Calculator from "~/components/Calculator";
import Breadcrumbs from "~/components/Breadcrumbs";
import PriceFactors from "~/components/PriceFactors";
import PreparationTips from "~/components/PreparationTips";
import CarEvaluationForm from "~/components/CarEvaluationForm";
import SchemaMarkup from "~/components/SchemaMarkup";
import { APP_CONFIG } from "~/lib/config/index";

export const meta: MetaFunction = () => {
  return [
    { title: "Калькулятор стоимости автомобиля | Выкуп авто в Москве" },
    { name: "description", content: "Онлайн калькулятор для расчета предварительной стоимости автомобиля. Учитывает марку, модель, год выпуска, пробег и состояние." },
  ];
};

const baseUrl = APP_CONFIG.BASE_URL;

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Калькулятор стоимости автомобиля',
  description: 'Онлайн калькулятор для расчета предварительной стоимости автомобиля.',
  url: `${baseUrl}/calculator`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'RUB',
  },
};

export default function CalculatorRoute() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Калькулятор стоимости автомобиля</h1>
        <Calculator />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <PriceFactors />
          <PreparationTips />
        </div>
        <div className="mt-12">
          <CarEvaluationForm />
        </div>
      </div>
      <SchemaMarkup schema={webApplicationSchema} />
    </div>
  );
}

