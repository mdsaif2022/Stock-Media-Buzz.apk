import { Link } from "react-router-dom";
import { ArrowRight, Search, Download, Play, Music, Image as ImageIcon, Zap, Shield, Smile } from "lucide-react";
import Layout from "@/components/Layout";

export default function Index() {
  const categories = [
    {
      id: 1,
      name: "Video",
      icon: Play,
      count: "45.2K",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      name: "Images",
      icon: ImageIcon,
      count: "120K",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      name: "Audio",
      icon: Music,
      count: "28.5K",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      name: "Templates",
      icon: Zap,
      count: "12K",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const trendingMedia = [
    {
      id: 1,
      title: "Cinematic Urban Sunset",
      category: "Video",
      type: "4K",
      downloads: "12.5K",
      thumbnail: "bg-gradient-to-br from-orange-400 to-red-500",
      isPremium: false,
    },
    {
      id: 2,
      title: "Professional Business Background",
      category: "Image",
      type: "4K",
      downloads: "8.3K",
      thumbnail: "bg-gradient-to-br from-blue-400 to-blue-600",
      isPremium: true,
    },
    {
      id: 3,
      title: "Upbeat Electronic Music",
      category: "Audio",
      type: "320kbps",
      downloads: "5.2K",
      thumbnail: "bg-gradient-to-br from-purple-400 to-pink-600",
      isPremium: false,
    },
    {
      id: 4,
      title: "Modern Landing Page Template",
      category: "Template",
      type: "React",
      downloads: "3.1K",
      thumbnail: "bg-gradient-to-br from-green-400 to-blue-600",
      isPremium: false,
    },
    {
      id: 5,
      title: "Forest Walking Path",
      category: "Video",
      type: "1080p",
      downloads: "9.7K",
      thumbnail: "bg-gradient-to-br from-green-500 to-emerald-600",
      isPremium: false,
    },
    {
      id: 6,
      title: "Modern Tech Workspace",
      category: "Image",
      type: "5K",
      downloads: "11.2K",
      thumbnail: "bg-gradient-to-br from-slate-500 to-slate-700",
      isPremium: false,
    },
  ];

  const features = [
    {
      icon: Download,
      title: "Unlimited Downloads",
      description: "Download as many files as you want, completely free. No restrictions, no limits.",
    },
    {
      icon: Shield,
      title: "100% Free & Open",
      description: "All media is free to use for personal and commercial projects. No subscriptions needed.",
    },
    {
      icon: Smile,
      title: "High Quality",
      description: "Professional-grade videos, images, audio, and templates from creators worldwide.",
    },
    {
      icon: Zap,
      title: "Easy to Find",
      description: "Powerful search with filters by category, format, resolution, and more.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-3xl -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Join 500K+ creators using FreeMediaBuzz</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Free Stock Media
              </span>
              <br />
              <span className="text-foreground">For Everyone</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Download unlimited videos, images, audio tracks, and templates completely free. No subscriptions, no watermarks, no restrictions.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-12 animate-slide-up">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search videos, images, audio..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Link
                to="/browse"
                className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Explore
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border">
              <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <p className="text-3xl md:text-4xl font-bold text-primary">200K+</p>
                <p className="text-sm text-muted-foreground">Media Files</p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <p className="text-3xl md:text-4xl font-bold text-secondary">500K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <p className="text-3xl md:text-4xl font-bold text-accent">2.5M+</p>
                <p className="text-sm text-muted-foreground">Downloads</p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Free Forever</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
            <p className="text-lg text-muted-foreground">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/browse?category=${category.name.toLowerCase()}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl overflow-hidden relative group-hover:shadow-lg transition-all">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} files</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Media Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Now</h2>
              <p className="text-lg text-muted-foreground">Most downloaded this week</p>
            </div>
            <Link
              to="/browse"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMedia.map((media) => (
              <Link
                key={media.id}
                to={`/media/${media.id}`}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <div className={`${media.thumbnail} aspect-video flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {media.isPremium && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                      Premium
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {media.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-2">
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                        {media.category}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {media.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {media.downloads} downloads
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex sm:hidden justify-center mt-8">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreeMediaBuzz?</h2>
            <p className="text-lg text-muted-foreground">Everything you need, absolutely free</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-border hover:border-primary/50 transition-all hover:shadow-lg animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Get your media in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create a free account in seconds. No credit card required.",
              },
              {
                step: 2,
                title: "Browse & Search",
                description: "Explore our collection of videos, images, audio, and templates.",
              },
              {
                step: 3,
                title: "Download & Use",
                description: "Download what you need and use it freely in your projects.",
              },
            ].map((item, index) => (
              <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-8">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ad Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl overflow-hidden relative">
            {/* Content */}
            <div className="relative z-10 p-8 md:p-16">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
                  <Zap className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Featured Promotion</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Become a Content Creator
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Join our community of creators and contribute your own media. Earn money through promotions and grow your portfolio.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Start Creating
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to find your perfect media?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Start exploring our collection of premium-quality free media today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Browse Media
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signup"
                className="px-8 py-3 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
