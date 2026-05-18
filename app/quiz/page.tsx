import Image from "next/image";
import { Button } from "@/components/ui/button";

const finderCards = [
  {
    title: "Parents & kids",
    body: "Quick printable pages, simple themes, and future family-friendly collections.",
    image: "/images/quiz/step-parent-kids.png",
    alt: "Parent and child coloring together at a table"
  },
  {
    title: "Teachers",
    body: "Classroom-ready printables and collection ideas for screen-free learning moments.",
    image: "/images/quiz/step-teacher.png",
    alt: "Teacher preparing coloring pages for a classroom"
  },
  {
    title: "Teen & adult reset",
    body: "Slower collections, calmer themes, and Colors of Calm sampler recommendations.",
    image: "/images/quiz/step-teen-adult.png",
    alt: "Teen or adult coloring in a calm workspace"
  }
];

export default function QuizPage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 overflow-hidden rounded-[32px] border border-border bg-card p-6 shadow-sm md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Collection Finder</p>
          <h1 className="font-heading text-4xl leading-tight text-text md:text-6xl">Find the coloring path that fits your moment</h1>
          <p className="max-w-2xl text-sm leading-7 text-text-muted">
            The interactive finder is being staged, but the main paths are already clear: family printables, classroom pages, or the Colors of Calm adult reset flow.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/colors-of-calm">Start with Colors of Calm</Button>
            <Button href="/shop" variant="secondary">
              Browse the Launch Shelf
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {finderCards.map((card) => (
            <article key={card.title} className="grid grid-cols-[92px_1fr] gap-4 rounded-[24px] border border-border bg-surface-alt p-3">
              <div className="relative aspect-square overflow-hidden rounded-[18px] bg-card">
                <Image src={card.image} alt={card.alt} fill className="object-cover" />
              </div>
              <div className="self-center">
                <h2 className="font-heading text-xl text-text">{card.title}</h2>
                <p className="mt-1 text-xs leading-5 text-text-muted">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
