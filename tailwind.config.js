/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./dist/index.html",
        "./components.js",
        "./main.js",
        "./src/**/*.{html,js}"
    ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
          primary: {
              50: '#f8fafc',
              100: '#f1f5f9',
              200: '#e2e8f0',
              300: '#cbd5e1',
              400: '#94a3b8',
              500: '#64748b',
              600: '#475569',
              700: '#334155',
              800: '#1e293b',
              900: '#0f172a',
          },
        secondary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      backgroundImage: {
          'gradient-primary': 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
          'gradient-primary-soft': 'linear-gradient(135deg, #e2e8f0 0%, #bfdbfe 100%)',
          'gradient-secondary': 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
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