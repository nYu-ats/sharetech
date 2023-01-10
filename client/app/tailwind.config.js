/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#2D4664",
      gray: "#666",
      lightGray: "#9A9A9A",
      white: "#FFFFFF",
      deepBlue: "#005DFF",
      blue: "#BDE3F6",
      lightBlue: "#F8FDFF",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
