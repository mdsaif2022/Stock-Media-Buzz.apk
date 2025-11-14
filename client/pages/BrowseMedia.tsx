import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

export default function BrowseMedia() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl space-y-6 text-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">Media Library</p>
            <h1 className="text-3xl sm:text-4xl font-bold">Browse All Free Assets</h1>
            <p className="text-muted-foreground">
              The full browsing experience is coming soon. In the meantime, use the dashboard or search bar on the home
              page to access available downloads.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 sm:p-8 space-y-4 text-left">
            <p className="text-sm font-semibold text-primary">What to expect</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Filter by category (video, image, audio, template, APK)</li>
              <li>Preview high-quality media before downloading</li>
              <li>Follow your favorite creators and receive updates</li>
            </ul>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow hover:opacity-90 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/creator"
              className="px-5 py-2 rounded-lg border border-border text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Creator Portal
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

