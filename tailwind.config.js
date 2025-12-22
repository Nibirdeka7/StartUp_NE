// tailwind.config.js
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;
const svgToDataUri = require('mini-svg-data-uri');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'oxford-blue': '#0A1931',
      }
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`
          })
        },
        { 
          values: flattenColorPalette(theme('backgroundColor')), 
          type: 'color' 
        }
      );
    }
  ],
};