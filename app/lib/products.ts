export interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  badge?: string;
  description: string;
  storeUrl: string;
}

const WHATSAPP_NUMBER = '27725655958';
export const whatsappOrderUrl = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'd like to order: ${productName}`)}`;

export const STORE_BASE_URL = 'https://store.love-matcha.co.za';

export const PRODUCTS: Product[] = [
  {
    id: 'powder-500g',
    name: '500g Love Matcha Powder',
    price: 1500,
    color: '#A8D58D',
    badge: 'Best Value',
    description: 'Ceremonial-grade matcha in a generous 500g pack — perfect for daily use at home or in the office.',
    storeUrl: `${STORE_BASE_URL}/products/500g-love-matcha-powder`,
  },
  {
    id: 'powder-100g',
    name: 'Love Matcha 100g',
    price: 420,
    color: '#A8D58D',
    badge: 'Popular',
    description: 'A versatile everyday size. Smooth, vibrant, and rich in antioxidants.',
    storeUrl: `${STORE_BASE_URL}/products/love-matcha-100g`,
  },
  {
    id: 'powder-50g',
    name: 'Love Matcha 50g',
    price: 280,
    color: '#A8D58D',
    description: 'Try before you commit. Ideal for gifting or travel.',
    storeUrl: `${STORE_BASE_URL}/products/love-matcha-50g`,
  },
  {
    id: 'starter-kit',
    name: 'Love Matcha Starter Kit',
    price: 750,
    color: '#FF8ACB',
    badge: 'Gift Ready',
    description: 'Everything you need to start your matcha ritual — powder, whisk, and bowl included.',
    storeUrl: `${STORE_BASE_URL}/products/love-matcha-starter-kit`,
  },
  {
    id: 'latte-capsules',
    name: 'Matcha Latte Capsules',
    price: 180,
    color: '#9B2E52',
    description: 'Café-quality matcha lattes at home. Compatible with standard capsule machines.',
    storeUrl: `${STORE_BASE_URL}/products/matcha-latte-capsules`,
  },
];
