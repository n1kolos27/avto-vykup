import type { ActionFunctionArgs } from "react-router";
import { json } from "react-router";
import { validateContactForm } from "~/lib/validation";
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
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    // Валидация
    const validation = validateContactForm(data);
    if (!validation.isValid) {
      return json({ error: validation.error }, { status: 400 });
    }

    // Здесь должна быть логика отправки email
    console.log("Contact form submitted:", data);

    return json({ 
      success: true, 
      message: "Сообщение успешно отправлено. Мы ответим вам в ближайшее время." 
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

