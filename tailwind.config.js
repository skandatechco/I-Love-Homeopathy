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
        ink: '#0a1f2e',
        forest: '#0d3d4f',
        midGreen: '#1a5c6e',
        sage: '#3a9aaa',
        gold: '#c4762a',
        goldLight: '#e09030',
        cream: '#f5f0e8',
        creamWarm: '#ede8d8',
        parchment: '#e0d8c4',
        muted: '#5a6a70',
        rule: '#b8cdd4',
        // Legacy aliases for existing components
        ivory: '#f5f0e8',
        navy: '#0d3d4f',
        navyDeep: '#0a1f2e',
        charcoal: '#0a1f2e',
        teal: '#3a9aaa',
        mist: '#b8cdd4',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        georgia: ['var(--font-source-serif)', 'serif'],
        helvetica: ['var(--font-franklin)', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],        // quotes / accents
        // Legacy aliases for backward compatibility
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-franklin)', 'sans-serif'],
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
