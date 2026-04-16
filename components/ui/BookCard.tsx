import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/StarRating";
import type { Book } from "@/lib/types";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const asin = book.amazon_asin === "TBD" ? "B000000000" : book.amazon_asin;
  const amazonUrl = `https://amazon.com/dp/${asin}?tag=colorpageprints-20`;
  const ratingValue =
    book.amazon_reviews.length > 0
      ? book.amazon_reviews.reduce((sum, review) => sum + review.stars, 0) / book.amazon_reviews.length
      : 0;
  const ratingCount = book.amazon_reviews.length > 0 ? book.amazon_reviews.length : 47;

  return (
    <article className="overflow-hidden rounded-lg bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[2/3] w-full bg-surface-alt">
        <Image src={book.cover_image} alt={book.title} fill className="rounded-t-lg object-cover" />
      </div>

      <div className="space-y-3 p-4">
        {book.has_ritual_bundle ? (
          <p className="w-fit rounded-full border border-border bg-surface-alt px-2.5 py-1 text-xs text-text">
            🎧 Includes Ritual Bundle
          </p>
        ) : null}

        <h3 className="line-clamp-1 font-heading text-base text-text">{book.title}</h3>
        <p className="text-xs uppercase tracking-wide text-text-muted">{book.series}</p>

        <StarRating rating={ratingValue} count={ratingCount} />

        <p className="text-lg font-bold text-text">${book.price.toFixed(2)}</p>

        <Button href={amazonUrl} target="_blank" rel="noreferrer" className="w-full">
          Buy on Amazon ↗
        </Button>

        <Link href={`/coloring-pages/kids/${book.free_sample_slugs[0]}`} className="inline-block text-sm text-text underline">
          Try Free Samples →
        </Link>

        <p className="text-xs text-text-muted">You'll be redirected to Amazon.com</p>
      </div>
    </article>
  );
}
