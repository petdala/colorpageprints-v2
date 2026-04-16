"use client";

import { useMemo, useState } from "react";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { BookCard } from "@/components/ui/BookCard";
import { FilterChips } from "@/components/ui/FilterChips";
import type { Book } from "@/lib/types";

const filterOptions = ["All", "Kids Ages 3-5", "Kids Ages 4-8", "Adults", "Educational", "Seasonal"];

type ShopPageClientProps = {
  books: Book[];
};

export function ShopPageClient({ books }: ShopPageClientProps) {
  const [activeOption, setActiveOption] = useState("All");

  const filteredBooks = useMemo(() => {
    const sorted = [...books].sort((a, b) => a.priority - b.priority);

    if (activeOption === "All") {
      return sorted;
    }

    return sorted.filter((book) => {
      const age = book.age_range.toLowerCase();
      const lane = book.lane.toLowerCase();

      if (activeOption === "Kids Ages 3-5") {
        return age.includes("3-5") || lane.includes("kids");
      }

      if (activeOption === "Kids Ages 4-8") {
        return age.includes("4-8") || age.includes("4") || age.includes("8");
      }

      if (activeOption === "Adults") {
        return age.includes("adult") || lane.includes("adult");
      }

      if (activeOption === "Educational") {
        return lane.includes("educational");
      }

      if (activeOption === "Seasonal") {
        return lane.includes("seasonal");
      }

      return true;
    });
  }, [activeOption, books]);

  return (
    <div className="space-y-10">
      <FilterChips options={filterOptions} activeOption={activeOption} onSelect={setActiveOption} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
          <BookCard key={book.sku} book={book} />
        ))}
      </div>

      <EmailCapture
        heading="Get weekly coloring tips + free pages"
        subtext="Join 20,000+ families. Unsubscribe anytime."
        buttonText="Send My Pages →"
        tag="shop"
      />
    </div>
  );
}
