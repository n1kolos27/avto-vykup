# Инструкция по развертыванию на Timeweb Cloud

## Подготовка к развертыванию

### 1. Подготовка проекта

Убедитесь, что проект готов к production:

```bash
# Установка зависимостей
npm install

# Создание production build
npm run build

# Проверка сборки
npm run start
```

### 2. Настройка переменных окружения

Создайте файл `.env.production` на сервере со следующими переменными:

```env
# Основные настройки
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_DOMAIN=your-domain.com

# Email настройки (EmailJS)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Аналитика
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678

# Контакты
NEXT_PUBLIC_PHONE_1=+79991234567
NEXT_PUBLIC_PHONE_2=+79991234568
NEXT_PUBLIC_EMAIL=info@your-domain.com
```

## Развертывание на Timeweb Cloud

### Вариант 1: Использование PM2 (Рекомендуется)

#### Шаг 1: Установка PM2

```bash
npm install -g pm2
```

#### Шаг 2: Создание конфигурации PM2

Создайте файл `ecosystem.config.js` в корне проекта:

```javascript
module.exports = {
  apps: [
    {
      name: "avto-vykup",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/path/to/your/project",
      instances: 2, // Количество инстансов (рекомендуется 2 для балансировки)
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
```

#### Шаг 3: Запуск приложения

```bash
# Запуск приложения
pm2 start ecosystem.config.js

# Сохранение конфигурации для автозапуска
pm2 save
pm2 startup
```

#### Шаг 4: Управление приложением

```bash
# Просмотр статуса
pm2 status

# Просмотр логов
pm2 logs avto-vykup

# Перезапуск
pm2 restart avto-vykup

# Остановка
pm2 stop avto-vykup
```

### Вариант 2: Использование systemd

#### Шаг 1: Создание systemd service

Создайте файл `/etc/systemd/system/avto-vykup.service`:

```ini
[Unit]
Description=Avto Vykup Next.js Application
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/your/project
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=avto-vykup

[Install]
WantedBy=multi-user.target
```

#### Шаг 2: Управление сервисом

```bash
# Перезагрузка systemd
sudo systemctl daemon-reload

# Запуск сервиса
sudo systemctl start avto-vykup

# Включение автозапуска
sudo systemctl enable avto-vykup

# Проверка статуса
sudo systemctl status avto-vykup

# Просмотр логов
sudo journalctl -u avto-vykup -f
```

### Настройка Nginx Reverse Proxy

#### Шаг 1: Установка Nginx

```bash
sudo apt update
sudo apt install nginx
```

#### Шаг 2: Создание конфигурации Nginx

Создайте файл `/etc/nginx/sites-available/avto-vykup`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Редирект на HTTPS (после настройки SSL)
    # return 301 https://$server_name$request_uri;

    # Для временного использования без SSL, раскомментируйте:
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Кэширование статических файлов
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Gzip сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

#### Шаг 3: Активация конфигурации

```bash
# Создание символической ссылки
sudo ln -s /etc/nginx/sites-available/avto-vykup /etc/nginx/sites-enabled/

# Проверка конфигурации
sudo nginx -t

# Перезагрузка Nginx
sudo systemctl reload nginx
```

### Настройка SSL сертификата (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Автоматическое обновление (настроено автоматически)
```

### Оптимизация Next.js для production

Убедитесь, что в `next.config.js` включены все оптимизации:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Для оптимизации размера
  compress: true,
  poweredByHeader: false,
  // ... остальные настройки
};
```

### Мониторинг и логирование

#### Просмотр логов PM2

```bash
pm2 logs avto-vykup --lines 100
```

#### Просмотр логов Nginx

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Резервное копирование

Рекомендуется настроить автоматическое резервное копирование:

```bash
# Пример скрипта резервного копирования
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
PROJECT_DIR="/path/to/your/project"

# Создание резервной копии
tar -czf $BACKUP_DIR/project_$DATE.tar.gz $PROJECT_DIR

# Удаление старых резервных копий (старше 7 дней)
find $BACKUP_DIR -name "project_*.tar.gz" -mtime +7 -delete
```

### Проверка после развертывания

1. Проверьте доступность сайта: `https://your-domain.com`
2. Проверьте работу API: `https://your-domain.com/api/evaluation`
3. Проверьте метаданные и SEO теги
4. Проверьте работу аналитики
5. Проверьте производительность через Lighthouse

### Обновление приложения

```bash
# Остановка приложения
pm2 stop avto-vykup

# Обновление кода
git pull origin main

# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Запуск приложения
pm2 restart avto-vykup
```

## Troubleshooting

### Проблема: Приложение не запускается

```bash
# Проверьте логи
pm2 logs avto-vykup

# Проверьте переменные окружения
pm2 env 0
```

### Проблема: Nginx возвращает 502 Bad Gateway

- Убедитесь, что приложение запущено на порту 3000
- Проверьте конфигурацию Nginx: `sudo nginx -t`
- Проверьте логи Nginx: `sudo tail -f /var/log/nginx/error.log`

### Проблема: Высокое потребление памяти

- Уменьшите количество инстансов PM2
- Добавьте `max_memory_restart: '1G'` в конфигурацию PM2
- Проверьте использование памяти: `pm2 monit`

## Дополнительные рекомендации

1. **CDN**: Настройте CDN для статических ресурсов (если доступно на Timeweb Cloud)
2. **Мониторинг**: Настройте мониторинг через Uptime Robot или аналогичные сервисы
3. **Безопасность**: Регулярно обновляйте зависимости: `npm audit fix`
4. **Производительность**: Используйте кэширование на уровне Nginx для статических файлов
