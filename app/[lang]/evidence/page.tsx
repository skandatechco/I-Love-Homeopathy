export default async function EvidencePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <h1 className="hero-headline">Evidence Hub</h1>
        <p className="text-[18px] leading-relaxed text-textMain max-w-3xl">
          Explore the scientific evidence, understand research methods, and learn to critically evaluate claims about homeopathy.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        {[
          {
            href: "study-summaries",
            title: "Study Summaries",
            description: "Research summaries with question → methods → results → limitations → bottom line format."
          },
          {
            href: "methods-101",
            title: "Methods 101",
            description: "Understanding placebo controls, RCTs, meta-analyses, confounding, and publication bias."
          },
          {
            href: "lab-studies",
            title: "Lab & Physico-chemical Studies",
            description: "DLS, Raman, NMR studies with cautious framing and appropriate caveats."
          },
          {
            href: "reading-papers",
            title: "How to Read a Paper",
            description: "Checklist for critically evaluating research papers and studies."
          },
          {
            href: "claims-checker",
            title: "Claims Checker",
            description: "Myth vs evidence with citations, debunking common misconceptions."
          }
        ].map((item) => (
          <a
            key={item.href}
            href={`/${lang}/evidence/${item.href}`}
            className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
          >
            <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
              {item.title}
            </h3>
            <p className="text-sm text-textMain leading-relaxed mb-3">
              {item.description}
            </p>
            <span className="inline-block text-xs text-baholaTeal font-medium">
              Explore →
            </span>
          </a>
        ))}
      </div>
    </article>
  );
}

