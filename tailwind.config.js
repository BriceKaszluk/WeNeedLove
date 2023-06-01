/** @type {import('tailwindcss').Config} */ 
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./feature/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for IE, Edge and Firefox */
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none'  /* Firefox */
        }
      })
    })
  ],
  extend: {
    backgroundImage: {
      'homepage': "url('/public/main_background.jpg')",
    },
    animation: {
      'toast-out': 'toast-out 1s ease-in-out',
    },
    keyframes: {
      'toast-out': {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
    },
  },
}