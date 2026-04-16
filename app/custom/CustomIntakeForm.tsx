"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  email: string;
  purpose: string;
  recipient: string;
  feeling: string;
  theme: string;
  music_style: string;
  deadline: string;
  details: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  purpose: "",
  recipient: "",
  feeling: "",
  theme: "",
  music_style: "",
  deadline: "",
  details: ""
};

export function CustomIntakeForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/custom-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-text">
          <span>Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
            required
            className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
          />
        </label>

        <label className="space-y-1 text-sm text-text">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            required
            className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm text-text">
        <span>What is this for?</span>
        <input
          type="text"
          value={form.purpose}
          onChange={(event) => setField("purpose", event.target.value)}
          required
          className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
        />
      </label>

      <label className="space-y-1 text-sm text-text">
        <span>Who is it for?</span>
        <input
          type="text"
          value={form.recipient}
          onChange={(event) => setField("recipient", event.target.value)}
          required
          className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
        />
      </label>

      <label className="space-y-1 text-sm text-text">
        <span>Desired feeling or emotional outcome</span>
        <textarea
          value={form.feeling}
          onChange={(event) => setField("feeling", event.target.value)}
          required
          className="min-h-24 w-full rounded-sm border border-border px-4 py-2.5"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-text">
          <span>Preferred visual theme</span>
          <input
            type="text"
            value={form.theme}
            onChange={(event) => setField("theme", event.target.value)}
            required
            className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
          />
        </label>

        <label className="space-y-1 text-sm text-text">
          <span>Preferred music style</span>
          <input
            type="text"
            value={form.music_style}
            onChange={(event) => setField("music_style", event.target.value)}
            required
            className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm text-text">
        <span>Deadline (optional)</span>
        <input
          type="text"
          value={form.deadline}
          onChange={(event) => setField("deadline", event.target.value)}
          className="min-h-12 w-full rounded-sm border border-border px-4 py-2.5"
        />
      </label>

      <label className="space-y-1 text-sm text-text">
        <span>Extra details (optional)</span>
        <textarea
          value={form.details}
          onChange={(event) => setField("details", event.target.value)}
          className="min-h-24 w-full rounded-sm border border-border px-4 py-2.5"
        />
      </label>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Submit My Custom Request"}
      </Button>

      <p className="text-sm text-text-muted">We reply within 2 business days. Limited slots each month.</p>
      {status === "success" ? <p className="text-sm text-text-muted">Thanks. Your request was received.</p> : null}
      {status === "error" ? <p className="text-sm text-cta">Something went wrong. Please try again.</p> : null}
    </form>
  );
}
