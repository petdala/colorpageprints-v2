import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/quiz", label: "Quiz" },
  { href: "/blog", label: "Blog" }
];

export function MobileBottomBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card md:hidden">
      <div className="grid grid-cols-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="py-3 text-center text-xs text-text-muted hover:text-text">
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
