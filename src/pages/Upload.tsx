// External imports
import { useState, useCallback } from 'react';
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  Building,
  Hash
} from 'lucide-react';
// Internal imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  classification?: string;
  borrower?: string;
  propertyAddress?: string;
  loanNumber?: string;
  analysis?: {
    keyFindings: string[];
    riskFactors: string[];
    recommendations: string[];
  };
  extractedFields?: {
    [key: string]: string | number;
  };
}

const generateMockAnalysis = () => {
  const classifications = ['Property Insurance', 'Property Tax', 'Financial Statement'];
  const borrowers = ['Meridian Properties LLC', 'Pinnacle Real Estate Group', 'Harbor Point Development'];
  const addresses = ['123 Oak Street Plaza', '456 Business Center Dr', '789 Commerce Blvd'];
  const classification = classifications[Math.floor(Math.random() * classifications.length)];
  
  const baseResult = {
    classification,
    borrower: borrowers[Math.floor(Math.random() * borrowers.length)],
    propertyAddress: addresses[Math.floor(Math.random() * addresses.length)],
    loanNumber: `LN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    analysis: {
      keyFindings: [
        'Coverage amount meets loan requirements',
        'Premium payments current and up to date',
        'No significant coverage gaps identified'
      ],
      riskFactors: [
        'Deductible increased by 15% from previous year',
        'Property located in moderate flood risk zone'
      ],
      recommendations: [
        'Review flood insurance requirements',
        'Confirm additional coverage for business interruption'
      ]
    }
  };

  // Add extracted fields for Property Tax documents
  if (classification === 'Property Tax') {
    return {
      ...baseResult,
      extractedFields: {
        'Tax Year': 2024,
        'Property Owner': 'MERIDIAN PROPERTIES LLC',
        'Property Address': '123 OAK STREET PLAZA DOWNTOWN CA 90210',
        'Assessor Parcel Number': '5142-015-023',
        'Total Assessed Value': '$2,850,000',
        'Total Tax Due': '$28,785.50',
        'Tax Rate': '1.0102%',
        'Due Date': '04/10/2024',
        'Payment Status': 'PAID',
        'Installment 1': '$14,392.75 - PAID 12/10/2023',
        'Installment 2': '$14,392.75 - PAID 04/08/2024',
        'Land Value': '$1,425,000',
        'Improvement Value': '$1,425,000',
        'Tax Code Area': '07001'
      }
    };
  }

  return baseResult;
};

const getStatusIcon = (status: UploadedFile['status']): JSX.Element => {
  switch (status) {
    case 'completed':
      return <CheckCircle className='w-5 h-5 text-success' />;
    case 'error':
      return <AlertCircle className='w-5 h-5 text-destructive' />;
    default:
      return <FileText className='w-5 h-5 text-muted-foreground' />;
  }
};

const getStatusBadge = (status: UploadedFile['status']): JSX.Element => {
  switch (status) {
    case 'uploading':
      return <Badge className='bg-info text-info-foreground'>Uploading</Badge>;
    case 'processing':
      return <Badge className='bg-warning text-warning-foreground'>Processing</Badge>;
    case 'completed':
      return <Badge className='bg-success text-success-foreground'>Completed</Badge>;
    case 'error':
      return <Badge variant='destructive'>Error</Badge>;
  }
};

const Upload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading',
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
    newFiles.forEach(uploadedFile => {
      simulateProcessing(uploadedFile.id);
    });
  };

  const simulateProcessing = (fileId: string) => {
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 20;
      setFiles(prev => prev.map(f =>
        f.id === fileId ? { ...f, progress } : f
      ));
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setTimeout(() => {
          setFiles(prev => prev.map(f =>
            f.id === fileId
              ? { ...f, status: 'processing', progress: 0 }
              : f
          ));
          setTimeout(() => {
            const mockResults = generateMockAnalysis();
            setFiles(prev => prev.map(f =>
              f.id === fileId
                ? { ...f, status: 'completed', progress: 100, ...mockResults }
                : f
            ));
          }, 3000);
        }, 1000);
      }
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className='space-y-6 animate-fade-in'>
      <div>
        <h1 className='text-3xl font-bold text-foreground'>Upload Documents</h1>
        <p className='text-muted-foreground mt-2'>
          Upload loan documents for AI-powered analysis and classification
        </p>
      </div>
      {/* Upload Zone */}
      <Card className='shadow-soft'>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>
            Drag and drop files or click to browse. Supports PDF, DOC, DOCX, and image files.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
              isDragOver
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
            onDrop={handleDrop}
            onDragOver={e => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={e => {
              e.preventDefault();
              setIsDragOver(false);
            }}
          >
            <UploadIcon className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
            <h3 className='text-lg font-medium mb-2'>Upload your documents</h3>
            <p className='text-muted-foreground mb-4'>
              Drag and drop files here, or click to browse
            </p>
            <div className='flex gap-2 justify-center'>
              <Button
                variant='gradient'
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Browse Files
              </Button>
              <input
                id='file-input'
                type='file'
                multiple
                className='hidden'
                onChange={e => {
                  if (e.target.files) {
                    handleFiles(Array.from(e.target.files));
                  }
                }}
                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Uploaded Files */}
      {files.length > 0 && (
        <Card className='shadow-soft'>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
            <CardDescription>
              Track the status of your uploaded documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {files.map(({ id, file, status, progress, classification, borrower, propertyAddress, loanNumber, analysis, extractedFields }) => (
                <div key={id} className='border border-border rounded-lg p-4 space-y-3'>
                  {/* File Info Header */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      {getStatusIcon(status)}
                      <div>
                        <h4 className='font-medium'>{file.name}</h4>
                        <p className='text-sm text-muted-foreground'>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      {getStatusBadge(status)}
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => removeFile(id)}
                      >
                        <X className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  {(status === 'uploading' || status === 'processing') && (
                    <div className='space-y-2'>
                      <div className='flex justify-between text-sm'>
                        <span>
                          {status === 'uploading' ? 'Uploading...' : 'Processing...'}
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}
                  {/* Analysis Results */}
                  {status === 'completed' && classification && (
                    <div className='bg-muted/50 rounded-lg p-4 space-y-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <FileText className='w-4 h-4 text-primary' />
                            <span className='font-medium'>Classification</span>
                          </div>
                          <Badge variant='outline'>{classification}</Badge>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Building className='w-4 h-4 text-primary' />
                            <span className='font-medium'>Borrower</span>
                          </div>
                          <p className='text-sm'>{borrower}</p>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Building className='w-4 h-4 text-primary' />
                            <span className='font-medium'>Property</span>
                          </div>
                          <p className='text-sm'>{propertyAddress}</p>
                        </div>
                        <div className='space-y-2'>
                          <div className='flex items-center gap-2'>
                            <Hash className='w-4 h-4 text-primary' />
                            <span className='font-medium'>Loan Number</span>
                          </div>
                          <p className='text-sm font-mono'>{loanNumber}</p>
                        </div>
                      </div>
                      {analysis && (
                        <div className='space-y-3 pt-3 border-t border-border'>
                          <h4 className='font-medium'>AI Analysis</h4>
                          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                            <div>
                              <h5 className='font-medium text-sm text-success mb-2'>Key Findings</h5>
                              <ul className='text-sm space-y-1'>
                                {analysis.keyFindings.map((finding, index) => (
                                  <li key={index} className='flex items-start gap-2'>
                                    <CheckCircle className='w-3 h-3 text-success mt-0.5 flex-shrink-0' />
                                    {finding}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className='font-medium text-sm text-warning mb-2'>Risk Factors</h5>
                              <ul className='text-sm space-y-1'>
                                {analysis.riskFactors.map((risk, index) => (
                                  <li key={index} className='flex items-start gap-2'>
                                    <AlertCircle className='w-3 h-3 text-warning mt-0.5 flex-shrink-0' />
                                    {risk}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className='font-medium text-sm text-info mb-2'>Recommendations</h5>
                              <ul className='text-sm space-y-1'>
                                {analysis.recommendations.map((rec, index) => (
                                  <li key={index} className='flex items-start gap-2'>
                                    <FileText className='w-3 h-3 text-info mt-0.5 flex-shrink-0' />
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Extracted Fields Section */}
                      {extractedFields && (
                        <div className='space-y-3 pt-3 border-t border-border'>
                          <h4 className='font-medium flex items-center gap-2'>
                            <FileText className='w-4 h-4 text-primary' />
                            Extracted Fields
                          </h4>
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {Object.entries(extractedFields).map(([key, value]) => (
                              <div key={key} className='bg-background border border-border rounded-lg p-3'>
                                <div className='text-xs font-medium text-muted-foreground mb-1'>{key}</div>
                                <div className='text-sm font-medium'>{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Upload;