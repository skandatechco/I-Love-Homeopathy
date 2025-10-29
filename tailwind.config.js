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
        // Bahola brand colors
        baholaNavy: "#003366",      // Headlines, buttons, footer bg
        baholaTeal: "#97CBCB",      // Soft highlights, badges
        baholaGold: "#AD8B3A",      // Rare accents only
        pageBg: "#FAFAFA",           // Background
        textMain: "#333333",         // Main text
        textMuted: "#6C757D",       // Muted/secondary text
        borderSoft: "#E5E7EB"        // Light borders
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'], // Headlines
        body: ['Inter', 'Helvetica Neue', 'sans-serif'], // Body text
      },
      fontSize: {
        'hero': ['3.75rem', { lineHeight: '1.1', fontWeight: '600' }], // 60px
        'section': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }], // 40px
      },
      maxWidth: {
        content: "64rem" /* ~1024px */
      },
      borderRadius: {
        card: "1rem"
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
