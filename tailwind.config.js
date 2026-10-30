/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecf7ff',
          100: '#d8f1ff',
          400: '#4aa7ff',
          500: '#1c87ff',
          600: '#0d6ae0',
          700: '#124db4'
        },
        night: {
          900: '#071426',
          800: '#0b1930',
          700: '#101f3a'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(79, 162, 255, 0.2), 0 20px 40px rgba(19, 89, 176, 0.25)'
      }
    }
  },
  plugins: []
};
