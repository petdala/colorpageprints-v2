import Image from "next/image";
import Link from "next/link";

const exploreLinks = [
  { href: "/colors-of-calm", label: "Colors of Calm" },
  { href: "/shop", label: "Launch Shelf" },
  { href: "/launch-list", label: "Launch List" }
];

const collectionLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/collections/adults", label: "Adult Reset" },
  { href: "/collections/kids", label: "Kids & Family" },
  { href: "/coloring-pages", label: "Free Library" }
];

const studioLinks = [
  { href: "/blog", label: "The Studio" },
  { href: "/about", label: "About" },
  { href: "/quiz", label: "Collection Finder" }
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
            <Link href="/" className="inline-flex items-center" aria-label="ColorPagePrints home">
              <Image src="/images/logo-primary.png" alt="ColorPagePrints" width={3000} height={600} className="h-6 w-auto md:h-8" />
            </Link>
            <p className="text-sm leading-6 text-text-muted">
              Coloring experiences for different moods and moments, starting with Colors of Calm and the launch shelf.
            </p>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-text">Explore</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-text">Collections</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {collectionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-text">Studio</p>
            <ul className="space-y-2 text-sm text-text-muted">
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 ColorPagePrints LLC</p>
          <div className="flex flex-wrap items-center gap-4">
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
