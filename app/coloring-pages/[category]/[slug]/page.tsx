type ColoringPageDetailProps = {
  params: {
    category: string;
    slug: string;
  };
};

export default function ColoringPageDetail({ params }: ColoringPageDetailProps) {
  return (
    <section className="space-y-3">
      <h1 className="font-heading text-4xl">Coloring Page</h1>
      <p className="text-text-muted">
        Category: {params.category} | Slug: {params.slug}
      </p>
    </section>
  );
}
