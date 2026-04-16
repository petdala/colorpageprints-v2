type CollectionAudiencePageProps = {
  params: {
    audience: string;
  };
};

export default function CollectionAudiencePage({ params }: CollectionAudiencePageProps) {
  return (
    <section className="space-y-3">
      <h1 className="font-heading text-4xl">Collections</h1>
      <p className="text-text-muted">Audience: {params.audience}</p>
    </section>
  );
}
