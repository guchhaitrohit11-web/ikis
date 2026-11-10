/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ikis: {
          green: '#0F3B2E',
          'green-dark': '#09251D',
          'green-light': '#1A5341',
          red: '#8B1E26',
          'red-dark': '#5E1318',
          gold: '#C5A059',
          'gold-light': '#DFCA99',
          'gold-dark': '#9E7E3C',
          cream: '#FAF8F5',
          'cream-dark': '#F0ECE1',
          onyx: '#111111',
          charcoal: '#262626',
          muted: '#737373',
          border: '#E5E0D8'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', '"Bodoni MT"', 'Cinzel', 'serif'],
        sans: ['Montserrat', 'Inter', '-apple-system', 'sans-serif'],
        display: ['"Italiana"', '"Cinzel"', '"Playfair Display"', 'serif'],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'widest-2xl': '0.45em',
        'widest-3xl': '0.6em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(15, 59, 46, 0.15)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
