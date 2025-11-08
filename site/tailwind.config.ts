import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/pages/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        text: "hsl(var(--text))",
        brand: "hsl(var(--brand))",
        muted: "hsl(var(--muted))"
      },
      fontFamily: {
        sans: ["var(--font-grotesk)"],
        mono: ["var(--font-mono)"]
      }
    }
  },
  plugins: [typography]
};
export default config;
