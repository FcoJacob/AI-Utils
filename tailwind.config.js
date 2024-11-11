/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'ai-',
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-1': 'fade 1.5s infinite 0s',
        'fade-2': 'fade 1.5s infinite 0.5s',
        'fade-3': 'fade 1.5s infinite 1s',
      },
    },
  },
  plugins: [],
}
