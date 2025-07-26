// External imports
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Internal imports
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Documents from './pages/Documents';
import Analytics from './pages/Analytics';
import Borrowers from './pages/Borrowers';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { DashboardLayout } from './components/layout/DashboardLayout';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/documents' element={<Documents />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/borrowers' element={<Borrowers />} />
            <Route path='/settings' element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
