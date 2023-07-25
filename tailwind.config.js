/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        primary: '#121212'
      },
      keyframes: {
        enter: {
          from: {
            opacity: 0,
            transform: 'translateY(100%)'
          }
        },
        leave: {
          to: {
            opacity: 0,
            transform: 'translateY(100%)'
          }
        }
      },
      animation: {
        enter: 'enter 0.3s ease-in-out forwards',
        leave: 'leave 0.3s ease-in-out forwards'
      }
    }
  },
  plugins: []
};
