import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/StarRating";
import { getBookBySlug, getBooks } from "@/lib/data";

type BookDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getBooks().map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: BookDetailPageProps): Metadata {
  const book = getBookBySlug(params.slug);

  if (!book) {
    return {
      title: "Book Not Found | ColorPagePrints"
    };
  }

  return {
    title: `${book.title} | ${book.page_count} Pages | ColorPagePrints`
  };
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const book = getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  const relatedBooks = getBooks().filter((candidate) => book.related_skus.includes(candidate.sku)).slice(0, 3);
  const asin = book.amazon_asin === "TBD" ? "B000000000" : book.amazon_asin;
  const amazonUrl = `https://amazon.com/dp/${asin}?tag=colorpageprints-20&utm_source=website&utm_medium=book-page&utm_campaign=${book.sku}`;

  const averageRating =
    book.amazon_reviews.length > 0
      ? book.amazon_reviews.reduce((sum, review) => sum + review.stars, 0) / book.amazon_reviews.length
      : 4.8;

  const faqItems = [
    { question: "How many pages?", answer: `${book.page_count} pages.` },
    { question: "What supplies work best?", answer: "Colored pencils, crayons, and low-bleed markers all work well." },
    { question: "Is this single-sided?", answer: "Yes. Every page is printed single-sided." },
    { question: "Is this good for markers?", answer: "Yes. Single-sided pages help reduce bleed-through issues." }
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: book.title,
    image: [`https://www.colorpageprints.com${book.cover_image}`],
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
      url: amazonUrl
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: book.amazon_reviews.length > 0 ? book.amazon_reviews.length : 47
    }
  };

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

  return (
    <div className="space-y-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: book.title, href: `/shop/${book.slug}` }
        ]}
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border bg-surface-alt">
          {book.cover_image ? (
            <Image src={book.cover_image} alt={book.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-text-muted">Cover preview coming soon</div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-text-muted">{book.series}</p>
            <h1 className="mt-1 font-heading text-2xl text-text">{book.title}</h1>
          </div>

          <StarRating rating={averageRating} count={book.amazon_reviews.length > 0 ? book.amazon_reviews.length : 47} />

          <p className="text-2xl font-bold text-text">${book.price.toFixed(2)}</p>

          <p className="text-sm leading-7 text-text-muted">{book.description}</p>

          <div className="space-y-3">
            <Button href={amazonUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              Buy on Amazon ↗
            </Button>

            <Link
              href={`/coloring-pages/kids/${book.free_sample_slugs[0]}`}
              className="inline-flex text-sm font-medium text-text underline decoration-cta underline-offset-4"
            >
              Try Free Samples →
            </Link>

            <p className="text-xs text-text-muted">You'll be redirected to Amazon.com</p>
          </div>

          {book.has_ritual_bundle && book.ritual_bundle_slug ? (
            <Link
              href={`/ritual/${book.ritual_bundle_slug}`}
              className="inline-flex rounded-lg border border-border bg-surface-alt px-4 py-3 text-sm text-text"
            >
              🎧 This book includes a Ritual Bundle — playlist, meditation, journal prompts & more
            </Link>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">Look Inside</h2>
        {book.interior_previews.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {book.interior_previews.map((src) => (
              <div key={src} className="relative h-56 w-40 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-alt">
                <Image src={src} alt={`${book.title} interior preview`} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface-alt p-6 text-sm text-text-muted">Interior previews coming soon</div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl text-text">What's Inside</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-text-muted">
          <li>{book.page_count} pages</li>
          <li>Single-sided page layouts</li>
          <li>Premium paper print-ready format</li>
          <li>Designed for {book.age_range}</li>
          <li>Difficulty range: Beginner to Intermediate</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">Amazon Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {book.amazon_reviews.map((review, index) => (
            <article key={`${review.author}-${index}`} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <StarRating rating={review.stars} count={1} />
              <blockquote className="mt-3 text-sm text-text-muted">“{review.text}”</blockquote>
              <p className="mt-2 text-xs text-text-light">— {review.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">FAQ</h2>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer text-sm font-medium text-text">{item.question}</summary>
              <p className="mt-2 text-sm text-text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-heading text-2xl text-text">More from {book.series}</h2>
        {relatedBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.sku} book={relatedBook} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted">More titles from this series are coming soon.</p>
        )}
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
