import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections/kids", label: "Kids Collection" },
  { href: "/collections/adults", label: "Adult Collection" }
];

const contentLinks = [
  { href: "/coloring-pages", label: "Free Pages" },
  { href: "/blog", label: "The Studio" },
  { href: "/quiz", label: "Quiz" }
];

const legalLinks = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Service" }
];

export function Footer() {
  return (
    <footer className="bg-surface-alt py-12 md:py-20">
      <div className="container-1200 space-y-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <p className="font-heading text-2xl text-text">
              ColorPagePrints
              <span className="text-cta">·</span>
            </p>
            <p className="text-sm text-text-muted">Premium coloring books and printable pages.</p>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-text">Shop</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-text">Content</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-text">Social</p>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="rounded border border-border px-2 py-1">IG</span>
              <span className="rounded border border-border px-2 py-1">TT</span>
              <span className="rounded border border-border px-2 py-1">YT</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 ColorPagePrints LLC</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-text">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
