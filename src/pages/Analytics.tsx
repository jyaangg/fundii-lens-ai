// External imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Clock, Users, FileText } from 'lucide-react';
// Internal imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface CollectionPerformance {
  month: string;
  onTime: number;
  late: number;
  target: number;
}

interface RiskData {
  name: string;
  value: number;
  count: number;
}

interface BorrowerAttention {
  borrower: string;
  riskScore: number;
  pastDue: number;
  missing: number;
}

interface DocumentProgress {
  week: string;
  insurance: number;
  taxes: number;
  financial: number;
}

const collectionPerformance: CollectionPerformance[] = [
  { month: "Jan", onTime: 85, late: 15, target: 90 },
  { month: "Feb", onTime: 88, late: 12, target: 90 },
  { month: "Mar", onTime: 92, late: 8, target: 90 },
  { month: "Apr", onTime: 87, late: 13, target: 90 },
  { month: "May", onTime: 91, late: 9, target: 90 },
  { month: "Jun", onTime: 89, late: 11, target: 90 },
];

const defaultRiskData: RiskData[] = [
  { name: "Low Risk", value: 65, count: 156 },
  { name: "Medium Risk", value: 25, count: 60 },
  { name: "High Risk", value: 10, count: 24 },
];

const borrowerAttention: BorrowerAttention[] = [
  { borrower: "Oakwood Properties LLC", riskScore: 85, pastDue: 45, missing: 3 },
  { borrower: "Metro Development Corp", riskScore: 78, pastDue: 32, missing: 2 },
  { borrower: "Sunrise Commercial", riskScore: 72, pastDue: 28, missing: 4 },
  { borrower: "Gateway Holdings", riskScore: 69, pastDue: 21, missing: 2 },
  { borrower: "Pinnacle Investments", riskScore: 65, pastDue: 18, missing: 1 },
];

const documentProgress: DocumentProgress[] = [
  { week: "Week 1", insurance: 45, taxes: 38, financial: 42 },
  { week: "Week 2", insurance: 62, taxes: 55, financial: 58 },
  { week: "Week 3", insurance: 78, taxes: 71, financial: 69 },
  { week: "Week 4", insurance: 89, taxes: 85, financial: 82 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const getRiskBadge = (score: number): JSX.Element => {
  if (score >= 75) return <Badge variant='destructive'>High Risk</Badge>;
  if (score >= 60) return <Badge variant='secondary' className='bg-orange-500/10 text-orange-700 border-orange-500/20'>Medium Risk</Badge>;
  return <Badge variant='default' className='bg-green-500/10 text-green-700 border-green-500/20'>Low Risk</Badge>;
};

const Analytics: React.FC = () => (
  <div className='space-y-6'>
    <div className='flex items-center justify-between'>
      <h1 className='text-3xl font-bold tracking-tight'>Analytics Dashboard</h1>
    </div>
    {/* KPI Cards */}
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card className='shadow-soft'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Collection Rate</CardTitle>
          <TrendingUp className='h-4 w-4 text-green-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>89%</div>
          <p className='text-xs text-muted-foreground'>+2.5% from last month</p>
          <Progress value={89} className='mt-2' />
        </CardContent>
      </Card>
      <Card className='shadow-soft'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>High Risk Loans</CardTitle>
          <AlertTriangle className='h-4 w-4 text-red-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>24</div>
          <p className='text-xs text-muted-foreground'>-3 from last month</p>
          <Progress value={10} className='mt-2' />
        </CardContent>
      </Card>
      <Card className='shadow-soft'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Avg Days Past Due</CardTitle>
          <Clock className='h-4 w-4 text-orange-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>12.3</div>
          <p className='text-xs text-muted-foreground'>+1.2 days from target</p>
          <Progress value={35} className='mt-2' />
        </CardContent>
      </Card>
      <Card className='shadow-soft'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Active Borrowers</CardTitle>
          <Users className='h-4 w-4 text-blue-600' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>240</div>
          <p className='text-xs text-muted-foreground'>+12 this quarter</p>
          <Progress value={92} className='mt-2' />
        </CardContent>
      </Card>
    </div>
    {/* Charts Row 1 */}
    <div className='grid gap-4 md:grid-cols-2'>
      <Card className='shadow-soft'>
        <CardHeader>
          <CardTitle>Document Collection Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={collectionPerformance}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey='onTime' fill='#10b981' name='On Time %' />
              <Bar dataKey='late' fill='#ef4444' name='Late %' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='shadow-soft'>
        <CardHeader>
          <CardTitle>Default Risk Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={defaultRiskData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {defaultRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    {/* Document Progress Chart */}
    <Card className='shadow-soft'>
      <CardHeader>
        <CardTitle>Document Collection Progress by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart data={documentProgress}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='week' />
            <YAxis />
            <RechartsTooltip />
            <Area type='monotone' dataKey='insurance' stackId='1' stroke='#8884d8' fill='#8884d8' name='Insurance' />
            <Area type='monotone' dataKey='taxes' stackId='1' stroke='#82ca9d' fill='#82ca9d' name='Property Tax' />
            <Area type='monotone' dataKey='financial' stackId='1' stroke='#ffc658' fill='#ffc658' name='Financial Statements' />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    {/* High Attention Borrowers */}
    <Card className='shadow-soft'>
      <CardHeader>
        <CardTitle>Borrowers Requiring Immediate Attention</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {borrowerAttention.map(({ borrower, riskScore, pastDue, missing }, index) => (
            <div key={index} className='flex items-center justify-between p-4 rounded-lg border bg-muted/30'>
              <div className='flex-1'>
                <h4 className='font-medium'>{borrower}</h4>
                <div className='flex items-center gap-4 mt-2 text-sm text-muted-foreground'>
                  <span>Past Due: {pastDue} days</span>
                  <span>Missing: {missing} documents</span>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='text-right'>
                  <div className='text-sm font-medium'>Risk Score</div>
                  <div className='text-xl font-bold'>{riskScore}</div>
                </div>
                {getRiskBadge(riskScore)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Analytics;