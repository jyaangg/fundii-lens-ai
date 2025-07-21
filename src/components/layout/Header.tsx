// External imports
import { Bell, User, Search } from 'lucide-react';
// Internal imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header: React.FC = () => (
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
      <Button variant='ghost' size='icon'>
        <Bell className='w-5 h-5' />
      </Button>
      <Button variant='ghost' size='icon'>
        <User className='w-5 h-5' />
      </Button>
    </div>
  </header>
);

export { Header };