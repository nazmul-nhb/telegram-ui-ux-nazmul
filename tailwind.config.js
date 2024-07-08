/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },
      fontFamily:{
        roboto: '"Roboto", sans-serif;'
      },
      colors: {
        telegram: '#2ba3df',
        telegramChange: 'var(--telegram-change)'
      },
      backgroundColor: {
        chatBG: 'var(--chat-bg)',
        timeBG: 'var(--time-bg)',
        sideBG: 'var(--side-bg)',
        chatMenuBG: 'var(--chat-menu-bg)',
      },
      backgroundImage: {
        telegramPattern: 'url("/src/assets/pattern.svg")',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          'scrollbar-width': 'none', /* For Firefox */
          '-ms-overflow-style': 'none',  /* For Internet Explorer and Edge */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none', /* For Chrome, Safari, and Opera */
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin', /* For Firefox */
        },
        '.scrollbar-custom': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#a0aec0 transparent',
        },
        '.scrollbar-custom::-webkit-scrollbar': {
          'width': '8px',
        },
        '.scrollbar-custom::-webkit-scrollbar-track': {
          'background': 'transparent',
        },
        '.scrollbar-custom::-webkit-scrollbar-thumb': {
          'background-color': '#a0aec0',
          'border-radius': '10px',
          'border': '3px solid transparent',
          'background-clip': 'padding-box',
        },
        '.scrollbar-custom::-webkit-scrollbar-button': {
          'display': 'none',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};