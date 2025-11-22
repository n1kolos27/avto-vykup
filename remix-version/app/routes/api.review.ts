import type { ActionFunctionArgs } from "react-router";
import { json } from "react-router";
import { validateReviewForm } from "~/lib/validation";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const data = {
      name: formData.get("name") as string,
      rating: formData.get("rating") ? parseInt(formData.get("rating") as string) : undefined,
      text: formData.get("text") as string,
      carModel: formData.get("carModel") as string,
    };

    // Валидация
    const validation = validateReviewForm(data);
    if (!validation.isValid) {
      return json({ error: validation.error }, { status: 400 });
    }

    // Здесь должна быть логика сохранения отзыва
    console.log("Review form submitted:", data);

    return json({ 
      success: true, 
      message: "Отзыв успешно отправлен. Спасибо за ваш отзыв!" 
    });
  } catch (error) {
    console.error("Error processing review form:", error);
    return json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

