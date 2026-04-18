import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getBooks } from "@/lib/data";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop Coloring Books | Kids & Adults"
};

export default function ShopPage() {
  const books = getBooks();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ColorPagePrints Shop",
    description: "Premium coloring books for every age and interest.",
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
    <div className="space-y-8">
      <header className="space-y-3">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }]} />
        <h1 className="font-heading text-3xl text-text">Our Books</h1>
        <p className="text-lg text-text-muted">Premium coloring books for every age and interest.</p>
        <div className="relative h-56 overflow-hidden rounded-2xl bg-surface-alt md:h-72">
          <Image src="/images/heroes/shop-hero.png" alt="A curated still life of coloring books, pencils, and cozy studio details." fill priority className="object-cover" />
        </div>
      </header>

      <ShopPageClient books={books} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </div>
  );
}
