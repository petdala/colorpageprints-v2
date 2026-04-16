import Link from "next/link";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/coloring-pages", label: "Coloring Pages" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
];

export function Nav() {
  return (
    <header className="border-b border-border bg-card/95 backdrop-blur">
      <div className="container-1200 flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-xl tracking-wide">
          ColorPagePrints
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-text-muted hover:text-text">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
