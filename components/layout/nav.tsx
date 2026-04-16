"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/coloring-pages", label: "Free Pages" },
  { href: "/blog", label: "The Studio" },
  { href: "/about", label: "About" }
];

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const normalizedPathname = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const hideShopCta = normalizedPathname === "/shop";

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background">
      <div className="container-1200 flex h-full items-center justify-between">
        <Link href="/" className="font-heading text-2xl text-text" aria-label="ColorPagePrints home">
          ColorPagePrints
          <span className="text-cta">·</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-body text-sm font-medium text-text transition-colors hover:text-text",
                  "decoration-cta underline-offset-4 hover:underline"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!hideShopCta ? (
            <Link
              href="/shop"
              className="rounded-sm bg-cta px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cta-hover active:bg-cta-pressed"
            >
              Shop Books
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border md:hidden"
          aria-label="Open navigation menu"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-xl leading-none">☰</span>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/30 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-50 h-screen w-[85%] max-w-sm bg-background p-6 shadow-xl transition-transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="font-heading text-xl text-text">
            Menu<span className="text-cta">·</span>
          </p>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <nav className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-base font-medium text-text"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className="mt-2 inline-flex w-fit rounded-sm bg-cta px-6 py-2.5 text-sm font-medium text-white"
            onClick={() => setIsOpen(false)}
          >
            Shop Books
          </Link>
        </nav>
      </aside>
    </header>
  );
}
