export const SECTION_COLOURS = {
  "remedy-of-the-day": {
    bg: "#E8F4F8",
    border: "#0077A8",
    text: "#005580",
    label: "Remedy of the Day",
  },
  "remedy-quiz": {
    bg: "#FFF3E0",
    border: "#E67E00",
    text: "#B35F00",
    label: "Remedy Quiz",
  },
  philosophy: {
    bg: "#F0EBF8",
    border: "#7B3FA0",
    text: "#5C2D80",
    label: "Philosophy",
  },
  "clinical-cases": {
    bg: "#FDECEA",
    border: "#D32F2F",
    text: "#A01010",
    label: "Clinical Cases",
  },
  history: {
    bg: "#E8F5E9",
    border: "#2E7D32",
    text: "#1B5E20",
    label: "History",
  },
  "remedy-resonance": {
    bg: "#E0F7FA",
    border: "#00838F",
    text: "#005F69",
    label: "Remedy Resonance",
  },
  wellness: {
    bg: "#FCE4EC",
    border: "#C2185B",
    text: "#880E4F",
    label: "Wellness",
  },
  "book-reviews": {
    bg: "#FFFDE7",
    border: "#F9A825",
    text: "#B07A00",
    label: "Book Reviews",
  },
} as const;

export type ArticleSection = keyof typeof SECTION_COLOURS;

export function getSectionColour(section: string) {
  return (
    SECTION_COLOURS[section as ArticleSection] ?? SECTION_COLOURS.philosophy
  );
}
