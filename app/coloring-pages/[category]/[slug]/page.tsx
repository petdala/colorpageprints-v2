import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { getBookBySku, getColoringPages } from "@/lib/data";
import { DownloadGate } from "./DownloadGate";

type ColoringPageDetailProps = {
  params: {
    category: string;
    slug: string;
  };
};

export function generateStaticParams() {
  return getColoringPages().map((page) => ({
    category: page.category,
    slug: page.slug
  }));
}

function findColoringPage(category: string, slug: string) {
  return getColoringPages().find((page) => page.category === category && page.slug === slug);
}

export function generateMetadata({ params }: ColoringPageDetailProps): Metadata {
  const page = findColoringPage(params.category, params.slug);

  if (!page) {
    return {
      title: "Free Coloring Page | ColorPagePrints"
    };
  }

  const parentBook = getBookBySku(page.parent_book_sku);

  return {
    title: `${page.title} | Free Printable Coloring Page | ColorPagePrints`,
    description: `Download this free ${page.category} coloring page for ${page.age_range}. Part of ${parentBook?.title ?? "our coloring collection"}. Print at home on standard paper.`
  };
}

export default function ColoringPageDetail({ params }: ColoringPageDetailProps) {
  const page = findColoringPage(params.category, params.slug);

  if (!page) {
    notFound();
  }

  const parentBook = getBookBySku(page.parent_book_sku);
  const relatedPages = getColoringPages()
    .filter((candidate) => page.related_page_slugs.includes(candidate.slug) || candidate.category === page.category)
    .filter((candidate) => candidate.slug !== page.slug)
    .slice(0, 6);

  const parentAsin = parentBook?.amazon_asin === "TBD" ? "B000000000" : parentBook?.amazon_asin;
  const parentBookUrl = parentAsin ? `https://amazon.com/dp/${parentAsin}?tag=colorpageprints-20` : "/shop";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Free Pages", href: "/coloring-pages" },
          { label: page.category.charAt(0).toUpperCase() + page.category.slice(1), href: `/coloring-pages?category=${page.category}` },
          { label: page.title, href: `/coloring-pages/${page.category}/${page.slug}` }
        ]}
      />

      <section className="space-y-5">
        <div className="relative mx-auto aspect-square w-full max-w-[600px] overflow-hidden rounded-xl bg-surface-alt shadow-sm">
          <Image src={page.preview_image} alt={page.alt_text} fill className="object-cover" />
        </div>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
          <h1 className="mr-auto font-heading text-xl text-text">{page.title}</h1>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">{page.difficulty}</span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">{page.age_range}</span>
          {parentBook ? (
            <Link href={`/shop/${parentBook.slug}`} className="text-sm text-text underline decoration-cta underline-offset-4">
              From: {parentBook.title}
            </Link>
          ) : null}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl text-text">Download This Page</h2>
        <DownloadGate slug={page.slug} pdfDownloadUrl={page.pdf_download_url} />
      </section>

      {parentBook ? (
        <section className="rounded-lg bg-surface-alt p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-md bg-card">
              <Image src={parentBook.cover_image} alt={parentBook.title} fill className="object-cover" />
            </div>
            <div className="space-y-2">
              <p className="font-heading text-xl text-text">This page is from {parentBook.title}</p>
              <Button href={parentBookUrl}>Get the full {parentBook.page_count}-page book →</Button>
            </div>
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">Related Pages</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {relatedPages.map((related) => (
            <Link key={related.slug} href={`/coloring-pages/${related.category}/${related.slug}`} className="rounded-lg border border-border bg-card p-3 shadow-sm">
              <div className="relative aspect-square overflow-hidden rounded-md bg-surface-alt">
                <Image src={related.preview_image} alt={related.alt_text} fill className="object-cover" />
              </div>
              <p className="mt-2 font-heading text-sm text-text">{related.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl text-text">FAQ</h2>
        <div className="space-y-3">
          {page.faq.map((item) => (
            <details key={item.q} className="rounded-lg border border-border bg-card p-4">
              <summary className="cursor-pointer text-sm font-medium text-text">{item.q}</summary>
              <p className="mt-2 text-sm text-text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  );
}
