import type { ActionFunctionArgs } from "react-router";
import { json } from "react-router";
import { validateEvaluationForm } from "~/lib/validation";
import { APP_CONFIG } from "~/lib/config/index";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      year: formData.get("year") ? parseInt(formData.get("year") as string) : undefined,
      mileage: formData.get("mileage") ? parseInt(formData.get("mileage") as string) : undefined,
      condition: formData.get("condition") as string,
      message: formData.get("message") as string,
    };

    // Валидация
    const validation = validateEvaluationForm(data);
    if (!validation.isValid) {
      return json({ error: validation.error }, { status: 400 });
    }

    // Здесь должна быть логика отправки email или сохранения в БД
    // Пока возвращаем успешный ответ
    console.log("Evaluation form submitted:", data);

    return json({ 
      success: true, 
      message: "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время." 
    });
  } catch (error) {
    console.error("Error processing evaluation form:", error);
    return json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

