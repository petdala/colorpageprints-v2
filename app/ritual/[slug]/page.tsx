type RitualDetailProps = {
  params: {
    slug: string;
  };
};

export default function RitualDetailPage({ params }: RitualDetailProps) {
  return (
    <section className="space-y-3">
      <h1 className="font-heading text-4xl">Ritual</h1>
      <p className="text-text-muted">Slug: {params.slug}</p>
    </section>
  );
}
