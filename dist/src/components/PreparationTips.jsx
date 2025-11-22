import React from 'react';
import Card from './ui/Card';
const tips = [
    {
        title: 'Мойка и детализация',
        description: 'Тщательно вымойте автомобиль снаружи и внутри. Чистый автомобиль производит лучшее впечатление и может увеличить стоимость на 3-5%.',
        impact: '+3-5%',
    },
    {
        title: 'Устранение мелких дефектов',
        description: 'Исправьте мелкие царапины и сколы. Это недорого, но может значительно улучшить внешний вид и оценку.',
        impact: '+5-10%',
    },
    {
        title: 'Техническое обслуживание',
        description: 'Проведите ТО, замените масло, проверьте все жидкости. Документы о недавнем обслуживании повышают доверие.',
        impact: '+5-8%',
    },
    {
        title: 'Сбор документов',
        description: 'Подготовьте все документы: ПТС, СТС, сервисную книжку, чеки на ремонты. Полный пакет документов увеличивает стоимость.',
        impact: '+5-15%',
    },
    {
        title: 'Удаление личных вещей',
        description: 'Уберите все личные вещи из салона и багажника. Чистый, пустой автомобиль выглядит более привлекательно.',
        impact: '+2-3%',
    },
    {
        title: 'Проверка всех систем',
        description: 'Убедитесь, что все системы работают: кондиционер, аудиосистема, электроника. Неисправности снижают стоимость.',
        impact: '+3-7%',
    },
];
const PreparationTips = () => {
    return (<Card className="p-6 m-4 bg-primary-50">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6">
        Как увеличить стоимость автомобиля перед продажей
      </h3>

      <div className="flex flex-col gap-4 mb-6">
        {tips.map((tip, index) => (<div key={index} className="bg-white rounded-lg p-4">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-row flex-1 mr-4">
                <span className="text-xl text-primary-600 mr-3 mt-0.5">✓</span>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-neutral-900 mb-1">{tip.title}</h4>
                  <p className="text-sm text-neutral-600 leading-5">{tip.description}</p>
                </div>
              </div>
              <div className="bg-success-100 px-3 py-1.5 rounded-2xl">
                <span className="text-sm font-semibold text-success-800">{tip.impact}</span>
              </div>
            </div>
          </div>))}
      </div>

      <div className="bg-white rounded-lg p-4 border-2 border-primary-200">
        <p className="text-sm text-neutral-700 leading-5">
          <strong>Важно:</strong> Следуя всем этим рекомендациям, вы можете увеличить
          стоимость вашего автомобиля на 20-40%. Инвестиции в подготовку обычно
          окупаются многократно.
        </p>
      </div>
    </Card>);
};
export default PreparationTips;
