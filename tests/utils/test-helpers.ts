/**
 * Утилиты для E2E тестов
 */

import { Page, expect } from '@playwright/test';

/**
 * Ожидание загрузки страницы
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Проверка мета-тегов
 */
export async function checkMetaTag(
  page: Page,
  name: string,
  expectedValue: string
): Promise<void> {
  const metaTag = page.locator(`meta[name="${name}"]`);
  await expect(metaTag).toHaveAttribute('content', expectedValue);
}

/**
 * Проверка заголовка страницы
 */
export async function checkPageTitle(page: Page, expectedTitle: string): Promise<void> {
  await expect(page).toHaveTitle(new RegExp(expectedTitle, 'i'));
}

/**
 * Скролл к элементу с ожиданием
 */
export async function scrollToElement(
  page: Page,
  selector: string
): Promise<void> {
  const locator = page.locator(selector);
  const count = await locator.count();

  if (count > 0) {
    // Если несколько элементов, берем первый
    await locator.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Небольшая задержка для анимаций
  }
}

/**
 * Заполнение формы
 */
export async function fillFormField(
  page: Page,
  name: string,
  value: string
): Promise<void> {
  const field = page.locator(`[name="${name}"]`);
  await field.fill(value);
  await expect(field).toHaveValue(value);
}

/**
 * Клик по кнопке с ожиданием
 */
export async function clickButton(
  page: Page,
  text: string | RegExp
): Promise<void> {
  const button = page.getByRole('button', { name: text });
  await button.waitFor({ state: 'visible' });
  await button.click();
}

/**
 * Проверка видимости элемента
 */
export async function checkElementVisible(
  page: Page,
  selector: string
): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
}

/**
 * Проверка текста элемента
 */
export async function checkElementText(
  page: Page,
  selector: string,
  expectedText: string | RegExp
): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toHaveText(expectedText);
}

/**
 * Ожидание появления toast сообщения
 */
export async function waitForToast(
  page: Page,
  message?: string | RegExp
): Promise<void> {
  const toast = page.locator('[role="alert"], [data-toast]').first();
  await toast.waitFor({ state: 'visible', timeout: 5000 });

  if (message) {
    await expect(toast).toContainText(message);
  }
}

/**
 * Проверка accessibility атрибутов
 */
export async function checkAriaLabel(
  page: Page,
  selector: string,
  expectedLabel: string
): Promise<void> {
  const element = page.locator(selector);
  await expect(element).toHaveAttribute('aria-label', expectedLabel);
}

/**
 * Проверка keyboard navigation
 */
export async function testKeyboardNavigation(
  page: Page,
  selectors: string[]
): Promise<void> {
  await page.keyboard.press('Tab');

  for (const selector of selectors) {
    const element = page.locator(selector);
    await expect(element).toBeFocused();
    await page.keyboard.press('Tab');
  }
}

/**
 * Проверка мобильного viewport
 */
export async function setMobileViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 375, height: 667 });
}

/**
 * Проверка desktop viewport
 */
export async function setDesktopViewport(page: Page): Promise<void> {
  await page.setViewportSize({ width: 1920, height: 1080 });
}

/**
 * Ожидание загрузки изображения
 */
export async function waitForImageLoad(
  page: Page,
  selector: string
): Promise<void> {
  const image = page.locator(selector);
  await image.waitFor({ state: 'visible' });
  await expect(image).toHaveJSProperty('complete', true);
}
