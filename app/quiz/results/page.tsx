import Image from "next/image";
import Link from "next/link";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { BookCard } from "@/components/ui/BookCard";
import { Button } from "@/components/ui/button";
import { getBooks } from "@/lib/data";

type QuizResultsPageProps = {
  searchParams: {
    audience?: string;
    themes?: string;
    mood?: string;
  };
};

function pickPrimaryBook(audience: string | undefined, mood: string | undefined) {
  const books = getBooks();
  const adultBook = books.find((book) => book.slug === "cozy-girl-self-care") ?? books[0];
  const kidsBook = books.find((book) => book.slug === "happy-town-community-helpers") ?? books[0];

  if (audience === "adult") {
    return adultBook;
  }

  if (audience === "classroom") {
    return kidsBook;
  }

  if ((mood ?? "").toLowerCase().includes("calm")) {
    return adultBook;
  }

  return kidsBook;
}

export default function QuizResultsPage({ searchParams }: QuizResultsPageProps) {
  const books = getBooks();
  const primaryBook = pickPrimaryBook(searchParams.audience, searchParams.mood);
  const fallbackBook = books.find((book) => book.sku !== primaryBook.sku);
  const otherRecommendations = books.filter((book) => book.sku !== primaryBook.sku).slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className="font-heading text-3xl text-text">Your Perfect Match!</h1>
        <div className="relative mx-auto aspect-[2/3] w-full max-w-sm overflow-hidden rounded-xl bg-surface-alt">
          <Image src={primaryBook.cover_image} alt={primaryBook.title} fill className="object-cover" />
        </div>
      </section>

      <section className="space-y-4">
        <BookCard book={primaryBook} />
      </section>

      <section className="space-y-3 rounded-xl border border-border bg-surface-alt p-5">
        <h2 className="font-heading text-2xl text-text">Not ready to buy? Try 3 free pages from this book.</h2>
        <div className="flex flex-wrap gap-3">
          {primaryBook.free_sample_slugs.map((sampleSlug) => (
            <Link
              key={sampleSlug}
              href={`/coloring-pages/kids/${sampleSlug}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm text-text"
            >
              {sampleSlug.replace(/-/g, " ")}
            </Link>
          ))}
          {primaryBook.free_sample_slugs.length < 3 && fallbackBook
            ? fallbackBook.free_sample_slugs.slice(0, 3 - primaryBook.free_sample_slugs.length).map((sampleSlug) => (
                <Link
                  key={sampleSlug}
                  href={`/coloring-pages/kids/${sampleSlug}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-text"
                >
                  {sampleSlug.replace(/-/g, " ")}
                </Link>
              ))
            : null}
        </div>
      </section>

      <EmailCapture
        heading="Get personalized recommendations + free pages."
        subtext="Tell us what you like and we will send matching books and printable pages."
        buttonText="Send My Picks →"
        tag="quiz"
      />

      <section className="space-y-5">
        <h2 className="font-heading text-2xl text-text">Other Recommendations</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherRecommendations.map((book) => (
            <BookCard key={book.sku} book={book} />
          ))}
        </div>
      </section>

      <div className="flex justify-center">
        <Button href="/quiz" variant="secondary">
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}
