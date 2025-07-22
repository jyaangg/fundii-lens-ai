// External imports
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  FileText,
  BarChart3,
  Settings,
  Users,
  Clock
} from 'lucide-react';
// Internal imports
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Upload Documents', href: '/upload', icon: Upload },
  { name: 'Document Library', href: '/documents', icon: FileText },
  { name: 'Processing Status', href: '/status', icon: Clock },
  { name: 'Borrowers', href: '/borrowers', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => (
  <aside className='fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border shadow-soft'>
    <nav className='p-4 space-y-2'>
      {navigation.map(({ name, href, icon: Icon }) => (
        <NavLink
          key={name}
          to={href}
          end={href === '/'}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )
          }
        >
          <Icon className='w-5 h-5' />
          {name}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export { Sidebar };