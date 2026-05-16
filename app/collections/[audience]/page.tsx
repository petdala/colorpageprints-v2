import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LaunchInterestForm } from "@/components/sections/LaunchInterestForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookCard } from "@/components/ui/BookCard";
import { getBooks, getCollections, getColoringPages, getRituals } from "@/lib/data";

type CollectionAudiencePageProps = {
  params: {
    audience: string;
  };
};

const fallbackCollections = {
  educational: {
    slug: "educational",
    title: "Educational Collection",
    description: "Skill-building coloring books and printable learning pages.",
    audience: "educational",
    book_skus: [] as string[],
    hero_image: "/images/heroes/educational-collection.jpg"
  },
  seasonal: {
    slug: "seasonal",
    title: "Seasonal Collection",
    description: "Holiday and seasonal coloring experiences for all ages.",
    audience: "seasonal",
    book_skus: [] as string[],
    hero_image: "/images/heroes/seasonal-collection.jpg"
  }
};

const ritualCoverImages = {
  "mushroom-cottagecore": "/images/covers/cpp-mc-001.png",
  "stained-glass": "/images/covers/cpp-sg-001.png",
  "cats-cozy-scenes": "/images/covers/cpp-cc-001.png"
};

export function generateStaticParams() {
  const dataSlugs = getCollections().map((collection) => collection.audience);
  const requiredSlugs = ["kids", "adults", "educational", "seasonal"];

  return Array.from(new Set([...dataSlugs, ...requiredSlugs])).map((audience) => ({ audience }));
}

function findCollection(audience: string) {
  return (
    getCollections().find(
      (collection) => collection.audience.toLowerCase() === audience.toLowerCase() || collection.slug.toLowerCase() === audience.toLowerCase()
    ) ?? fallbackCollections[audience as keyof typeof fallbackCollections]
  );
}

export function generateMetadata({ params }: CollectionAudiencePageProps): Metadata {
  const collection = findCollection(params.audience);

  if (!collection) {
    return {
      title: "Collection"
    };
  }

  return {
    title: `${collection.title}`
  };
}

export default function CollectionAudiencePage({ params }: CollectionAudiencePageProps) {
  const collection = findCollection(params.audience);

  if (!collection) {
    notFound();
  }

  const books = getBooks().filter((book) => collection.book_skus.includes(book.sku));
  const samplePages = getColoringPages().filter((page) => collection.book_skus.includes(page.parent_book_sku));

  const adultRitualEntries =
    collection.slug === "adults"
      ? (() => {
          const rituals = getRituals();
          const primary = rituals[0];
          const allSlugs = primary ? [primary.slug, ...primary.related_ritual_slugs] : [];

          return allSlugs.slice(0, 4).map((slug) => {
            const matchedBook = getBooks().find((book) => book.ritual_bundle_slug === slug);

            return {
              slug,
              title:
                matchedBook?.title ??
                slug
                  .split("-")
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(" "),
              href: `/ritual/${slug}`,
              coverImage: matchedBook?.cover_image ?? ritualCoverImages[slug as keyof typeof ritualCoverImages] ?? "/images/covers/ritual-placeholder.jpg"
            };
          });
        })()
      : [];

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
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
    <div className="space-y-12">
      <section className="space-y-4 rounded-[32px] bg-surface-alt p-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: collection.title, href: `/collections/${collection.audience}` }
          ]}
        />
        <h1 className="font-heading text-3xl text-text">{collection.title}</h1>
        <p className="max-w-3xl text-lg text-text-muted">{collection.description}</p>
        <div className="relative h-48 overflow-hidden rounded-xl bg-card md:h-64">
          <Image src={collection.hero_image} alt={collection.title} fill className="object-cover" />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-heading text-2xl text-text">Books in this collection</h2>
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.sku} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted">Books for this collection are coming soon.</p>
        )}
      </section>

      <section className="space-y-5">
        <h2 className="font-heading text-2xl text-text">Try free pages from this collection</h2>
        {samplePages.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {samplePages.map((page) => (
              <Link
                key={page.slug}
                href={`/coloring-pages/${page.category}/${page.slug}`}
                className="rounded-lg border border-border bg-card p-3 shadow-sm"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-surface-alt">
                  <Image src={page.preview_image} alt={page.alt_text} fill className="object-cover" />
                </div>
                <p className="mt-2 font-heading text-sm text-text">{page.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted">Free pages for this collection are coming soon.</p>
        )}
      </section>

      {collection.slug === "adults" ? (
        <section className="space-y-5 rounded-2xl border border-border bg-surface-alt p-6">
          <div className="space-y-2">
            <h2 className="font-heading text-3xl text-text">Follow the adult reset lane</h2>
            <p className="text-sm text-text-muted">Sampler requests, ritual bundles, and slower flagship launches all live here first.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {adultRitualEntries.map((entry) => (
              <Link key={entry.slug} href={entry.href} className="rounded-lg border border-border bg-card p-3 shadow-sm">
                <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-surface-alt">
                  <Image src={entry.coverImage} alt={entry.title} fill className="object-cover" />
                </div>
                <p className="mt-2 text-xs">🎧 Companion ritual</p>
                <p className="font-heading text-sm text-text">{entry.title}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <LaunchInterestForm
        heading={collection.slug === "adults" ? "Follow the adult reset launch shelf" : "Save this collection for later"}
        subtext={
          collection.slug === "adults"
            ? "Start with Colors of Calm, then get reminders when the next adult reset collection moves forward."
            : "Use the launch list to follow the next sampler, reminder, or release update for this collection."
        }
        buttonText={collection.slug === "adults" ? "Save My Launch Reminder" : "Save This Collection"}
        tag={`collection-${collection.slug}`}
        interestSlug={collection.slug === "adults" ? "colors-of-calm" : undefined}
        interestType="global_launch_list"
        showThemePreference
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </div>
  );
}
