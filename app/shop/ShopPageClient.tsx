"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { LaunchInterestForm } from "@/components/sections/LaunchInterestForm";
import { BookStatusBadge } from "@/components/ui/BookStatusBadge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/button";
import { getBookPrimaryCtaHref, getBookPrimaryCtaLabel, getBookStatus } from "@/lib/storefront";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

const audienceFilters = ["All", "Adult Reset", "Kids & Family", "Flagship"] as const;
const statusFilters = ["All", "Sampler", "In Production", "Collecting Interest", "Coming Soon", "Available"] as const;

type AudienceFilter = (typeof audienceFilters)[number];
type StatusFilter = (typeof statusFilters)[number];

type ShopPageClientProps = {
  books: Book[];
  flagshipBook: Book | null;
};

function matchesAudience(book: Book, filter: AudienceFilter) {
  const lane = `${book.lane} ${book.audience ?? ""} ${book.age_range}`.toLowerCase();

  switch (filter) {
    case "Adult Reset":
      return lane.includes("adult") || lane.includes("reset");
    case "Kids & Family":
      return lane.includes("kids") || lane.includes("family") || lane.includes("ages");
    case "Flagship":
      return Boolean(book.is_flagship);
    default:
      return true;
  }
}

function matchesStatus(book: Book, filter: StatusFilter) {
  const status = getBookStatus(book);

  switch (filter) {
    case "Sampler":
      return status === "sampler_available";
    case "In Production":
      return status === "in_production";
    case "Collecting Interest":
      return status === "collecting_interest" || status === "idea";
    case "Coming Soon":
      return ["idea", "collecting_interest", "in_production", "launch_list_open", "preorder_soon", "sampler_available"].includes(status);
    case "Available":
      return status === "available";
    default:
      return true;
  }
}

