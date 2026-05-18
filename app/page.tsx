import type { Metadata } from "next";
import Image from "next/image";
import { LaunchInterestForm } from "@/components/sections/LaunchInterestForm";
import { Button } from "@/components/ui/button";
import { getFlagshipBook } from "@/lib/data";

export const metadata: Metadata = {
  title: {
    absolute: "ColorPagePrints | Colors of Calm & Upcoming Coloring Books"
  },
  description:
    "Discover Colors of Calm, save upcoming coloring book ideas, and join the ColorPagePrints Launch List for samplers and reminders."
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ColorPagePrints",
  url: "https://www.colorpageprints.com",
  logo: "https://www.colorpageprints.com/images/logo-primary.png",
  sameAs: []
};

const proofCards = [
  {
    mark: "50",
    title: "50 mindful mandalas",
    body: "Thoughtfully designed across five guided phases."
  },
  {
    mark: "Audio",
    title: "Companion audio",
    body: "Audio moods designed to match the journey."
  },
  {
    mark: "20 min",
    title: "About 20 minutes",
    body: "A calmer ritual you can return to in real life."
  }
];

const guidedPhases = [
  {
    symbol: "*",
    title: "Arrive",
    body: "Soften the noise and settle into the page."
  },
  {
    symbol: "~",
    title: "Steady",
    body: "Find a rhythm and stay with yourself."
  },
  {
    symbol: "+",
    title: "Deepen",
    body: "Disappear into pattern and quiet attention."
  },
  {
    symbol: "-",
    title: "Release",
    body: "Set something down. Exhale. Unwind."
  },
  {
    symbol: ")",
    title: "Return",
    body: "Come back clearer, calmer, and more whole."
  }
];

const supportCards = [
  {
    eyebrow: "Umbrella brand",
    title: "More than one kind of coloring experience",
    body: "Colors of Calm leads right now, but future collections will support different moods, moments, and audiences.",
    href: "/collections",
    cta: "View Collections"
  },
  {
    eyebrow: "Free Library",
    title: "Looking for free printable pages?",
    body: "The free library is still here for families, classrooms, and screen-free creativity.",
    href: "/coloring-pages",
    cta: "Explore the Free Library"
  },
  {
    eyebrow: "Research-led",
    title: "Built with research, shaped with taste",
    body: "Real signals become curated collections. AI speeds exploration; the final standard is human.",
    href: "/about",
    cta: "Read the Story"
  }
];

