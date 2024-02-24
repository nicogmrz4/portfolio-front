/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        'persian-blue': {
          '50': '#ecf4ff',
          '100': '#ddebff',
          '200': '#c2daff',
          '300': '#9dc1ff',
          '400': '#769cff',
          '500': '#5678fe',
          '600': '#384ff3',
          '700': '#2637c9',
          '800': '#2636ad',
          '900': '#273588',
          '950': '#171e4f',
      },
      
      }
    },
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

