// External imports
import { useState } from 'react';
import { 
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Building,
  Hash,
  Eye
} from 'lucide-react';
// Internal imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProcessingItem {
  id: string;
  borrowerName: string;
  loanNumber: string;
  propertyAddress: string;
  documentsRequired: string[];
  documentsReceived: string[];
  dueDate: string;
  status: 'completed' | 'in-progress' | 'overdue' | 'pending';
  lastUpdated: string;
}

const processingItems: ProcessingItem[] = [
  {
    id: "1",
    borrowerName: "Meridian Properties LLC",
    loanNumber: "LN-2024-001",
    propertyAddress: "123 Oak Street Plaza, Downtown",
    documentsRequired: ["Property Insurance", "Property Tax", "Financial Statement"],
    documentsReceived: ["Property Insurance", "Property Tax"],
    dueDate: "2024-01-20",
    status: "in-progress",
    lastUpdated: "2024-01-15 14:30"
  },
  {
    id: "2",
    borrowerName: "Pinnacle Real Estate Group",
    loanNumber: "LN-2024-002",
    propertyAddress: "456 Business Center Drive",
    documentsRequired: ["Property Insurance", "Financial Statement"],
    documentsReceived: ["Property Insurance", "Financial Statement"],
    dueDate: "2024-01-18",
    status: "completed",
    lastUpdated: "2024-01-15 16:45"
  },
  {
    id: "3",
    borrowerName: "Harbor Point Development",
    loanNumber: "LN-2024-003",
    propertyAddress: "789 Commerce Boulevard",
    documentsRequired: ["Property Insurance", "Property Tax", "Financial Statement"],
    documentsReceived: ["Property Insurance"],
    dueDate: "2024-01-16",
    status: "overdue",
    lastUpdated: "2024-01-12 09:15"
  },
  {
    id: "4",
    borrowerName: "Skyline Investments",
    loanNumber: "LN-2024-004",
    propertyAddress: "321 Metro Plaza",
    documentsRequired: ["Property Tax", "Financial Statement"],
    documentsReceived: [],
    dueDate: "2024-01-25",
    status: "pending",
    lastUpdated: "2024-01-10 11:20"
  },
];

const getStatusBadge = (status: ProcessingItem['status']): JSX.Element => {
  switch (status) {
    case 'completed':
      return <Badge className='bg-success text-success-foreground'>Completed</Badge>;
    case 'in-progress':
      return <Badge className='bg-info text-info-foreground'>In Progress</Badge>;
    case 'overdue':
      return <Badge variant='destructive'>Overdue</Badge>;
    case 'pending':
      return <Badge variant='outline'>Pending</Badge>;
  }
};

const getStatusIcon = (status: ProcessingItem['status']): JSX.Element => {
  switch (status) {
    case 'completed':
      return <CheckCircle className='w-5 h-5 text-success' />;
    case 'in-progress':
      return <Clock className='w-5 h-5 text-info' />;
    case 'overdue':
      return <AlertTriangle className='w-5 h-5 text-destructive' />;
    case 'pending':
      return <Clock className='w-5 h-5 text-muted-foreground' />;
  }
};

const calculateProgress = (item: ProcessingItem): number => {
  return Math.round((item.documentsReceived.length / item.documentsRequired.length) * 100);
};

const getTabCounts = (items: ProcessingItem[]) => ({
  all: items.length,
  completed: items.filter(item => item.status === 'completed').length,
  'in-progress': items.filter(item => item.status === 'in-progress').length,
  overdue: items.filter(item => item.status === 'overdue').length,
  pending: items.filter(item => item.status === 'pending').length,
});

