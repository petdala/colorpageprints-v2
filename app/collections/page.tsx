import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Collections",
  description: "See how Colors of Calm, the launch shelf, the free library, and future lanes fit together inside ColorPagePrints."
};

const cards = [
  {
    eyebrow: "Flagship",
    title: "Colors of Calm",
    body: "The adult reset collection that leads the first ColorPagePrints wave: mindful mandalas, companion audio, and a slower creative rhythm.",
    cta: "Explore Colors of Calm",
    href: "/colors-of-calm"
  },
  {
    eyebrow: "Launch Shelf",
    title: "Pipeline Books",
    body: "Upcoming concepts and in-production books where readers can save reminders, request previews, and shape what launches next.",
    cta: "Browse Pipeline",
    href: "/shop#pipeline-shelf"
  },
  {
    eyebrow: "Free Discovery",
    title: "Free Library",
    body: "Printable pages for quick screen-free creativity, sample downloads, and light discovery before deeper collections launch.",
    cta: "Visit Free Library",
    href: "/coloring-pages"
  },
  {
    eyebrow: "Future Lanes",
    title: "Future Collections",
    body: "New moods, audiences, and seasonal lanes will open as each wave earns enough interest to move forward.",
    cta: "Join Launch List",
    href: "/launch-list"
  }
];

export default function CollectionsPage() {
  return (
    <div className="space-y-12 pb-8">
      <header className="grid gap-8 rounded-[36px] border border-border bg-[linear-gradient(135deg,#FAFAF8_0%,#F5F3F0_65%,#fff7ef_100%)] p-8 lg:grid-cols-[1fr_0.78fr] lg:items-center">
        <div className="space-y-4">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections", href: "/collections" }]} />
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Collection Hub</p>
          <h1 className="font-heading text-4xl leading-tight text-text md:text-5xl">Collections for different moods and moments</h1>
          <p className="max-w-3xl text-sm leading-7 text-text-muted">
            ColorPagePrints is being built in waves. Start with the flagship collection, browse the launch shelf, and save the future themes you want most.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/colors-of-calm">Start with Colors of Calm</Button>
            <Button href="/shop" variant="secondary">
              Browse the Launch Shelf
            </Button>
          </div>
        </div>

        <div className="relative min-h-[320px] rounded-[30px] border border-border bg-card p-5 shadow-sm">
          <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#9cad87]/20" />
          <div className="absolute bottom-8 right-8 h-20 w-20 rounded-full bg-cta/15" />
          <div className="relative mx-auto h-[280px] max-w-[220px]">
            <Image src="/images/covers/colors-of-calm-temp.svg" alt="Colors of Calm collection preview" fill className="object-contain" />
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="group rounded-[30px] border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-xs uppercase tracking-[0.2em] text-text-light">{card.eyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl text-text">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-text-muted">{card.body}</p>
            <span className="mt-5 inline-block text-sm font-medium text-text underline decoration-cta underline-offset-4 group-hover:text-cta">{card.cta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
