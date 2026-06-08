import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        hunsrik: {
          green:  "#2D6A4F",
          gold:   "#F4A22B",
          dark:   "#1A1A2E",
          light:  "#F5F0E8",
          accent: "#C84B31",
        },
      },
    },
  },
  plugins: [],
};

export default config;
