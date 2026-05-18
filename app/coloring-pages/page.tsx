import type { Metadata } from "next";
import Image from "next/image";
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

const happyTownSourceArt = [
  ["Bear Firefighter", "/images/source-pages/bear-firefighter.png"],
  ["Bunny Doctor", "/images/source-pages/bunny-doctor.png"],
  ["Dog Police", "/images/source-pages/dog-police.png"],
  ["Fox Mail Carrier", "/images/source-pages/fox-mail-carrier.png"],
  ["Teacher Cat", "/images/source-pages/teacher-cat.png"],
  ["Bus Driver Elephant", "/images/source-pages/bus-driver-elephant.png"],
  ["Builder Raccoon", "/images/source-pages/builder-raccoon.png"],
  ["Crossing Guard Penguin", "/images/source-pages/crossing-guard-penguin.png"]
];

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

      <section className="rounded-[30px] border border-border bg-card p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Happy Town source art</p>
            <h2 className="font-heading text-3xl text-text">Community helpers in progress</h2>
            <p className="max-w-2xl text-sm leading-7 text-text-muted">
              These polished character assets are staged for upcoming Happy Town pages while the downloadable library keeps using clean printable line-art previews.
            </p>
          </div>
          <Button href="/shop/happy-town-community-helpers" variant="secondary">
            Follow Happy Town
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {happyTownSourceArt.map(([label, src]) => (
            <article key={label} className="overflow-hidden rounded-[18px] border border-border bg-surface-alt">
              <div className="relative aspect-[3/4] bg-card">
                <Image src={src} alt={`${label} coloring character source art`} fill className="object-contain p-2" />
              </div>
              <p className="border-t border-border px-2 py-2 text-center text-xs text-text-muted">{label}</p>
            </article>
          ))}
        </div>
      </section>

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
