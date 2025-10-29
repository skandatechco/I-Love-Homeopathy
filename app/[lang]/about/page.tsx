export default async function AboutPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <article className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <h1 className="hero-headline">About & Editorial Policy</h1>
      </div>

      <section className="space-y-4">
        <h2 className="section-headline">Who We Are</h2>
        <p className="text-[18px] leading-relaxed text-charcoal">
          I ❤️ Homeopathy is Bahola's flagship educational and engagement platform 
          connecting education, clinical awareness, commerce, and research within one 
          compliant ecosystem.
        </p>
        <p className="text-[18px] leading-relaxed text-charcoal">
          We unite Bahola.co (products & consultations), HomeopathyMasters / Skolapro 
          (learning), RemedyFor (AI discovery), and Bahola PBR (Practice-Based Research) 
          into a cohesive ecosystem designed for safe, evidence-aware engagement.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="section-headline">Conflict of Interest & Funding Disclosure</h2>
        <div className="bg-teal/10 border border-baholaTeal/30 rounded-2xl p-6">
          <p className="text-[18px] leading-relaxed text-charcoal mb-4">
            I ❤️ Homeopathy is operated by Bahola Labs. This platform is funded through 
            Bahola's commercial operations (product sales, consultations, courses).
          </p>
          <p className="text-[18px] leading-relaxed text-charcoal">
            <strong>We disclose:</strong> Links to Bahola.co, HomeopathyMasters, RemedyFor, 
            and other Bahola services are present for user convenience. No content is paid 
            placement. Editorial decisions are independent of commercial interests.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-headline">Compliance & Medical Disclaimer</h2>
        <div className="bg-ivory border border-mist rounded-2xl p-6 space-y-4">
          <p className="text-[18px] leading-relaxed text-charcoal">
            <strong>Educational use only.</strong> Content on I ❤️ Homeopathy is for 
            educational and informational purposes only. It is not intended as medical 
            advice, diagnosis, or treatment.
          </p>
          <p className="text-[18px] leading-relaxed text-charcoal">
            Always consult with a qualified healthcare professional for medical concerns, 
            especially for serious, persistent, or worsening symptoms.
          </p>
          <p className="legal-text">
            This site complies with: Drugs & Magic Remedies Act 1954 (IN), ASCI Health 
            Advertising Code, IT Rules 2021, Consumer Protection E-Commerce Rules, 
            WCAG 2.1 AA accessibility standards.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-headline">How We Grade Evidence</h2>
        <p className="text-[18px] leading-relaxed text-charcoal">
          We use a transparent evidence-grading system:
        </p>
        <ul className="space-y-2 text-[18px] leading-relaxed text-charcoal ml-6 list-disc">
          <li><strong>Strong evidence:</strong> Multiple well-designed RCTs, systematic reviews</li>
          <li><strong>Moderate evidence:</strong> Some studies, consistent case reports</li>
          <li><strong>Limited evidence:</strong> Anecdotal reports, traditional use patterns</li>
          <li><strong>No evidence:</strong> Pure speculation or debunked claims</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="section-headline">Editorial Integrity</h2>
        <p className="text-[18px] leading-relaxed text-charcoal">
          All content undergoes BHMS (Bachelor of Homeopathic Medicine and Surgery) 
          review before publication. Our editorial process:
        </p>
        <ol className="space-y-3 text-[18px] leading-relaxed text-charcoal ml-6 list-decimal">
          <li><strong>Writers</strong> draft content based on outlines and tone guidelines</li>
          <li><strong>BHMS Reviewers</strong> verify medical accuracy and compliance</li>
          <li><strong>Compliance Officer</strong> performs final regulatory review</li>
          <li><strong>Published</strong> with reviewer attribution</li>
        </ol>
      </section>
    </article>
  );
}

