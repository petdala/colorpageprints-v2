import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBooks, getWaves } from "@/lib/data";
import { LaunchWaveClient } from "@/app/launch/LaunchWaveClient";

type LaunchWaveDetailProps = {
  params: {
    wave: string;
  };
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export function generateStaticParams() {
  return getWaves().map((wave) => ({ wave: wave.landing_page_slug }));
}

export default function LaunchWaveDetailPage({ params }: LaunchWaveDetailProps) {
  const wave = getWaves().find((item) => item.landing_page_slug === params.wave);

  if (!wave) {
    notFound();
  }

  const books = getBooks().filter((book) => wave.book_skus.includes(book.sku));

  return <LaunchWaveClient wave={wave} books={books} />;
}
