export default async function PracticePage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <h1 className="hero-headline">Practice</h1>
        <p className="text-[18px] leading-relaxed text-textMain max-w-3xl">
          Practical guidance for responsible home use and hobbyist learning.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <a
          href={`/${lang}/practice/case-taking`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Case-taking Basics
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            How to take a homeopathic case: history, modalities, generals, and what to observe.
          </p>
        </a>

        <a
          href={`/${lang}/practice/record-keeping`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Record-keeping & Ethics
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            Best practices for keeping records and ethical considerations for hobbyist practice.
          </p>
        </a>

        <a
          href={`/${lang}/practice/potencies-dosing`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Potencies & Dosing Principles
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            Conservative, safety-first approach to potency selection and dosing guidelines.
          </p>
        </a>

        <a
          href={`/${lang}/practice/home-kit`}
          className="p-6 bg-white rounded-card border border-borderSoft hover:border-baholaNavy transition-colors group"
        >
          <h3 className="text-2xl font-display font-semibold text-baholaNavy mb-3 group-hover:underline">
            Home Kit Guide
          </h3>
          <p className="text-sm text-textMain leading-relaxed mb-3">
            What remedies to keep, when to use them, and how to store them properly.
          </p>
        </a>
      </div>
    </article>
  );
}

