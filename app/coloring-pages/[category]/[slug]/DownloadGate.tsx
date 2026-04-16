"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type DownloadGateProps = {
  slug: string;
  pdfDownloadUrl: string;
};

export function DownloadGate({ slug, pdfDownloadUrl }: DownloadGateProps) {
  const [email, setEmail] = useState("");
  const [hasEmail, setHasEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cpp_email");

    if (saved) {
      setEmail(saved);
      setHasEmail(true);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      localStorage.setItem("cpp_email", email);

      await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          tag: `free-download-${slug}`
        })
      });

      setHasEmail(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (hasEmail) {
    return (
      <Button href={pdfDownloadUrl} className="w-full sm:w-auto">
        Download Free Page →
      </Button>
    );
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email to unlock download"
        required
        className="min-h-12 w-full rounded-sm border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-cta/30"
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Download Free Page"}
      </Button>
    </form>
  );
}
