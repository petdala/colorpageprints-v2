import type { Metadata } from "next";
import Link from "next/link";
import { getWaves } from "@/lib/data";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function LaunchPage() {
  const waves = getWaves();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl text-text">Launch Waves</h1>
      <div className="space-y-3">
        {waves.map((wave) => (
          <Link
            key={wave.landing_page_slug}
            href={`/launch/${wave.landing_page_slug}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div>
              <p className="font-heading text-xl text-text">{wave.title}</p>
              <p className="text-sm text-text-muted">{wave.launch_date}</p>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs uppercase text-text-muted">{wave.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
