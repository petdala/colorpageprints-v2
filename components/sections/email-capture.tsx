import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EmailCapture() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-heading text-2xl">Get launch wave updates</h3>
      <p className="mt-2 text-sm text-text-muted">Join the list for early access drops and printable freebies.</p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Input type="email" placeholder="you@example.com" aria-label="Email address" />
        <Button type="button">Join</Button>
      </form>
    </section>
  );
}
