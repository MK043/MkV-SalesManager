# SESSION-STATE (WAL)

## Project
- Name: MKV Autostand (МКВ Автостенд - Екосистема управління автосервісом)
- Domain: Automotive CRM / ERP & Workshop Pipeline Management System
- Client / Brand: MKV Production (Колірна гама: Olive `#4A5E38`, Sand/Gold `#C8AD8D`, Dark Surface `#0C0D11`, Light `#FAF9F5`)
- Target: 100% clone and enhancement of `avto-panel.demo.aivinity.ru`
- Status: In Progress (Analysis & Scraping Complete -> Architecture & Implementation Active)

## Directives & Decisions
1. **Full Feature Parity**:
   - Dashboard Today (`/today`): Revenue KPI sparkline, intake/issue count, overdue warnings, quick actions.
   - Kanban Pipeline Board (`/board`): Multi-stage workflow (Прийомка, Діагностика, Узгодження, Замовлення запчастин, Ремонт, Контроль якості, Мийка, Видача) with stage assignment, checklist counters, card drag/drop & quick advance.
   - Orders Management (`/orders`, `/orders/:id`, `/orders/new`): Full work items list, parts table, payment records, PDF generation, checklist items, history log, comments feed.
   - Bookings (`/bookings`): Calendar and booking list, convert booking to active order.
   - Parking / Yard (`/parking`): Vehicles on parking lot, parking spots, release from parking.
   - Warehouse (`/warehouse`): Stock inventory, incoming/outgoing warehouse documents (прибуткові/видаткові накладні, інвентаризація), stock movement history.
   - Parts Procurement (`/parts`): Parts order board, procurement status (потрібно, замовлено, прибуло, видано в цех).
   - Cash Desk (`/cash`): Cashflow statistics, cash receipts and expenses, PKO/RKO records.
   - Reports (`/reports`): Debts report, managers report, mechanics payroll report, orders registry with period filter and CSV/XLS export.
   - Tasks & My Tasks (`/company-tasks`, `/my-tasks`): Company tasks board, personal mechanic tasks with checklist execution.
   - Shifts & Attendance (`/shifts`): Active shifts queue, shift opening/closing and approval.
   - Employees & Roles (`/employees`, `/settings`): Staff directory, positions, permissions, hourly/percentage payroll settings, stage checklists config.
   - Audit Trail (`/audit`): Complete change log of all operations.

2. **Localization & Language**:
   - Zero Russian language. All strings, names, addresses, car models, plate formats localized.
   - Ukrainian default (`uk-UA`).
   - English toggle (`en-US`).
   - Ukrainian vehicle plate generation (`AA 1234 BC`, `BC 5678 KA`, `KA 9901 TT`, etc.).
   - Ukrainian phone format (`+380 50 ...`, `+380 67 ...`).

3. **Multi-Currency Engine**:
   - Support for EUR (€), USD ($), and UAH (₴).
   - Global currency selector in header & settings.
   - Accurate formatting across all monetary cards, debts, balance sheets, payroll, invoices.

4. **Production Readiness**:
   - Removal of all demo badges, "Reset demo", "visitor ticket", demo role dropdowns.
   - Full persistence: Built-in local SQLite / JSON backend with Express/Fastify REST API server + Vite frontend, or complete self-contained fullstack React application with real SQLite/IndexedDB & REST API sync.
   - Authentication: Real users, session persistence, role-based access control.
