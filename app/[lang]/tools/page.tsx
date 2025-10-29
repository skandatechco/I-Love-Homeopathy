export default async function ToolsPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <h1 className="hero-headline">Tools</h1>
        <p className="text-[18px] leading-relaxed text-textMain max-w-3xl">
          Practical utilities and resources for your homeopathic journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mt-8">
        <a
          href={`/${lang}/tools/glossary`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-xl font-display font-semibold text-baholaNavy mb-2 group-hover:underline">
            Glossary
          </h3>
          <p className="text-sm text-textMuted">
            Definitions of homeopathic terms and concepts.
          </p>
        </a>

        <a
          href={`/${lang}/tools/remedy-finder`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-xl font-display font-semibold text-baholaNavy mb-2 group-hover:underline">
            Remedy Finder
          </h3>
          <p className="text-sm text-textMuted">
            Search and discover remedies by symptoms or name. High-level tool with links to Maya/Dr. Maya.
          </p>
        </a>

        <a
          href={`/${lang}/tools/downloadables`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-xl font-display font-semibold text-baholaNavy mb-2 group-hover:underline">
            Downloadables
          </h3>
          <p className="text-sm text-textMuted">
            Printable guides, checklists, and reference materials.
          </p>
        </a>
      </div>
    </article>
  );
}

