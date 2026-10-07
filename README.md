# 📊 MkV Sales Manager CRM — B2B Media Buying OS & AI Creative Studio

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React Version](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Platform](https://img.shields.io/badge/Theme-Dark_Mode_Slate_(%230F172A)-0F172A)](#-дизайн-система-та-дизайн-токени)

---

### 🎓 Академічний паспорт роботи
- **Організація:** ДВНЗ «Ужгородський національний університет» (УжНУ)
- **Факультет:** Факультет інформаційних технологій (ФІТ)
- **Кафедра:** Кафедра інженерії програмного забезпечення (ІПЗ)
- **Дисципліна:** «Розробка веб-застосунків на базі React»
- **Лабораторна робота №2:** *«Проєктування та представлення фінального UI/UX дизайну веб-застосунку CRM-платформи «MkV Sales Manager» для таргетологів та SMM-спеціалістів та налаштування середовища версіонування Git/GitHub»*
- **Виконавець:** Студент 2-го курсу денної форми навчання групи ІПЗ-1 **Багин Михайло Михайлович** ([@MK043](https://github.com/MK043))
- **Академічний рецензент:** Бучук Роман Олександрович ([@romanbuchuk](https://github.com/romanbuchuk))
- **Звіт лабораторної роботи:** [docs/Laboratorna_Robota_2_Bahyn_MkV_Sales_Manager.docx](docs/Laboratorna_Robota_2_Bahyn_MkV_Sales_Manager.docx)

---

## 🎯 1. Загальна концепція та призначення платформи
**«MkV Sales Manager CRM»** — це спеціалізована веб-орієнтована екосистема для таргетологів, SMM-менеджерів, медіабаєрів та діджитал-агенцій. 

Традиційні CRM (HubSpot, Bitrix24) зосереджені на воронках лідів, але не пристосовані до роботи з рекламними аукціонами. «MkV Sales Manager CRM» надає єдиний робочий контур, який об'єднує:
1. **Крос-платформний аналітичний хаб:** Агрегація даних через офіційні API мереж Meta, TikTok та Google Ads (Blended ROAS, Total Spend, CPA, CTR).
2. **Креативна ШІ-студія (Storyboard AI):** Автоматичне створення розкадрувань рекламних відео (Hook 0–3s, Problem/Solution 4–15s, CTA 16–25s) з AI Voiceover та титрами.
3. **Движок автоматичних правил (Campaigns & Traffic Rules):** CPA Threshold Guard (> $22 auto-pause), ROAS Scaler (> 4.0x +20% budget), Ad Fatigue Breaker.
4. **Детектор вигорання аудиторії (Ad Fatigue Detector):** Щоденний моніторинг перетину Frequency (> 2.8) та падіння CTR (> 20%) зі швидкою заміною хука в 1 клік.
5. **Інтерактивна база знань та чеклисти CAPI:** Налаштування серверного пікселя Meta CAPI, валідація доменів (AEM), TikTok Spark Ads та антибан-діагностика Business Manager (Trust Score 94/100).
6. **Мультиплатформна атрибуція та Lookalike аудиторії:** Відстеження шляху клієнта (Customer Journey) в умовах обмежень iOS 14.5+ та дедуплікація подій.
7. **Центр офіційних API-інтеграцій (RBAC):** Meta Graph API v19+, TikTok Commercial API v1.3, Google Ads REST API v16+, Shopify CRM Webhooks.
8. **Модуль авторизації таргетолога:** Корпоративний OAuth 2.0 Single Sign-On (Google & Meta Business) та внутрішні JWT токени доступу.

---

## 🖥️ 2. Каталог модулів та інтерфейсних екранів (UI/UX)

| № | Файл мокапу | Функціональний модуль | Опис та ключові можливості |
|---|-------------|------------------------|-----------------------------|
| 1 | [`index.html`](index.html) | **Головний портал (Master Hub)** | Стартовий навігаційний SPA-хаб, статус синхронізації рекламних мереж та селектор клієнтського проєкту. |
| 2 | [`01_analytics_dashboard.html`](01_analytics_dashboard.html) | **Панель крос-платформної аналітики** | Метрики KPI ($18,420 spend, 3.84x ROAS, $14.20 CPA), крос-платформні графіки Meta/TikTok/Google, гістограма розбивки та Anomaly Alerts. |
| 3 | [`02_ai_creative_studio.html`](02_ai_creative_studio.html) | **Креативна ШІ-студія (Storyboard AI)** | 3-колонковий генератор сценаріїв: селектор хуків (Problem/Solution, Curiosity Gap), сторіборд 3 сцен з таймлайном, аудіо-симулятор AI Voiceover. |
| 4 | [`03_campaigns_management.html`](03_campaigns_management.html) | **Центр управління кампаніями** | Контроль добових лімітів ($275/день), авто-пауза збиткових зв'язок (CPA Guard) та масштабування бюджетів. |
| 5 | [`04_ad_fatigue_detector.html`](04_ad_fatigue_detector.html) | **Детектор вигорання аудиторії** | Графік дивергенції Frequency vs CTR, матриця здоров'я 18 оголошень, аналітика 3s Hook Retention та заміна хука в 1 клік. |
| 6 | [`05_knowledge_base_capi.html`](05_knowledge_base_capi.html) | **Інтерактивна база знань & CAPI** | Покрокові чеклисти Meta CAPI, TikTok Spark Ads, Google PMax та антибан-діагностика BM Trust 94/100. |
| 7 | [`06_audiences_attribution.html`](06_audiences_attribution.html) | **Мультиплатформна атрибуція** | Шлях покупця (TikTok First Touch -> Google Search -> Meta Retargeting), синхронізація 42,000 Lookalike та якість CAPI (8.8/10). |
| 8 | [`07_integrations_settings.html`](07_integrations_settings.html) | **Офіційні API-інтеграції & RBAC** | Керування API-ключами Meta, TikTok, Google Ads, Shopify та розмежування ролей команди (Admin, Buyer, Editor, Client). |
| 9 | [`mockups/svg/08_auth_modal.svg`](mockups/svg/08_auth_modal.svg) | **Модуль авторизації спеціаліста** | Модальне вікно автентифікації таргетолога: OAuth 2.0 Single Sign-On (Meta/Google) та JWT токени з шифруванням AES-256. |

---

## 🎨 3. Дизайн-система та дизайн-токени

Платформа спроєктована на базі дизайн-системи **Dark Mode Slate (#0F172A)**:
- `--bg-app: #070B14` — глибокий космічний темний фон застосунку;
- `--bg-sidebar: #0C1220` — фон бічної та верхньої панелей;
- `--bg-card: #131D31` — фон аналітичних карток та контейнерів;
- `--accent-indigo: #6366F1` — первинний фірмовий акцент (CTA кнопки, активні таби);
- `--accent-emerald: #10B981` — індикатор конверсій, високого ROAS (> 3.0x) та успішної CAPI дедуплікації;
- `--accent-rose: #F43F5E` — попередження про вигорання (Ad Fatigue Alert) та перевищення вартості дії (CPA Guard);
- `--accent-cyan: #06B6D4` — підсвічування метрик багатоканальної атрибуції;
- `--text-primary: #F8FAFC` — основний контрастний білий текст заголовків та показників.

**Типографіка:** `Inter` (інтерфейсні тексти та кнопки), `Rajdhani` (великі аналітичні показники KPI), `JetBrains Mono` (API токени, системні логи, хеші).

---

## ⚙️ 4. Технологічний стек для семестрової реалізації React
- **Frontend Core:** [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/)
- **Стилізація:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Маршрутизація:** [React Router v6](https://reactrouter.com/)
- **Управління станом:** [Zustand](https://github.com/pmndrs/zustand) / React Context API
- **Векторні піктограми:** [Lucide React](https://lucide.dev/)
- **Real-time оновлення:** Server-Sent Events (SSE) & WebSocket API шлюз

---

## 🚀 5. Як запустити та переглянути локально
1. Клонуйте репозиторій:
   ```bash
   git clone https://github.com/MK043/MkV-SalesManager.git
   cd MkV-SalesManager
   ```
2. Відкрийте файл `index.html` у сучасному веб-браузері (Google Chrome, Edge, Firefox, Safari) для огляду інтерактивних HTML/CSS/JS мокапів.
3. Усі векторні SVG та растрові PNG макети знаходяться у каталозі `mockups/`.
4. Повний офіційний звіт лабораторної роботи у форматі DOCX розміщено у каталозі `docs/Laboratorna_Robota_2_Bahyn_MkV_Sales_Manager.docx`.

---
*Розроблено студентом кафедри інженерії програмного забезпечення (ІПЗ) ФІТ УжНУ Багином Михайлом Михайловичем, 2026 рік.*
