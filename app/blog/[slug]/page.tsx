type BlogDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <article className="space-y-3">
      <h1 className="font-heading text-4xl">Blog Post</h1>
      <p className="text-text-muted">Slug: {params.slug}</p>
    </article>
  );
}
