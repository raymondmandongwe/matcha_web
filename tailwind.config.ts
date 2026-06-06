import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        matcha: { dark: '#7B1D3C', mid: '#C94D6D', light: '#F4A7B9' },
        gold: '#4A7C59',   // green highlight
        cream: '#FEF0F4',  // blush background
        card: '#FFF8FA',   // soft pink-white cards
        charcoal: '#1A1A1A',
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
