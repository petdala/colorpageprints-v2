import type { Metadata } from "next";
import { EmailCapture } from "@/components/sections/EmailCapture";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

const foundingColorists: string[] = [];

const perks = [
  "Permanent 48-hour early access to every future wave",
  "Your name on this page (if you choose)",
  "First access to new Ritual Bundles",
  "Direct input on what we make next"
];

export default function FoundingColoristsPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl text-text">Founding Colorists</h1>
        <p className="text-lg text-text-muted">The people who believed in this from the beginning.</p>
      </header>

      <p className="text-text-muted">
        Founding Colorists are our most loyal supporters — people who've purchased from 3 or more launch waves. They
        earn permanent early access, direct input on future books, and a spot on this page.
      </p>

      {foundingColorists.length === 0 ? (
        <p className="text-center italic text-text-muted">
          The first Founding Colorists will appear here after Wave 3. Buy from 3 launch waves to earn your spot.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {foundingColorists.map((name) => (
            <article key={name} className="rounded-lg bg-surface-alt p-4 text-center text-text shadow-sm">
              {name.split(" ")[0]}
            </article>
          ))}
        </div>
      )}

      <section className="space-y-3">
        <h2 className="font-heading text-2xl text-text">What Founding Colorists Get</h2>
        <ul className="list-disc space-y-2 pl-5 text-text-muted">
          {perks.map((perk) => (
            <li key={perk}>{perk}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface-alt p-6 text-text">
        Buy from 3 or more launch waves. We'll invite you automatically by email.
      </section>

      <EmailCapture
        heading="Want to start your journey?"
        subtext="Join the launch list and start collecting waves."
        buttonText="Join"
        tag="community"
      />
    </div>
  );
}
