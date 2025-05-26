/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F3FA',
          100: '#CCE7F5',
          200: '#99CFEB',
          300: '#66B7E0',
          400: '#339FD6',
          500: '#2E8BC0', // Primary blue
          600: '#1E6F9E',
          700: '#19567D',
          800: '#133E5C',
          900: '#0E253A',
        },
        secondary: {
          50: '#E6F7F8',
          100: '#CCEFF1',
          200: '#99DFE3',
          300: '#66CED5',
          400: '#33BEC7',
          500: '#0E9AA7', // Teal
          600: '#0B7B85',
          700: '#095C64',
          800: '#063E42',
          900: '#031F21',
        },
        success: {
          50: '#F0FAF0',
          100: '#E0F5E0',
          200: '#C1EBC1',
          300: '#A3E0A3',
          400: '#90EE90', // Light green
          500: '#5CCD5C',
          600: '#2EA62E',
          700: '#237D23',
          800: '#195319',
          900: '#0C290C',
        },
        warning: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC300',
          600: '#CC9C00',
          700: '#997500',
          800: '#664E00',
          900: '#332700',
        },
        error: {
          50: '#FEECEC',
          100: '#FDD9D9',
          200: '#FBB4B4',
          300: '#F98E8E',
          400: '#F76969',
          500: '#FF6B6B', // Soft red
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742121',
        },
        neutral: {
          50: '#F8F9FA', // White
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-right': 'slide-right 0.3s ease-out',
      },
      keyframes: {
        'pulse-light': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-10px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};