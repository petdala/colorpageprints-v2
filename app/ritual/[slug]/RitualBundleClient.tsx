"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { Book, Ritual } from "@/lib/types";

type RitualBundleClientProps = {
  ritual: Ritual;
  book: Book;
  relatedBooks: Book[];
};

function getSpotifyPlaylistId(uri: string | null) {
  if (!uri || uri.includes("placeholder")) {
    return null;
  }

  if (uri.startsWith("spotify:playlist:")) {
    return uri.replace("spotify:playlist:", "");
  }

  const match = uri.match(/playlist\/([^?]+)/);
  return match ? match[1] : null;
}

export function RitualBundleClient({ ritual, book, relatedBooks }: RitualBundleClientProps) {
  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cpp_email");
    if (saved) {
      setEmail(saved);
      setUnlocked(true);
    }
  }, []);

  const spotifyPlaylistId = getSpotifyPlaylistId(ritual.playlist_spotify_uri ?? null);

  async function unlockBundle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem("cpp_email", email);
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag: `ritual-${ritual.slug}` })
      });
      trackEvent("ritual_unlock", { slug: ritual.slug });
      setUnlocked(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-alt">
          <Image src={book.cover_image} alt={book.title} fill className="object-cover" />
        </div>

        <div className="space-y-3">
          <h1 className="font-heading text-2xl text-text">{book.title}</h1>
          <p className="text-xl text-cta">Your Ritual Bundle: {ritual.bundle_name}</p>
          <p className="text-text-muted">Everything you need for your coloring ritual.</p>
        </div>
      </section>

      {!unlocked ? (
        <section className="space-y-3 rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-2xl text-text">Enter your email to access your Ritual Bundle.</h2>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={unlockBundle}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
              placeholder="you@example.com"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Unlocking..." : "Unlock My Ritual →"}
            </Button>
          </form>
        </section>
      ) : null}

      {unlocked ? (
        <>
          <section className="space-y-3 rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl text-text">🎵 {ritual.bundle_name} Playlist</h2>
            <p className="text-sm text-text-muted">Soundtrack your session with curated focus and unwind tracks.</p>
            {spotifyPlaylistId ? (
              <iframe
                src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`${ritual.bundle_name} playlist`}
              />
            ) : (
              <p className="text-sm text-text-muted">Playlist coming soon. We'll email you when it's ready.</p>
            )}
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl text-text">🧘 {ritual.meditation_title} ({ritual.meditation_duration})</h2>
            <p className="text-sm text-text-muted">
              A guided transition from scrolling to coloring. Press play, close your eyes, and let it bring you into the session.
            </p>
            {ritual.meditation_file_url ? (
              <Button href={ritual.meditation_file_url}>Download Meditation</Button>
            ) : (
              <p className="text-sm text-text-muted">Meditation recording coming soon.</p>
            )}
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl text-text">📝 Journal Prompts</h2>
            <div className="space-y-2">
              <blockquote className="rounded-md border-l-4 border-cta bg-surface-alt px-4 py-3 text-sm text-text-muted">
                What feeling are you hoping this coloring session gives you today?
              </blockquote>
              <blockquote className="rounded-md border-l-4 border-cta bg-surface-alt px-4 py-3 text-sm text-text-muted">
                Which colors feel most calming to you right now, and why?
              </blockquote>
              <blockquote className="rounded-md border-l-4 border-cta bg-surface-alt px-4 py-3 text-sm text-text-muted">
                What do you want to carry from this session into the rest of your day?
              </blockquote>
            </div>
            <Button href={ritual.journal_pdf_url}>Download All 10 Prompts (PDF)</Button>
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl text-text">🎨 Curated Color Palettes</h2>
            <p className="text-sm text-text-muted">
              3 palettes with Prismacolor and Faber-Castell numbers to guide your coloring.
            </p>
            <Button href={ritual.palette_pdf_url}>Download Palette Card (PDF)</Button>
          </section>

          <section className="space-y-3 rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading text-2xl text-text">📋 Your Coloring Ritual Guide</h2>
            <p className="text-sm text-text-muted">
              7 steps from candle to journal. Set up your session, follow the guide, and share your ritual.
            </p>
            <Button href={ritual.ritual_guide_pdf_url}>Download Ritual Guide (PDF)</Button>
          </section>

          <section className="space-y-3 rounded-xl bg-surface-alt p-6 text-center">
            <p className="text-text">Share your ritual setup: tag @colorpageprints + #coloringritual on Instagram</p>
            <div className="flex justify-center gap-3 text-sm">
              <Link href="#" className="rounded border border-border px-3 py-2">Instagram</Link>
              <Link href="#" className="rounded border border-border px-3 py-2">TikTok</Link>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-heading text-2xl text-text">More from The Ritual Collection</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.sku} book={relatedBook} />
              ))}
            </div>
          </section>
        </>
      ) : null}

      <EmailCapture
        heading="Get ritual updates + new drops"
        subtext="Join the Ritual Collection list for fresh bundles and bonus downloads."
        buttonText="Join"
        tag={`ritual-${ritual.slug}`}
      />
    </div>
  );
}
