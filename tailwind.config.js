/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5E4CBF",
        secondary: "#E65177",
      },
    },
  },
  plugins: [],
};
