import AdminLayout from "@/components/AdminLayout";
import { Download, Users, FileText, TrendingUp, Activity, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const downloadData = [
  { date: "Mon", downloads: 400 },
  { date: "Tue", downloads: 600 },
  { date: "Wed", downloads: 800 },
  { date: "Thu", downloads: 1000 },
  { date: "Fri", downloads: 1200 },
  { date: "Sat", downloads: 900 },
  { date: "Sun", downloads: 1100 },
];

const mediaTypeData = [
  { name: "Videos", value: 45200, color: "#a855f7" },
  { name: "Images", value: 82300, color: "#06b6d4" },
  { name: "Audio", value: 28500, color: "#f97316" },
  { name: "Templates", value: 12000, color: "#10b981" },
];

const topDownloads = [
  { id: 1, title: "Cinematic Urban Sunset", downloads: 12500, type: "Video" },
  { id: 2, title: "Professional Business Background", downloads: 8300, type: "Image" },
  { id: 3, title: "Upbeat Electronic Music", downloads: 5200, type: "Audio" },
  { id: 4, title: "Modern Landing Page Template", downloads: 3100, type: "Template" },
  { id: 5, title: "Forest Walking Path", downloads: 2800, type: "Video" },
  { id: 6, title: "Modern Tech Workspace", downloads: 2500, type: "Image" },
  { id: 7, title: "Corporate Presentation Theme", downloads: 2100, type: "Template" },
  { id: 8, title: "Ocean Waves Ambient", downloads: 1800, type: "Audio" },
  { id: 9, title: "Sunset Beach Scene", downloads: 1600, type: "Video" },
  { id: 10, title: "Mountain Landscape", downloads: 1400, type: "Image" },
];

const topUsers = [
  { id: 1, name: "John Doe", downloads: 245, email: "john@example.com" },
  { id: 2, name: "Jane Smith", downloads: 189, email: "jane@example.com" },
  { id: 3, name: "Mike Johnson", downloads: 156, email: "mike@example.com" },
  { id: 4, name: "Sarah Williams", downloads: 142, email: "sarah@example.com" },
  { id: 5, name: "Tom Brown", downloads: 128, email: "tom@example.com" },
  { id: 6, name: "Emily Davis", downloads: 115, email: "emily@example.com" },
  { id: 7, name: "Chris Martin", downloads: 98, email: "chris@example.com" },
  { id: 8, name: "Lisa Anderson", downloads: 87, email: "lisa@example.com" },
  { id: 9, name: "David Taylor", downloads: 76, email: "david@example.com" },
  { id: 10, name: "Anna Jackson", downloads: 65, email: "anna@example.com" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your platform overview.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Total Users</p>
                <p className="text-3xl font-bold mt-2">5,234</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Total Media</p>
                <p className="text-3xl font-bold mt-2">2,456</p>
              </div>
              <FileText className="w-8 h-8 text-secondary" />
            </div>
            <p className="text-xs text-green-600">+28 this week</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Total Downloads</p>
                <p className="text-3xl font-bold mt-2">168.2K</p>
              </div>
              <Download className="w-8 h-8 text-accent" />
            </div>
            <p className="text-xs text-green-600">+5.2K this week</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Active Users (7d)</p>
                <p className="text-3xl font-bold mt-2">892</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <p className="text-xs text-green-600">+3.4% this week</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Download Trend */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Download Trends (Last 7 days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={downloadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="downloads" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Media Type Distribution */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Media Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mediaTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mediaTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Downloads and Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Downloads */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Top 10 Downloaded Media</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {topDownloads.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{index + 1}. {item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <p className="font-semibold text-primary">{item.downloads.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Active Users */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Top 10 Active Users</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {topUsers.map((user, index) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{index + 1}. {user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <p className="font-semibold text-accent">{user.downloads}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud Storage Status */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">Cloud Storage Status</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cloudinary 1", used: 75, total: 100 },
              { name: "Cloudinary 2", used: 45, total: 100 },
              { name: "Cloudinary 3", used: 92, total: 100 },
              { name: "Cloudinary 4", used: 28, total: 100 },
            ].map((cloud) => (
              <div key={cloud.name}>
                <p className="font-medium text-sm mb-2">{cloud.name}</p>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      cloud.used > 80
                        ? "bg-destructive"
                        : cloud.used > 60
                          ? "bg-accent"
                          : "bg-primary"
                    }`}
                    style={{ width: `${cloud.used}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {cloud.used}GB / {cloud.total}GB
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
