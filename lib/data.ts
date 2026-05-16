import blogPostsJson from "@/data/blog-posts.json";
import booksJson from "@/data/books.json";
import collectionsJson from "@/data/collections.json";
import coloringPagesJson from "@/data/coloring-pages.json";
import ritualsJson from "@/data/rituals.json";
import wavesJson from "@/data/waves.json";
import { getBookStatus } from "@/lib/storefront";
import type { BlogPost, Book, Collection, ColoringPage, Ritual, Wave } from "@/lib/types";

const books = (booksJson as Book[]).map((book) => ({
  ...book,
  interior_previews: book.interior_previews ?? [],
  free_sample_slugs: book.free_sample_slugs ?? [],
  amazon_reviews: book.amazon_reviews ?? [],
  keywords: book.keywords ?? [],
  related_skus: book.related_skus ?? [],
  theme_tags: book.theme_tags ?? []
}));
const coloringPages = coloringPagesJson as ColoringPage[];
const collections = collectionsJson as Collection[];
const rituals = ritualsJson as Ritual[];
const waves = wavesJson as Wave[];
const blogPosts = blogPostsJson as BlogPost[];

export function getBooks(): Book[] {
  return books;
}

export function getSortedBooks(): Book[] {
  return [...books].sort((left, right) => {
    if (Boolean(left.is_flagship) !== Boolean(right.is_flagship)) {
      return left.is_flagship ? -1 : 1;
    }

    return left.priority - right.priority || left.title.localeCompare(right.title);
  });
}

export function getFlagshipBook(): Book | undefined {
  return books.find((book) => book.is_flagship) ?? getSortedBooks()[0];
}

export function getLaunchShelfBooks(): Book[] {
  return getSortedBooks();
}

export function getPipelineBooks(): Book[] {
  return getSortedBooks().filter((book) => getBookStatus(book) !== "available");
}

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getBookBySku(sku: string): Book | undefined {
  return books.find((book) => book.sku === sku);
}

export function getColoringPages(): ColoringPage[] {
  return coloringPages;
}

export function getColoringPageBySlug(slug: string): ColoringPage | undefined {
  return coloringPages.find((page) => page.slug === slug);
}

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionByAudience(audience: string): Collection | undefined {
  return collections.find((collection) => collection.audience === audience || collection.slug === audience);
}

export function getRituals(): Ritual[] {
  return rituals;
}

export function getRitualBySlug(slug: string): Ritual | undefined {
  return rituals.find((ritual) => ritual.slug === slug);
}

export function getWaves(): Wave[] {
  return waves;
}

export function getWaveBySlug(slug: string): Wave | undefined {
  return waves.find((wave) => wave.landing_page_slug === slug);
}

export function getWaveByNumber(waveNumber: number): Wave | undefined {
  return waves.find((wave) => wave.wave_number === waveNumber);
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
