"use client";

import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import {
  getBookAverageRating,
  getBookLaunchWindow,
  getBookPrimaryCtaHref,
  getBookPrimaryCtaLabel,
  getBookStatus,
  hasRealAmazonAsin,
  hasRealReviews,
  shouldShowBookPrice
} from "@/lib/storefront";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/StarRating";
import { BookStatusBadge } from "./BookStatusBadge";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const status = getBookStatus(book);
  const averageRating = getBookAverageRating(book);
  const launchWindow = getBookLaunchWindow(book);
  const primaryHref = getBookPrimaryCtaHref(book);
  const primaryLabel =
    status === "available" && !book.purchase_url && hasRealAmazonAsin(book) ? "Buy on Amazon" : getBookPrimaryCtaLabel(book);
  const cardImage = book.cover_image ?? "/images/covers/ritual-placeholder.jpg";
  const isDraftCover = book.cover_status === "draft" || cardImage.endsWith(".svg");
  const metadata = [book.audience ?? book.age_range, book.lane].filter(Boolean).join(" · ");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <Link href={`/shop/${book.slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[radial-gradient(circle_at_24%_20%,rgba(240,90,40,0.12),transparent_34%),linear-gradient(145deg,#FAFAF8,#F5F3F0)] p-5">
          <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap gap-2">
            {book.is_flagship ? <Badge className="border-[#d6ad63] bg-[#fff7e7] text-text">Flagship</Badge> : null}
            <BookStatusBadge book={book} />
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-border bg-card shadow-[0_18px_44px_rgba(26,26,26,0.08)] transition-transform duration-300 group-hover:scale-[1.015]">
            <Image
              src={cardImage}
              alt={`${book.title} cover preview`}
              fill
              className={cn("object-contain", isDraftCover ? "p-3" : "p-2")}
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">{metadata}</p>
          <h3 className="font-heading text-2xl leading-tight text-text">{book.title}</h3>
          <p className="text-sm leading-6 text-text-muted">{book.subtitle}</p>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-text-muted">{book.description}</p>

        <div className="mt-auto space-y-4">
          <div className="rounded-[20px] border border-border bg-surface-alt px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-text-light">Launch status</p>
            <p className="mt-1 text-sm font-medium text-text">{launchWindow ?? "Updates open through the launch list"}</p>
            {book.has_ritual_bundle ? <p className="mt-1 text-xs text-text-muted">Companion ritual planned</p> : null}
          </div>

          {averageRating && hasRealReviews(book) ? <StarRating rating={averageRating} count={book.amazon_reviews.length} /> : null}

          {shouldShowBookPrice(book) && typeof book.price === "number" ? (
            <p className="text-lg font-semibold text-text">${book.price.toFixed(2)}</p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={primaryHref}
              className="w-full sm:w-auto"
              onClick={() =>
                trackEvent(status === "available" ? "purchase_click" : "launch_interest_click", {
                  sku: book.sku,
                  slug: book.slug,
                  status,
                  source: "book_card"
                })
              }
            >
              {primaryLabel}
            </Button>
            <Link href={`/shop/${book.slug}`} className="text-sm font-medium text-text underline decoration-cta underline-offset-4">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
