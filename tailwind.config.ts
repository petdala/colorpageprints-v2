import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px"
      }
    },
    extend: {
      colors: {
        background: "#FAFAF8",
        text: "#1A1A1A",
        "text-muted": "#8A8580",
        "text-light": "#B5B0A8",
        cta: "#F05A28",
        "cta-hover": "#D94E20",
        "cta-pressed": "#C04418",
        card: "#FFFFFF",
        "surface-alt": "#F5F3F0",
        disabled: "#EDEBE7",
        border: "#E8E4DF",
        "line-art": "#D5D0C8",
        star: "#F0A830"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "DM Serif Display", "Georgia", "serif"],
        body: ["var(--font-body)", "DM Sans", "-apple-system", "sans-serif"]
      },
      maxWidth: {
        container: "1200px"
      }
    }
  },
  plugins: []
};

export default config;
