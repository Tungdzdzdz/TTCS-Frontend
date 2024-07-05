/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        "extra": 'calc(fit-content + 15px)',
      },
      backgroundImage: {
        "football": "url('/src/assets/football.png')",
      }
    },
  },
  plugins: [],
}