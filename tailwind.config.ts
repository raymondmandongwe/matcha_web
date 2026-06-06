import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        matcha: '#2D5016',
        sage: '#8FAF6A',
        cream: '#F9F5EE',
        charcoal: '#1A1A1A',
      },
    },
  },
  plugins: [],
};

export default config;
