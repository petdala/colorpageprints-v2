import Link from "next/link";

export function MobileBottomBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 h-16 border-t border-border bg-background md:hidden">
      <div className="container-1200 grid h-full grid-cols-2 gap-2 py-2">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-sm bg-cta px-4 text-sm font-medium text-white transition-colors hover:bg-cta-hover active:bg-cta-pressed"
        >
          Shop Books
        </Link>
        <Link
          href="/coloring-pages"
          className="inline-flex items-center justify-center rounded-sm border border-text px-4 text-sm font-medium text-text"
        >
          Free Pages
        </Link>
      </div>
    </nav>
  );
}
