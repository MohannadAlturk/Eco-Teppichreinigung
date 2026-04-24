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
        primary: {
          50:  '#fff4ee',
          100: '#ffe4d4',
          200: '#ffc4a0',
          300: '#ff9b68',
          400: '#f87540',
          500: '#E8612D',
          600: '#c24e1f',
          700: '#9e3e17',
          800: '#772f11',
          900: '#52200c',
        },
      },
    },
  },
  plugins: [],
};

export default config;
