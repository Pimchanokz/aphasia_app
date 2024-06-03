import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7386BF',
        secondary: '#F2CB57',
        darkerSec: '#C19E33',
        correctColor: '#61E002',
        correctBorderColor: '#61E800'
      }
    },
  },
  plugins: [],
};
export default config;
