const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Control dark pseudo-selector by ancestor's "dark" class
  darkMode: "class",
  // Scan these files for Tailwind classes
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // Necessary color utilities
      transparent: colors.transparent,
      current: colors.current,
      // Primary accent color
      primary: {
        300: "#35B8D0",
        500: "#003B5C",
        600: "#215873"
      },
      // Grayscale
      gray: colors.zinc,
      // Gradient colors
      neon: {
        blue1: "#3A5F78",
        blue2: "#4B7C91",
        blue3: "#D1E5F5",
        green1: "#4A7364",
        green2: "#7EC694",
        green3: "#6C9A8B",
        green4: "#A7D2B8",
        red1: "#B45F50",
        red2: "#C16458",
        orange: "#F05A28",
        grayBlue: "#215873",
        turquoise: "#35B8D0",
        green: "#6C9A8B",
        sky: colors.sky[500],
        amber: colors.amber[500],
      },
    },
    extend: {
      fontFamily: {
        sans: ["Avenir Next", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
