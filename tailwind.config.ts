import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bpr: {
          blue: "#2F80ED",
          lightBlue: "#CBDFEC",
          dark: "#0F172A",
          muted: "#4B5563",
          border: "#E5E7EB",
        }
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
