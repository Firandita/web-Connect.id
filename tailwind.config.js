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
          50:  '#EBF3FF',   // Light Blue
          100: '#C5DCFF',
          200: '#9DC4FF',
          400: '#5CA3FF',
          600: '#1A6FD4',   // Primary Blue (dari gambar)
          800: '#0D4FA3',   // Dark Blue
          900: '#0A3570',   // Darkest Blue
        },
        success: {
          50:  '#E8F5E9',
          500: '#43A047',
          800: '#2E7D32',
        },
        warning: {
          50:  '#FFF8E1',
          500: '#FFB300',
          800: '#F57F17',
        },
        danger: {
          50:  '#FDECEA',
          500: '#E53935',
          800: '#B71C1C',
        },
        info: {
          50:  '#E3F2FD',
          500: '#1E88E5',
          800: '#1565C0',
        },
        surface: {
          DEFAULT: '#F0F6FF',  // Light blue-tinted background
          dark:    '#1A2B4A',  // Dark navy text
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
        card:       '0 1px 3px rgba(26,111,212,.08), 0 1px 2px rgba(26,111,212,.04)',
        'card-hover': '0 4px 16px rgba(26,111,212,.15)',
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