import AdminLayout from "@/components/AdminLayout";
import { Plus, Edit, Trash2, Search, Copy, Upload, X, Image as ImageIcon, Video, Link as LinkIcon, File } from "lucide-react";
import { useState, useRef } from "react";

interface Ad {
  id: number;
  title: string;
  type: "Adsterra" | "Custom";
  placement: string;
  status: "active" | "inactive";
  clicks: number;
  impressions: number;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  targetUrl?: string;
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
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    placement: "Header",
    targetUrl: "",
    mediaUrl: "",
    description: "",
    active: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      alert('Please select an image or video file');
      return;
    }
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const getFileIcon = (file: File) => {
    return file.type.startsWith('video/') ? Video : ImageIcon;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadMethod === 'file' && !selectedFile) {
      alert('Please select a file or provide a media URL');
      return;
    }
    
    if (uploadMethod === 'url' && !formData.mediaUrl) {
      alert('Please provide a media URL');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setShowAddForm(false);
      setSelectedFile(null);
      setFormData({
        title: "",
        placement: "Header",
        targetUrl: "",
        mediaUrl: "",
        description: "",
        active: true,
      });
      alert('Custom ad added successfully!');
    }, 2000);
  };

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
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold">Add Custom Ad</h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedFile(null);
                  setFormData({
                    title: "",
                    placement: "Header",
                    targetUrl: "",
                    mediaUrl: "",
                    description: "",
                    active: true,
                  });
                }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Method Toggle */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium mb-2 sm:mb-3">Media Upload Method</label>
              <div className="flex gap-2 sm:gap-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                    uploadMethod === 'file'
                      ? 'bg-white dark:bg-slate-900 text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                    uploadMethod === 'url'
                      ? 'bg-white dark:bg-slate-900 text-primary shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Media URL
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Ad Title</label>
                <input
                  type="text"
                  placeholder="Ad campaign name"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Placement</label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  required
                  className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                >
                  <option value="Header">Header (Top Bar Slider)</option>
                  <option value="Sidebar">Sidebar</option>
                  <option value="Footer">Footer</option>
                  <option value="Hero Banner">Hero Banner</option>
                  <option value="Featured Section">Featured Section</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  required
                  className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                />
              </div>

              {/* File Upload Section */}
              {uploadMethod === 'file' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 sm:mb-3">Upload Media (Image/Video)</label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                    <p className="text-sm sm:text-base font-semibold mb-2">
                      Drag and drop image/video here, or click to select
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Supports: Images (JPG, PNG, GIF, WebP) and Videos (MP4, WebM, MOV)
                    </p>
                  </div>

                  {selectedFile && (
                    <div className="mt-4 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-border flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const Icon = getFileIcon(selectedFile);
                          return <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />;
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium truncate">{selectedFile.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {formatFileSize(selectedFile.size)} • {selectedFile.type}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="p-1.5 sm:p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* URL Upload Section */}
              {uploadMethod === 'url' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Media URL (Image/Video)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <input
                      type="url"
                      placeholder="https://example.com/ad-image.jpg or https://example.com/ad-video.mp4"
                      value={formData.mediaUrl}
                      onChange={(e) => setFormData({ ...formData, mediaUrl: e.target.value })}
                      required={uploadMethod === 'url'}
                      className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
                    Direct URL to image or video file
                  </p>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Ad description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base resize-none"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="active" className="text-sm font-medium">
                  Active
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:col-span-2">
                <button
                  type="submit"
                  disabled={isUploading || (uploadMethod === 'file' && !selectedFile) || (uploadMethod === 'url' && !formData.mediaUrl)}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
                >
                  {isUploading ? 'Adding Ad...' : 'Add Ad'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedFile(null);
                    setFormData({
                      title: "",
                      placement: "Header",
                      targetUrl: "",
                      mediaUrl: "",
                      description: "",
                      active: true,
                    });
                  }}
                  className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-border rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm sm:text-base touch-manipulation"
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
