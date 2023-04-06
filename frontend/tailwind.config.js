/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff',
          100: '#6FBF6B',
          200: '#fff',
        },
        'slight-white': {
          50: '#EEEEEE',
        },
      },
    },
    screens: {
      sm: '640px',
      md: '1024px',
      lg: '1280px',
    },
  },
  plugins: [],
};
