// Built-in modules
import React from 'react';

// External packages
import {
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
// Internal/relative imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Stat {
  name: string;
  value: string;
  icon: React.ElementType;
  change: string;
}

interface Document {
  id: number;
  name: string;
  borrower: string;
  type: string;
  status: 'completed' | 'processing' | 'pending' | string;
  uploadDate: string;
}

const stats: Stat[] = [
  { name: 'Total Documents', value: '1,248', icon: FileText, change: '+12%' },
  { name: 'Processed Today', value: '84', icon: CheckCircle, change: '+8%' },
  { name: 'Pending Review', value: '23', icon: Clock, change: '-5%' },
  { name: 'Active Borrowers', value: '156', icon: Users, change: '+3%' },
];

const recentDocuments: Document[] = [
  {
    id: 1,
    name: 'Property Insurance - Oak Street Plaza',
    borrower: 'Meridian Properties LLC',
    type: 'Insurance',
    status: 'completed',
    uploadDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Financial Statement - Q4 2023',
    borrower: 'Pinnacle Real Estate Group',
    type: 'Financial Statement',
    status: 'processing',
    uploadDate: '2024-01-15'
  },
  {
    id: 3,
    name: 'Property Tax Assessment',
    borrower: 'Harbor Point Development',
    type: 'Property Tax',
    status: 'pending',
    uploadDate: '2024-01-14'
  },
];

const getStatusBadge = (status: Document['status']): JSX.Element => {
  switch (status) {
    case 'completed':
      return <Badge className='bg-success text-success-foreground'>Completed</Badge>;
    case 'processing':
      return <Badge className='bg-warning text-warning-foreground'>Processing</Badge>;
    case 'pending':
      return <Badge variant='outline'>Pending</Badge>;
    default:
      return <Badge variant='outline'>{status}</Badge>;
  }
};

const StatsGrid: React.FC = () => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
    {stats.map(({ name, value, icon: Icon, change }) => (
      <Card key={name} className='bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium text-muted-foreground'>{name}</CardTitle>
          <Icon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{value}</div>
          <div className='flex items-center text-xs text-muted-foreground'>
            <TrendingUp className='h-3 w-3 mr-1' />
            <span className='text-success'>{change}</span>
            <span className='ml-1'>from last month</span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const RecentDocuments: React.FC = () => (
  <Card className='shadow-soft'>
    <CardHeader>
      <div className='flex items-center justify-between'>
        <div>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Latest uploaded and processed documents</CardDescription>
        </div>
        <Button variant='outline' size='sm'>View All</Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className='space-y-4'>
        {recentDocuments.map(({ id, name, borrower, uploadDate, status }) => (
          <div key={id} className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'>
            <div className='flex-1'>
              <h4 className='font-medium text-sm'>{name}</h4>
              <p className='text-xs text-muted-foreground'>{borrower}</p>
              <p className='text-xs text-muted-foreground'>{uploadDate}</p>
            </div>
            <div className='flex items-center gap-2'>{getStatusBadge(status)}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ProcessingOverview: React.FC = () => (
  <Card className='shadow-soft'>
    <CardHeader>
      <CardTitle>Processing Overview</CardTitle>
      <CardDescription>Current document processing status</CardDescription>
    </CardHeader>
    <CardContent className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>Documents Processed</span>
          <span>84/100</span>
        </div>
        <Progress value={84} className='h-2' />
      </div>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <CheckCircle className='h-4 w-4 text-success' />
            <span className='text-sm'>Completed</span>
          </div>
          <span className='text-sm font-medium'>67</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-warning' />
            <span className='text-sm'>Processing</span>
          </div>
          <span className='text-sm font-medium'>17</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='h-4 w-4 text-destructive' />
            <span className='text-sm'>Requires Attention</span>
          </div>
          <span className='text-sm font-medium'>3</span>
        </div>
      </div>
      <Button className='w-full mt-4' variant='gradient'>
        <Upload className='h-4 w-4 mr-2' />
        Upload New Documents
      </Button>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => (
  <div className='space-y-6 animate-fade-in'>
    <div className='bg-gradient-primary rounded-lg p-6 text-primary-foreground shadow-medium'>
      <h1 className='text-3xl font-bold mb-2'>Welcome to Fundii AI</h1>
      <p className='text-primary-foreground/90'>
        Streamline your commercial real estate loan document review process with AI-powered analysis.
      </p>
    </div>
    <StatsGrid />
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <RecentDocuments />
      <ProcessingOverview />
    </div>
  </div>
);

export default Dashboard;