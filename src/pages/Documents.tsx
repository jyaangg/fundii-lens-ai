import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sampleDocuments = [
  {
    id: 1,
    name: "2024_Property_Insurance_Certificate.pdf",
    loanNumber: "CRE-2024-0156",
    classification: "Property Insurance",
    status: "completed",
    uploadDate: "2024-01-15T14:30:00Z",
  },
  {
    id: 2,
    name: "Financial_Statements_Q4_2023.xlsx",
    loanNumber: "CRE-2024-0142",
    classification: "Financial Statements",
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
    name: "Commercial_Insurance_Policy.pdf",
    loanNumber: "CRE-2024-0129",
    classification: "Property Insurance",
    status: "completed",
    uploadDate: "2024-01-12T11:20:00Z",
  },
  {
    id: 5,
    name: "Annual_Financial_Report_2023.pdf",
    loanNumber: "CRE-2024-0142",
    classification: "Financial Statements",
    status: "completed",
    uploadDate: "2024-01-11T13:30:00Z",
  },
  {
    id: 6,
    name: "Tax_Records_Commercial_Property.pdf",
    loanNumber: "CRE-2024-0088",
    classification: "Property Tax",
    status: "requires attention",
    uploadDate: "2024-01-10T10:15:00Z",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="default" className="bg-green-500/10 text-green-700 border-green-500/20">Completed</Badge>;
    case "requires attention":
      return <Badge variant="destructive">Requires Attention</Badge>;
    case "processing":
      return <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 border-blue-500/20">Processing</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getClassificationBadge = (classification: string) => {
  switch (classification) {
    case "Property Insurance":
      return <Badge variant="outline" className="bg-purple-500/10 text-purple-700 border-purple-500/20">Insurance</Badge>;
    case "Property Tax":
      return <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-500/20">Property Tax</Badge>;
    case "Financial Statements":
      return <Badge variant="outline" className="bg-teal-500/10 text-teal-700 border-teal-500/20">Financial</Badge>;
    default:
      return <Badge variant="outline">{classification}</Badge>;
  }
};

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Document Library</h1>
      </div>

      <Card className="shadow-soft">
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
                <TableRow key={doc.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="font-mono text-sm">{doc.loanNumber}</TableCell>
                  <TableCell>{getClassificationBadge(doc.classification)}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(doc.uploadDate).toLocaleDateString()}
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