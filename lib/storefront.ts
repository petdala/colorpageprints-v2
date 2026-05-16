import type { Book, BookStatus, InterestType } from "@/lib/types";

const AMAZON_ASIN_REGEX = /^[A-Z0-9]{10}$/;

export const BOOK_STATUS_LABELS: Record<BookStatus, string> = {
  idea: "Idea Stage",
  collecting_interest: "Collecting Interest",
  in_production: "In Production",
  sampler_available: "Sampler Available",
  launch_list_open: "Launch List Open",
  preorder_soon: "Preorder Opens Soon",
  preorder_open: "Preorder Open",
  available: "Available Now"
};

export const BOOK_STATUS_CTA_LABELS: Record<BookStatus, string> = {
  idea: "Vote for This Idea",
  collecting_interest: "I Want This Book",
  in_production: "Save for Launch Reminder",
  sampler_available: "Get the Free Sampler",
  launch_list_open: "Join the Launch List",
  preorder_soon: "Remind Me When Preorders Open",
  preorder_open: "Preorder",
  available: "Buy Now"
};

export function hasRealAmazonAsin(book: Book): boolean {
  if (!book.amazon_asin) {
    return false;
  }

  return book.amazon_asin !== "TBD" && AMAZON_ASIN_REGEX.test(book.amazon_asin);
}

export function getAmazonPurchaseUrl(book: Book): string | null {
  if (!hasRealAmazonAsin(book)) {
    return null;
  }

  return `https://amazon.com/dp/${book.amazon_asin}?tag=colorpageprints-20`;
}

export function getBookPurchaseUrl(book: Book): string | null {
  return book.purchase_url ?? getAmazonPurchaseUrl(book);
}

export function getBookStatus(book: Book): BookStatus {
  if (book.status) {
    return book.status;
  }

  if (book.preorder_url) {
    return "preorder_open";
  }

  if (getBookPurchaseUrl(book)) {
    return "available";
  }

  if (book.sampler_url || book.free_sample_slugs.length > 0) {
    return "sampler_available";
  }

  if (book.launch_list_url) {
    return "launch_list_open";
  }

  return "collecting_interest";
}

export function getBookStatusLabel(book: Book | BookStatus): string {
  const status = typeof book === "string" ? book : getBookStatus(book);
  return BOOK_STATUS_LABELS[status];
}

export function buildLaunchListUrl(book: Book, interestType: InterestType): string {
  const params = new URLSearchParams({
    interest: book.slug,
    type: interestType
  });

  return `/launch-list?${params.toString()}`;
}

export function getBookPrimaryCtaLabel(book: Book): string {
  return book.interest_cta_label ?? BOOK_STATUS_CTA_LABELS[getBookStatus(book)];
}

export function getBookPrimaryCtaHref(book: Book): string {
  const status = getBookStatus(book);

  switch (status) {
    case "idea":
      return book.launch_list_url ?? buildLaunchListUrl(book, "theme_vote");
    case "collecting_interest":
      return book.launch_list_url ?? buildLaunchListUrl(book, "book_interest");
    case "in_production":
      return book.launch_list_url ?? buildLaunchListUrl(book, "book_interest");
    case "sampler_available":
      return book.sampler_url ?? buildLaunchListUrl(book, "sampler_request");
    case "launch_list_open":
      return book.launch_list_url ?? buildLaunchListUrl(book, "global_launch_list");
    case "preorder_soon":
      return book.launch_list_url ?? buildLaunchListUrl(book, "preorder_reminder");
    case "preorder_open":
      return book.preorder_url ?? buildLaunchListUrl(book, "preorder_reminder");
    case "available":
      return getBookPurchaseUrl(book) ?? book.launch_list_url ?? buildLaunchListUrl(book, "book_interest");
    default:
      return buildLaunchListUrl(book, "book_interest");
  }
}

export function shouldShowBookPrice(book: Book): boolean {
  if (typeof book.price !== "number") {
    return false;
  }

  if (typeof book.show_price === "boolean") {
    return book.show_price;
  }

  return getBookStatus(book) === "available";
}

export function getBookAverageRating(book: Book): number | null {
  if (book.amazon_reviews.length === 0) {
    return null;
  }

  return book.amazon_reviews.reduce((sum, review) => sum + review.stars, 0) / book.amazon_reviews.length;
}

export function getBookLaunchWindow(book: Book): string | null {
  return book.confirmed_release_date ?? book.launch_window ?? null;
}

export function hasRealReviews(book: Book): boolean {
  return book.amazon_reviews.length > 0;
}

export function getBookStageDescription(book: Book): string {
  if (book.pipeline_stage_description) {
    return book.pipeline_stage_description;
  }

  const status = getBookStatus(book);

  switch (status) {
    case "idea":
      return "This concept is still early. Save it if you want to help decide what gets developed next.";
    case "collecting_interest":
      return "This concept is being shaped now. Save it if you want to be notified when previews open.";
    case "in_production":
      return "Artwork, format, and launch details are being refined. Final cover, contents, and release timing may change.";
    case "sampler_available":
      return "A sampler or preview request is open now, and the full release is still being staged.";
    case "launch_list_open":
      return "The launch list is open now. Join if you want the first update when the next release step is ready.";
    case "preorder_soon":
      return "Preorders are not open yet. Save a reminder and we’ll let you know when the release plan is confirmed.";
    case "preorder_open":
      return "Preorders are open with a confirmed release plan. Check the release details before placing an order.";
    case "available":
      return "This collection is live now with a real purchase path.";
    default:
      return "Launch details are still being finalized.";
  }
}
