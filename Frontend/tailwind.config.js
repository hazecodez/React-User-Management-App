// /** @type {import('tailwindcss').Config} */
const withMt = require("@material-tailwind/react/utils/withMT");

module.exports = withMt({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
