import { BookGrid } from "@/components/sections/book-grid";
import { EmailCapture } from "@/components/sections/email-capture";
import { FilterChips } from "@/components/sections/filter-chips";
import { Hero } from "@/components/sections/hero";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <FilterChips />
      <BookGrid />
      <EmailCapture />
    </div>
  );
}
