import type { Metadata } from "next";
import { BlogIndexClient } from "./BlogIndexClient";
import { getBlogPosts, getBooks } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Studio"
};

export default function BlogPage() {
  const posts = [...getBlogPosts()].sort((a, b) => (a.date > b.date ? -1 : 1));
  const books = [...getBooks()].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl text-text">The Studio</h1>
        <p className="text-text-muted">Coloring tips, behind-the-book stories, and creative inspiration.</p>
      </header>

      <BlogIndexClient posts={posts} books={books} />
    </div>
  );
}
