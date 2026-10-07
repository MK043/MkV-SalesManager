import React from 'react';
import { useRouter } from './router/Router';
import { AppLayout } from './components/layout/AppLayout';

import { TodayScreen } from './screens/TodayScreen';
import { BoardScreen } from './screens/BoardScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { OrderDetailScreen } from './screens/OrderDetailScreen';
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
  const { currentPath } = useRouter();

  // Route matching logic
  const renderScreen = () => {
    // Check order detail match: /orders/:id
    const orderDetailMatch = currentPath.match(/^\/orders\/(\d+)$/);
    if (orderDetailMatch) {
      return <OrderDetailScreen orderId={orderDetailMatch[1]} />;
    }

    switch (currentPath) {
      case '/today':
      case '/':
        return <TodayScreen />;
      case '/board':
        return <BoardScreen />;
      case '/orders':
        return <OrdersScreen />;
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
        return <TodayScreen />;
    }
  };

  return (
    <AppLayout>
      {renderScreen()}
    </AppLayout>
  );
}
export default App;
