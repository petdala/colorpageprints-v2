import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LaunchInterestForm } from "@/components/sections/LaunchInterestForm";
import { BookStatusBadge } from "@/components/ui/BookStatusBadge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookCard } from "@/components/ui/BookCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getBookAverageRating,
  getBookLaunchWindow,
  getBookPrimaryCtaHref,
  getBookPrimaryCtaLabel,
  getBookPurchaseUrl,
  getBookStageDescription,
  getBookStatus,
  getBookStatusLabel,
  hasRealAmazonAsin,
  hasRealReviews,
  shouldShowBookPrice
} from "@/lib/storefront";
import { getBookBySlug, getColoringPageBySlug, getLaunchShelfBooks } from "@/lib/data";
import { cn } from "@/lib/utils";

const guidedPhases = [
  {
    title: "Arrive",
    body: "Settle in with simpler shapes and a softer starting pace."
  },
  {
    title: "Steady",
    body: "Build rhythm and focus without turning the session into busy output."
  },
  {
    title: "Deepen",
    body: "Stay with the page long enough for color and attention to hold together."
  },
  {
    title: "Release",
    body: "Use repetition, pattern, and slower choices to let pressure fall away."
  },
  {
    title: "Return",
    body: "Leave the page with a calmer reset instead of a jolt back into the day."
  }
];

type BookDetailPageProps = {
  params: {
    slug: string;
  };
};

function getSampleLinks(slugs: string[]) {
  return slugs
    .map((slug) => {
      const page = getColoringPageBySlug(slug);
      return page
        ? {
            href: `/coloring-pages/${page.category}/${page.slug}`,
            label: page.title
          }
        : null;
    })
    .filter((item): item is { href: string; label: string } => Boolean(item));
}

