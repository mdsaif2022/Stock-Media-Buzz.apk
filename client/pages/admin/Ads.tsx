import AdminLayout from "@/components/AdminLayout";
import { Plus, Edit, Trash2, Search, Copy } from "lucide-react";
import { useState } from "react";

interface Ad {
  id: number;
  title: string;
  type: "Adsterra" | "Custom";
  placement: string;
  status: "active" | "inactive";
  clicks: number;
  impressions: number;
}

const ads: Ad[] = [
  {
    id: 1,
    title: "Adsterra Banner - Header",
    type: "Adsterra",
    placement: "Header",
    status: "active",
    clicks: 1234,
    impressions: 24567,
  },
  {
    id: 2,
    title: "Adsterra Popunder",
    type: "Adsterra",
    placement: "Popunder",
    status: "active",
    clicks: 567,
    impressions: 8900,
  },
  {
    id: 3,
    title: "Adsterra Interstitial",
    type: "Adsterra",
    placement: "Download Page",
    status: "active",
    clicks: 2345,
    impressions: 34567,
  },
  {
    id: 4,
    title: "TechCorp Banner Ad",
    type: "Custom",
    placement: "Sidebar",
    status: "active",
    clicks: 456,
    impressions: 12340,
  },
  {
    id: 5,
    title: "Creative Services Promo",
    type: "Custom",
    placement: "Footer",
    status: "inactive",
    clicks: 0,
    impressions: 0,
  },
];

export default function AdminAds() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Ads Manager</h1>
            <p className="text-muted-foreground mt-2">Manage Adsterra and custom ads</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Ad
          </button>
        </div>

        {/* Adsterra Setup */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-4">Adsterra Integration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                Adsterra Script ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="adsterra-12345-script"
                  readOnly
                  className="flex-1 px-3 py-2 border border-blue-300 dark:border-blue-700 rounded-lg bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-200"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Add this script to your site header for Adsterra ads to display on your platform.
            </p>
          </div>
        </div>

        {/* Add Custom Ad Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Add Custom Ad</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Ad Title</label>
                <input
                  type="text"
                  placeholder="Ad campaign name"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Placement</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Header</option>
                  <option>Sidebar</option>
                  <option>Footer</option>
                  <option>Hero Banner</option>
                  <option>Featured Section</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Media (Image/Video URL)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Ad description"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                ></textarea>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="active"
                  defaultChecked
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="active" className="text-sm font-medium">
                  Active
                </label>
              </div>
              <div className="flex gap-2 md:col-span-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Add Ad
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search ads..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Ads Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Placement</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Clicks</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Impressions</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">CTR</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ads.map((ad) => {
                const ctr =
                  ad.impressions > 0
                    ? ((ad.clicks / ad.impressions) * 100).toFixed(2)
                    : "0.00";
                return (
                  <tr
                    key={ad.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium">{ad.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          ad.type === "Adsterra"
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            : "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                        }`}
                      >
                        {ad.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{ad.placement}</td>
                    <td className="px-6 py-4 text-sm">
                      {ad.status === "active" ? (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded text-xs font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">{ad.clicks.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">{ad.impressions.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{ctr}%</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-destructive/10 rounded transition-colors text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
