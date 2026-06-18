import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F19885",
          soft: "#FBE4DE",
          ink: "#2E2522",
        },
        ember: "#D89462",
        cream: "#F7F4EE",
        mist: "#ECE7DD",
        graphite: "#111827",
        muted: "#5F6670",
        porcelain: "#FFFCF7",
        sage: "#DDE8DF",
        midnight: "#0D1621",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        heading: ["Inter", "Arial", "sans-serif"],
        editorial: ["Newsreader", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(17, 24, 39, 0.12)",
        card: "0 18px 44px rgba(17, 24, 39, 0.08)",
        editorial: "0 34px 90px rgba(17, 24, 39, 0.22)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up": "accordion-up 0.22s ease-out",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
