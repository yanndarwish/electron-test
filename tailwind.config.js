const colors = require('tailwindcss/colors');
const daisyui = require('daisyui');

module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    styled: true,
    themes: ['cmyk'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
  plugins: [daisyui],
};
