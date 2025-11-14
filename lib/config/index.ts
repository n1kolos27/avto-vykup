/**
 * Главный файл конфигурации
 * Единая точка экспорта всех настроек приложения
 */

export { ENV } from './env';
export {
  APP_CONFIG,
  RATE_LIMIT,
  VALIDATION,
  CAR_CONDITIONS,
  CAR_CONDITION_LABELS,
  HTTP_STATUS,
  ERROR_CODES,
  TIMEOUTS,
  CACHE,
  REGEX,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from './constants';
export { MAIN_NAV_ITEMS, FOOTER_NAV_ITEMS, ROUTES, API_ROUTES } from './routes';
export type { NavItem } from './routes';

