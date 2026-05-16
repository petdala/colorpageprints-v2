"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookStatusBadge } from "@/components/ui/BookStatusBadge";
import { trackEvent } from "@/lib/analytics";
import { getBookPrimaryCtaHref, getBookPrimaryCtaLabel, getBookPurchaseUrl, shouldShowBookPrice } from "@/lib/storefront";
import type { Book, Wave } from "@/lib/types";

type LaunchWaveClientProps = {
  wave: Wave;
  books: Book[];
};

function getRemaining(launchDate: Date) {
  const diff = launchDate.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes, isExpired: false };
}

export function LaunchWaveClient({ wave, books }: LaunchWaveClientProps) {
  const launchDate = useMemo(() => new Date(`${wave.launch_date}T00:00:00Z`), [wave.launch_date]);
  const remaining = getRemaining(launchDate);
  const isLive = wave.status === "live" || remaining.isExpired;
  const exclusiveDownloadReady = false;

  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);

  const [verifyEmail, setVerifyEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);

  async function submitLaunchList(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoinLoading(true);

    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tag: `launch-wave-${wave.wave_number}`, interestType: "global_launch_list" })
      });
      trackEvent("launch_list_signup", { wave: String(wave.wave_number) });
      setJoined(true);
    } finally {
      setJoinLoading(false);
    }
  }

  async function submitVerification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVerified(false);
    setVerifyMessage(null);
    setVerifyLoading(true);

    try {
      const response = await fetch("/api/verify-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verifyEmail, order_number: orderNumber, wave: wave.wave_number })
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (response.ok) {
        setVerified(true);
        return;
      }

      setVerifyMessage(data?.message ?? "Unable to verify your order right now.");
    } catch {
      setVerifyMessage("Unable to verify your order right now.");
    } finally {
      setVerifyLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      {!isLive ? (
        <section className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm uppercase tracking-wide text-text-muted">Countdown to launch</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div>
              <p className="font-heading text-4xl text-text">{remaining.days}</p>
              <p className="text-xs text-text-muted">Days</p>
            </div>
            <div>
              <p className="font-heading text-4xl text-text">{remaining.hours}</p>
              <p className="text-xs text-text-muted">Hours</p>
            </div>
            <div>
              <p className="font-heading text-4xl text-text">{remaining.minutes}</p>
              <p className="text-xs text-text-muted">Minutes</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl bg-cta px-6 py-4 text-white">
          <p className="font-heading text-2xl">Wave {wave.wave_number} is live!</p>
        </section>
      )}

      <section className="space-y-5">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl text-text">
            Wave {wave.wave_number}: {wave.title}
          </h1>
          <p className="text-text-muted">Drops {launchDate.toLocaleDateString()}. Be first.</p>
        </div>

        <div className="flex flex-wrap items-end gap-3 overflow-x-auto pb-2">
          {books.map((book) => (
            <div key={book.sku} className="relative h-36 w-24 rounded-lg border border-border bg-card shadow-sm">
              <Image src={book.cover_image ?? "/images/covers/ritual-placeholder.jpg"} alt={book.title} fill className="rounded-lg object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => {
          const firstSentence = `${book.description.split(".")[0]}.`;
          const purchaseUrl = getBookPurchaseUrl(book);
          const primaryHref = getBookPrimaryCtaHref(book);
          const primaryLabel = getBookPrimaryCtaLabel(book);

          return (
            <article key={book.sku} className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="relative h-52 overflow-hidden rounded-md bg-surface-alt">
                <Image src={book.cover_image ?? "/images/covers/ritual-placeholder.jpg"} alt={book.title} fill className="object-cover" />
              </div>
              <div className="flex flex-wrap gap-2">
                <BookStatusBadge book={book} />
              </div>
              <h2 className="font-heading text-xl text-text">{book.title}</h2>
              {shouldShowBookPrice(book) && typeof book.price === "number" ? <p className="text-sm font-medium text-text">${book.price.toFixed(2)}</p> : null}
              <p className="text-sm text-text-muted">{firstSentence}</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={primaryHref}
                  onClick={() => trackEvent("launch_wave_cta", { sku: book.sku, wave: String(wave.wave_number) })}
                >
                  {primaryLabel}
                </Button>
                <Link href={`/shop/${book.slug}`} className="inline-flex items-center text-sm font-medium text-text underline decoration-cta underline-offset-4">
                  View Details
                </Link>
                {isLive && purchaseUrl ? (
                  <Button href={purchaseUrl} variant="secondary">
                    Buy Now
                  </Button>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>

      <section className="space-y-3 rounded-2xl bg-surface-alt p-6">
        <h2 className="font-heading text-2xl text-text">Your Launch List Exclusive</h2>
        <p className="text-lg text-text">{wave.exclusive_name}</p>
        <p className="text-sm text-text-muted">{wave.exclusive_description}</p>
        <p className="text-sm text-text-muted">Only available to Launch List members who buy in the first 48 hours.</p>
      </section>

      {!isLive ? (
        <section className="space-y-3 rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-2xl text-text">Join the Launch List</h2>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={submitLaunchList}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
            />
            <Button type="submit" disabled={joinLoading}>
              {joinLoading ? "Joining..." : "Join the Launch List →"}
            </Button>
          </form>
          {joined ? <p className="text-sm text-text-muted">You’re on the list.</p> : null}
        </section>
      ) : (
        <section className="space-y-3 rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading text-2xl text-text">Already bought? Unlock your exclusive.</h2>
          <form className="grid gap-3 md:grid-cols-3" onSubmit={submitVerification}>
            <input
              type="email"
              value={verifyEmail}
              onChange={(event) => setVerifyEmail(event.target.value)}
              required
              placeholder="Email"
              className="min-h-12 rounded-sm border border-border px-4 py-2.5"
            />
            <input
              type="text"
              value={orderNumber}
              onChange={(event) => setOrderNumber(event.target.value)}
              required
              placeholder="Amazon order number"
              className="min-h-12 rounded-sm border border-border px-4 py-2.5"
            />
            <Button type="submit" disabled={verifyLoading}>
              {verifyLoading ? "Verifying..." : "Verify Order"}
            </Button>
          </form>

          {verified ? (exclusiveDownloadReady ? <Button href={wave.exclusive_download_url}>Download Exclusive</Button> : <p className="text-sm text-text-muted">Your order is verified. The exclusive download files are being prepared and will be emailed when ready.</p>) : null}
          {verifyMessage ? <p className="text-sm text-text-muted">{verifyMessage}</p> : null}
        </section>
      )}
    </div>
  );
}
