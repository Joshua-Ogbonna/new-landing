import { Poppins } from "next/font/google";
const { fontFamily } = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        formBg: "#171717",
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse 15s linear infinite',
        'rotate-normal': 'rotate 8s linear infinite',
      },
      keyframes: {
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      fontFamily: {
          poppins: ["Poppins", ...fontFamily.sans],
          Nebulica: ["Nebulica", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
