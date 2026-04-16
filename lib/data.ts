import booksJson from "@/data/books.json";
import collectionsJson from "@/data/collections.json";
import coloringPagesJson from "@/data/coloring-pages.json";
import ritualsJson from "@/data/rituals.json";
import wavesJson from "@/data/waves.json";
import type { Book, Collection, ColoringPage, Ritual, Wave } from "@/lib/types";

const books = booksJson as Book[];
const coloringPages = coloringPagesJson as ColoringPage[];
const collections = collectionsJson as Collection[];
const rituals = ritualsJson as Ritual[];
const waves = wavesJson as Wave[];

export function getBooks(): Book[] {
  return books;
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
