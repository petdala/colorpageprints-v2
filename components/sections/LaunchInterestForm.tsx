"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import type { InterestType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type LaunchInterestFormProps = {
  heading: string;
  subtext: string;
  buttonText: string;
  tag: string;
  interestType: InterestType;
  interestSlug?: string;
  successMessage?: string;
  className?: string;
  showThemePreference?: boolean;
  showRequestField?: boolean;
  compact?: boolean;
};

export function LaunchInterestForm({
  heading,
  subtext,
  buttonText,
  tag,
  interestType,
  interestSlug,
  successMessage = "You’re on the list. We’ll send the preview or launch reminder when it’s ready.",
  className,
  showThemePreference = false,
  showRequestField = false,
  compact = false
}: LaunchInterestFormProps) {
  const [email, setEmail] = useState("");
  const [themePreference, setThemePreference] = useState("");
  const [requestNotes, setRequestNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          tag,
          interestSlug,
          interestType,
          themePreference: showThemePreference ? themePreference : undefined,
          requestNotes: showRequestField ? requestNotes : undefined
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit interest form");
      }

      trackEvent("launch_interest_submit", {
        tag,
        interestType,
        interest: interestSlug ?? "global"
      });
      setStatus("success");
      setEmail("");
      setThemePreference("");
      setRequestNotes("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section className={cn("rounded-2xl border border-border bg-card shadow-sm", compact ? "p-5" : "p-6", className)}>
      <div className="space-y-2">
        <h3 className="font-heading text-2xl text-text">{heading}</h3>
        <p className="text-sm leading-6 text-text-muted">{subtext}</p>
      </div>

      <form className={cn("mt-5 grid gap-3", compact ? "lg:grid-cols-[1fr_1fr_auto] lg:items-start" : "")} onSubmit={handleSubmit}>
        <input type="hidden" name="interestSlug" value={interestSlug ?? ""} />
        <input type="hidden" name="interestType" value={interestType} />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className={cn("min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cta/20", compact ? "" : "")}
        />

        {showThemePreference ? (
          <input
            type="text"
            value={themePreference}
            onChange={(event) => setThemePreference(event.target.value)}
            placeholder="Optional: mood or theme"
            className="min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cta/20"
          />
        ) : null}

        {showRequestField ? (
          <textarea
            value={requestNotes}
            onChange={(event) => setRequestNotes(event.target.value)}
            placeholder="Optional: what would you want included?"
            rows={4}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cta/20"
          />
        ) : null}

        <Button type="submit" className={cn("w-full", compact ? "lg:w-auto" : "sm:w-auto")} disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : buttonText}
        </Button>
      </form>

      {status === "success" ? <p className="mt-3 text-sm text-text-muted">{successMessage}</p> : null}
      {status === "error" ? <p className="mt-3 text-sm text-cta">Something went wrong. Please try again.</p> : null}
      <p className="mt-3 text-xs text-text-light">No purchase required. We only use this to stage sampler, reminder, and launch-list requests.</p>
    </section>
  );
}
