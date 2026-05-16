"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { Button } from "@/components/ui/button";
import type { Book, ColoringPage } from "@/lib/types";

const PAGE_SIZE = 12;

type ColoringPagesBrowserClientProps = {
  pages: ColoringPage[];
  books: Book[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function toLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function uniqueLabels(values: string[]) {
  return ["All", ...Array.from(new Set(values.filter(Boolean).map(toLabel)))];
}

function getActiveOption(param: string, options: string[]) {
  return param === "all" ? "All" : options.find((option) => normalize(option) === normalize(param)) ?? "All";
}

export function ColoringPagesBrowserClient({ pages, books }: ColoringPagesBrowserClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categoryParam = searchParams.get("category") ?? "all";
  const ageParam = searchParams.get("age") ?? "all";
  const difficultyParam = searchParams.get("difficulty") ?? "all";
  const searchParam = searchParams.get("q") ?? "";

  const parentBooksBySku = useMemo(() => new Map(books.map((book) => [book.sku, book])), [books]);
  const categoryOptions = useMemo(() => uniqueLabels(pages.map((page) => page.category)), [pages]);
  const ageOptions = useMemo(() => uniqueLabels(pages.map((page) => page.age_range)), [pages]);
  const difficultyOptions = useMemo(() => uniqueLabels(pages.map((page) => page.difficulty)), [pages]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const nextValue = value.trim();

    if (!nextValue || normalize(nextValue) === "all") {
      params.delete(key);
    } else {
      params.set(key, normalize(nextValue));
    }

    setVisibleCount(PAGE_SIZE);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function resetFilters() {
    setVisibleCount(PAGE_SIZE);
    router.replace(pathname, { scroll: false });
  }

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const parentBook = parentBooksBySku.get(page.parent_book_sku);
      const categoryMatch = categoryParam === "all" ? true : normalize(page.category) === normalize(categoryParam);
      const ageMatch = ageParam === "all" ? true : normalize(page.age_range) === normalize(ageParam);
      const difficultyMatch = difficultyParam === "all" ? true : normalize(page.difficulty) === normalize(difficultyParam);
      const searchMatch = searchParam
        ? [page.title, page.category, page.difficulty, page.age_range, parentBook?.title ?? ""]
            .join(" ")
            .toLowerCase()
            .includes(searchParam.toLowerCase())
        : true;

      return categoryMatch && ageMatch && difficultyMatch && searchMatch;
    });
  }, [pages, categoryParam, ageParam, difficultyParam, parentBooksBySku, searchParam]);

  const visiblePages = filteredPages.slice(0, visibleCount);
  const hasMore = filteredPages.length > visibleCount;
  const activeCategory = getActiveOption(categoryParam, categoryOptions);
  const activeAge = getActiveOption(ageParam, ageOptions);
  const activeDifficulty = getActiveOption(difficultyParam, difficultyOptions);
  const hasActiveFilters = Boolean(searchParam) || activeCategory !== "All" || activeAge !== "All" || activeDifficulty !== "All";

  return (
    <div className="space-y-12">
      <section className="rounded-xl border border-border bg-card p-3 shadow-sm md:p-4">
        <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_auto_auto_auto_auto] md:items-center">
          <label className="sr-only" htmlFor="free-page-search">
            Search free pages
          </label>
          <input
            id="free-page-search"
            type="search"
            value={searchParam}
            onChange={(event) => updateParam("q", event.target.value)}
            placeholder="Search pages"
            className="min-h-11 rounded-lg border border-border bg-background px-4 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cta/20"
          />

          <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface-alt p-1 md:flex">
            {categoryOptions.map((option) => {
              const isActive = option === activeCategory;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateParam("category", option)}
                  className={`min-h-10 rounded-md px-3 text-sm font-medium transition-colors ${
                    isActive ? "bg-text text-white shadow-sm" : "text-text-muted hover:text-text"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <label className="sr-only" htmlFor="free-page-age">
            Age
          </label>
          <select
            id="free-page-age"
            value={activeAge}
            onChange={(event) => updateParam("age", event.target.value)}
            className="min-h-11 rounded-lg border border-border bg-background px-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-cta/20"
          >
            {ageOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "Any age" : option}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="free-page-difficulty">
            Difficulty
          </label>
          <select
            id="free-page-difficulty"
            value={activeDifficulty}
            onChange={(event) => updateParam("difficulty", event.target.value)}
            className="min-h-11 rounded-lg border border-border bg-background px-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-cta/20"
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option === "All" ? "Any level" : option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="min-h-11 rounded-lg border border-border px-4 text-sm font-medium text-text transition-colors enabled:hover:bg-surface-alt disabled:cursor-not-allowed disabled:text-text-light"
          >
            Clear
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-text-muted">
          <p>
            Showing {filteredPages.length} of {pages.length} free pages
          </p>
          {hasActiveFilters ? (
            <p className="text-xs uppercase tracking-[0.16em] text-text-light">
              {activeCategory !== "All" ? activeCategory : "All pages"} / {activeAge !== "All" ? activeAge : "Any age"} /{" "}
              {activeDifficulty !== "All" ? activeDifficulty : "Any level"}
            </p>
          ) : null}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visiblePages.map((page) => {
          const parentBook = parentBooksBySku.get(page.parent_book_sku);
          const pageHref = `/coloring-pages/${page.category}/${page.slug}`;

          return (
            <article key={page.slug} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Link href={pageHref} className="block border-b border-border bg-[#fffdf8]">
                <div className="relative aspect-[4/3]">
                  <Image src={page.preview_image} alt={page.alt_text} fill className="object-contain p-5" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                </div>
              </Link>

              <div className="space-y-3 p-4">
                <div className="space-y-1">
                  <h3 className="font-heading text-xl leading-tight text-text">{page.title}</h3>
                  {parentBook ? (
                    <Link href={`/shop/${parentBook.slug}`} className="block text-sm font-medium text-text-muted underline decoration-border underline-offset-4 hover:text-text">
                      From: {parentBook.title}
                    </Link>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-surface-alt px-3 py-1 text-xs text-text-muted">{page.difficulty}</span>
                  <span className="rounded-full border border-border bg-surface-alt px-3 py-1 text-xs text-text-muted">{page.age_range}</span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="text-xs uppercase tracking-[0.16em] text-text-light">Free PDF</span>
                  <Link href={pageHref} className="text-sm font-medium text-cta underline decoration-cta/40 underline-offset-4 hover:text-cta-hover">
                    Download -&gt;
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {visiblePages.length === 0 ? (
        <p className="rounded-xl border border-border bg-card p-6 text-center text-sm text-text-muted">
          No free pages match those filters yet.
        </p>
      ) : null}

      {hasMore ? (
        <div className="flex justify-center">
          <Button variant="secondary" size="md" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Load More
          </Button>
        </div>
      ) : null}

      <section className="grid gap-6 rounded-[28px] border border-border bg-surface-alt p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div className="space-y-2">
          <h2 className="font-heading text-2xl text-text md:text-3xl">Love what you see?</h2>
          <p className="max-w-2xl text-sm leading-7 text-text-muted">
            Follow the complete books and upcoming collections from the ColorPagePrints launch shelf.
          </p>
        </div>
        <Button href="/shop">Browse Launch Shelf</Button>
      </section>

      <EmailCapture
        heading="Get free coloring pages every Friday."
        subtext="New freebies, prompts, and print-ready downloads every week."
        buttonText="Send My Pages"
        tag="free-pages-browser"
      />

      <section className="border-y border-border py-10 text-center">
        <h2 className="font-heading text-3xl text-text md:text-4xl">Not sure where to start?</h2>
        <div className="mt-4 flex justify-center">
          <Button href="/quiz" variant="secondary">Try the Collection Finder</Button>
        </div>
      </section>
    </div>
  );
}
