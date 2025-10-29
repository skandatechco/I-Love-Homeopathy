export default async function LearnPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <h1 className="hero-headline">Learn</h1>
        <p className="text-[18px] leading-relaxed text-textMain max-w-3xl">
          Build your foundational knowledge of homeopathy through structured learning paths.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <a
          href={`/${lang}/learn/foundations`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Foundations
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            Organon of Medicine, principles, philosophy, and fundamental concepts.
          </p>
          <span className="inline-block text-xs text-baholaTeal font-medium">
            Start foundational learning →
          </span>
        </a>

        <a
          href={`/${lang}/learn/remedy-families`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Remedy Families
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            Explore botanical families (Anacardiaceae, Solanaceae, etc.) and their therapeutic patterns.
          </p>
          <span className="inline-block text-xs text-baholaTeal font-medium">
            Browse families →
          </span>
        </a>

        <a
          href={`/${lang}/learn/materia-medica`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Materia Medica Quick Cards
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            Concise, structured remedy profiles for quick reference.
          </p>
          <span className="inline-block text-xs text-baholaTeal font-medium">
            View remedies →
          </span>
        </a>

        <a
          href={`/${lang}/learn/acute-vs-chronic`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Acute vs Chronic Basics
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            Understanding acute conditions vs chronic patterns, with appropriate safety notes.
          </p>
          <span className="inline-block text-xs text-baholaTeal font-medium">
            Learn more →
          </span>
        </a>
      </div>

      {/* Link to existing remedies */}
      <div className="mt-8 p-6 bg-baholaTeal/10 border border-baholaTeal/30 rounded-card">
        <h3 className="text-lg font-display font-semibold text-baholaNavy mb-2">
          Explore Individual Remedies
        </h3>
        <p className="text-sm text-textMain mb-4">
          Browse our comprehensive remedy library for detailed information.
        </p>
        <a
          href={`/${lang}/remedies/arsenicum-album`}
          className="inline-block px-4 py-2 bg-baholaNavy text-white rounded hover:bg-baholaNavy/90 transition-colors text-sm font-medium"
        >
          View Remedy Library →
        </a>
      </div>
    </article>
  );
}

