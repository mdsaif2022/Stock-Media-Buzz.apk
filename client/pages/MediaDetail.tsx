import Layout from "@/components/Layout";
import { Download, Share2, Heart, Clock, Eye, Tag, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function MediaDetail() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const media = {
    id: 1,
    title: "Cinematic Urban Sunset - 4K Video",
    description:
      "A stunning 4K video of an urban sunset with beautiful golden and orange hues reflecting off modern buildings. Perfect for background videos, intros, or ambient content.",
    category: "Video",
    type: "4K (3840x2160)",
    duration: "00:45",
    fileSize: "1.2 GB",
    downloads: 12500,
    views: 45300,
    uploadedBy: "CreativeStudio Pro",
    uploadDate: "2024-11-15",
    tags: ["sunset", "urban", "4k", "cinematic", "nature", "city"],
    isPremium: false,
    format: "MP4",
    codec: "H.264",
    fps: "60fps",
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Trigger Adsterra ad here
    setTimeout(() => {
      setIsDownloading(false);
      // Actual download would happen here
    }, 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
              <span>/</span>
              <a href="/browse" className="hover:text-primary transition-colors">
                Browse
              </a>
              <span>/</span>
              <span className="text-foreground">{media.category}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Preview */}
              <div className="bg-gradient-to-br from-orange-400 to-red-500 aspect-video rounded-lg overflow-hidden mb-8 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center transition-all">
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
                <span className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
                  {media.duration}
                </span>
              </div>

              {/* Title and Description */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {media.title}
                    </h1>
                    <p className="text-muted-foreground">
                      By {media.uploadedBy} • Uploaded {media.uploadDate}
                    </p>
                  </div>
                  {media.isPremium && (
                    <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-700 dark:text-yellow-300 text-sm font-semibold rounded-full">
                      Premium
                    </div>
                  )}
                </div>

                <p className="text-lg text-foreground leading-relaxed mb-6">
                  {media.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {media.tags.map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 py-6 border-y border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Download className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Downloads</span>
                  </div>
                  <p className="text-2xl font-bold">{(media.downloads / 1000).toFixed(1)}K</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Views</span>
                  </div>
                  <p className="text-2xl font-bold">{(media.views / 1000).toFixed(1)}K</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">Duration</span>
                  </div>
                  <p className="text-2xl font-bold">{media.duration}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Format</span>
                  </div>
                  <p className="text-2xl font-bold">{media.format}</p>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6">
                <h3 className="text-lg font-bold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolution</p>
                    <p className="font-semibold">{media.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frame Rate</p>
                    <p className="font-semibold">{media.fps}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Codec</p>
                    <p className="font-semibold">{media.codec}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-semibold">{media.fileSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-semibold">{media.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-semibold">{media.format}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Download CTA */}
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-border p-6 sticky top-24 space-y-4">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {isDownloading ? "Preparing Download..." : "Download Now"}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex-1 py-2 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`}
                    />
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button className="flex-1 py-2 border border-border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                        Download Note
                      </p>
                      <p className="text-blue-800 dark:text-blue-300">
                        You'll see an ad before your download starts. This helps us keep everything free!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage Rights */}
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Usage Rights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>Free for commercial use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>No credit required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 dark:text-green-400">✓</span>
                      <span>Modify and redistribute</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