const ProcessingStatus: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredItems = processingItems.filter(item => {
    const matchesSearch = item.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.loanNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && item.status === activeTab;
  });

  const tabCounts = getTabCounts(processingItems);

  return (
    <div className='space-y-6 animate-fade-in'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Processing Status</h1>
        <p className='text-muted-foreground mt-2'>
          Track document processing status and outstanding requirements for all borrowers
        </p>
      </div>
      {/* Search and Filters */}
      <Card className='shadow-soft'>
        <CardContent className='pt-6'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
              <Input
                placeholder='Search by borrower name, loan number, or property address...'
                className='pl-10'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant='outline' className='flex items-center gap-2'>
              <Filter className='w-4 h-4' />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='all'>All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value='completed'>Completed ({tabCounts.completed})</TabsTrigger>
          <TabsTrigger value='in-progress'>In Progress ({tabCounts['in-progress']})</TabsTrigger>
          <TabsTrigger value='overdue'>Overdue ({tabCounts.overdue})</TabsTrigger>
          <TabsTrigger value='pending'>Pending ({tabCounts.pending})</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className='space-y-4'>
          {filteredItems.map(({ id, borrowerName, loanNumber, propertyAddress, documentsRequired, documentsReceived, dueDate, status, lastUpdated }) => (
            <Card key={id} className='shadow-soft hover:shadow-medium transition-shadow'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-3'>
                      {getStatusIcon(status)}
                      <CardTitle className='text-lg'>{borrowerName}</CardTitle>
                      {getStatusBadge(status)}
                    </div>
                    <CardDescription>
                      <div className='flex items-center gap-4 text-sm'>
                        <div className='flex items-center gap-1'>
                          <Hash className='w-3 h-3' />
                          {loanNumber}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Building className='w-3 h-3' />
                          {propertyAddress}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3 h-3' />
                          Due: {new Date(dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                  <Button variant='outline' size='sm'>
                    <Eye className='w-4 h-4 mr-2' />
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {/* Progress Bar */}
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span>Document Collection Progress</span>
                      <span>{documentsReceived.length}/{documentsRequired.length} documents</span>
                    </div>
                    <div className='w-full bg-muted rounded-full h-2'>
                      <div
                        className='bg-gradient-primary h-2 rounded-full transition-all duration-500'
                        style={{ width: `${calculateProgress({ id, borrowerName, loanNumber, propertyAddress, documentsRequired, documentsReceived, dueDate, status, lastUpdated })}%` }}
                      />
                    </div>
                  </div>
                  {/* Document Status */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <h4 className='font-medium text-sm mb-2 text-success'>Received Documents</h4>
                      <div className='space-y-1'>
                        {documentsReceived.length > 0 ? (
                          documentsReceived.map((doc, index) => (
                            <div key={index} className='flex items-center gap-2 text-sm'>
                              <CheckCircle className='w-3 h-3 text-success' />
                              {doc}
                            </div>
                          ))
                        ) : (
                          <p className='text-sm text-muted-foreground'>No documents received yet</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className='font-medium text-sm mb-2 text-warning'>Outstanding Documents</h4>
                      <div className='space-y-1'>
                        {documentsRequired.filter(doc => !documentsReceived.includes(doc)).length > 0 ? (
                          <>
                            {documentsRequired
                              .filter(doc => !documentsReceived.includes(doc))
                              .map((doc, index) => (
                                <div key={index} className='flex items-center gap-2 text-sm'>
                                  <Clock className='w-3 h-3 text-warning' />
                                  {doc}
                                </div>
                              ))}
                            <button
                              type='button'
                              className='mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors text-sm font-medium'
                              onClick={() => {}}
                            >
                              Draft Follow-Up Email
                            </button>
                          </>
                        ) : (
                          <p className='text-sm text-muted-foreground'>No outstanding documents</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Last Updated */}
                  <div className='pt-2 border-t border-border'>
                    <p className='text-xs text-muted-foreground'>
                      Last updated: {new Date(lastUpdated).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredItems.length === 0 && (
            <Card className='shadow-soft'>
              <CardContent className='text-center py-8'>
                <FileText className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='text-lg font-medium mb-2'>No items found</h3>
                <p className='text-muted-foreground'>
                  {searchQuery
                    ? 'No processing items match your search criteria.'
                    : 'No processing items in this category.'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessingStatus;