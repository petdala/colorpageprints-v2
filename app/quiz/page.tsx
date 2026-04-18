"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type AudienceOption = {
  label: string;
  value: string;
};

const audienceOptions: AudienceOption[] = [
  { label: "Parent & Kids (Ages 3-5)", value: "kids-3-5" },
  { label: "Parent & Kids (Ages 4-8)", value: "kids-4-8" },
  { label: "Teacher / Classroom", value: "classroom" },
  { label: "Teen or Adult", value: "adult" }
];

const themeOptions = ["Animals", "Fantasy", "Space", "Nature", "Mandalas", "Educational", "Holidays"];

const moodOptions = ["Playful & Energetic", "Calm & Focused", "Learning-Focused"];

function getAudienceIllustration(value: string) {
  if (value.startsWith("kids")) return "/images/quiz/step-parent-kids.png";
  if (value === "classroom") return "/images/quiz/step-teacher.png";
  return "/images/quiz/step-teen-adult.png";
}

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [audience, setAudience] = useState("");
  const [themes, setThemes] = useState<string[]>([]);
  const [mood, setMood] = useState("");

  const canContinue = useMemo(() => {
    if (step === 1) return Boolean(audience);
    if (step === 2) return themes.length > 0;
    if (step === 3) return Boolean(mood);
    return false;
  }, [audience, mood, step, themes]);

  function toggleTheme(theme: string) {
    setThemes((current) =>
      current.includes(theme) ? current.filter((item) => item !== theme) : [...current, theme]
    );
  }

  function submitQuiz() {
    const params = new URLSearchParams();
    params.set("audience", audience);
    params.set("themes", themes.join(","));
    params.set("mood", mood);

    router.push(`/quiz/results/?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl text-text">Find Your Perfect Coloring Book</h1>
        <p className="text-sm text-text-muted">Step {step} of 3</p>
      </header>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {step === 1 ? (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-text">Who's coloring today?</h2>
            <div className="space-y-3">
              {audienceOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAudience(option.value)}
                  className={`flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left text-sm ${
                    audience === option.value
                      ? "border-text bg-text text-white"
                      : "border-border bg-background text-text"
                  }`}
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-surface-alt">
                    <Image src={getAudienceIllustration(option.value)} alt={option.label} fill className="object-cover" />
                  </span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-text">Pick your favorite themes</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {themeOptions.map((theme) => {
                const selected = themes.includes(theme);
                return (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => toggleTheme(theme)}
                    className={`rounded-lg border px-4 py-3 text-left text-sm ${
                      selected ? "border-text bg-text text-white" : "border-border bg-background text-text"
                    }`}
                  >
                    {theme}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-text">How do you want it to feel?</h2>
            <div className="space-y-3">
              {moodOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMood(option)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm ${
                    mood === option ? "border-text bg-text text-white" : "border-border bg-background text-text"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={() => setStep((value) => Math.max(1, value - 1))}>
          Back
        </Button>

        {step < 3 ? (
          <Button onClick={() => setStep((value) => Math.min(3, value + 1))} disabled={!canContinue}>
            Continue
          </Button>
        ) : (
          <Button onClick={submitQuiz} disabled={!canContinue}>
            See Results
          </Button>
        )}
      </div>
    </div>
  );
}
