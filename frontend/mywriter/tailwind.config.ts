import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eggshell: "#E3DFCC", // Beige background color
        black: "#0A0908", // Almost Black color for text
        battleship: "#798478", // Greenish Grey color for  text and buttons
        accept: "#216E61", // Green for accept
        reject: "#E94F37", // Red for errors
      },
      fontFamily: {
        inter: "var(--font-inter)",
        robotoMono: "var(--font-roboto-mono)",
      },
    },
  },
  plugins: [],
};
export default config;
