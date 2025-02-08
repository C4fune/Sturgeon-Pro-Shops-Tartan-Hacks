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
        primary: "#E3DFCC", // Example: Dark background
        text: "#0A0908", // Example: White text
        secondary: "#798478", // Example: Gray text
        accept: "#216E61", // Example: Green for success
        reject: "#E94F37", // Example: Red for errors
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
