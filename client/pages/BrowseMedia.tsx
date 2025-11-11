import Layout from "@/components/Layout";
import { Search, Filter, Download } from "lucide-react";
import { useState } from "react";

export default function BrowseMedia() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Video", "Image", "Audio", "Template"];
  const resolutions = ["All", "4K", "1080p", "720p"];
  const durations = ["All", "<10s", "10-30s", "30-60s", ">60s"];

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header Section */}
        <div className="bg-white dark:bg-slate-900 border-b border-border">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse Media</h1>

            {/* Search Bar */}
            <div className="flex gap-3 max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search videos, images, audio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-border sticky top-24">
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(selectedCategory === category ? null : category)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Resolution Filter */}
                <div className="mb-6 pb-6 border-b border-border">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Resolution
                  </h3>
                  <div className="space-y-2">
                    {resolutions.map((res) => (
                      <label key={res} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border" />
                        <span className="text-sm">{res}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    Duration
                  </h3>
                  <div className="space-y-2">
                    {durations.map((dur) => (
                      <label key={dur} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border" />
                        <span className="text-sm">{dur}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Content */}
            <div className="lg:col-span-3">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Browse Media Coming Soon</h2>
                <p className="text-muted-foreground">
                  This page is being populated with our collection of videos, images, audio, and templates.
                  Check back soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
