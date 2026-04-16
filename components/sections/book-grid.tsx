import { Card } from "@/components/ui/card";

const featuredBooks = ["Moss Loop", "Night Bloom", "Quiet Wild", "Star Atlas"];

export function BookGrid() {
  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl">Featured Books</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredBooks.map((book) => (
          <Card key={book} className="min-h-28">
            <p className="font-medium">{book}</p>
            <p className="mt-2 text-sm text-text-muted">Preview coming soon</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
