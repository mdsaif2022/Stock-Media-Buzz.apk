import AdminLayout from "@/components/AdminLayout";
import { Download, Eye, Users, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const downloadTrendData = [
  { date: "Week 1", downloads: 3400, users: 2400 },
  { date: "Week 2", downloads: 3200, users: 2500 },
  { date: "Week 3", downloads: 3800, users: 2800 },
  { date: "Week 4", downloads: 4200, users: 3100 },
  { date: "Week 5", downloads: 4800, users: 3400 },
  { date: "Week 6", downloads: 5200, users: 3800 },
];

const categoryData = [
  { name: "Videos", downloads: 45200, color: "#a855f7" },
  { name: "Images", downloads: 82300, color: "#06b6d4" },
  { name: "Audio", downloads: 28500, color: "#f97316" },
  { name: "Templates", downloads: 12000, color: "#10b981" },
];

const adMetrics = [
  { date: "Mon", impressions: 4200, clicks: 324, ctr: "7.7%" },
  { date: "Tue", impressions: 5100, clicks: 412, ctr: "8.1%" },
  { date: "Wed", impressions: 4800, clicks: 388, ctr: "8.1%" },
  { date: "Thu", impressions: 5400, clicks: 456, ctr: "8.4%" },
  { date: "Fri", impressions: 6200, clicks: 532, ctr: "8.6%" },
  { date: "Sat", impressions: 4900, clicks: 401, ctr: "8.2%" },
  { date: "Sun", impressions: 5600, clicks: 468, ctr: "8.4%" },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">Track downloads, users, and ad performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Total Downloads (30d)</p>
                <p className="text-3xl font-bold mt-2">28.4K</p>
              </div>
              <Download className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-green-600">+12% from previous period</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Page Views (30d)</p>
                <p className="text-3xl font-bold mt-2">156.2K</p>
              </div>
              <Eye className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-xs text-green-600">+8.4% from previous period</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">New Users (30d)</p>
                <p className="text-3xl font-bold mt-2">1.2K</p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
            <p className="text-xs text-green-600">+5.2% from previous period</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Avg. Downloads/User</p>
                <p className="text-3xl font-bold mt-2">5.42</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-green-600">+2.1% from previous period</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Download Trend */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Download & User Trends (6 weeks)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={downloadTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Legend />
                <Line type="monotone" dataKey="downloads" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Downloads by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="downloads"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ad Performance */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
          <h3 className="text-lg font-bold mb-4">Ad Performance (Last 7 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
              <Legend />
              <Bar dataKey="impressions" fill="hsl(var(--primary))" />
              <Bar dataKey="clicks" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Ad Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold">Ad Performance Details</h3>
          </div>
          <table className="w-full">
            <thead className="border-b border-border bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Impressions</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Clicks</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">CTR</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Est. Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {adMetrics.map((metric) => (
                <tr
                  key={metric.date}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium">{metric.date}</td>
                  <td className="px-6 py-4 text-sm">{metric.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{metric.clicks}</td>
                  <td className="px-6 py-4 text-sm">{metric.ctr}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    ${(Math.random() * 50 + 20).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
