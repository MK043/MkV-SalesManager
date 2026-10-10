import React from 'react';
import { useRouter } from './router/Router';
import { useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

import { TodayScreen } from './screens/TodayScreen';
import { BoardScreen } from './screens/BoardScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { OrderDetailScreen } from './screens/OrderDetailScreen';
import { CustomersScreen } from './screens/CustomersScreen';
import { BookingsScreen } from './screens/BookingsScreen';
import { ParkingScreen } from './screens/ParkingScreen';
import { WarehouseScreen } from './screens/WarehouseScreen';
import { PartsScreen } from './screens/PartsScreen';
import { CashScreen } from './screens/CashScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { TasksScreen } from './screens/TasksScreen';
import { MyTasksScreen } from './screens/MyTasksScreen';
import { ShiftsScreen } from './screens/ShiftsScreen';
import { EmployeesScreen } from './screens/EmployeesScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AuditScreen } from './screens/AuditScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export function App() {
  const { currentPath, navigate } = useRouter();
  const { user } = useApp();

  const currentPos = (user?.position || '').toLowerCase();
  const isTechnician = [
    'механік', 
    'автоелектрик', 
    'кузовник', 
    'маляр', 
    'мийник'
  ].some(r => currentPos.includes(r));

  // Route matching logic
  const renderScreen = () => {
    // Check order detail match: /orders/:id
    const orderDetailMatch = currentPath.match(/^\/orders\/(\d+)$/);
    if (orderDetailMatch) {
      return <OrderDetailScreen orderId={orderDetailMatch[1]} />;
    }

    // Role protection: prevent workers from seeing financial dashboards
    const forbiddenForWorker = ['/today', '/cash', '/reports', '/settings', '/warehouse', '/shifts', '/audit'];
    if (isTechnician && forbiddenForWorker.includes(currentPath)) {
      return <MyTasksScreen />;
    }

    switch (currentPath) {
      case '/today':
      case '/':
        return isTechnician ? <MyTasksScreen /> : <TodayScreen />;
      case '/board':
        return <BoardScreen />;
      case '/orders':
        return <OrdersScreen />;
      case '/customers':
        return <CustomersScreen />;
      case '/bookings':
        return <BookingsScreen />;
      case '/parking':
        return <ParkingScreen />;
      case '/warehouse':
        return <WarehouseScreen />;
      case '/parts':
        return <PartsScreen />;
      case '/cash':
        return <CashScreen />;
      case '/reports':
        return <ReportsScreen />;
      case '/company-tasks':
        return <TasksScreen />;
      case '/my-tasks':
        return <MyTasksScreen />;
      case '/shifts':
        return <ShiftsScreen />;
      case '/employees':
        return <EmployeesScreen />;
      case '/settings':
        return <SettingsScreen />;
      case '/audit':
        return <AuditScreen />;
      case '/profile':
        return <ProfileScreen />;
      default:
        return isTechnician ? <MyTasksScreen /> : <TodayScreen />;
    }
  };

  return (
    <AppLayout>
      {renderScreen()}
    </AppLayout>
  );
}

export default App;
