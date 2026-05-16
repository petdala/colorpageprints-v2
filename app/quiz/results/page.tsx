import { Button } from "@/components/ui/button";

export default function QuizResultsPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Collection Finder</p>
        <h1 className="mt-3 font-heading text-4xl text-text">Phase matching is still being staged</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">
          We are turning the finder into a cleaner launch-shelf recommendation system for Arrive, Steady, Deepen, Release, Return, Kids & Family, Seasonal, and Free Printables.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/colors-of-calm">Start with Colors of Calm</Button>
          <Button href="/coloring-pages" variant="secondary">
            Explore Free Printables
          </Button>
        </div>
      </section>
    </div>
  );
}
