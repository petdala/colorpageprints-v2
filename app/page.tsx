import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/ui/BookCard";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { getBlogPosts, getBooks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Premium Coloring Books & Free Printable Pages",
  description:
    "Discover beautifully crafted coloring books for kids and adults. Browse our collections, try free sample pages, and shop on Amazon."
};


const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ColorPagePrints",
  url: "https://www.colorpageprints.com",
  logo: "https://www.colorpageprints.com/images/logo-primary.png",
  sameAs: []
};

export default function HomePage() {
  const featuredBooks = [...getBooks()].sort((a, b) => a.priority - b.priority).slice(0, 6);
  const studioPosts = [...getBlogPosts()]
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="space-y-20 pb-8">
      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-3xl bg-surface-alt p-8 text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="font-heading text-[40px] leading-tight text-text md:text-[56px]">
            Beautifully Crafted Coloring Experiences.
          </h1>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/shop" size="md">
              Explore Our Books
            </Button>
            <Button href="/coloring-pages" variant="secondary" size="md">
              Try Free Samples
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="font-heading text-2xl text-text">Featured Books.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredBooks.map((book) => (
            <BookCard key={book.sku} book={book} />
          ))}
        </div>

        <Link href="/shop" className="inline-block text-sm font-medium text-text underline decoration-cta underline-offset-4">
          View All →
        </Link>
      </section>

      <section className="rounded-3xl bg-surface-alt px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Browse", subtitle: "Explore themed books and curated collections." },
            { title: "Sample free pages", subtitle: "Test printables before choosing a title." },
            { title: "Get the book on Amazon", subtitle: "Purchase securely and start coloring fast." }
          ].map((step, index) => (
            <article key={step.title} className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold text-text">
                {index + 1}
              </div>
              <h3 className="font-heading text-2xl text-text">{step.title}</h3>
              <p className="text-sm text-text-muted">{step.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <EmailCapture
        heading="Get weekly coloring tips + free pages"
        subtext="Join 20,000+ families. Unsubscribe anytime."
        buttonText="Send My Pages →"
        tag="homepage"
      />

      <section className="space-y-6">
        <h2 className="font-heading text-2xl text-text">From The Studio.</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studioPosts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="h-44 bg-surface-alt" />
              <div className="space-y-3 p-5">
                <h3 className="font-heading text-xl text-text">{post.title}</h3>
                <p className="text-sm text-text-muted">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-block text-sm font-medium text-text underline decoration-cta underline-offset-4">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </div>
  );
}
