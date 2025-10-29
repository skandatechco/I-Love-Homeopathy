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
        <p className="text-[18px] leading-relaxed text-textMain max-w-3xl">
          Welcome to I ❤️ Homeopathy. Begin your journey with these essential guides 
          to understanding homeopathy safely and responsibly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <a
          href={`/${lang}/start-here/what-is-homeopathy`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-xl font-display font-semibold text-baholaNavy mb-2 group-hover:underline">
            What is Homeopathy?
          </h3>
          <p className="text-sm text-textMuted">
            A 5-minute guide to the fundamentals of homeopathic medicine.
          </p>
        </a>

        <a
          href={`/${lang}/start-here/how-remedies-made`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-xl font-display font-semibold text-baholaNavy mb-2 group-hover:underline">
            How Remedies are Made
          </h3>
          <p className="text-sm text-textMuted">
            Understanding MT, X, C, LM potencies, safety, and compliance.
          </p>
        </a>

        <a
          href={`/${lang}/start-here/when-to-see-doctor`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-xl font-display font-semibold text-baholaNavy mb-2 group-hover:underline">
            When to See a Doctor
          </h3>
          <p className="text-sm text-textMuted">
            Red flags and when to seek professional medical care immediately.
          </p>
        </a>
      </div>
    </article>
  );
}

