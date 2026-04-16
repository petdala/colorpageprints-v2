"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type EmailCaptureProps = {
  heading: string;
  subtext: string;
  buttonText: string;
  tag: string;
};

export function EmailCapture({ heading, subtext, buttonText, tag }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, tag })
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      trackEvent("email_signup", { tag });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section className="rounded-xl bg-card p-6 shadow-sm">
      <h3 className="font-heading text-xl text-text">{heading}</h3>
      <p className="mt-2 text-sm text-text-muted">{subtext}</p>

      <form className="mt-4 flex flex-col gap-3 md:flex-row" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="min-h-12 w-full rounded-sm border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cta/30"
        />
        <Button type="submit" className="md:w-auto" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : buttonText}
        </Button>
      </form>

      {status === "success" ? <p className="mt-2 text-xs text-text-muted">Thanks, you're subscribed.</p> : null}
      {status === "error" ? <p className="mt-2 text-xs text-cta">Something went wrong. Please try again.</p> : null}

      <p className="mt-3 text-xs text-text-light">We respect your privacy.</p>
    </section>
  );
}
