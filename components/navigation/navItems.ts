// Shared navigation items for Header and MainNav

export type NavItemType = {
  name: string;
  href: string;
  hasDropdown?: boolean;
  isMegaMenu?: boolean;
  submenu?: SubmenuItem[];
  megaMenu?: MegaMenuData;
};

export type SubmenuItem = {
  name: string;
  href: string;
  footerLink?: string; // Optional footer quick link text
};

export type MegaMenuColumn = {
  title: string;
  items: SubmenuItem[];
};

export type MegaMenuData = {
  columns: MegaMenuColumn[];
  footerLink?: string;
  featurePanel?: {
    title: string;
    items: SubmenuItem[];
    footerLink?: string;
  };
};

export const navItems: NavItemType[] = [
  {
    name: "Home",
    href: "/en",
    hasDropdown: false,
  },
  {
    name: "About Homeopathy",
    href: "/en/articles/understanding-homeopathy",
    hasDropdown: true,
    submenu: [
      { name: "What is Homeopathy?", href: "/en/articles/understanding-homeopathy" },
      { name: "Vital Force Theory", href: "/en/articles/vital-force-theory" },
      { name: "Organon & Philosophy", href: "/en/articles/organon-philosophy" },
      { name: "History of Homeopathy", href: "/en/articles/history-of-homeopathy" },
      { name: "Evidence-Based Homeopathy", href: "/en/articles/evidence-based-homeopathy" },
      { name: "Common Myths Explained", href: "/en/articles/common-myths" },
      { name: "How to Use Homeopathy Safely", href: "/en/articles/safe-usage" },
      { name: "Browse All Articles →", href: "/en/articles", footerLink: "Browse All Articles →" },
    ],
  },
  {
    name: "Remedies",
    href: "/en/remedies",
    hasDropdown: true,
    isMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "Quick Actions",
          items: [
            { name: "All Remedies A–Z", href: "/en/remedies" },
            { name: "How to Select a Remedy", href: "/en/remedies/select-remedy" },
            { name: "Clinical Tips Deck", href: "/en/remedies/clinical-tips" },
            { name: "Remedy Resonance", href: "/en/remedy-resonance" },
          ],
        },
        {
          title: "Popular Remedies",
          items: [
            { name: "Arsenicum album", href: "/en/remedies/arsenicum-album" },
            { name: "Nux vomica", href: "/en/remedies/nux-vomica" },
            { name: "Belladonna", href: "/en/remedies/belladonna" },
            { name: "Bryonia", href: "/en/remedies/bryonia" },
            { name: "Sulphur", href: "/en/remedies/sulphur" },
            { name: "Pulsatilla", href: "/en/remedies/pulsatilla" },
            { name: "View all →", href: "/en/remedies" },
          ],
        },
        {
          title: "By Keynote/Modality",
          items: [
            { name: "Burning pains", href: "/en/remedies/by-keynote/burning-pains" },
            { name: "Worse at 3am", href: "/en/remedies/by-keynote/worse-at-3am" },
            { name: "Thirstless fevers", href: "/en/remedies/by-keynote/thirstless-fevers" },
            { name: "Craving eggs", href: "/en/remedies/by-keynote/craving-eggs" },
          ],
        },
        {
          title: "By System / Resonance",
          items: [
            { name: "Rheumatism", href: "/en/conditions/musculoskeletal/rheumatism" },
            { name: "Sciatica", href: "/en/conditions/musculoskeletal/sciatica" },
            { name: "Migraine", href: "/en/conditions/nervous-system/migraine" },
            { name: "Insomnia", href: "/en/conditions/nervous-system/insomnia" },
            { name: "Allergy", href: "/en/conditions/respiratory/allergy" },
            { name: "See all conditions →", href: "/en/conditions" },
          ],
        },
      ],
      footerLink: "Explore Materia Medica →",
    },
  },
  {
    name: "Bach Flowers",
    href: "/en/bach-remedies",
    hasDropdown: true,
    submenu: [
      { name: "About Bach Remedies", href: "/en/bach-remedies" },
      { name: "38 Flower Remedies List", href: "/en/bach-remedies/list" },
      { name: "By Emotion Group", href: "/en/bach-remedies/by-emotion" },
      { name: "Fear", href: "/en/bach-remedies/emotions/fear" },
      { name: "Uncertainty", href: "/en/bach-remedies/emotions/uncertainty" },
      { name: "Loneliness", href: "/en/bach-remedies/emotions/loneliness" },
      { name: "Despondency / Despair", href: "/en/bach-remedies/emotions/despondency" },
      { name: "Over-care for Others", href: "/en/bach-remedies/emotions/over-care" },
      { name: "Rescue Remedy Explained", href: "/en/bach-remedies/rescue-remedy" },
      { name: "Create Your Personal Mix", href: "/en/bach-remedies/personal-mix" },
      { name: "Bach Essence Finder →", href: "/en/bach-remedies/finder", footerLink: "Bach Essence Finder →" },
    ],
  },
  {
    name: "Conditions",
    href: "/en/conditions",
    hasDropdown: true,
    isMegaMenu: true,
    megaMenu: {
      columns: [
        {
          title: "Musculoskeletal",
          items: [
            { name: "Arthritis", href: "/en/conditions/musculoskeletal/arthritis" },
            { name: "Sciatica", href: "/en/conditions/musculoskeletal/sciatica" },
            { name: "Plantar Fasciitis", href: "/en/conditions/musculoskeletal/plantar-fasciitis" },
            { name: "Back Pain", href: "/en/conditions/musculoskeletal/back-pain" },
          ],
        },
        {
          title: "Respiratory & Digestive",
          items: [
            { name: "Asthma", href: "/en/conditions/respiratory/asthma" },
            { name: "Sinusitis", href: "/en/conditions/respiratory/sinusitis" },
            { name: "Cough", href: "/en/conditions/respiratory/cough" },
            { name: "Gastritis", href: "/en/conditions/digestive/gastritis" },
            { name: "IBS", href: "/en/conditions/digestive/ibs" },
            { name: "Liver Health", href: "/en/conditions/digestive/liver-health" },
          ],
        },
        {
          title: "Neuro / Women's / Skin",
          items: [
            { name: "Migraine", href: "/en/conditions/nervous-system/migraine" },
            { name: "Insomnia", href: "/en/conditions/nervous-system/insomnia" },
            { name: "ADHD", href: "/en/conditions/nervous-system/adhd" },
            { name: "PMS", href: "/en/conditions/womens-health/pms" },
            { name: "Menopause", href: "/en/conditions/womens-health/menopause" },
            { name: "Acne", href: "/en/conditions/skin-hair/acne" },
            { name: "Eczema", href: "/en/conditions/skin-hair/eczema" },
          ],
        },
      ],
      featurePanel: {
        title: "Patient Stories",
        items: [
          { name: "Patient Story of the Month", href: "/en/conditions/stories/featured" },
          { name: "Practitioner Case Note", href: "/en/conditions/stories/case-notes" },
        ],
        footerLink: "View all stories →",
      },
    },
  },
  {
    name: "Doctors' Corner",
    href: "/en/doctors-corner",
    hasDropdown: true,
    submenu: [
      { name: "Interviews with Pioneers", href: "/en/doctors-corner/interviews" },
      { name: "Clinical Insights & Case Management", href: "/en/doctors-corner/clinical-insights" },
      { name: "Practice Perspectives", href: "/en/doctors-corner/practice-perspectives" },
      { name: "Young Homeopath Series", href: "/en/doctors-corner/young-homeopaths" },
      { name: "Contribute Your Article →", href: "/en/doctors-corner/contribute" },
      { name: "Meet All Doctors →", href: "/en/doctors-corner", footerLink: "Meet All Doctors →" },
    ],
  },
  {
    name: "Research",
    href: "/en/research",
    hasDropdown: true,
    submenu: [
      { name: "Introduction to Research in Homeopathy", href: "/en/research/introduction" },
      { name: "Nanoparticle Studies", href: "/en/research/nanoparticle-studies" },
      { name: "Water Structure & Memory Research", href: "/en/research/water-memory" },
      { name: "Clinical Outcomes & RWE (Bahola Studies)", href: "/en/research/clinical-outcomes" },
      { name: "Global Publications & References", href: "/en/research/publications" },
      { name: "Submit Your Study →", href: "/en/research/submit" },
    ],
  },
];

export const ctaLink = {
  name: "Start Learning",
  href: "/en/articles/understanding-homeopathy",
};
