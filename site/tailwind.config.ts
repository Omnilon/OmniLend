import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        "accent-purple": "var(--accent-purple)",
        "accent-orange": "var(--accent-orange)",
        "accent-green": "var(--accent-green)",
        "accent-red": "var(--accent-red)"
      },
      backgroundImage: {
        "grad-1": "var(--grad-1)",
        "grad-2": "var(--grad-2)",
        "grad-3": "var(--grad-3)"
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono]
      },
      letterSpacing: {
        tightest: "-0.02em",
        widest: "0.03em"
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.23, 1, 0.32, 1)"
      },
      boxShadow: {
        glow: "0 0 48px rgba(212, 160, 255, 0.2)"
      }
    }
  },
  plugins: []
};

export default config;