function ProductMockup({ coverImage }: { coverImage: string }) {
  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-[30px] border border-border bg-[linear-gradient(145deg,#fffdf8,#f8eee8)] p-6 shadow-sm md:min-h-[420px]">
      <div className="absolute right-8 top-8 h-24 w-24 rounded-full border-[12px] border-background bg-[#9b642a] shadow-sm" />
      <div className="absolute right-10 top-8 h-3 w-7 rotate-[-16deg] rounded-full bg-[#9cad87]" />
      <div className="absolute right-20 top-2 h-4 w-8 rotate-[-20deg] rounded-full bg-[#9cad87]" />
      <div className="absolute left-10 top-20 h-48 w-32 rotate-[-8deg] rounded-[10px] border border-border bg-background shadow-sm">
        <div className="mx-auto mt-16 h-20 w-20 rounded-full border border-cta/50" />
      </div>
      <div className="absolute left-[34%] top-28 h-56 w-36 rotate-[-9deg] rounded-[10px] border border-border bg-background shadow-md">
        <div className="mx-auto mt-20 h-20 w-20 rounded-full border border-cta/45" />
      </div>
      <div className="absolute right-[21%] top-14 aspect-[4/5] w-[34%] min-w-[150px] rotate-[2deg] overflow-hidden rounded-[8px] border border-border bg-card shadow-[0_20px_54px_rgba(26,26,26,0.16)]">
        <Image src={coverImage} alt="Colors of Calm cover preview" fill priority className="object-contain p-2" />
      </div>
      <div className="absolute bottom-12 right-10 max-w-[158px] rounded-[18px] bg-[#8c9b79] p-4 text-background shadow-lg">
        <div className="mb-6 flex gap-1">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="h-9 w-px bg-background/65" />
          ))}
        </div>
        <p className="text-base font-semibold leading-tight">Companion Audio</p>
        <p className="mt-2 text-xs leading-5 text-background/80">Guided sessions to move with your journey.</p>
        <span className="absolute right-4 top-20 flex h-9 w-9 items-center justify-center rounded-full bg-background text-xs font-semibold text-[#8c9b79]">Play</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const flagshipBook = getFlagshipBook();
  const flagshipVisual = flagshipBook?.cover_image ?? "/images/covers/colors-of-calm-temp.png";

  return (
    <div className="-mx-4 space-y-0 overflow-hidden sm:-mx-6 lg:-mx-8">
      <section className="grid min-h-[620px] gap-10 bg-[linear-gradient(115deg,#fffdf8_0%,#fffaf3_58%,#f9e7dc_100%)] px-6 py-16 md:px-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:px-12 xl:px-16">
        <div className="max-w-2xl space-y-7">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cta">Flagship Collection</p>
          <h1 className="font-heading text-[56px] leading-[0.96] text-text md:text-[78px] lg:text-[86px]">Colors of Calm</h1>
          <p className="max-w-xl text-xl leading-9 text-text-muted">
            A mindful coloring ritual for adult reset - 50 mandalas, companion audio, and a slower kind of escape.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/launch-list?interest=colors-of-calm&type=sampler_request">Get the Free Sampler</Button>
            <Button href="/shop" variant="secondary">
              Visit the Launch Shelf
            </Button>
          </div>
          <p className="text-sm text-text-muted">Five guided phases: Arrive · Steady · Deepen · Release · Return</p>
        </div>
        <ProductMockup coverImage={flagshipVisual} />
      </section>

      <section className="bg-background px-6 py-20 md:px-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-heading text-4xl leading-tight text-text md:text-5xl">More than a coloring book</h2>
          <p className="text-base leading-7 text-text-muted">
            Colors of Calm was designed as a low-friction reset. Each phase has its own emotional tone, with pages and companion audio that help you settle, focus, release, and return.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {proofCards.map((card) => (
            <article key={card.title} className="rounded-[26px] border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f9d7c8] text-sm font-semibold text-cta">
                {card.mark}
              </div>
              <h3 className="mt-8 font-heading text-2xl text-text">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background px-6 py-14 md:px-10 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="font-heading text-4xl leading-tight text-text md:text-5xl">A coloring experience that moves with you</h2>
          <p className="text-base leading-7 text-text-muted">
            Instead of one flat mood, Colors of Calm guides you through a full arc - from arriving, to steadying, to letting go, to returning lighter.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {guidedPhases.map((phase) => (
            <article key={phase.title} className="border-border text-center lg:border-l lg:px-7 first:lg:border-l-0">
              <p className="text-lg text-cta">{phase.symbol}</p>
              <h3 className="mt-7 font-heading text-2xl text-text">{phase.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{phase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background px-6 py-16 md:px-10 lg:px-12 xl:px-16">
        <div className="grid gap-8 rounded-[28px] border border-[#f0cdbd] bg-[#fff6f0] p-6 shadow-sm md:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="relative hidden min-h-[230px] lg:block">
            <div className="absolute left-6 top-4 h-56 w-36 rotate-[-9deg] rounded-[10px] border border-border bg-background shadow-sm" />
            <div className="absolute left-28 top-7 h-52 w-36 rotate-[6deg] rounded-[10px] border border-border bg-background shadow-sm" />
            <div className="absolute left-16 top-0 flex h-48 w-32 rotate-[-2deg] items-start justify-center rounded-[10px] border border-border bg-card pt-10 font-heading text-2xl leading-tight text-text-muted shadow-md">
              CALM<br />SAMPLER
            </div>
          </div>
          <LaunchInterestForm
            heading="Start with the free sampler"
            subtext="Join the Launch List and get a preview of Colors of Calm before the full collection drops."
            buttonText="Send My Free Sampler"
            tag="homepage-sampler-band"
            interestSlug="colors-of-calm"
            interestType="sampler_request"
            showThemePreference
            compact
            className="border-0 bg-transparent p-0 shadow-none"
          />
        </div>
      </section>

      <section className="bg-background px-6 py-12 md:px-10 lg:px-12 xl:px-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {supportCards.map((card, index) => (
            <article key={card.title} className="rounded-[26px] border border-border bg-card p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-alt text-sm font-semibold text-cta">{index + 1}</div>
              <p className="mt-8 text-xs uppercase tracking-[0.24em] text-text-light">{card.eyebrow}</p>
              <h3 className="mt-3 font-heading text-3xl leading-tight text-text">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-text-muted">{card.body}</p>
              <div className="mt-6">
                <Button href={card.href} variant="secondary">
                  {card.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background px-6 py-12 md:px-10 lg:px-12 xl:px-16">
        <div className="grid overflow-hidden rounded-[32px] border border-border bg-card shadow-sm lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4 p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Behind the ritual</p>
            <h2 className="font-heading text-4xl leading-tight text-text md:text-5xl">A slower workspace for a calmer book</h2>
            <p className="max-w-xl text-sm leading-7 text-text-muted">
              The Colors of Calm launch is built around quiet product signals: printable pages, a premium book feel, and companion audio that supports the full reset arc.
            </p>
            <Button href="/colors-of-calm" variant="secondary">
              Explore Colors of Calm
            </Button>
          </div>
          <div className="relative min-h-[300px] border-t border-border lg:border-l lg:border-t-0">
            <Image src="/images/heroes/homepage-hero.png" alt="Colors of Calm workspace with coloring pages and art tools" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="rounded-t-[36px] bg-[linear-gradient(115deg,#fff6f0,#f7f1ea)] px-6 py-20 text-center md:px-10 lg:px-12 xl:px-16">
        <h2 className="font-heading text-5xl text-text md:text-6xl">Find your ritual</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text-muted">
          Join early, get the sampler, and be first to experience Colors of Calm.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/launch-list?interest=colors-of-calm&type=sampler_request">Get the Free Sampler</Button>
          <Button href="/launch-list?interest=colors-of-calm&type=global_launch_list" variant="secondary">
            Join the Launch List
          </Button>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </div>
  );
}
