import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        main: '#10b981',
        'main-dark': '#065F46',
        'main-light': '#a7f3d0'
      }
    }
  },
  plugins: [],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
export default config;
