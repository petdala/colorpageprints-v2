import Image from "next/image";
import { Button } from "@/components/ui/button";

const resultCards = [
  {
    label: "Kids & Family",
    title: "Start with free printables",
    image: "/images/quiz/step-parent-kids.png",
    href: "/coloring-pages?category=kids"
  },
  {
    label: "Classroom",
    title: "Use simple sample pages",
    image: "/images/quiz/step-teacher.png",
    href: "/coloring-pages?age=ages%203-5"
  },
  {
    label: "Adult Reset",
    title: "Try Colors of Calm",
    image: "/images/quiz/step-teen-adult.png",
    href: "/colors-of-calm"
  }
];

export default function QuizResultsPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Collection Finder</p>
        <h1 className="mt-3 font-heading text-4xl text-text">Phase matching is still being staged</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-text-muted">
          We are turning the finder into a cleaner launch-shelf recommendation system. For now, choose the path that best matches the moment.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {resultCards.map((card) => (
            <article key={card.label} className="overflow-hidden rounded-[24px] border border-border bg-surface-alt shadow-sm">
              <div className="relative aspect-square bg-card">
                <Image src={card.image} alt={`${card.label} collection finder illustration`} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-text-light">{card.label}</p>
                <h2 className="font-heading text-2xl text-text">{card.title}</h2>
                <Button href={card.href} variant="secondary">
                  View Path
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
