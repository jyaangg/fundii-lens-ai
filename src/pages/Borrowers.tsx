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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Borrower {
  id: string;
  name: string;
  loanNumber: string;
  contactPerson: string;
  email: string;
  propertyAddress: string;
  documentsRequired: string[];
  documentsReceived: string[];
  dueDate: string;
  status: 'completed' | 'in-progress' | 'overdue' | 'pending' | 'requires-attention';
  lastUpdated: string;
}

const borrowersData: Borrower[] = [
  {
    id: "1",
    name: "ABC Manufacturing Corp",
    loanNumber: "LN-2024-001",
    contactPerson: "John Smith",
    email: "john.smith@abcmanufacturing.com",
    propertyAddress: "123 Oak Street Plaza, Downtown",
    documentsRequired: ["Property Insurance", "Property Tax", "Financial Statement"],
    documentsReceived: ["Property Insurance", "Property Tax", "Financial Statement"],
    dueDate: "2024-01-20",
    status: "completed",
    lastUpdated: "2024-01-15 14:30"
  },
  {
    id: "2",
    name: "Tech Solutions LLC",
    loanNumber: "LN-2024-002",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@techsolutions.com",
    propertyAddress: "456 Business Center Drive",
    documentsRequired: ["Property Insurance", "Financial Statement", "Business License"],
    documentsReceived: ["Property Insurance", "Financial Statement"],
    dueDate: "2024-01-18",
    status: "in-progress",
    lastUpdated: "2024-01-12 16:45"
  },
  {
    id: "3",
    name: "Green Energy Partners",
    loanNumber: "LN-2024-003",
    contactPerson: "Michael Davis",
    email: "michael.davis@greenenergy.com",
    propertyAddress: "789 Commerce Boulevard",
    documentsRequired: ["Property Insurance", "Property Tax", "Financial Statement"],
    documentsReceived: ["Property Insurance"],
    dueDate: "2024-01-16",
    status: "overdue",
    lastUpdated: "2023-12-20 09:15"
  },
  {
    id: "4",
    name: "Downtown Restaurant Group",
    loanNumber: "LN-2024-004",
    contactPerson: "Lisa Chen",
    email: "lisa.chen@downtownrestaurants.com",
    propertyAddress: "321 Metro Plaza",
    documentsRequired: ["Property Tax", "Financial Statement", "Operating Agreement"],
    documentsReceived: [],
    dueDate: "2024-01-25",
    status: "pending",
    lastUpdated: "2023-11-30 11:20"
  },
  {
    id: "5",
    name: "Coastal Construction Inc",
    loanNumber: "LN-2024-005",
    contactPerson: "Robert Wilson",
    email: "robert.wilson@coastalconstruction.com",
    propertyAddress: "555 Harbor View Drive",
    documentsRequired: ["Property Insurance", "Property Tax", "Financial Statement", "Business License"],
    documentsReceived: ["Property Insurance", "Property Tax", "Financial Statement"],
    dueDate: "2024-01-22",
    status: "in-progress",
    lastUpdated: "2024-01-10 13:15"
  },
  {
    id: "6",
    name: "MetroTech Industries",
    loanNumber: "LN-2024-006",
    contactPerson: "Amanda Taylor",
    email: "amanda.taylor@metrotech.com",
    propertyAddress: "888 Technology Park",
    documentsRequired: ["Property Insurance", "Financial Statement", "Environmental Report"],
    documentsReceived: ["Property Insurance"],
    dueDate: "2024-01-19",
    status: "requires-attention",
    lastUpdated: "2024-01-08 10:30"
  }
];

const getStatusBadge = (status: Borrower['status']): JSX.Element => {
  switch (status) {
    case 'completed':
      return <Badge className='bg-success text-success-foreground'>Completed</Badge>;
    case 'in-progress':
      return <Badge className='bg-info text-info-foreground'>In Progress</Badge>;
    case 'overdue':
      return <Badge variant='destructive'>Overdue</Badge>;
    case 'pending':
      return <Badge variant='outline'>Pending</Badge>;
    case 'requires-attention':
      return <Badge className='bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20'>Requires Attention</Badge>;
  }
};

const getStatusIcon = (status: Borrower['status']): JSX.Element => {
  switch (status) {
    case 'completed':
      return <CheckCircle className='w-5 h-5 text-success' />;
    case 'in-progress':
      return <Clock className='w-5 h-5 text-info' />;
    case 'overdue':
      return <AlertTriangle className='w-5 h-5 text-destructive' />;
    case 'pending':
      return <Clock className='w-5 h-5 text-muted-foreground' />;
    case 'requires-attention':
      return <AlertTriangle className='w-5 h-5 text-yellow-600' />;
  }
};

