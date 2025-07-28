// Internal imports
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface Document {
  id: number;
  name: string;
  loanNumber: string;
  classification: string;
  status: string;
  uploadDate: string;
}

const sampleDocuments: Document[] = [
  {
    id: 1,
    name: "2024_Property_Insurance_Certificate.pdf",
    loanNumber: "CRE-2024-0156",
    classification: "Insurance",
    status: "completed",
    uploadDate: "2024-01-15T14:30:00Z",
  },
  {
    id: 2,
    name: "Financial_Statements_Q4_2023.xlsx",
    loanNumber: "CRE-2024-0142",
    classification: "Financial Statement",
    status: "requires attention",
    uploadDate: "2024-01-14T09:15:00Z",
  },
  {
    id: 3,
    name: "Property_Tax_Assessment_2024.pdf",
    loanNumber: "CRE-2024-0156",
    classification: "Property Tax",
    status: "processing",
    uploadDate: "2024-01-13T16:45:00Z",
  },
  {
    id: 4,
    name: "Operating_Statement_Q4_2023.xlsx",
    loanNumber: "CRE-2024-0129",
    classification: "Operating Statement",
    status: "completed",
    uploadDate: "2024-01-12T11:20:00Z",
  },
  {
    id: 5,
    name: "Rent_Roll_December_2023.pdf",
    loanNumber: "CRE-2024-0142",
    classification: "Rent Roll",
    status: "completed",
    uploadDate: "2024-01-11T13:30:00Z",
  },
  {
    id: 6,
    name: "Commercial_Insurance_Policy.pdf",
    loanNumber: "CRE-2024-0088",
    classification: "Insurance",
    status: "requires attention",
    uploadDate: "2024-01-10T10:15:00Z",
  },
  {
    id: 7,
    name: "Annual_Operating_Statement_2023.pdf",
    loanNumber: "CRE-2024-0173",
    classification: "Operating Statement",
    status: "processing",
    uploadDate: "2024-01-09T15:45:00Z",
  },
  {
    id: 8,
    name: "Property_Tax_Records_2024.pdf",
    loanNumber: "CRE-2024-0201",
    classification: "Property Tax",
    status: "completed",
    uploadDate: "2024-01-08T12:30:00Z",
  },
];

const getStatusBadge = (status: string): JSX.Element => {
  switch (status) {
    case 'completed':
      return <Badge variant='default' className='bg-green-500/10 text-green-700 border-green-500/20'>Completed</Badge>;
    case 'requires attention':
      return <Badge variant='destructive'>Requires Attention</Badge>;
    case 'processing':
      return <Badge variant='secondary' className='bg-blue-500/10 text-blue-700 border-blue-500/20'>Processing</Badge>;
    default:
      return <Badge variant='outline'>{status}</Badge>;
  }
};

const getClassificationBadge = (classification: string): JSX.Element => {
  switch (classification) {
    case 'Insurance':
      return <Badge variant='outline' className='bg-purple-500/10 text-purple-700 border-purple-500/20'>Insurance</Badge>;
    case 'Property Tax':
      return <Badge variant='outline' className='bg-orange-500/10 text-orange-700 border-orange-500/20'>Property Tax</Badge>;
    case 'Financial Statement':
      return <Badge variant='outline' className='bg-teal-500/10 text-teal-700 border-teal-500/20'>Financial</Badge>;
    case 'Operating Statement':
      return <Badge variant='outline' className='bg-blue-500/10 text-blue-700 border-blue-500/20'>Operating</Badge>;
    case 'Rent Roll':
      return <Badge variant='outline' className='bg-green-500/10 text-green-700 border-green-500/20'>Rent Roll</Badge>;
    default:
      return <Badge variant='outline'>{classification}</Badge>;
  }
};

const Documents: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleOpen = (doc: Document) => {
    setSelectedDoc(doc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoc(null);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Document Library</h1>
      </div>
      <Card className='shadow-soft'>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Loan #</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upload Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleDocuments.map((doc) => (
                <TableRow key={doc.id} className='hover:bg-muted/50'>
                  <TableCell className='font-medium'>
                    <button
                      type='button'
                      className='text-primary underline hover:text-primary/80 focus:outline-none'
                      onClick={() => handleOpen(doc)}
                    >
                      {doc.name}
                    </button>
                  </TableCell>
                  <TableCell className='font-mono text-sm'>{doc.loanNumber}</TableCell>
                  <TableCell>{getClassificationBadge(doc.classification)}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className='text-muted-foreground'>
                    {new Date(doc.uploadDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={handleClose}>
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
          </DialogHeader>
          {selectedDoc ? (
            <div className='space-y-2'>
              <div className='font-semibold'>{selectedDoc.name}</div>
              {/* Placeholder for preview. Backend engineer can replace this with an <iframe> or <img> using a real file URL. */}
              <div className='flex items-center justify-center h-48 bg-muted rounded'>
                <span className='text-muted-foreground'>Preview not available</span>
              </div>
              <div className='text-xs text-muted-foreground'>
                Connect a file URL from the backend to enable preview.
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;