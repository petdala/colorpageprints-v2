import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="rounded-3xl bg-surface-alt p-8 md:p-12">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-text-muted">Color with intention</p>
      <h1 className="font-heading text-4xl text-text md:text-5xl">Beautiful coloring books for mindful routines</h1>
      <p className="mt-4 max-w-2xl text-text-muted">
        Explore printable pages, curated collections, and launch waves crafted for modern colorists.
      </p>
      <div className="mt-6">
        <Button>Shop Now</Button>
      </div>
    </section>
  );
}
