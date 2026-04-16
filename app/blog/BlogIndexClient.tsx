"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { BookCard } from "@/components/ui/BookCard";
import { FilterChips } from "@/components/ui/FilterChips";
import type { BlogPost, Book } from "@/lib/types";

const tabOptions = ["All", "Behind the Book", "Coloring Guides", "Classroom Ideas", "Mindful Coloring", "Screen-Free Fun"];

type BlogIndexClientProps = {
  posts: BlogPost[];
  books: Book[];
};

export function BlogIndexClient({ posts, books }: BlogIndexClientProps) {
  const [activeTab, setActiveTab] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeTab === "All") {
      return posts;
    }

    return posts.filter((post) => post.category === activeTab);
  }, [activeTab, posts]);

  const featuredPost = filteredPosts[0] ?? posts[0];
  const remainingPosts = (filteredPosts.length > 0 ? filteredPosts : posts).slice(1);

  return (
    <div className="space-y-8 lg:grid lg:grid-cols-[1fr_320px] lg:gap-10 lg:space-y-0">
      <div className="space-y-8">
        <FilterChips options={tabOptions} activeOption={activeTab} onSelect={setActiveTab} />

        <Link
          href={`/blog/${featuredPost.slug}`}
          className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-2"
        >
          <div className="relative h-60 bg-surface-alt md:h-full">
            <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover" />
          </div>
          <div className="space-y-4 p-6">
            <p className="text-xs uppercase tracking-wide text-text-muted">Featured</p>
            <h2 className="font-heading text-3xl text-text">{featuredPost.title}</h2>
            <p className="text-sm text-text-muted">{featuredPost.excerpt}</p>
            <p className="text-xs text-text-muted">
              {featuredPost.date} · {featuredPost.read_time}
            </p>
          </div>
        </Link>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {remainingPosts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-44 bg-surface-alt">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
              <div className="space-y-3 p-4">
                <h3 className="font-heading text-xl text-text">{post.title}</h3>
                <p className="text-sm text-text-muted">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="rounded-full border border-border px-2 py-0.5">{post.read_time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="hidden space-y-6 lg:block">
        <EmailCapture
          heading="Get studio notes + free pages"
          subtext="Weekly creative inspiration from ColorPagePrints."
          buttonText="Join"
          tag="blog"
        />

        <section className="space-y-4">
          <h3 className="font-heading text-2xl text-text">Popular Books</h3>
          <div className="space-y-4">
            {books.slice(0, 3).map((book) => (
              <BookCard key={book.sku} book={book} />
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
