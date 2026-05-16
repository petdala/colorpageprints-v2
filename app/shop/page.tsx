import type { Metadata } from "next";
import { getFlagshipBook, getLaunchShelfBooks } from "@/lib/data";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: {
    absolute: "Shop ColorPagePrints | Launch Shelf & Upcoming Coloring Books"
  },
  description:
    "Preview Colors of Calm, save future coloring book ideas, and get launch reminders for upcoming ColorPagePrints collections."
};

export default function ShopPage() {
  const books = getLaunchShelfBooks();
  const flagshipBook = getFlagshipBook() ?? null;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ColorPagePrints Launch Shelf",
    description: "Preview Colors of Calm, save future coloring book ideas, and get launch reminders for upcoming ColorPagePrints collections.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: books.map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: book.title,
        url: `https://www.colorpageprints.com/shop/${book.slug}`
      }))
    }
  };

  return (
    <>
      <ShopPageClient books={books} flagshipBook={flagshipBook} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </>
  );
}
