import type { Metadata } from "next";
import Link from "next/link";
import { LaunchInterestForm } from "@/components/sections/LaunchInterestForm";
import { Badge } from "@/components/ui/badge";
import { getBookBySlug, getLaunchShelfBooks } from "@/lib/data";
import { getBookStatusLabel } from "@/lib/storefront";
import type { InterestType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Launch List",
  description: "Join the ColorPagePrints launch list for flagship samplers, preview drops, and upcoming book reminders."
};

type LaunchListPageProps = {
  searchParams: {
    interest?: string;
    type?: string;
  };
};

const interestHeadings: Record<InterestType, string> = {
  global_launch_list: "Join the ColorPagePrints Launch List",
  sampler_request: "Get the Colors of Calm Sampler",
  book_interest: "Save This Book for Later",
  preorder_reminder: "Get a Preorder Reminder",
  theme_vote: "Vote for This Idea",
  audio_preview_interest: "Follow the Audio Preview"
};

export default function LaunchListPage({ searchParams }: LaunchListPageProps) {
  const interestType = (searchParams.type as InterestType | undefined) ?? "global_launch_list";
  const selectedBook = searchParams.interest ? getBookBySlug(searchParams.interest) : undefined;
  const fallbackBooks = getLaunchShelfBooks().slice(0, 3);
  const heading = interestHeadings[interestType] ?? interestHeadings.global_launch_list;
  const subtext = selectedBook
    ? `${selectedBook.title} is currently marked ${getBookStatusLabel(selectedBook).toLowerCase()}. Save your spot here and we’ll use it for the right next update.`
    : "Use the launch list for sampler requests, upcoming book reminders, and the next honest release step from ColorPagePrints.";

  return (
    <div className="space-y-12">
      <section className="space-y-4 rounded-[32px] border border-border bg-surface-alt p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Launch List</p>
        <h1 className="font-heading text-4xl text-text">{heading}</h1>
        <p className="max-w-3xl text-sm leading-7 text-text-muted">{subtext}</p>
        {selectedBook ? (
          <div className="flex flex-wrap gap-2">
            <Badge>{selectedBook.title}</Badge>
            <Badge>{getBookStatusLabel(selectedBook)}</Badge>
          </div>
        ) : null}
      </section>

      <LaunchInterestForm
        heading={heading}
        subtext={selectedBook ? `Tell us where to send the next ${selectedBook.title} update.` : "Tell us where to send the next sampler or reminder."}
        buttonText={interestType === "sampler_request" ? "Send My Free Sampler" : "Save My Reminder"}
        tag={`launch-list-${interestType}`}
        interestSlug={selectedBook?.slug}
        interestType={interestType}
        showThemePreference
        showRequestField
      />

      <section className="space-y-5">
        <h2 className="font-heading text-3xl text-text">While you wait</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {fallbackBooks.map((book) => (
            <Link key={book.sku} href={`/shop/${book.slug}`} className="rounded-[24px] border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5">
              <p className="text-xs uppercase tracking-[0.18em] text-text-light">{getBookStatusLabel(book)}</p>
              <h3 className="mt-3 font-heading text-2xl text-text">{book.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">{book.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