export function generateStaticParams() {
  return getLaunchShelfBooks().map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: BookDetailPageProps): Metadata {
  const book = getBookBySlug(params.slug);

  if (!book) {
    return {
      title: "Book Not Found"
    };
  }

  if (book.is_flagship) {
    return {
      title: {
        absolute: "Colors of Calm | Mindful Mandalas for Adult Reset"
      },
      description: "Get the Colors of Calm sampler and follow the flagship mindful coloring collection from ColorPagePrints."
    };
  }

  return {
    title: `${book.title} | ${getBookStatusLabel(book)}`,
    description: `Follow ${book.title} on the ColorPagePrints launch shelf. ${getBookStageDescription(book)}`
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const book = getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  const status = getBookStatus(book);
  const purchaseUrl = getBookPurchaseUrl(book);
  const primaryCtaHref = getBookPrimaryCtaHref(book);
  const primaryCtaLabel =
    status === "available" && !book.purchase_url && hasRealAmazonAsin(book) ? "Buy on Amazon" : getBookPrimaryCtaLabel(book);
  const launchWindow = getBookLaunchWindow(book);
  const stageDescription = getBookStageDescription(book);
  const averageRating = getBookAverageRating(book);
  const sampleLinks = getSampleLinks(book.free_sample_slugs);
  const relatedBooks = getLaunchShelfBooks()
    .filter((candidate) => candidate.slug !== book.slug)
    .filter((candidate) => book.related_skus.includes(candidate.sku) || candidate.audience === book.audience || candidate.lane === book.lane)
    .slice(0, 3);
  const coverImage = book.cover_image ?? "/images/covers/ritual-placeholder.jpg";
  const isDraftCover = book.cover_status === "draft" || coverImage.endsWith(".svg");
  const statusLabel = getBookStatusLabel(book);

  const faqItems = book.is_flagship
    ? [
        {
          question: "Is Colors of Calm available now?",
          answer: "The sampler is available now. The full collection is coming soon. Join the Launch List for first access."
        },
        {
          question: "Is this for adults?",
          answer: "Yes. Colors of Calm is designed as an adult calm/reset coloring experience."
        },
        {
          question: "Is this therapy?",
          answer: "No. It is a creative coloring experience for calm, focus, and reset. It does not make medical or therapeutic claims."
        },
        {
          question: "Does it include audio?",
          answer: "Colors of Calm is designed with companion audio for the five-phase journey. Audio previews and delivery details are part of the launch rollout."
        }
      ]
    : [
        {
          question: `Is ${book.title} available now?`,
          answer:
            status === "available"
              ? "Yes. This collection has a real purchase path live now."
              : `Not yet. It is currently marked ${statusLabel.toLowerCase()}. Save it if you want a reminder when the next release step is ready.`
        },
        {
          question: "Who is this for?",
          answer: `${book.title} is currently aimed at ${book.age_range.toLowerCase()} and fits the ${book.lane.toLowerCase()} lane.`
        },
        {
          question: "Can the final cover or contents change?",
          answer: status === "available" ? "No major launch-stage changes are expected now." : "Yes. Final title, cover, contents, and release timing may still change while the concept is being shaped."
        },
        {
          question: "How do I follow updates?",
          answer: "Use the reminder form on this page or join the launch list to get the next sampler, reminder, or release update."
        }
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const productSchema =
    status === "available" && purchaseUrl && typeof book.price === "number"
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: book.title,
          image: [`https://www.colorpageprints.com${coverImage}`],
          description: book.description,
          sku: book.sku,
          brand: {
            "@type": "Brand",
            name: "ColorPagePrints"
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: book.price.toFixed(2),
            availability: "https://schema.org/InStock",
            url: purchaseUrl
          },
          ...(averageRating && hasRealReviews(book)
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: averageRating.toFixed(1),
                  reviewCount: book.amazon_reviews.length
                }
              }
            : {})
        }
      : null;

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: book.title, href: `/shop/${book.slug}` }
        ]}
      />

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-border bg-[radial-gradient(circle_at_24%_20%,rgba(240,90,40,0.12),transparent_34%),linear-gradient(145deg,#FAFAF8,#F5F3F0)] p-4">
          <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-border bg-card shadow-[0_24px_64px_rgba(26,26,26,0.12)]">
            <Image src={coverImage} alt={book.title + " cover preview"} fill className={cn("object-contain", isDraftCover ? "p-5" : "p-3")} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {book.is_flagship ? <Badge className="border-[#d6ad63] bg-[#fff7e7] text-text">Flagship Collection</Badge> : null}
            <BookStatusBadge book={book} />
            {book.has_ritual_bundle ? <Badge className="border-[#9cad87] bg-[#edf5e7] text-text">Companion Audio</Badge> : null}
            <Badge>{book.age_range}</Badge>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-text-muted">{book.is_flagship ? "Flagship Collection" : status === "available" ? "Available Now" : "In the Pipeline"}</p>
            <h1 className="font-heading text-4xl text-text md:text-5xl">{book.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-text-muted">
              {book.is_flagship
                ? "50 mindful mandalas and companion audio designed to help you settle, focus, release, and return."
                : book.subtitle || book.description}
            </p>
          </div>

          {launchWindow ? <p className="text-sm text-text-light">Launch window: {launchWindow}</p> : null}
          <p className="text-sm leading-7 text-text-muted">{stageDescription}</p>

          {averageRating && hasRealReviews(book) ? (
            <p className="text-sm text-text-muted">Rated {averageRating.toFixed(1)} from {book.amazon_reviews.length} real reviews.</p>
          ) : null}

          {shouldShowBookPrice(book) && typeof book.price === "number" ? <p className="text-2xl font-semibold text-text">${book.price.toFixed(2)}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={primaryCtaHref}>{primaryCtaLabel}</Button>
            {book.is_flagship ? (
              <Button href="/launch-list?interest=colors-of-calm&type=global_launch_list" variant="secondary">
                Join the Launch List
              </Button>
            ) : (
              <Button href={`/launch-list?interest=${book.slug}&type=book_interest`} variant="secondary">
                Save for Reminder
              </Button>
            )}
            {status === "available" && purchaseUrl ? (
              <Button href={purchaseUrl} variant="secondary">
                {book.purchase_url ? "Buy Now" : "Buy on Amazon"}
              </Button>
            ) : null}
          </div>

          <div className="grid gap-3 rounded-[24px] border border-border bg-card p-4 text-sm text-text-muted sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-text-light">Inside</p>
              <p className="mt-1 font-medium text-text">{typeof book.page_count === "number" ? book.page_count + " pages" : "Contents being shaped"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-text-light">Audience</p>
              <p className="mt-1 font-medium text-text">{book.age_range}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-text-light">Stage</p>
              <p className="mt-1 font-medium text-text">{statusLabel}</p>
            </div>
          </div>

          {sampleLinks.length > 0 ? (
            <div className="space-y-2 rounded-[24px] border border-border bg-surface-alt p-4">
              <p className="text-sm font-medium text-text">Sample pages currently tied to this collection</p>
              <div className="flex flex-wrap gap-2">
                {sampleLinks.map((sample) => (
                  <Link key={sample.href} href={sample.href} className="rounded-full border border-border bg-card px-4 py-2 text-sm text-text">
                    {sample.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {book.is_flagship ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["What’s inside", "50 mindful mandalas and a flagship adult reset rhythm."],
              ["Five guided phases", "Arrive, Steady, Deepen, Release, and Return."],
              ["Companion audio", "Built to pair the visual ritual with a calmer listening layer."],
              ["Launch shelf first", "Sampler requests and reminders open before the full release."]
            ].map(([title, body]) => (
              <article key={title} className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
                <h2 className="font-heading text-2xl text-text">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-text-muted">{body}</p>
              </article>
            ))}
          </section>

          <section className="space-y-5 rounded-[32px] border border-border bg-surface-alt p-8">
            <h2 className="font-heading text-3xl text-text">Five guided phases</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {guidedPhases.map((phase) => (
                <article key={phase.title} className="rounded-[24px] border border-border bg-card p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-text-light">Phase</p>
                  <h3 className="mt-3 font-heading text-2xl text-text">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-muted">{phase.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <article className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
              <h2 className="font-heading text-3xl text-text">Companion audio</h2>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                Colors of Calm is designed with companion audio that follows the same five-phase arc. The listening layer is part of the flagship vision rather than an afterthought.
              </p>
              <p className="mt-4 text-sm leading-7 text-text-muted">
                Audio preview delivery is staged through the launch flow so you only see it when the files and release notes are ready.
              </p>
            </article>

            <LaunchInterestForm
              heading="Sample the experience"
              subtext="Get the Colors of Calm sampler first, then follow the audio previews and launch reminders as they open."
              buttonText="Get the Free Sampler"
              tag="book-detail-flagship"
              interestSlug="colors-of-calm"
              interestType="sampler_request"
              showThemePreference
              showRequestField
            />
          </section>

          <section className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
            <h2 className="font-heading text-3xl text-text">Launch status</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <BookStatusBadge book={book} />
              {launchWindow ? <Badge>{launchWindow}</Badge> : null}
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-text-muted">{stageDescription}</p>
          </section>

          <section className="rounded-[32px] border border-border bg-surface-alt p-8">
            <h2 className="font-heading text-3xl text-text">Made with intention</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-text-muted">
              Colors of Calm sits inside the larger ColorPagePrints umbrella, but it leads with a more deliberate adult reset point of view: research-led, slower, and more immersive than a generic printable catalog.
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-3xl text-text">Why this idea</h2>
              <p className="mt-3 text-sm leading-7 text-text-muted">{book.description}</p>
            </article>

            <article className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-3xl text-text">Current stage</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <BookStatusBadge book={book} />
                {launchWindow ? <Badge>{launchWindow}</Badge> : null}
              </div>
              <p className="mt-4 text-sm leading-7 text-text-muted">{stageDescription}</p>
            </article>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[28px] border border-border bg-surface-alt p-6">
              <h2 className="font-heading text-3xl text-text">What might be inside</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-text-muted">
                {typeof book.page_count === "number" ? <li>{book.page_count} planned pages at the current production stage.</li> : <li>Final page count is still being shaped.</li>}
                <li>Theme direction: {(book.theme_tags ?? []).join(", ") || "To be announced"}.</li>
                <li>Final cover, contents, and release timing may still change.</li>
              </ul>
            </article>

            <article className="rounded-[28px] border border-border bg-surface-alt p-6">
              <h2 className="font-heading text-3xl text-text">Who it’s for</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-text-muted">
                <li>{book.age_range}</li>
                <li>{book.lane}</li>
                {book.audience ? <li>{book.audience}</li> : null}
              </ul>
            </article>
          </section>

          <LaunchInterestForm
            heading="Save for reminder"
            subtext="This concept is being shaped now. Save it if you want to be notified when previews, samplers, or the next launch step opens."
            buttonText={primaryCtaLabel}
            tag={`book-detail-${book.slug}`}
            interestSlug={book.slug}
            interestType={status === "idea" ? "theme_vote" : status === "preorder_soon" ? "preorder_reminder" : "book_interest"}
            showThemePreference
            showRequestField
          />
        </>
      )}

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-text">FAQ</h2>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-xl border border-border bg-card p-4">
              <summary className="cursor-pointer text-sm font-medium text-text">{item.question}</summary>
              <p className="mt-2 text-sm leading-7 text-text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-heading text-3xl text-text">Related pipeline books</h2>
        {relatedBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.sku} book={relatedBook} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted">More launch-shelf books will appear here as the next wave takes shape.</p>
        )}
      </section>

      {productSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} /> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
