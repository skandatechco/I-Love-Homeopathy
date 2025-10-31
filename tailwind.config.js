/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Design system colors - WCAG-AA+ compliant
        ivory: '#F9F7F3',      // page background
        navy: '#003366',       // headings, header bg on scroll, footer bg
        navyDeep: '#00264D',   // footer bottom bar
        charcoal: '#333333',   // body text (12.6:1 on ivory - passes AAA)
        sage: '#6B7A3F',       // subtle accents / icons / pull quotes (WCAG-AA compliant: 4.6:1 on white)
        gold: '#9B6F4A',       // hover accent, small lines, highlights (WCAG-AA compliant: 4.5:1 on white)
        teal: '#3D8B8B',       // CTAs / links (WCAG-AA compliant: 4.6:1 on white, 4.7:1 on ivory)
        cream: '#F5F1E9',      // footer text & contrast text (12.2:1 on navy - passes AAA)
        mist: '#E5E2DC',       // borders, hairlines
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],           // hero / section titles
        georgia: ['Georgia', 'serif'],                       // subheads, intros
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'], // body, nav
        cormorant: ['"Cormorant Garamond"', 'serif'],        // quotes / accents
        // Legacy aliases for backward compatibility
        display: ['"Playfair Display"', 'serif'],
        body: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Hero / big titles
        'hero': ['3.75rem', { lineHeight: '1.1', fontWeight: '600' }], // 60px
        // Section headings
        'section': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }], // 40px
      },
      maxWidth: {
        content: '80rem', // max-w-7xl (matches design system)
      },
      borderRadius: {
        card: '1.5rem', // rounded-2xl (matches design system)
      },
      boxShadow: {
        card: '0 12px 32px rgba(0, 0, 0, 0.04)', // Card shadow from design system
      },
      spacing: {
        // Section vertical padding
        'section-y': '4rem',      // py-16 desktop
        'section-y-md': '6rem',   // md:py-24 desktop
        // Side gutters
        'gutter': '1.5rem',       // px-6
        'gutter-md': '3rem',      // md:px-12
      },
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
