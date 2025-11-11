import AdminLayout from "@/components/AdminLayout";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import { useState } from "react";

interface MediaItem {
  id: number;
  title: string;
  category: string;
  type: string;
  downloads: number;
  uploadedDate: string;
  isPremium: boolean;
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: "Cinematic Urban Sunset",
    category: "Video",
    type: "4K",
    downloads: 12500,
    uploadedDate: "2024-11-15",
    isPremium: false,
  },
  {
    id: 2,
    title: "Professional Business Background",
    category: "Image",
    type: "5K",
    downloads: 8300,
    uploadedDate: "2024-11-14",
    isPremium: true,
  },
  {
    id: 3,
    title: "Upbeat Electronic Music",
    category: "Audio",
    type: "320kbps",
    downloads: 5200,
    uploadedDate: "2024-11-13",
    isPremium: false,
  },
  {
    id: 4,
    title: "Modern Landing Page Template",
    category: "Template",
    type: "React",
    downloads: 3100,
    uploadedDate: "2024-11-12",
    isPremium: false,
  },
  {
    id: 5,
    title: "Forest Walking Path",
    category: "Video",
    type: "1080p",
    downloads: 2800,
    uploadedDate: "2024-11-11",
    isPremium: false,
  },
];

export default function AdminMedia() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = mediaItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Media Management</h1>
            <p className="text-muted-foreground mt-2">Add, edit, or delete media files</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Media
          </button>
        </div>

        {/* Add Media Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
            <h3 className="text-lg font-bold mb-4">Add New Media</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Media title"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Video</option>
                  <option>Image</option>
                  <option>Audio</option>
                  <option>Template</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type/Resolution</label>
                <input
                  type="text"
                  placeholder="e.g., 4K, 5K, 320kbps"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Cloud Storage</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Auto (Least Used)</option>
                  <option>Cloudinary 1</option>
                  <option>Cloudinary 2</option>
                  <option>Cloudinary 3</option>
                  <option>Cloudinary 4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preview URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">File URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Media description"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="tag1, tag2, tag3"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="premium"
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="premium" className="text-sm font-medium">
                  Mark as Premium
                </label>
              </div>
              <div className="flex gap-2 md:col-span-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Add Media
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

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Media Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Downloads</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Uploaded</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.type}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{item.downloads.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    {item.isPremium ? (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded text-xs font-semibold">
                        Premium
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded text-xs font-semibold">
                        Free
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.uploadedDate}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
