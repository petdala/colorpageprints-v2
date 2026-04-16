import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBookBySku, getBooks, getRitualBySlug, getRituals } from "@/lib/data";
import { RitualBundleClient } from "./RitualBundleClient";

type RitualDetailProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getRituals().map((ritual) => ({ slug: ritual.slug }));
}

export function generateMetadata({ params }: RitualDetailProps): Metadata {
  const ritual = getRitualBySlug(params.slug);
  const book = ritual ? getBookBySku(ritual.book_sku) : null;

  if (!ritual || !book) {
    return {
      title: "Ritual Bundle"
    };
  }

  return {
    title: `${ritual.bundle_name} Ritual Bundle | ${book.title}`,
    description: `Access your coloring ritual: curated playlist, guided meditation, journal prompts, and color palettes for ${book.title}.`
  };
}

export default function RitualDetailPage({ params }: RitualDetailProps) {
  const ritual = getRitualBySlug(params.slug);

  if (!ritual) {
    notFound();
  }

  const book = getBookBySku(ritual.book_sku);

  if (!book) {
    notFound();
  }

  const relatedBooks = ritual.related_ritual_slugs
    .map((slug) => {
      const relatedRitual = getRitualBySlug(slug);
      return relatedRitual ? getBookBySku(relatedRitual.book_sku) : null;
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate));

  const fallbackBooks = getBooks()
    .filter((candidate) => candidate.has_ritual_bundle && candidate.sku !== book.sku)
    .slice(0, 3 - relatedBooks.length);

  const mergedRelatedBooks = [...relatedBooks, ...fallbackBooks].slice(0, 3);

  return <RitualBundleClient ritual={ritual} book={book} relatedBooks={mergedRelatedBooks} />;
}
