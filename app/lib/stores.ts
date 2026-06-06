export interface OperatingHours {
  days: string;
  hours: string;
}

export interface Store {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  mapsQuery: string;
  hours: OperatingHours[];
  images: readonly string[];
}

const STORE_EMAIL = 'info@love-matcha.co.za';

const PLACEHOLDER_PALETTE = ['#2D5016', '#8FAF6A', '#C9A66B', '#6B8E4E', '#1A1A1A'] as const;

function placeholderImages(seed: number): readonly string[] {
  return [0, 1, 2].map((offset) => PLACEHOLDER_PALETTE[(seed + offset) % PLACEHOLDER_PALETTE.length]);
}

export const mapsUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const STORES: Store[] = [
  {
    id: 'bloubergstrand',
    name: 'Bloubergstrand',
    email: STORE_EMAIL,
    address: 'Shop 6, 12 Marine Cir, Table View, Cape Town, 7441',
    mapsQuery: 'Love Matcha, Shop 6, 12 Marine Cir, Table View, Cape Town, 7441',
    hours: [
      { days: 'Mon – Thu', hours: '09:00 – 22:00' },
      { days: 'Fri – Sat', hours: '09:00 – 23:00' },
      { days: 'Sun', hours: '09:00 – 22:00' },
    ],
    images: placeholderImages(0),
  },
  {
    id: 'fourways-jhb',
    name: 'Fourways JHB',
    email: STORE_EMAIL,
    address: '11 Ruby Cl, Witkoppen, Sandton, 2068',
    mapsQuery: 'Love Matcha, 11 Ruby Cl, Witkoppen, Sandton, 2068',
    hours: [
      { days: 'Mon – Sat', hours: '09:00 – 20:00' },
      { days: 'Sun', hours: '09:00 – 19:00' },
    ],
    images: placeholderImages(1),
  },
  {
    id: 'gateway-durban',
    name: 'Gateway Durban',
    email: STORE_EMAIL,
    address: '1 Palm Blvd, Umhlanga Ridge, Durban, 4319',
    mapsQuery: 'Love Matcha, 1 Palm Blvd, Umhlanga Ridge, Durban, 4319',
    hours: [{ days: 'Daily', hours: '09:00 – 20:00' }],
    images: placeholderImages(2),
  },
  {
    id: 'canal-walk',
    name: 'Canal Walk',
    email: STORE_EMAIL,
    address: '490 Century Blvd, Century City, Cape Town, 7446',
    mapsQuery: 'Love Matcha, 490 Century Blvd, Century City, Cape Town, 7446',
    hours: [{ days: 'Daily', hours: '09:00 – 21:00' }],
    images: placeholderImages(3),
  },
  {
    id: 'tygervalley-mall',
    name: 'Tygervalley Mall',
    email: STORE_EMAIL,
    mapsQuery: 'Love Matcha, Tygervalley Mall, Cape Town',
    hours: [
      { days: 'Mon – Sat', hours: '09:00 – 19:00' },
      { days: 'Sun', hours: '09:00 – 17:00' },
    ],
    images: placeholderImages(4),
  },
  {
    id: 'sandown',
    name: 'Sandown',
    email: STORE_EMAIL,
    address: 'Retail Crossing Shopping Mall, Sandown',
    mapsQuery: 'Love Matcha, Retail Crossing Shopping Mall, Sandown',
    hours: [
      { days: 'Mon – Fri', hours: '08:00 – 20:00' },
      { days: 'Sat', hours: '08:00 – 19:00' },
      { days: 'Sun', hours: '08:00 – 18:00' },
    ],
    images: placeholderImages(0),
  },
  {
    id: 'neelsie',
    name: 'Neelsie (Stellenbosch University)',
    email: STORE_EMAIL,
    address: 'Neelsie Student Centre, Stellenbosch University, Stellenbosch',
    mapsQuery: 'Love Matcha, Neelsie Student Centre, Stellenbosch University',
    hours: [
      { days: 'Mon – Fri', hours: '07:00 – 16:30' },
      { days: 'Sat – Sun', hours: '07:00 – 19:00' },
    ],
    images: placeholderImages(1),
  },
  {
    id: 'kloof-street',
    name: 'Kloof Street',
    email: STORE_EMAIL,
    address: '50 Kloof St, Gardens, Cape Town, 8001',
    mapsQuery: 'Love Matcha, 50 Kloof St, Gardens, Cape Town, 8001',
    hours: [
      { days: 'Mon – Thu', hours: '08:30 – 21:00' },
      { days: 'Fri – Sat', hours: '08:30 – 22:00' },
      { days: 'Sun', hours: '08:30 – 20:00' },
    ],
    images: placeholderImages(2),
  },
  {
    id: 'mojo-market',
    name: 'Mojo Market',
    email: STORE_EMAIL,
    address: '30 Regent Rd, Sea Point, Cape Town, 8060',
    mapsQuery: 'Love Matcha, Mojo Market, 30 Regent Rd, Sea Point, Cape Town, 8060',
    hours: [
      { days: 'Mon – Thu', hours: '10:00 – 22:00' },
      { days: 'Fri – Sat', hours: '08:00 – 23:00' },
      { days: 'Sun', hours: '10:00 – 22:00' },
    ],
    images: placeholderImages(3),
  },
  {
    id: 'somerset-west',
    name: 'Somerset West',
    email: STORE_EMAIL,
    address: '1 Bright St, Somerset West',
    mapsQuery: 'Love Matcha, 1 Bright St, Somerset West',
    hours: [
      { days: 'Mon – Thu', hours: '08:00 – 18:00' },
      { days: 'Fri – Sat', hours: '08:00 – 19:00' },
      { days: 'Sun & PH', hours: '08:00 – 17:00' },
    ],
    images: placeholderImages(4),
  },
  {
    id: 'rondebosch',
    name: 'Rondebosch',
    email: STORE_EMAIL,
    address: '18 Main Road, Rondebosch, Cape Town, 7700',
    phone: '+27 72 565 5958',
    mapsQuery: 'Love Matcha, 18 Main Road, Rondebosch, Cape Town, 7700',
    hours: [{ days: 'Daily', hours: '09:00 – 21:00' }],
    images: placeholderImages(0),
  },
  {
    id: 'table-bay-mall',
    name: 'Table Bay Mall',
    email: STORE_EMAIL,
    address: 'R27 & Boulevard, Cape Town, 7741',
    mapsQuery: 'Love Matcha, Table Bay Mall, R27 & Boulevard, Cape Town, 7741',
    hours: [
      { days: 'Mon – Sat', hours: '09:00 – 20:00' },
      { days: 'Sun', hours: '09:00 – 18:00' },
    ],
    images: placeholderImages(1),
  },
];
