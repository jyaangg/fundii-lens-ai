// External imports
import { ReactNode } from 'react';
// Internal imports
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => (
  <div className='min-h-screen bg-background'>
    <Header />
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-6 ml-64'>
        <div className='max-w-7xl mx-auto'>
          {children}
        </div>
      </main>
    </div>
  </div>
);

export { DashboardLayout };