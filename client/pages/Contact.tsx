import Layout from "@/components/Layout";

export default function Contact() {
  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">Contact</p>
            <h1 className="text-3xl sm:text-4xl font-bold">Get in touch</h1>
            <p className="text-muted-foreground">
              Have questions, feedback, or partnership ideas? Drop us a message and the FreeMediaBuzz team will respond
              as quickly as possible.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg border border-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="w-full sm:w-auto inline-flex justify-center px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold shadow hover:opacity-90 transition">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

