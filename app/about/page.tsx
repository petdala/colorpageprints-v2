import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the creator behind ColorPagePrints. Research-driven, AI-powered coloring books with custom options, immersive experiences, and designs for every age."
};

const communityQuotes = [
  "I expected another generic coloring book and got something surprisingly thoughtful.",
  "The page quality and concepts are miles ahead of what I usually find.",
  "My kids ask for ColorPagePrints first, every single weekend."
];

const valuePillars = [
  {
    icon: "🔍",
    heading: "Research-driven",
    body: "Every book starts with real data — what people love, what's missing, and what no one else is making."
  },
  {
    icon: "✨",
    heading: "AI-powered, human-curated",
    body: "AI gives us speed. We bring the vision, the taste, and the quality control."
  },
  {
    icon: "🎧",
    heading: "More than a book",
    body: "Music, meditations, challenges, and rituals that turn coloring into an experience."
  },
  {
    icon: "✏️",
    heading: "Built for you",
    body: "Have an idea? We'll make it — from a single custom page to a six-volume series."
  }
];

export default function AboutPage() {
  const books = [...getBooks()].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-20 pb-8">
      <section className="space-y-10">
        <div
          role="img"
          aria-label="Hands coloring in a botanical coloring book on a warm wooden desk"
          className="min-h-[400px] w-full rounded-2xl bg-surface-alt"
        />

        <div className="mx-auto max-w-4xl space-y-6 text-left md:text-center">
          <h1 className="font-heading text-3xl text-text">Your next escape starts here.</h1>
          <div className="h-px w-20 border-t border-line-art md:mx-auto" />

          <div className="space-y-6 text-lg leading-relaxed text-text-muted">
            <p>
              Every ColorPagePrints book starts with research — not just keywords and rankings, but real conversations
              about what people love, what's missing, and what they wish someone would finally make. I take that data,
              add my own creative spin, and build something you won't find anywhere else.
            </p>
            <p>
              I use AI to help me move faster and reach more people — nothing here is hand-drawn in the traditional
              sense, and I'm not going to pretend otherwise. What AI gives me is speed. What I bring is the vision,
              the curation, and an obsession with getting the details right. Every page is reviewed, refined, and held
              to a standard that most mass-produced coloring books never come close to.
            </p>
            <p>
              But I'm building more than books. I want ColorPagePrints to be an experience — music playlists for your
              coloring sessions, guided meditations, creative challenges, thought-provoking quotes, and activity
              bundles that turn 15 minutes of downtime into a ritual you look forward to.
            </p>
            <p>
              And if you have an idea for a coloring book — no matter how niche, how specific to your world, or how
              "out there" it might seem — I want to hear it. One custom page or a six-volume series. Let's build your
              escape together.
            </p>
          </div>

          <p className="font-heading text-2xl italic text-cta">— Derek, ColorPagePrints</p>
        </div>
      </section>

      <section className="rounded-2xl bg-surface-alt px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {valuePillars.map((pillar) => (
            <article key={pillar.heading} className="space-y-3">
              <p className="text-2xl">{pillar.icon}</p>
              <h2 className="font-heading text-lg text-text">{pillar.heading}</h2>
              <p className="text-sm text-text-muted">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8 rounded-2xl bg-surface-alt px-6 py-12">
        <h2 className="text-center font-heading text-2xl text-text">7 series. 47 titles. Thousands of happy colorists.</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {books.map((book) => (
            <Link key={book.sku} href={`/shop/${book.slug}`} className="relative h-48 w-32 shrink-0 overflow-hidden rounded-lg bg-card">
              <img src={book.cover_image} alt={book.title} className="h-full w-full object-cover" />
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Button href="/shop">Browse All Books →</Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-heading text-2xl text-text">What people are saying.</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {communityQuotes.map((quote, index) => (
            <article key={index} className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
              <p className="text-6xl leading-none text-border">“</p>
              <p className="italic text-text-muted">{quote}</p>
              <StarRating rating={5} count={47} />
              <p className="text-xs text-text-light">— Amazon reviewer</p>
            </article>
          ))}
        </div>
      </section>

      <EmailCapture
        heading="Get free coloring pages + weekly tips from the studio."
        subtext="Weekly ideas, printable freebies, and studio notes."
        buttonText="Send My Pages →"
        tag="about"
      />
    </div>
  );
}
