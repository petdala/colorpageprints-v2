import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getBooks, getColoringPages } from "@/lib/data";
import { ColoringPagesBrowserClient } from "./ColoringPagesBrowserClient";

export const metadata: Metadata = {
  title: "Free Printable Coloring Pages",
  description:
    "A growing library of printable pages for screen-free creativity, families, classrooms, and mindful breaks."
};

export default function ColoringPagesPage() {
  const pages = getColoringPages();
  const books = getBooks();

  return (
    <div className="space-y-12">
      <section className="border-y border-border bg-surface-alt/60 px-4 py-3 text-center text-sm text-text-muted">
        <span>These are sample pages from ColorPagePrints collections.</span>{" "}
        <Link href="/shop" className="font-medium text-text underline decoration-cta underline-offset-4">
          Explore the Launch Shelf
        </Link>
      </section>

      <header className="mx-auto max-w-4xl space-y-4 text-center">
        <div className="flex justify-center">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free Library", href: "/coloring-pages" }]} />
        </div>
        <h1 className="font-heading text-4xl leading-tight text-text md:text-6xl">Free printable coloring pages</h1>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-text-muted">
          Download sample pages from ColorPagePrints books, then follow the complete collections when you want the full experience.
        </p>
      </header>

      <Suspense fallback={<p className="text-center text-sm text-text-muted">Loading free pages...</p>}>
        <ColoringPagesBrowserClient pages={pages} books={books} />
      </Suspense>

      <section className="rounded-[28px] border border-border bg-surface-alt p-6 md:p-8">
        <h2 className="font-heading text-2xl text-text md:text-3xl">Looking for the flagship adult reset collection?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-text-muted">
          Try the Colors of Calm sampler before the full collection lands.
        </p>
        <div className="mt-5">
          <Button href="/launch-list?interest=colors-of-calm&type=sampler_request">Get the Free Sampler</Button>
        </div>
      </section>
    </div>
  );
}
