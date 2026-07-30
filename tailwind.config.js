/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./dist/*.html",
    "./components.js",
    "./main.js",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
      colors: {
        paper: {
          DEFAULT: '#F7F6F3',
          muted: '#EFEDE8',
          border: '#E4E1DA',
        },
        ink: {
          DEFAULT: '#141414',
          muted: '#5C5A55',
          faint: '#8A8780',
        },
        accent: {
          DEFAULT: '#0E4D4A',
          hover: '#0A3B39',
          soft: '#E6F0EF',
        },
        primary: {
          50: '#E6F0EF',
          100: '#C2DBD9',
          200: '#8FBAB7',
          300: '#5C9894',
          400: '#2E6F6C',
          500: '#0E4D4A',
          600: '#0A3B39',
          700: '#082E2C',
          800: '#052120',
          900: '#031615',
        },
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-up': 'fadeUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