export function ShopPageClient({ books, flagshipBook }: ShopPageClientProps) {
  const [audienceFilter, setAudienceFilter] = useState<AudienceFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const filteredBooks = useMemo(
    () =>
      books
        .filter((book) => matchesAudience(book, audienceFilter) && matchesStatus(book, statusFilter))
        .filter((book) => (audienceFilter === "All" && statusFilter === "All" ? !book.is_flagship : true)),
    [audienceFilter, books, statusFilter]
  );

  const hasActiveFilters = audienceFilter !== "All" || statusFilter !== "All";
  const flagshipVisual = flagshipBook?.cover_image ?? "/images/covers/colors-of-calm-temp.png";

  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }]} />
        <div className="grid gap-8 overflow-hidden rounded-[36px] border border-border bg-[linear-gradient(135deg,#FAFAF8_0%,#F5F3F0_58%,#fff7ef_100%)] p-6 md:p-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted">The Launch Shelf</p>
            <h1 className="font-heading text-[40px] leading-tight text-text md:text-[64px]">Start with calm. Save what comes next.</h1>
            <p className="max-w-2xl text-lg leading-8 text-text-muted">
              Preview Colors of Calm, follow upcoming coloring books, and save reminders for the ideas you want most.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/launch-list?interest=colors-of-calm&type=sampler_request">Get the Colors of Calm Sampler</Button>
              <Button href="#pipeline-shelf" variant="secondary">
                Browse Pipeline Books
              </Button>
            </div>
            <p className="text-sm text-text-light">Flagship sampler · launch reminders · future collection votes</p>
          </div>

          <div className="relative min-h-[430px] rounded-[32px] border border-border bg-card p-5 shadow-sm">
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-cta/15" />
            <div className="absolute bottom-12 left-8 h-32 w-32 rounded-full bg-[#9cad87]/20" />
            <div className="relative mx-auto flex h-full max-w-[360px] items-center justify-center py-8">
              <div className="absolute left-0 top-20 h-64 w-40 rotate-[-8deg] rounded-[24px] border border-border bg-surface-alt shadow-sm" />
              <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_28px_70px_rgba(26,26,26,0.14)]">
                <Image src={flagshipVisual} alt="Colors of Calm sampler preview" fill priority className="object-contain p-3" />
              </div>
              <div className="absolute bottom-7 right-0 rounded-[22px] border border-border bg-background/95 p-4 shadow-sm backdrop-blur">
                {flagshipBook ? <BookStatusBadge book={flagshipBook} /> : null}
                <p className="mt-2 text-sm font-medium text-text">50 mandalas + companion audio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {flagshipBook ? (
        <section className="grid gap-8 rounded-[34px] border border-border bg-card p-6 shadow-sm md:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] border border-border bg-surface-alt p-4">
            <Image src={flagshipVisual} alt="Colors of Calm flagship sampler cover preview." fill className="object-contain p-4" />
          </div>

          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Featured Flagship</p>
            <div className="space-y-2">
              <h2 className="font-heading text-4xl text-text">Colors of Calm</h2>
              <p className="text-lg text-text-muted">50 mindful mandalas + companion audio</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="border-[#d6ad63] bg-[#fff7e7] text-text">Flagship Collection</Badge>
              <BookStatusBadge book={flagshipBook} />
              <Badge className="border-[#9cad87] bg-[#edf5e7] text-text">Companion Audio</Badge>
              <Badge>Adult Reset</Badge>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-text-muted">
              A five-phase adult reset experience designed to help you arrive, steady, deepen, release, and return.
            </p>
            <div className="grid gap-3 text-sm text-text-muted sm:grid-cols-3">
              <div className="rounded-[20px] border border-border bg-surface-alt p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-light">Status</p>
                <p className="mt-1 font-medium text-text">Sampler Available</p>
              </div>
              <div className="rounded-[20px] border border-border bg-surface-alt p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-light">Launch</p>
                <p className="mt-1 font-medium text-text">{flagshipBook.launch_window ?? "Coming soon"}</p>
              </div>
              <div className="rounded-[20px] border border-border bg-surface-alt p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-text-light">Focus</p>
                <p className="mt-1 font-medium text-text">Adult reset</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={getBookPrimaryCtaHref(flagshipBook)}>{getBookPrimaryCtaLabel(flagshipBook)}</Button>
              <Button href="/colors-of-calm" variant="secondary">
                View Collection
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section id="pipeline-shelf" className="space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-heading text-3xl text-text">Books in the pipeline</h2>
            <p className="text-sm leading-7 text-text-muted">
              These collections are being researched, designed, and tested. Save the ones you want most, and you’ll get a reminder when samples, launch updates, or confirmed preorder details open.
            </p>
          </div>
          <p className="text-sm text-text-light">{filteredBooks.length} shown</p>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
            <div className="flex flex-wrap gap-2">
              {audienceFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setAudienceFilter(filter)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition",
                    audienceFilter === filter ? "border-text bg-text text-background" : "border-border bg-background text-text-muted hover:border-text"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition",
                    statusFilter === filter ? "border-cta bg-cta text-white" : "border-border bg-background text-text-muted hover:border-cta"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
            {hasActiveFilters ? (
              <button type="button" onClick={() => { setAudienceFilter("All"); setStatusFilter("All"); }} className="text-sm font-medium text-text underline decoration-cta underline-offset-4">
                Clear
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.sku} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 ? <p className="text-sm text-text-muted">No launch-shelf books match this filter yet.</p> : null}
      </section>

      <section className="rounded-[32px] border border-border bg-surface-alt p-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-heading text-3xl text-text">How launch interest works</h2>
          <p className="text-sm leading-7 text-text-muted">Save a book once, then follow the next clear step when it is ready.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["1. Save the idea", "Tell us which themes you want most."],
            ["2. Get previews", "When a sampler or preview is ready, you’ll be first to see it."],
            ["3. Launch reminder", "When the book goes live, you’ll get a reminder with the launch link."],
            ["4. Optional preorder", "If preorders open, you’ll only see that option when the release plan is confirmed."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-2xl text-text">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-3xl text-text">Current actions</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-2xl text-text">Get the Colors of Calm sampler</h3>
            <p className="mt-3 text-sm leading-6 text-text-muted">Start with the flagship adult reset collection and join the earliest preview flow.</p>
            <div className="mt-5">
              <Button href="/launch-list?interest=colors-of-calm&type=sampler_request">Send My Free Sampler</Button>
            </div>
          </article>

          <article className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-2xl text-text">Save a pipeline book</h3>
            <p className="mt-3 text-sm leading-6 text-text-muted">Browse current concepts and save the titles you want reminders for.</p>
            <div className="mt-5">
              <Button href="#pipeline-shelf" variant="secondary">
                Browse Pipeline
              </Button>
            </div>
          </article>

          <article className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
            <h3 className="font-heading text-2xl text-text">Explore free printable pages</h3>
            <p className="mt-3 text-sm leading-6 text-text-muted">Use the free library for lighter discovery and quick printable moments.</p>
            <div className="mt-5">
              <Button href="/coloring-pages" variant="secondary">
                Visit Free Library
              </Button>
            </div>
          </article>
        </div>
      </section>

      <section className="rounded-[28px] border border-border bg-card p-8">
        <h2 className="font-heading text-3xl text-text">A clear launch promise</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-text-muted">
          Some books are still in development. We’ll only show preorder options when a release plan is confirmed. Until then, you can save reminders, get samples, and help shape what launches next.
        </p>
      </section>

      <LaunchInterestForm
        heading="Start with the sampler"
        subtext="Try Colors of Calm first, then save the future books you want most."
        buttonText="Get the Free Sampler"
        tag="shop-final-cta"
        interestSlug="colors-of-calm"
        interestType="sampler_request"
        showThemePreference
      />
    </div>
  );
}
