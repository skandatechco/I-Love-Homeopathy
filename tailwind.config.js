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
        // Bahola brand system hooks
        baholaNavy: "#003366",
        baholaGold: "#C4A484",
        baholaSage: "#8A9A5B"
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
