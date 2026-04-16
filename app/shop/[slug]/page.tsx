type ShopDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function ShopDetailPage({ params }: ShopDetailPageProps) {
  return (
    <section className="space-y-3">
      <h1 className="font-heading text-4xl">Book Detail</h1>
      <p className="text-text-muted">Slug: {params.slug}</p>
    </section>
  );
}
