import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const borrowersData = [
  {
    id: 1,
    name: "ABC Manufacturing Corp",
    loanNumber: "LN-2024-001",
    contactPerson: "John Smith",
    email: "john.smith@abcmanufacturing.com",
    annualReviewStatus: "Completed",
    documentsCollected: 12,
    totalDocumentsRequired: 12,
    lastUpdate: "2024-01-15"
  },
  {
    id: 2,
    name: "Tech Solutions LLC",
    loanNumber: "LN-2024-002",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@techsolutions.com",
    annualReviewStatus: "In Progress",
    documentsCollected: 8,
    totalDocumentsRequired: 12,
    lastUpdate: "2024-01-12"
  },
  {
    id: 3,
    name: "Green Energy Partners",
    loanNumber: "LN-2024-003",
    contactPerson: "Michael Davis",
    email: "michael.davis@greenenergy.com",
    annualReviewStatus: "Overdue",
    documentsCollected: 4,
    totalDocumentsRequired: 12,
    lastUpdate: "2023-12-20"
  },
  {
    id: 4,
    name: "Downtown Restaurant Group",
    loanNumber: "LN-2024-004",
    contactPerson: "Lisa Chen",
    email: "lisa.chen@downtownrestaurants.com",
    annualReviewStatus: "Not Started",
    documentsCollected: 0,
    totalDocumentsRequired: 12,
    lastUpdate: "2023-11-30"
  },
  {
    id: 5,
    name: "Coastal Construction Inc",
    loanNumber: "LN-2024-005",
    contactPerson: "Robert Wilson",
    email: "robert.wilson@coastalconstruction.com",
    annualReviewStatus: "In Progress",
    documentsCollected: 10,
    totalDocumentsRequired: 12,
    lastUpdate: "2024-01-10"
  },
  {
    id: 6,
    name: "MetroTech Industries",
    loanNumber: "LN-2024-006",
    contactPerson: "Amanda Taylor",
    email: "amanda.taylor@metrotech.com",
    annualReviewStatus: "Requires Attention",
    documentsCollected: 6,
    totalDocumentsRequired: 12,
    lastUpdate: "2024-01-08"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Completed":
      return <Badge variant="default" className="bg-green-500/10 text-green-700 hover:bg-green-500/20">Completed</Badge>;
    case "In Progress":
      return <Badge variant="secondary">In Progress</Badge>;
    case "Overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    case "Not Started":
      return <Badge variant="outline">Not Started</Badge>;
    case "Requires Attention":
      return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Requires Attention</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getProgressPercentage = (collected: number, total: number) => {
  return Math.round((collected / total) * 100);
};

export default function Borrowers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Borrowers</h1>
        <p className="text-muted-foreground">
          Manage borrowers and track their annual review document collection status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Borrower Annual Review Status</CardTitle>
          <CardDescription>
            Track the progress of annual review document collection for all borrowers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower Name</TableHead>
                <TableHead>Loan #</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Documents Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowersData.map((borrower) => (
                <TableRow key={borrower.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{borrower.name}</div>
                      <div className="text-sm text-muted-foreground">{borrower.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{borrower.loanNumber}</TableCell>
                  <TableCell>{borrower.contactPerson}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{borrower.documentsCollected}/{borrower.totalDocumentsRequired} docs</span>
                        <span className="text-muted-foreground">
                          {getProgressPercentage(borrower.documentsCollected, borrower.totalDocumentsRequired)}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ 
                            width: `${getProgressPercentage(borrower.documentsCollected, borrower.totalDocumentsRequired)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(borrower.annualReviewStatus)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(borrower.lastUpdate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}