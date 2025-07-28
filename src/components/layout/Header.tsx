// External imports
import { Bell, User, Search } from 'lucide-react';
// Internal imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const sampleAlerts = [
  { id: 1, message: 'Property Insurance for Oakwood Properties due in 3 days', type: 'warning' },
  { id: 2, message: 'Financial Statement for Metro Development overdue', type: 'danger' },
  { id: 3, message: 'Property Tax for Sunrise Commercial due in 7 days', type: 'info' },
  { id: 4, message: 'Operating Statement for Gateway Holdings due in 5 days', type: 'warning' },
  { id: 5, message: 'Rent Roll for Pinnacle Investments overdue', type: 'danger' },
];

const Header: React.FC = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  return (
    <header className='h-16 bg-card border-b border-border px-6 flex items-center justify-between shadow-soft'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center'>
            <span className='text-primary-foreground font-bold text-sm'>F</span>
          </div>
          <h1 className='text-xl font-bold text-foreground'>Fundii AI</h1>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
          <Input
            placeholder='Search documents...'
            className='pl-10 w-80'
          />
        </div>
        <div className='relative'>
          <Button variant='ghost' size='icon' onClick={() => setShowAlerts((v) => !v)} aria-label='Notifications'>
            <Bell className='w-5 h-5' />
            {sampleAlerts.length > 0 && (
              <span className='absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full border-2 border-card' />
            )}
          </Button>
          {showAlerts && (
            <div className='absolute right-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-50 animate-fade-in'>
              <div className='p-4 border-b border-border font-semibold text-sm'>Notifications</div>
              <ul className='max-h-60 overflow-y-auto'>
                {sampleAlerts.map(alert => (
                  <li key={alert.id} className={`px-4 py-2 text-sm border-b border-border last:border-b-0 ${
                    alert.type === 'danger' ? 'text-red-600' : alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                  }`}>
                    {alert.message}
                  </li>
                ))}
                {sampleAlerts.length === 0 && (
                  <li className='px-4 py-2 text-sm text-muted-foreground'>No new notifications</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <Button variant='ghost' size='icon'>
          <User className='w-5 h-5' />
        </Button>
      </div>
    </header>
  );
};

export { Header };