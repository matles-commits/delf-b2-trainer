# DELF B2 Trainer 🇫🇷📚

Платформа для підготовки до іспиту DELF B2 з детальними поясненнями українською мовою.

## Особливості ✨

- **4 навички DELF B2**: Compréhension Écrite, Production Écrite, Compréhension Orale, Production Orale
- **Оцінка через AI**: Використання Claude API для інтелігентної оцінки та зворотного зв'язку
- **Детальні виправлення**: Граматичні, лексичні та структурні корекції з поясненнями
- **Персоналізований прогрес**: Відстеження статистики, рекомендації та серії днів
- **Українська мова**: Всі інструкції та пояснення українською
- **Сучасний дизайн**: Мінімалістичний та інтуїтивний інтерфейс
- **Аутентифікація Google**: Безпечний вхід через OAuth

## Технічний стек 🛠️

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **База даних**: Supabase (PostgreSQL)
- **Аутентифікація**: Supabase Auth (Google OAuth)
- **AI**: Anthropic Claude API
- **Деплой**: Vercel

## Швидкий старт 🚀

### 1. Клонування репозиторію

\`\`\`bash
git clone <your-repo-url>
cd delf-b2-trainer
\`\`\`

### 2. Встановлення залежностей

\`\`\`bash
npm install
\`\`\`

### 3. Налаштування Supabase

1. Створіть проект на [supabase.com](https://supabase.com)
2. В SQL Editor виконайте міграції:
   - Спочатку `supabase/migrations/001_initial_schema.sql`
   - Потім `supabase/migrations/002_sample_exercises.sql`

3. Налаштуйте Google OAuth:
   - Перейдіть в Authentication → Providers → Google
   - Увімкніть Google provider
   - Додайте ваш Client ID та Client Secret з [Google Cloud Console](https://console.cloud.google.com/)
   - Додайте redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### 4. Налаштування Claude API

1. Отримайте API ключ на [console.anthropic.com](https://console.anthropic.com/)
2. Створіть API key з моделлю Claude Sonnet 4

### 5. Змінні середовища

Створіть файл `.env.local` в корені проекту:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Anthropic Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key

# Site URL (для OAuth redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 6. Запуск локально

\`\`\`bash
npm run dev
\`\`\`

Відкрийте [http://localhost:3000](http://localhost:3000) в браузері.

## Деплой на Vercel 🌐

### 1. Підготовка репозиторію

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
\`\`\`

### 2. Деплой через Vercel

1. Перейдіть на [vercel.com](https://vercel.com)
2. Натисніть "Import Project"
3. Виберіть ваш GitHub репозиторій
4. Додайте змінні середовища:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (ваш Vercel URL)

5. Натисніть "Deploy"

### 3. Оновлення Google OAuth

Після деплою оновіть Authorized redirect URIs в Google Cloud Console:
- Додайте: `https://your-vercel-url.vercel.app/auth/callback`
- Додайте: `https://your-project.supabase.co/auth/v1/callback`

## Структура проекту 📁

\`\`\`
delf-b2-trainer/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── exercises/evaluate/   # AI оцінка вправ
│   │   │   └── progress/update/      # Оновлення прогресу
│   │   ├── auth/callback/            # OAuth callback
│   │   ├── dashboard/                # Головна панель
│   │   ├── exercise/                 # Список та виконання вправ
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Лендінг
│   │   └── globals.css
│   ├── components/
│   │   └── exercises/                # Компоненти вправ
│   ├── lib/
│   │   ├── claude/                   # Claude API utilities
│   │   └── supabase/                 # Supabase client
│   └── types/                        # TypeScript типи
├── supabase/
│   └── migrations/                   # SQL міграції
├── public/
├── package.json
└── README.md
\`\`\`

## Основні функції 🎯

### Для користувачів

- **Реєстрація/Вхід**: Google OAuth для швидкого доступу
- **Dashboard**: Огляд прогресу, статистики та рекомендацій
- **Вправи**: 
  - Compréhension Écrite: читання текстів, різні типи питань
  - Production Écrite: написання листів, есе з оцінкою AI
  - Production Orale: підготовка та симуляція усних виступів
- **Результати**: Детальний зворотній зв'язок з виправленнями та поясненнями
- **Прогрес**: Відстеження балів, часу практики, серії днів

### Технічні особливості

- **Server-side rendering** з Next.js 14
- **Real-time updates** через Supabase
- **Row Level Security** для захисту даних
- **AI-powered evaluation** через Claude API
- **Responsive design** для всіх пристроїв
- **TypeScript** для безпеки типів

## База даних 🗄️

### Основні таблиці:

- **users**: Профілі користувачів
- **exercises**: Вправи для всіх навичок
- **exercise_attempts**: Історія виконань
- **user_progress**: Прогрес по навичках
- **user_stats**: Загальна статистика

### RLS (Row Level Security):

Всі таблиці захищені політиками RLS, які дозволяють користувачам:
- Читати лише свої дані
- Створювати/оновлювати лише свої записи
- Вправи доступні всім (read-only)

## API Endpoints 🔌

### POST `/api/exercises/evaluate`
Оцінює відповіді користувача через Claude API

**Body:**
\`\`\`json
{
  "exerciseId": "uuid",
  "exerciseType": "production_ecrite | comprehension_ecrite",
  "userAnswer": {},
  "exerciseContent": {}
}
\`\`\`

### POST `/api/progress/update`
Оновлює прогрес користувача

**Body:**
\`\`\`json
{
  "userId": "uuid",
  "skill": "comprehension_ecrite",
  "score": 85,
  "maxScore": 100,
  "durationSeconds": 1200
}
\`\`\`

## Розробка 🔧

### Додавання нових вправ

1. Додайте SQL INSERT в `supabase/migrations/`
2. Створіть відповідний компонент в `src/components/exercises/`
3. Оновіть типи в `src/types/index.ts`

### Модифікація оцінювання

Редагуйте функції в `src/lib/claude/api.ts`:
- `evaluateWriting()` - для production écrite
- `evaluateComprehension()` - для comprehension écrite

### Стилізація

Tailwind класи в `src/app/globals.css` та компонентах.

## Підтримка 🆘

Для питань та проблем:
1. Перевірте логи в Vercel
2. Перевірте Supabase logs
3. Перегляньте Network tab в DevTools

## Ліцензія 📄

MIT License

## Автор 👨‍💻

Створено для допомоги українцям у підготовці до DELF B2

---

**Успіхів у навчанні! Bonne chance! 🍀**
