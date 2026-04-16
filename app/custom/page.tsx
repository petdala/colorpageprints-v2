import { CustomIntakeForm } from "./CustomIntakeForm";

const receives = [
  "Custom coloring book PDF (10-16 pages)",
  "Original companion song (MP3)",
  "Personalized cover and dedication page",
  "Ready-to-share digital keepsake bundle"
];

const designedFor = ["Family milestones", "Legacy stories", "Community gifts"];

const howItWorks = ["1. Share your story", "2. Review the draft", "3. Receive the keepsake"];

export default function CustomPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl text-text">Custom Coloring Books</h1>
        <p className="text-text-muted">Your story. Your book. Built by us.</p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">What You Receive</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {receives.map((item) => (
            <article key={item} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="text-sm text-text">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">Designed For</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {designedFor.map((item) => (
            <article key={item} className="rounded-xl border border-border bg-card p-4 text-sm text-text shadow-sm">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">How It Works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {howItWorks.map((step) => (
            <article key={step} className="rounded-xl border border-border bg-surface-alt p-4 text-sm text-text">
              {step}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-heading text-2xl text-text">Start Your Custom Project</h2>
        <CustomIntakeForm />
      </section>
    </div>
  );
}
