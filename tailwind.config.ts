import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        matcha: { dark: '#A8D58D', mid: '#A8D58D', light: '#A8D58D' },
        gold: '#FF8ACB',   // green highlight
        cream: '#FFFFFF',  // blush background
        card: '#FFFFFF',   // soft pink-white cards
        charcoal: '#A8D58D',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};

export default config;
