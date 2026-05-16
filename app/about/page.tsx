import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: {
    absolute: "About ColorPagePrints | Research-Led Coloring Experiences"
  },
  description:
    "Learn how ColorPagePrints builds research-led coloring experiences, starting with the Colors of Calm flagship collection."
};

const valuePillars = [
  {
    heading: "Research first",
    body: "Every collection starts with what people genuinely want, what feels stale, and what no one has made well enough yet."
  },
  {
    heading: "Flagship before scale",
    body: "Colors of Calm sets the adult reset standard before the brand expands into more lanes."
  },
  {
    heading: "AI with accountability",
    body: "AI helps with range and speed, but the editing, taste, curation, and final standard are human."
  },
  {
    heading: "Built in waves",
    body: "Early supporters shape what comes next through sampler requests, saved ideas, and launch reminders."
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-8">
      <section className="grid gap-8 overflow-hidden rounded-[36px] border border-border bg-[linear-gradient(135deg,#FAFAF8_0%,#F5F3F0_62%,#fff7ef_100%)] p-6 md:p-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden rounded-[30px] border border-border bg-card shadow-sm">
          <Image
            src="/images/about/about-hero.jpg"
            alt="Hands coloring in a botanical coloring book on a warm wooden desk"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted">Research-led creative process</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">About ColorPagePrints</p>
          <h1 className="font-heading text-4xl leading-tight text-text md:text-5xl">Coloring experiences for different moods and moments</h1>
          <div className="space-y-5 text-base leading-8 text-text-muted md:text-lg">
            <p>
              ColorPagePrints creates coloring experiences for different moods and moments: some playful and easy to print, some slower,
              calmer, and more immersive.
            </p>
            <p>
              Colors of Calm is the flagship collection: a mindful coloring ritual for adult reset, built around 50 mandalas, companion audio,
              and a gentler creative rhythm.
            </p>
            <p>
              Every collection starts with research. I pay attention to what people genuinely love, what feels overdone, what’s missing, and what
              kinds of books they wish someone would finally make. Then I turn those signals into original collections with a clear point of view.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/colors-of-calm">Explore Colors of Calm</Button>
            <Button href="/shop" variant="secondary">
              Browse the Launch Shelf
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
        <article className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
          <h2 className="font-heading text-3xl text-text">Taste, editing, and disclosure</h2>
          <div className="mt-4 space-y-5 text-sm leading-7 text-text-muted">
            <p>
              I use AI as part of that creative process, and I’m open about it. It helps me explore directions faster and build with more range.
              But the taste, editing, curation, and final standard are mine. Every page is reviewed, refined, and chosen on purpose.
            </p>
            <p>
              ColorPagePrints is being built in waves. Early supporters help shape what comes next by saving book ideas, joining sampler lists,
              and getting reminders when collections are ready to launch.
            </p>
          </div>
        </article>

        <article className="rounded-[32px] border border-border bg-surface-alt p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Flagship first</p>
          <h2 className="mt-3 font-heading text-3xl text-text">Colors of Calm sets the standard</h2>
          <p className="mt-3 text-sm leading-7 text-text-muted">
            The launch shelf keeps future books visible without pretending they are finished. Colors of Calm is the first collection meant to define the adult reset side of the brand.
          </p>
          <div className="mt-5">
            <Button href="/launch-list?interest=colors-of-calm&type=sampler_request">Get the Free Sampler</Button>
          </div>
        </article>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {valuePillars.map((pillar) => (
          <article key={pillar.heading} className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl text-text">{pillar.heading}</h2>
            <p className="mt-3 text-sm leading-7 text-text-muted">{pillar.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
