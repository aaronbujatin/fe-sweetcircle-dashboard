/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      textColor: {
        'gradient': 'transparent',
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(to right, #FB72BD, #FBB371)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background-image': 'linear-gradient(to right, #FB72BD, #FBB371)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          'color': 'transparent',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}