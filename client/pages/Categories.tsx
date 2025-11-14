import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const categories = [
  { label: "Videos", description: "Cinematic footage, loops, and motion backgrounds" },
  { label: "Images", description: "Photos, mockups, UI kits, and illustrations" },
  { label: "Audio", description: "Music beds, SFX, and podcast-friendly loops" },
  { label: "Templates", description: "Web/app UI kits, presentation decks, and more" },
  { label: "APK / App", description: "Android builds, app demos, and submitted betas" },
];

export default function Categories() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl space-y-10">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">Media Categories</p>
            <h1 className="text-3xl sm:text-4xl font-bold">Everything you need, organized</h1>
            <p className="text-muted-foreground">
              Detailed category filtering launches soon. Here’s a preview of the sections we’re curating for creators
              and downloaders.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.label} className="rounded-xl border border-border bg-white dark:bg-slate-900 p-5 space-y-2">
                <h3 className="text-lg font-semibold">{category.label}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Want to contribute to a category that isn’t listed yet? Submit your request via the creator portal.
            </p>
            <Link
              to="/creator"
              className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow hover:opacity-90 transition"
            >
              Open Creator Portal
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

