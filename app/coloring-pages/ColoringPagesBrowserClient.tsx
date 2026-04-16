"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { FilterChips } from "@/components/ui/FilterChips";
import { Button } from "@/components/ui/button";
import type { ColoringPage } from "@/lib/types";

const PAGE_SIZE = 12;
const baseCategoryOptions = ["All", "Animals", "Fantasy", "Space", "Holidays", "Mandalas", "Educational", "Kids", "Nature"];
const ageOptions = ["All", "Ages 3-5", "Ages 4-8", "Adults"];
const difficultyOptions = ["All", "Easy", "Medium", "Hard"];

type ColoringPagesBrowserClientProps = {
  pages: ColoringPage[];
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function ColoringPagesBrowserClient({ pages }: ColoringPagesBrowserClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categoryParam = searchParams.get("category") ?? "all";
  const ageParam = searchParams.get("age") ?? "all";
  const difficultyParam = searchParams.get("difficulty") ?? "all";

  const categoryOptions = useMemo(() => {
    const dynamic = Array.from(new Set(pages.map((page) => page.category))).map((category) =>
      category.charAt(0).toUpperCase() + category.slice(1)
    );

    return Array.from(new Set([...baseCategoryOptions, ...dynamic]));
  }, [pages]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (normalize(value) === "all") {
      params.delete(key);
    } else {
      params.set(key, normalize(value));
    }

    setVisibleCount(PAGE_SIZE);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filteredPages = useMemo(() => {
    return pages.filter((page) => {
      const categoryMatch = categoryParam === "all" ? true : normalize(page.category) === normalize(categoryParam);
      const ageMatch = ageParam === "all" ? true : normalize(page.age_range) === normalize(ageParam);
      const difficultyMatch =
        difficultyParam === "all" ? true : normalize(page.difficulty) === normalize(difficultyParam);

      return categoryMatch && ageMatch && difficultyMatch;
    });
  }, [pages, categoryParam, ageParam, difficultyParam]);

  const visiblePages = filteredPages.slice(0, visibleCount);
  const hasMore = filteredPages.length > visibleCount;

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <FilterChips
          options={categoryOptions}
          activeOption={
            categoryParam === "all"
              ? "All"
              : categoryOptions.find((option) => normalize(option) === normalize(categoryParam)) ?? "All"
          }
          onSelect={(option) => updateParam("category", option)}
        />

        <FilterChips
          options={ageOptions}
          activeOption={
            ageParam === "all" ? "All" : ageOptions.find((option) => normalize(option) === normalize(ageParam)) ?? "All"
          }
          onSelect={(option) => updateParam("age", option)}
        />

        <FilterChips
          options={difficultyOptions}
          activeOption={
            difficultyParam === "all"
              ? "All"
              : difficultyOptions.find((option) => normalize(option) === normalize(difficultyParam)) ?? "All"
          }
          onSelect={(option) => updateParam("difficulty", option)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {visiblePages.map((page) => (
          <article key={page.slug} className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <Link href={`/coloring-pages/${page.category}/${page.slug}`} className="block">
              <div className="relative aspect-square overflow-hidden rounded-md bg-surface-alt">
                <Image src={page.preview_image} alt={page.alt_text} fill className="object-cover" />
              </div>
            </Link>

            <h3 className="font-heading text-sm text-text">{page.title}</h3>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border px-2 py-1 text-xs text-text-muted">{page.difficulty}</span>
              <span className="rounded-full border border-border px-2 py-1 text-xs text-text-muted">{page.age_range}</span>
            </div>

            <Button href={`/coloring-pages/${page.category}/${page.slug}`} size="sm" className="w-full">
              Download
            </Button>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="flex justify-center">
          <Button variant="secondary" size="md" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Load More
          </Button>
        </div>
      ) : null}

      <EmailCapture
        heading="Get free coloring pages every Friday."
        subtext="New freebies, prompts, and print-ready downloads every week."
        buttonText="Send My Pages →"
        tag="free-pages-browser"
      />
    </div>
  );
}
