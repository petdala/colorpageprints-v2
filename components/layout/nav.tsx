"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/colors-of-calm", label: "Colors of Calm" },
  { href: "/shop", label: "Shop" },
  { href: "/coloring-pages", label: "Free Library" },
  { href: "/about", label: "About" },
  { href: "/launch-list", label: "Launch List" }
];

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-1200 flex h-full items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center" aria-label="ColorPagePrints home">
          <Image src="/images/logo-primary.png" alt="ColorPagePrints" width={3000} height={600} className="h-6 w-auto md:h-8" priority />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-5">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body text-sm font-medium transition-colors hover:text-text",
                    active ? "text-text" : "text-text-muted"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/launch-list?interest=colors-of-calm&type=sampler_request"
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cta-hover active:bg-cta-pressed"
          >
            Get the Free Sampler
          </Link>
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
          <p className="font-heading text-xl text-text">Menu</p>
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
            href="/launch-list?interest=colors-of-calm&type=sampler_request"
            className="mt-2 inline-flex w-fit rounded-full bg-cta px-6 py-2.5 text-sm font-medium text-white"
            onClick={() => setIsOpen(false)}
          >
            Get the Free Sampler
          </Link>
        </nav>
      </aside>
    </header>
  );
}
