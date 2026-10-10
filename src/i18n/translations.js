// Complete localization dictionaries for MKV Autostand (Ukrainian & English)
// Zero Russian strings.

export const translations = {
  uk: {
    // Brand
    brandName: 'MKV Auto Stand',
    brandTagline: 'Екосистема управління автосервісом',

    // Navigation
    nav: {
      today: 'Сьогодні',
      board: 'Дошка замовлень',
      orders: 'Всі замовлення',
      customers: 'Клієнти',
      newOrder: 'Нове замовлення',
      bookings: 'Записи на візит',
      parking: 'Автостоянка',
      warehouse: 'Склад',
      parts: 'Запчастини',
      cash: 'Каса та фінанси',
      reports: 'Аналітичні звіти',
      companyTasks: 'Завдання сервісу',
      myTasks: 'Мої завдання',
      employees: 'Співробітники',
      shifts: 'Зміни в цеху',
      settings: 'Налаштування',
      audit: 'Журнал аудиту',
      profile: 'Мій профіль',
      logout: 'Вийти'
    },

    // Today screen
    today: {
      title: 'Сервіс сьогодні',
      moneyTitle: 'Касові надходження сьогодні',
      noPayments: 'Оплат сьогодні ще не було',
      paymentsCount: 'оплат(и)',
      yesterdayComparison: 'порівняно з вчора',
      weekSparkline: 'Динаміка за 7 днів',
      debtsTitle: 'Заборгованість клієнтів',
      debtsTotal: 'Загальний борг за активними нарядами',
      debtsOrdersCount: 'замовлень із боргом',
      inWorkTitle: 'Автомобілів у роботі',
      allOnTime: 'Всі автомобілі вкладаються в нормативні терміни',
      overdueAlert: 'потребують уваги (дедлайн спливає)',
      intakeIssueTitle: 'Прийом та видача на сьогодні',
      toReceive: 'До прийому',
      toIssue: 'Готові до видачі',
      issued: 'видано клієнту',
      quickActions: 'Швидкі дії',
      createOrderBtn: 'Оформити прийомку',
      createBookingBtn: 'Записати на ремонт',
      openCashBtn: 'Провести оплату',
      activeShiftsNow: 'Зараз на зміні в цеху'
    },

    // Pipeline / Board
    board: {
      title: 'Конвеєр робіт',
      subtitle: 'Рух автомобілів за виробничими етапами',
      filterExecutor: 'Фільтр за виконавцем',
      allExecutors: 'Всі співробітники',
      searchPlaceholder: 'Пошук за номером, авто чи клієнтом...',
      parkingCount: 'На стоянці',
      inWorkCount: 'У виробництві',
      advanceStage: 'Перевести далі',
      stageRollback: 'Повернути назад',
      assignExecutor: 'Призначити майстра',
      noOrdersInStage: 'Немає автомобілів на цьому етапі',
      checklistProgress: 'чек-лист'
    },

    // Orders
    orders: {
      title: 'Реєстр замовлень-нарядів',
      newOrderTitle: 'Оформлення нового замовлення-наряду',
      orderNumber: '№ замовлення',
      client: 'Клієнт',
      vehicle: 'Автомобіль',
      plate: 'Держномер',
      vin: 'VIN-код',
      year: 'Рік випуску',
      color: 'Колір',
      phone: 'Телефон',
      currentStage: 'Поточний етап',
      status: 'Статус',
      statusInWork: 'У роботі',
      statusCompleted: 'Завершено',
      statusCanceled: 'Скасовано',
      statusParking: 'На стоянці',
      totalAmount: 'Сума робіт і деталей',
      paidAmount: 'Сплачено',
      balance: 'Залишок / Борг',
      createdAt: 'Дата відкриття',
      deadlineAt: 'Планова видача',
      actions: 'Дії',
      filterAll: 'Всі замовлення',
      filterActive: 'Активні',
      filterDone: 'Завершені',
      createBtn: 'Створити наряд'
    },

    // Order Detail
    orderDetail: {
      backToBoard: 'До дошки робіт',
      backToOrders: 'До списку замовлень',
      tabs: {
        info: 'Загальна картка',
        works: 'Роботи та послуги',
        parts: 'Запчастини та матеріали',
        payments: 'Платежі та каса',
        checklist: 'Контрольний чек-лист',
        documents: 'Акти та рахунки',
        comments: 'Коментарі та примітки',
        history: 'Історія дій'
      },
      intakeCard: 'Картка автомобіля та прийомки',
      orderSummary: 'Кошторис замовлення',
      addWorkItem: 'Додати роботу',
      addPartItem: 'Додати запчастину',
      addPaymentItem: 'Внести платіж',
      stageReviewPending: 'Очікує підтвердження етапу',
      confirmStageBtn: 'Підтвердити виконання етапу',
      sendToParking: 'Перемістити на автостоянку',
      releaseParking: 'Забрати зі стоянки в роботу',
      printInvoice: 'Друкувати рахунок-фактуру',
      printAct: 'Друкувати акт виконаних робіт',
      completeOrder: 'Видати автомобіль та закрити наряд'
    },

    // Bookings
    bookings: {
      title: 'Онлайн-записи на ремонт',
      subtitle: 'Попередній графік візитів клієнтів',
      newBookingBtn: 'Створити запис',
      convertOrderBtn: 'Оформити прийомку в 1 клік',
      timeSlot: 'Час прибуття',
      serviceRequested: 'Причина звернення / Послуга',
      notes: 'Примітки клієнта'
    },

    // Parking
    parking: {
      title: 'Автостоянка сервісу',
      subtitle: 'Автомобілі, які очікують запчастин, узгодження або видачі',
      daysOnParking: 'днів на стоянці',
      takeToWork: 'Взяти в роботу в цех',
      emptyParking: 'На стоянці зараз немає автомобілів'
    },

    // Warehouse
    warehouse: {
      title: 'Складський облік MKV',
      tabStock: 'Залишки товарів',
      tabDocs: 'Накладні та документи',
      newDocBtn: 'Створити документ',
      itemName: 'Найменування позиції',
      article: 'Артикул / Каталожний номер',
      category: 'Категорія',
      inStock: 'Залишок на складі',
      unit: 'Од. вим.',
      buyPrice: 'Ціна закупки',
      sellPrice: 'Ціна продажу',
      docType: 'Тип документа',
      docIncome: 'Прибуткова накладна',
      docOutcome: 'Видаткова накладна',
      docWriteoff: 'Списання матеріалів',
      docInventory: 'Інвентаризація',
      docStatus: 'Статус',
      docPosted: 'Проведено',
      docDraft: 'Чернетка',
      postDoc: 'Провести документ',
      unpostDoc: 'Скасувати проведення'
    },

    // Parts
    parts: {
      title: 'Постачання та замовлення запчастин',
      subtitle: 'Зведена таблиця деталей для всіх автомобілів у ремонті',
      statusNeeded: 'Потрібно замовити',
      statusOrdered: 'Замовлено у постачальника',
      statusExpected: 'В дорозі / Очікується',
      statusArrived: 'Прибуло на склад',
      statusInstalled: 'Встановлено на авто',
      markArrived: 'Позначити як отримане'
    },

    // Cash
    cash: {
      title: 'Каса та грошові потоки',
      subtitle: 'Облік готівкових і безготівкових надходжень',
      currentBalance: 'Поточний залишок у касі',
      todayIncome: 'Надходження за сьогодні',
      todayExpense: 'Витрати за сьогодні',
      newOrderBtn: 'Новий касовий ордер',
      typeIncome: 'Прибутковий ордер (ПКО)',
      typeExpense: 'Видатковий ордер (РКО)',
      methodCash: 'Готівка',
      methodCard: 'Банківська картка (POS)',
      methodIban: 'Безготівковий розрахунок IBAN'
    },

    // Reports
    reports: {
      title: 'Аналітика та фінансові звіти',
      periodFrom: 'Період з',
      periodTo: 'по',
      tabDebts: 'Заборгованість',
      tabExecutors: 'Виробіток майстрів',
      tabManagers: 'Показники приймальників',
      tabPayroll: 'Нарахування зарплати',
      tabRegistry: 'Зведений реєстр робіт',
      exportCsv: 'Експорт таблиці (CSV)',
      totalRevenue: 'Загальний валовий дохід',
      totalCost: 'Собівартість матеріалів',
      grossProfit: 'Валовий прибуток'
    },

    // Tasks
    tasks: {
      companyTitle: 'Завдання компанії',
      myTitle: 'Мої персональні завдання',
      addTaskBtn: 'Поставити завдання',
      priorityLow: 'Низький',
      priorityMedium: 'Звичайний',
      priorityHigh: 'Терміновий',
      assignedTo: 'Виконавець',
      subtasks: 'Підзавдання'
    },

    // Shifts
    shifts: {
      title: 'Зміни в цеху та табель',
      activeNow: 'Зараз працюють у цеху',
      pendingApproval: 'Очікують підтвердження входу на зміну',
      startShift: 'Відкрити зміну',
      closeShift: 'Закрити зміну',
      approveShift: 'Підтвердити вихід майстра'
    },

    // Employees
    employees: {
      title: 'Штат співробітників MKV',
      addEmployeeBtn: 'Додати співробітника',
      name: 'ПІБ співробітника',
      position: 'Посада',
      role: 'Рівень доступу',
      phone: 'Контактний телефон',
      activeStatus: 'Статус роботи',
      hourlyRate: 'Погодинна ставка',
      commissionPercent: '% від виконаних робіт'
    },

    // Settings
    settings: {
      title: 'Конфігурація та налаштування системи',
      tabGeneral: 'Загальні параметри',
      tabStages: 'Етапи конвеєра робіт',
      tabChecklists: 'Шаблони чек-лістів',
      tabRoles: 'Ролі та рівні доступу',
      tabPayroll: 'Тарифи та зарплатні схеми',
      language: 'Мова системи',
      currency: 'Основна валюта',
      theme: 'Колірна тема',
      themeDark: 'Глибока темна (MKV Obsidian)',
      themeLight: 'Світла (MKV Sand Platinum)',
      accentColor: 'Фірмовий акцент',
      accentOlive: 'Оливковий MKV (Фірмовий)',
      accentSand: 'Теплий пісочний (Gold Sand)',
      accentBlue: 'Класичний синій',
      accentEmerald: 'Смарагдовий',
      accentOrange: 'Теракотовий оранж'
    },

    // Common
    common: {
      save: 'Зберегти',
      cancel: 'Скасувати',
      delete: 'Видалити',
      edit: 'Редагувати',
      create: 'Створити',
      close: 'Закрити',
      back: 'Назад',
      confirm: 'Підтвердити',
      search: 'Пошук...',
      loading: 'Завантаження даних…',
      noData: 'Дані відсутні',
      success: 'Успішно збережено',
      error: 'Виникла помилка під час виконання',
      refresh: 'Оновити'
    }
  },

  en: {
    // Brand
    brandName: 'MKV Auto Stand',
    brandTagline: 'Automotive Workshop ERP Ecosystem',

    // Navigation
    nav: {
      today: 'Today',
      board: 'Pipeline Board',
      orders: 'All Orders',
      customers: 'Clients',
      newOrder: 'New Order',
      bookings: 'Appointments',
      parking: 'Parking Yard',
      warehouse: 'Warehouse',
      parts: 'Spare Parts',
      cash: 'Cash & Finance',
      reports: 'Analytics & Reports',
      companyTasks: 'Company Tasks',
      myTasks: 'My Tasks',
      employees: 'Staff & Team',
      shifts: 'Workshop Shifts',
      settings: 'Settings',
      audit: 'Audit Trail',
      profile: 'My Profile',
      logout: 'Sign Out'
    },

    // Today screen
    today: {
      title: 'Workshop Today',
      moneyTitle: 'Revenue Today',
      noPayments: 'No payments recorded yet today',
      paymentsCount: 'payment(s)',
      yesterdayComparison: 'vs yesterday',
      weekSparkline: '7-Day Revenue Trend',
      debtsTitle: 'Customer Receivables',
      debtsTotal: 'Total outstanding balance across active orders',
      debtsOrdersCount: 'orders with debt',
      inWorkTitle: 'Vehicles in Progress',
      allOnTime: 'All vehicles are within scheduled deadlines',
      overdueAlert: 'require attention (approaching deadline)',
      intakeIssueTitle: 'Intake & Handover Today',
      toReceive: 'To Check In',
      toIssue: 'Ready for Pickup',
      issued: 'handed over to customer',
      quickActions: 'Quick Actions',
      createOrderBtn: 'New Intake Order',
      createBookingBtn: 'Book Appointment',
      openCashBtn: 'Record Payment',
      activeShiftsNow: 'Active Staff On Shift'
    },

    // Pipeline / Board
    board: {
      title: 'Workflow Pipeline',
      subtitle: 'Vehicle progression across workshop stages',
      filterExecutor: 'Filter by Technician',
      allExecutors: 'All Technicians',
      searchPlaceholder: 'Search plate, car model, or customer...',
      parkingCount: 'Parked',
      inWorkCount: 'In Workshop',
      advanceStage: 'Move to Next Stage',
      stageRollback: 'Roll Back Stage',
      assignExecutor: 'Assign Technician',
      noOrdersInStage: 'No vehicles at this stage',
      checklistProgress: 'checklist'
    },

    // Orders
    orders: {
      title: 'Service Orders Registry',
      newOrderTitle: 'Create New Service Order',
      orderNumber: 'Order #',
      client: 'Customer',
      vehicle: 'Vehicle',
      plate: 'License Plate',
      vin: 'VIN Number',
      year: 'Model Year',
      color: 'Color',
      phone: 'Phone',
      currentStage: 'Current Stage',
      status: 'Status',
      statusInWork: 'In Progress',
      statusCompleted: 'Completed',
      statusCanceled: 'Canceled',
      statusParking: 'Parked',
      totalAmount: 'Total Services & Parts',
      paidAmount: 'Paid',
      balance: 'Balance / Due',
      createdAt: 'Opened At',
      deadlineAt: 'Target Completion',
      actions: 'Actions',
      filterAll: 'All Orders',
      filterActive: 'Active',
      filterDone: 'Completed',
      createBtn: 'Create Order'
    },

    // Order Detail
    orderDetail: {
      backToBoard: 'Back to Pipeline',
      backToOrders: 'Back to Orders',
      tabs: {
        info: 'Overview',
        works: 'Services & Labor',
        parts: 'Spare Parts',
        payments: 'Payments & Invoicing',
        checklist: 'Quality Checklist',
        documents: 'Invoices & Acts',
        comments: 'Notes & Comments',
        history: 'Audit History'
      },
      intakeCard: 'Vehicle & Intake Details',
      orderSummary: 'Order Calculation Summary',
      addWorkItem: 'Add Service Labor',
      addPartItem: 'Add Spare Part',
      addPaymentItem: 'Record Payment',
      stageReviewPending: 'Awaiting stage approval',
      confirmStageBtn: 'Confirm Stage Completion',
      sendToParking: 'Move to Parking Yard',
      releaseParking: 'Release to Workshop',
      printInvoice: 'Print Invoice',
      printAct: 'Print Work Act',
      completeOrder: 'Hand Over & Close Order'
    },

    // Bookings
    bookings: {
      title: 'Service Appointments',
      subtitle: 'Scheduled customer visit calendar',
      newBookingBtn: 'New Appointment',
      convertOrderBtn: 'Convert to Order in 1-Click',
      timeSlot: 'Appointment Time',
      serviceRequested: 'Requested Service / Reason',
      notes: 'Customer Notes'
    },

    // Parking
    parking: {
      title: 'Vehicle Parking Yard',
      subtitle: 'Vehicles awaiting spare parts, customer approval, or pickup',
      daysOnParking: 'days in yard',
      takeToWork: 'Move to Workshop Floor',
      emptyParking: 'Parking lot is currently empty'
    },

    // Warehouse
    warehouse: {
      title: 'MKV Warehouse Inventory',
      tabStock: 'Stock Levels',
      tabDocs: 'Waybills & Documents',
      newDocBtn: 'New Document',
      itemName: 'Item Name',
      article: 'Part Number (SKU)',
      category: 'Category',
      inStock: 'In Stock',
      unit: 'Unit',
      buyPrice: 'Purchase Cost',
      sellPrice: 'Retail Price',
      docType: 'Document Type',
      docIncome: 'Receipt Waybill',
      docOutcome: 'Dispatch to Order',
      docWriteoff: 'Inventory Write-off',
      docInventory: 'Stock Audit Count',
      docStatus: 'Status',
      docPosted: 'Posted',
      docDraft: 'Draft',
      postDoc: 'Post Document',
      unpostDoc: 'Revert Posting'
    },

    // Parts
    parts: {
      title: 'Spare Parts Procurement',
      subtitle: 'Consolidated tracking of parts across all repair orders',
      statusNeeded: 'Required to Order',
      statusOrdered: 'Ordered from Supplier',
      statusExpected: 'In Transit',
      statusArrived: 'Received at Warehouse',
      statusInstalled: 'Installed on Vehicle',
      markArrived: 'Mark as Received'
    },

    // Cash
    cash: {
      title: 'Cash Desk & Financial Flow',
      subtitle: 'Cash and electronic transaction registry',
      currentBalance: 'Current Cash Balance',
      todayIncome: 'Receipts Today',
      todayExpense: 'Expenses Today',
      newOrderBtn: 'New Cash Transaction',
      typeIncome: 'Cash Receipt (PKO)',
      typeExpense: 'Cash Voucher (RKO)',
      methodCash: 'Cash',
      methodCard: 'Credit Card (POS)',
      methodIban: 'Bank Wire (IBAN)'
    },

    // Reports
    reports: {
      title: 'Business Analytics & Reports',
      periodFrom: 'From Date',
      periodTo: 'To Date',
      tabDebts: 'Outstanding Debts',
      tabExecutors: 'Technician Labor Output',
      tabManagers: 'Service Advisor Metrics',
      tabPayroll: 'Payroll Settlement',
      tabRegistry: 'Consolidated Order Registry',
      exportCsv: 'Export Table (CSV)',
      totalRevenue: 'Total Gross Revenue',
      totalCost: 'Materials & Parts Cost',
      grossProfit: 'Gross Operating Profit'
    },

    // Tasks
    tasks: {
      companyTitle: 'Company Task Board',
      myTitle: 'My Assigned Tasks',
      addTaskBtn: 'Create Task',
      priorityLow: 'Low',
      priorityMedium: 'Standard',
      priorityHigh: 'Urgent',
      assignedTo: 'Assigned To',
      subtasks: 'Subtasks'
    },

    // Shifts
    shifts: {
      title: 'Workshop Attendance & Shifts',
      activeNow: 'Currently On Floor',
      pendingApproval: 'Awaiting Shift Check-in Approval',
      startShift: 'Start Shift',
      closeShift: 'End Shift',
      approveShift: 'Approve Check-in'
    },

    // Employees
    employees: {
      title: 'MKV Team & Personnel',
      addEmployeeBtn: 'Add Team Member',
      name: 'Full Name',
      position: 'Job Title',
      role: 'Access Role',
      phone: 'Phone Number',
      activeStatus: 'Employment Status',
      hourlyRate: 'Hourly Wage',
      commissionPercent: 'Labor Revenue Share (%)'
    },

    // Settings
    settings: {
      title: 'System Preferences & Configuration',
      tabGeneral: 'General',
      tabStages: 'Workflow Stages',
      tabChecklists: 'Checklist Templates',
      tabRoles: 'Roles & Security',
      tabPayroll: 'Payroll Models',
      language: 'System Language',
      currency: 'Operating Currency',
      theme: 'Theme Mode',
      themeDark: 'Deep Dark (MKV Obsidian)',
      themeLight: 'Clean Light (MKV Sand Platinum)',
      accentColor: 'Brand Accent',
      accentOlive: 'MKV Signature Olive',
      accentSand: 'Warm Sand Gold',
      accentBlue: 'Classic Blue',
      accentEmerald: 'Emerald Green',
      accentOrange: 'Terracotta Orange'
    },

    // Common
    common: {
      save: 'Save Changes',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      close: 'Close',
      back: 'Back',
      confirm: 'Confirm',
      search: 'Search...',
      loading: 'Loading data…',
      noData: 'No records available',
      success: 'Saved successfully',
      error: 'An error occurred during operation',
      refresh: 'Refresh'
    }
  }
};
