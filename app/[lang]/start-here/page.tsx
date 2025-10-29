export default async function StartHerePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <h1 className="hero-headline">Start Here</h1>
        <p className="text-base leading-relaxed text-charcoal max-w-3xl">
          Welcome to I ❤️ Homeopathy. Begin your journey with these essential guides 
          to understanding homeopathy safely and responsibly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <a
          href={`/${lang}/start-here/what-is-homeopathy`}
          className="p-6 bg-white rounded-2xl border border-mist hover:border-navy transition-colors group shadow-card"
        >
          <h3 className="text-xl font-georgia font-semibold text-navy mb-2 group-hover:underline">
            What is Homeopathy?
          </h3>
          <p className="text-sm text-charcoal/70">
            A 5-minute guide to the fundamentals of homeopathic medicine.
          </p>
        </a>

        <a
          href={`/${lang}/start-here/how-remedies-made`}
          className="p-6 bg-white rounded-2xl border border-mist hover:border-navy transition-colors group shadow-card"
        >
          <h3 className="text-xl font-georgia font-semibold text-navy mb-2 group-hover:underline">
            How Remedies are Made
          </h3>
          <p className="text-sm text-charcoal/70">
            Understanding MT, X, C, LM potencies, safety, and compliance.
          </p>
        </a>

        <a
          href={`/${lang}/start-here/when-to-see-doctor`}
          className="p-6 bg-white rounded-2xl border border-mist hover:border-navy transition-colors group shadow-card"
        >
          <h3 className="text-xl font-georgia font-semibold text-navy mb-2 group-hover:underline">
            When to See a Doctor
          </h3>
          <p className="text-sm text-charcoal/70">
            Red flags and when to seek professional medical care immediately.
          </p>
        </a>
      </div>
    </article>
  );
}

