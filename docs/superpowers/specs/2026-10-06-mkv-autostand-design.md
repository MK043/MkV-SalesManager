# MKV Autostand — Architectural & Functional Specification

## 1. System Overview
MKV Autostand is a modern, responsive, high-performance automotive workshop and dealership management system tailored for MKV Production.

### Core Modules
1. **Dashboard Today (`/today`)**: Daily KPI summary, revenue metrics, yesterday comparison, 7-day sparkline, debts summary, cars in work, intake/issue lists.
2. **Order Board / Pipeline (`/board`)**: Kanban view of all active service orders by stages (Прийомка, Діагностика, Узгодження, Замовлення запчастин, Ремонт, Контроль якості, Мийка, Видача) with quick actions, card details, drag/move, assignee tags.
3. **Orders Registry (`/orders`)**: Complete searchable and filterable list of all orders, status tabs, date filters, creation modal.
4. **Order Detail (`/orders/:id`)**: Comprehensive order management — vehicle details, stage stepper, checklist verification, work items, spare parts tracker, payments, comments timeline, PDF invoice/act export, stage rollback.
5. **Bookings (`/bookings`)**: Appointments calendar, booking list, time slot booking, one-click conversion to active order.
6. **Parking / Yard (`/parking`)**: Parking grid, vehicles parked awaiting parts or pickup, release from parking.
7. **Warehouse (`/warehouse`)**: Real-time stock levels, warehouse documents (Прибуткова накладна, Видаткова накладна, Інвентаризація), stock movement cards, posting/unposting.
8. **Spare Parts Board (`/parts`)**: Parts orders across jobs, status pipeline (Потрібно замовити, Замовлено, Очікується, На складі, Встановлено).
9. **Cash Register & Finance (`/cash`)**: Cash registers, cashflow income/expense orders, PKO/RKO generation, daily balances.
10. **Reports & Analytics (`/reports`)**:
    - Debts Report
    - Mechanics & Executors Performance
    - Service Managers Performance
    - Payroll Calculation
    - Orders Registry with Excel/CSV export
11. **Tasks (`/company-tasks`, `/my-tasks`)**: Company-wide tasks board, subtasks, personal mechanic task checklist.
12. **Shifts & Time Tracking (`/shifts`)**: Shifts queue, clock-in, clock-out, manager approval.
13. **Settings & Admin (`/settings`, `/employees`, `/profile`)**: User permissions, custom stages, stage checklists, payroll rates, currency settings, theme settings.
14. **Audit Trail (`/audit`)**: System action log.

## 2. Localization & Currency Requirements
- Zero Russian language.
- Ukrainian default locale, English optional locale.
- Multi-currency: UAH (₴), USD ($), EUR (€).
