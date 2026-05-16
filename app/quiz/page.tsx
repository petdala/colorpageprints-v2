import { Button } from "@/components/ui/button";

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Collection Finder</p>
        <h1 className="mt-3 font-heading text-4xl text-text">Collection finder coming soon</h1>
        <p className="mt-4 text-sm leading-7 text-text-muted">
          The next version of the finder will recommend launch-shelf collections, phase matches, and free printable routes without pretending to know more than the current data supports.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/colors-of-calm">Start with Colors of Calm</Button>
          <Button href="/shop" variant="secondary">
            Browse the Launch Shelf
          </Button>
        </div>
      </section>
    </div>
  );
}
