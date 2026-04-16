import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";

type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

function renderMarkdown(content: string) {
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-8 font-heading text-2xl text-text">
          {block.replace(/^##\s+/, "")}
        </h2>
      );
    }

    return (
      <p key={index} className="text-base leading-7 text-text-muted">
        {block}
      </p>
    );
  });
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogDetailPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "The Studio | ColorPagePrints"
    };
  }

  return {
    title: `${post.title} | The Studio | ColorPagePrints`
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getBlogPosts().filter((candidate) => candidate.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "ColorPagePrints"
    },
    image: [`https://www.colorpageprints.com${post.image}`]
  };

  return (
    <article className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "The Studio", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` }
        ]}
      />

      <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-surface-alt md:h-96">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      <header className="space-y-3">
        <h1 className="font-heading text-3xl text-text">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.read_time}</span>
          <span className="rounded-full border border-border px-2 py-0.5">{post.category}</span>
        </div>
      </header>

      <section className="space-y-4">{renderMarkdown(post.content)}</section>

      <EmailCapture
        heading="Get new studio posts first"
        subtext="Weekly ideas, launches, and free pages in your inbox."
        buttonText="Subscribe"
        tag="blog-post"
      />

      <section className="space-y-4">
        <h2 className="font-heading text-2xl text-text">Related Posts</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedPosts.map((related) => (
            <Link key={related.slug} href={`/blog/${related.slug}`} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <h3 className="font-heading text-xl text-text">{related.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{related.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </article>
  );
}
