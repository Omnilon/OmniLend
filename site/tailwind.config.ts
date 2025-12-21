import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/pages/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        border: "var(--border)",
        "accent-purple": "var(--accent-purple)",
        "accent-orange": "var(--accent-orange)",
        "accent-green": "var(--accent-green)",
        "accent-red": "var(--accent-red)"
      },
      fontFamily: {
        sans: ["var(--font-grotesk)"],
        mono: ["var(--font-mono)"]
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.23, 1, 0.32, 1)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(243, 194, 74, 0.28)",
        soft: "0 20px 60px rgba(7, 7, 15, 0.5)"
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        "mesh-radial":
          "radial-gradient(circle at 10% 10%, rgba(240, 122, 142, 0.22), transparent 45%), radial-gradient(circle at 90% 20%, rgba(243, 194, 74, 0.16), transparent 40%), radial-gradient(circle at 50% 80%, rgba(89, 211, 178, 0.16), transparent 45%)"
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        sweep: "sweep 3.5s linear infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite"
      }
    }
  },
  plugins: [typography]
};
export default config;
