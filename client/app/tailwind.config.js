/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: "#2D4664",
      white: "#FFFFFF",
      deepBlue: "#005DFF",
      blue: "#80CEFF",
      lightBlue: "#BDE3F6",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
