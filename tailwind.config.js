/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EAF3FF',   // Icy Light Blue
          100: '#D3E7FE',
          200: '#A8CFFC',
          400: '#4E92F5',
          600: '#1F5FE0',   // Primary Blue
          800: '#16307A',   // Deep Navy
          900: '#101B4D',   // Darkest Indigo-Navy
        },
        success: {
          50:  '#EEF6E8',
          500: '#6A994E',
          800: '#4A7035',
        },
        warning: {
          50:  '#FEF3E8',
          500: '#F4A261',   // Warning Orange
          800: '#C4743A',
        },
        danger: {
          50:  '#FDECEA',
          500: '#E76F51',   // Danger Red
          800: '#B84E36',
        },
        info: {
          50:  '#E6FBFF',
          500: '#22B8E8',   // Info Cyan
          800: '#0E7A9E',
        },
        surface: {
          DEFAULT: '#F7F7F5', // Light Gray background
          dark:    '#2E2E2E', // Dark Gray text
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
        'card-hover': '0 4px 12px rgba(31,95,224,.12)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':       'fadeIn .3s ease',
        'slide-in-left': 'slideInLeft .25s ease',
      },
    },
  },
  plugins: [],
}