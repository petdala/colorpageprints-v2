import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LaunchInterestForm } from "@/components/sections/LaunchInterestForm";
import { BookStatusBadge } from "@/components/ui/BookStatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBookBySlug } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    absolute: "Colors of Calm | Mindful Mandalas for Adult Reset"
  },
  description: "Get the Colors of Calm sampler and follow the flagship mindful coloring collection from ColorPagePrints."
};

const phases = [
  ["Arrive", "Ease into the page and slow your attention down."],
  ["Steady", "Find a steadier pace without adding noise."],
  ["Deepen", "Spend longer with color and focus when you need it."],
  ["Release", "Use repetition and pattern to let tension fall away."],
  ["Return", "Leave the session feeling more grounded than when you started."]
];

const experienceCards = [
  ["50 mandalas", "A full adult reset arc across five guided phases."],
  ["Sampler first", "Start with a preview before the full collection lands."],
  ["Audio layer", "Companion listening cues are planned around the same phase rhythm."],
  ["Launch reminders", "Join early for preview, audio, and release updates."]
];

export default function ColorsOfCalmPage() {
  const book = getBookBySlug("colors-of-calm");

  if (!book) {
    notFound();
  }

  const coverImage = book.cover_image ?? "/images/covers/colors-of-calm-temp.png";

  return (
    <div className="space-y-16 pb-8">
      <section className="grid gap-8 overflow-hidden rounded-[36px] border border-border bg-[linear-gradient(135deg,#FAFAF8_0%,#F5F3F0_58%,#fff7ef_100%)] p-6 md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[460px] rounded-[32px] border border-border bg-card p-5 shadow-sm">
          <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-[#9cad87]/20" />
          <div className="absolute bottom-10 right-8 h-24 w-24 rounded-full bg-cta/15" />
          <div className="relative mx-auto flex h-full max-w-[390px] items-center justify-center py-8">
            <div className="absolute -left-4 top-24 h-72 w-44 rotate-[-9deg] rounded-[26px] border border-border bg-surface-alt shadow-sm" />
            <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-[30px] border border-border bg-card shadow-[0_30px_76px_rgba(26,26,26,0.14)]">
              <Image src={coverImage} alt="Colors of Calm sampler cover preview" fill priority className="object-contain p-4" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Flagship Collection</p>
          <div className="flex flex-wrap gap-2">
            <BookStatusBadge book={book} />
            <Badge className="border-[#9cad87] bg-[#edf5e7] text-text">Companion Audio</Badge>
            <Badge>Adult Reset</Badge>
          </div>
          <h1 className="font-heading text-[42px] leading-tight text-text md:text-[66px]">Colors of Calm</h1>
          <p className="max-w-3xl text-lg leading-8 text-text-muted md:text-xl">
            A mindful coloring ritual for adult reset: 50 mandalas, companion audio, and a slower kind of escape.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/launch-list?interest=colors-of-calm&type=sampler_request">Get the Free Sampler</Button>
            <Button href="/launch-list?interest=colors-of-calm&type=global_launch_list" variant="secondary">
              Save Launch Reminder
            </Button>
          </div>
          <p className="text-sm text-text-light">Five guided phases: Arrive · Steady · Deepen · Release · Return</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {experienceCards.map(([title, body]) => (
          <article key={title} className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading text-2xl text-text">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">{body}</p>
          </article>
        ))}
      </section>

      <section className="space-y-5 rounded-[32px] border border-border bg-surface-alt p-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">The reset arc</p>
          <h2 className="font-heading text-3xl text-text">Five phases, one slower rhythm</h2>
          <p className="text-sm leading-7 text-text-muted">
            Colors of Calm is designed as a guided experience rather than a loose pile of pages. Each phase has a job in the ritual.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {phases.map(([title, body]) => (
            <article key={title} className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-text-light">Phase</p>
              <h3 className="mt-3 font-heading text-2xl text-text">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <article className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Audio preview</p>
          <h2 className="mt-3 font-heading text-3xl text-text">Companion audio is part of the launch</h2>
          <p className="mt-3 text-sm leading-7 text-text-muted">
            The audio layer follows the same five-phase path as the pages. Join the launch list for sampler access first, then audio previews and release reminders as they become ready.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>Sampler Available</Badge>
            <Badge>Audio Preview Planned</Badge>
            <Badge>{book.launch_window ?? "Coming soon"}</Badge>
          </div>
        </article>

        <LaunchInterestForm
          heading="Save My Launch Reminder"
          subtext="Get the sampler first, then stay close to the next audio preview and launch update."
          buttonText="Save My Launch Reminder"
          tag="colors-of-calm-page"
          interestSlug="colors-of-calm"
          interestType="global_launch_list"
          showThemePreference
          showRequestField
        />
      </section>

      <section className="rounded-[32px] border border-border bg-surface-alt p-8">
        <h2 className="font-heading text-3xl text-text">Designed for adult reset</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-text-muted">
          Colors of Calm anchors the slower, more immersive side of ColorPagePrints. The free library remains available for quick printable discovery, while this collection leads with a calmer flagship point of view.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Button href="/shop/colors-of-calm" variant="secondary">
            View Product Details
          </Button>
          <Button href="/coloring-pages">Visit Free Library</Button>
        </div>
      </section>
    </div>
  );
}
