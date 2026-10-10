import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { NewOrderModal } from '../modals/NewOrderModal';

export function AppLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
      <Header onMobileMenuToggle={() => setMobileMenuOpen(prev => !prev)} />
      
      <div className="flex-1 flex">
        <Sidebar 
          mobileOpen={mobileMenuOpen} 
          onCloseMobile={() => setMobileMenuOpen(false)} 
        />
        
        <main className="flex-1 min-w-0 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      <BottomNav onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <NewOrderModal />
    </div>
  );
}

export default AppLayout;
