/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1000px',
    },
    container: {
      padding: {
        DEFAULT: '1rem'
      }
    }
  },
  plugins: [],
}

