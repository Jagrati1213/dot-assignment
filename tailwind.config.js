/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlueColor: "#002140",
        textColor: "#d8c4b6",
        darkBlueColor: "#001529",
      }
    },
  },
  plugins: [],
}