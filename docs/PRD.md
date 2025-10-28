Project: I ❤️ Homeopathy (ILH) Website
Version: 1.4 (Complete – Strengthened with Option B Hybrid Translation Workflow and Legacy Content Integration)
Prepared for: Bahola Labs / ILH Team
Prepared by: ILH Editorial Board, Bahola Labs, and Skanda Labs
Date: October 2025
1. Vision
I ❤️ Homeopathy (ILH) is Bahola’s flagship educational and engagement platform connecting education, clinical awareness, 
commerce, and research within one compliant ecosystem. It unites Bahola.co (products & consultations), HomeopathyMasters / Skolapro (learning), 
RemedyFor (AI discovery), and Bahola PBR (Practice-Based Research) into a cohesive ecosystem designed for safe, evidence-aware engagement.
2. Objectives
•	Educate responsibly – 100+ BHMS-approved, compliant articles
•	Foster engagement – >90 sec average session, <35% bounce
•	Generate consult leads – 10% CTR on Consult Bahola
•	Drive ethical sales – 8% CTR on Buy Bahola
•	Grow learning funnel – 5% CTR to Skolapro / HomeopathyMasters
•	Encourage research participation – 3–5% CTR to Bahola PBR sign-up
•	Build multilingual reach – English, Hindi, Tamil in 12 months
3. Content Strategy & Governance
A structured editorial and compliance process ensures scale without compromising quality or legality.
Editorial Roles
•	Editorial Director – Defines direction and ensures integrity
•	Writers – Draft articles based on outlines and tone guidelines
•	BHMS Reviewers – Verify medical accuracy and compliance
•	Compliance Officer – Final ASCI & regulatory review before publishing
Production Cadence
Phase 0: 10 English articles
Scale-up: 5 per week
Review turnaround: 48–72 hours
Target: 100 articles in Year 1
4. Hybrid Translation Workflow (Option B)
ILH adopts a hybrid multilingual model to scale responsibly:
• English content is the source of truth.
• Automatic translation drafts (Hindi/Tamil) generated locally via /draft-admin.
• Drafts marked autoTranslated: true and reviewStatus: needs-medical-review.
• BHMS reviewer approval required before publishing.
• Unreviewed pages fallback to English version with disclaimer: 'This content is under translation review.'
5. Legacy Content Migration Plan (1500+ ILH Articles)
ILH will repurpose its historical archive of 1500+ legacy blog posts to populate the new platform quickly and compliantly.
Steps:
1. Normalize Excel sheet (one article per row, unified text fields).
2. Classify by type: Quizzes, Clinical Tips, Remedy of the Day, History, Evidence.
3. Convert rows to MDX files with frontmatter (title, slug, author, publishDate, reviewStatus).
4. BHMS reviewers approve compliant pieces.
5. Deploy top 200 prioritized articles for relaunch.
Mapping of Legacy Types
•	Quiz → /quizzes/[slug]
•	Clinical Tips → /articles/[slug]
•	Remedy of the Day → /remedies/[slug]
•	History → /articles/history/[slug]
•	Evidence / Case Studies → /evidence/[slug]
6. Revised Timeline
•	Phase 0 – Prototype (10 English articles + compliance base) – 4 weeks
•	Phase 1 – MVP (English-only site, CTAs, analytics, quizzes) – 8 weeks
•	Phase 2 – Multilingual rollout (Hindi/Tamil) – 6–8 weeks
•	Phase 3 – Draft-admin + translation dashboard – 3 weeks
•	Phase 4 – PBR integration + analytics dashboard – 4 weeks
7. CTA Hierarchy by Page Type
•	Articles – Primary: Consult Bahola | Secondary: Email Signup
•	Conditions – Primary: Buy Bahola | Secondary: RemedyFor
•	Remedies – Primary: Buy Bahola | Secondary: Consult Bahola
•	Evidence – Primary: Join Bahola PBR | Secondary: Skolapro CoursePromo
8. Governance & Compliance
• Automatic disclaimers for children, pregnancy, and chronic cases.
• Non-compliant content removed within 12 hours.
• Secondary reviewers assigned if primary unavailable within 48 hours.
• Monthly compliance audits (10% sample review).
9. Analytics & Integrations
• Vercel Analytics for performance and engagement metrics.
• track() for event logging: buy_click, consult_cta_click, course_cta_click, quiz_complete, pbr_cta_click.
• Klaviyo/Brevo for email marketing.
• Skolapro integration for webinars.
• RemedyFor app deep links for discovery.
• Bahola PBR CTA for research participation.
10. Budget & Resources
•	1 Developer – 6 months
•	2 Writers – 6 months
•	3 BHMS Reviewers – ₹5,000/article
•	2 Translators – ₹1,000/article
•	1 Compliance Officer – Oversight
•	1 Project Manager – Coordination (Skanda Labs)
Estimated total cost for 6 months: ₹12–15 Lakh.
11. Phase 0 Prototype
Deliverables:
• 10 English articles
• Core compliance components
• Consult CTA + analytics tracking
• Internal draft-admin tool
Success = 10 compliant articles in <4 weeks (MVP validation).
12. Success Monitoring
Monthly analytics + editorial audits guide continuous optimization.
KPIs: CTRs, time on page, quiz completions, PBR signups, translations approved.
13. Summary of Strengthened Areas
•	Hybrid Translation Workflow (Option B) for multilingual scalability
•	Editorial governance and accountability
•	Legacy ILH content migration strategy
•	Realistic phased roadmap (6 months)
•	CTA prioritization by page type
•	Compliance fallback and escalation system
•	Defined team roles, costs, and KPIs
14. Tagline
“Learn Responsibly. Consult Confidently. Contribute to Research.”
