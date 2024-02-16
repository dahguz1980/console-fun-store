/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_blue:  '#071c3b', 
        light_blue: '#BAD4F5',
        medium_blue: '#2570DE'

      }
    },
  },
  plugins: [],
})

