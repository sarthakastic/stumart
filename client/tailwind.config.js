/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      main: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        'sans-serif',
      ],
      sigmarOne: ['Sigmar One'],
      montserrat: ['Montserrat'],
      bebasNeue: ['Bebas Neue'],
    },
    extend: {
      colors: {
        primary: '#F07979',
        secondary: '#EC8F8E',
        ternary: '#E2C8C8',
      },
      backgroundImage: {},
    },
  },
  plugins: [],
}
