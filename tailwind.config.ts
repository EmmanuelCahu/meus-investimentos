// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Permite alternar dark mode via a classe "dark" no <html> ou <body>
  darkMode: 'class',

  content: [
    // Ajuste essas paths conforme sua estrutura. 
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],

  theme: {
    extend: {
      // Definindo keyframes para fade-in
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      // Criando uma animação utilitária chamada "fade-in"
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },
  },

  plugins: [],
}