const calculateProgress = (item: Borrower): number => {
  return Math.round((item.documentsReceived.length / item.documentsRequired.length) * 100);
};

const getTabCounts = (items: Borrower[]) => ({
  all: items.length,
  completed: items.filter(item => item.status === 'completed').length,
  'in-progress': items.filter(item => item.status === 'in-progress').length,
  overdue: items.filter(item => item.status === 'overdue').length,
  pending: items.filter(item => item.status === 'pending').length,
  'requires-attention': items.filter(item => item.status === 'requires-attention').length,
});

const Borrowers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ name: string; borrower: string; loanNumber: string } | null>(null);

  const filteredItems = borrowersData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.loanNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && item.status === activeTab;
  });

  const tabCounts = getTabCounts(borrowersData);

  const handleDocumentClick = (documentName: string, borrowerName: string, loanNumber: string) => {
    setSelectedDocument({ name: documentName, borrower: borrowerName, loanNumber: loanNumber });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedDocument(null);
  };

  return (
    <div className='space-y-6 animate-fade-in'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Portfolio Status</h1>
        <p className='text-muted-foreground mt-2'>
          Track document processing status and outstanding requirements for all borrowers
        </p>
      </div>
      
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='all'>All ({tabCounts.all})</TabsTrigger>
          <TabsTrigger value='pending'>Pending ({tabCounts.pending})</TabsTrigger>
          <TabsTrigger value='overdue'>Overdue ({tabCounts.overdue})</TabsTrigger>
          <TabsTrigger value='completed'>Completed ({tabCounts.completed})</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className='space-y-4'>
          {filteredItems.map((item) => (
            <Card key={item.id} className='shadow-soft hover:shadow-medium transition-shadow'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-3'>
                      {getStatusIcon(item.status)}
                      <CardTitle className='text-lg'>{item.name}</CardTitle>
                      {getStatusBadge(item.status)}
                    </div>
                    <CardDescription>
                      <div className='flex items-center gap-4 text-sm'>
                        <div className='flex items-center gap-1'>
                          <Hash className='w-3 h-3' />
                          {item.loanNumber}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Building className='w-3 h-3' />
                          {item.propertyAddress}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='w-3 h-3' />
                          Due: {new Date(item.dueDate).toLocaleDateString()}
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
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span>Document Collection Progress</span>
                      <span>{item.documentsReceived.length}/{item.documentsRequired.length} documents</span>
                    </div>
                    <div className='w-full bg-muted rounded-full h-2'>
                      <div
                        className='bg-gradient-primary h-2 rounded-full transition-all duration-500'
                        style={{ width: `${calculateProgress(item)}%` }}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <h4 className='font-medium text-sm mb-2 text-success'>Received Documents</h4>
                      <div className='space-y-1'>
                        {item.documentsReceived.length > 0 ? (
                          item.documentsReceived.map((doc, index) => (
                            <div key={index} className='flex items-center gap-2 text-sm'>
                              <CheckCircle className='w-3 h-3 text-success' />
                              <button
                                type='button'
                                className='text-primary underline hover:text-primary/80 focus:outline-none text-left'
                                onClick={() => handleDocumentClick(doc, item.name, item.loanNumber)}
                              >
                                {doc}
                              </button>
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
                        {item.documentsRequired.filter(doc => !item.documentsReceived.includes(doc)).length > 0 ? (
                          <>
                            {item.documentsRequired
                              .filter(doc => !item.documentsReceived.includes(doc))
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
                  <div className='pt-2 border-t border-border'>
                    <p className='text-xs text-muted-foreground'>
                      Contact: {item.contactPerson} ({item.email}) • Last updated: {new Date(item.lastUpdated).toLocaleString()}
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
                <h3 className='text-lg font-medium mb-2'>No borrowers found</h3>
                <p className='text-muted-foreground'>
                  {searchQuery
                    ? 'No borrowers match your search criteria.'
                    : 'No borrowers in this category.'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onInteractOutside={handleDialogClose}>
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          {selectedDocument ? (
            <div className='space-y-4'>
              <div className='space-y-2'>
                <div className='font-semibold'>{selectedDocument.name}</div>
                <div className='text-sm text-muted-foreground'>
                  Borrower: {selectedDocument.borrower} • Loan: {selectedDocument.loanNumber}
                </div>
              </div>
              <div className='flex items-center justify-center h-48 bg-muted rounded'>
                <span className='text-muted-foreground'>Document preview not available</span>
              </div>
              <div className='text-xs text-muted-foreground'>
                Connect a file URL from the backend to enable document preview.
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Borrowers;