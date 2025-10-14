/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
          sunset: {
              50: '#fff7ed',
              100: '#ffedd5',
              200: '#fed7aa',
              300: '#fdba74',
              400: '#fb923c',
              500: '#f97316',
              600: '#d4580c',
              700: '#a0456b',
              800: '#7c2d84',
              900: '#4a1a5c',
          },
        rose: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      backgroundImage: {
          'gradient-sunset': 'linear-gradient(135deg, #fb923c 0%, #db2777 100%)',
          'gradient-sunset-soft': 'linear-gradient(135deg, #fed7aa 0%, #fbcfe8 100%)',
          'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-up': 'fadeUp 1s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}