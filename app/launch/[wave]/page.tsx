type LaunchWaveDetailProps = {
  params: {
    wave: string;
  };
};

export default function LaunchWaveDetailPage({ params }: LaunchWaveDetailProps) {
  return (
    <section className="space-y-3">
      <h1 className="font-heading text-4xl">Launch Wave</h1>
      <p className="text-text-muted">Wave: {params.wave}</p>
    </section>
  );
}
