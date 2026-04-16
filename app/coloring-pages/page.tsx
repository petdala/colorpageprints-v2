import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getColoringPages } from "@/lib/data";
import { ColoringPagesBrowserClient } from "./ColoringPagesBrowserClient";

export const metadata: Metadata = {
  title: "Free Printable Coloring Pages for Kids & Adults",
  description:
    "Download free coloring pages across animals, fantasy, space, holidays, mandalas, and more. New pages every week. Print at home."
};

export default function ColoringPagesPage() {
  const pages = getColoringPages();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free Pages", href: "/coloring-pages" }]} />
        <h1 className="font-heading text-3xl text-text">Free Printable Coloring Pages</h1>
        <p className="text-lg text-text-muted">Download, print, and color. New pages every week.</p>
      </header>

      <Suspense fallback={<p className="text-sm text-text-muted">Loading free pages...</p>}>
        <ColoringPagesBrowserClient pages={pages} />
      </Suspense>
    </div>
  );
}
