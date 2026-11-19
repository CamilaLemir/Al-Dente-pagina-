export type PastaCategory = 'Rellenas' | 'Clásicas' | 'Cintas';
export type WeightFormat = '1/2 kg' | '1 kg';

export interface PastaProduct {
  id: string;
  name: string;
  category: PastaCategory;
  description: string;
  image: string;
  imageAlt: string;
  cookTime: string;
  variants?: string[];
  variantLabel?: string;
  prices: Record<WeightFormat, number>;
  portions: Record<WeightFormat, string>;
}

export interface ReservationItem {
  key: string;
  productId: string;
  productName: string;
  format: WeightFormat;
  variant?: string;
  unitPrice: number;
  quantity: number;
}

export const WHATSAPP_NUMBER = '5491134567890';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatARS(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const PASTA_CATALOG: PastaProduct[] = [
  {
    id: 'ravioles',
    name: 'Ravioles Artesanales',
    category: 'Rellenas',
    description:
      'Variedad de sabores caseros con masa tierna al huevo y relleno abundante, hechos cada mañana como en la cocina de casa.',
    image: '/src/assets/images/product_ravioles_1795111666666.jpg',
    imageAlt: 'Ravioles artesanales recién armados sobre tabla de madera enharinada',
    cookTime: '5 a 6 min',
    variantLabel: 'Sabor preferido',
    variants: ['Verdura y Ricota', 'Calabaza Asada y Queso', 'Pollo y Espinaca'],
    prices: {
      '1/2 kg': 6800,
      '1 kg': 12800,
    },
    portions: {
      '1/2 kg': 'Rinde 2 porciones generosas',
      '1 kg': 'Rinde 4 a 5 porciones',
    },
  },
  {
    id: 'sorrentinos',
    name: 'Sorrentinos de Jamón y Muzzarella',
    category: 'Rellenas',
    description:
      'El clásico infaltable del domingo: bien cargados de muzzarella cremosa y jamón cocido natural, con masa firme que nunca se abre.',
    image: '/src/assets/images/product_sorrentinos_1795111666144.jpg',
    imageAlt: 'Sorrentinos artesanales rellenos de jamón y muzzarella derretida con albahaca',
    cookTime: '6 a 7 min',
    variantLabel: 'Presentación',
    variants: ['Clásicos masa al huevo', 'Masa de espinaca'],
    prices: {
      '1/2 kg': 7400,
      '1 kg': 13900,
    },
    portions: {
      '1/2 kg': 'Rinde 2 porciones generosas',
      '1 kg': 'Rinde 4 a 5 porciones',
    },
  },
  {
    id: 'noquis',
    name: 'Ñoquis de Papa',
    category: 'Clásicas',
    description:
      'Suaves y livianos, amasados con papa natural hervida con cáscara y la medida justa de harina. Ideales para lucirse con cualquier salsa.',
    image: '/src/assets/images/product_noquis_1795111666562.jpg',
    imageAlt: 'Ñoquis de papa caseros marcados a mano sobre tabla tradicional de madera',
    cookTime: '3 a 4 min',
    variantLabel: 'Variedad',
    variants: ['Tradicionales de papa', 'Papa y espinaca'],
    prices: {
      '1/2 kg': 5200,
      '1 kg': 9800,
    },
    portions: {
      '1/2 kg': 'Rinde 2 porciones abundantes',
      '1 kg': 'Rinde 4 a 5 porciones',
    },
  },
  {
    id: 'cintas',
    name: 'Fideos Cortados a Cuchillo / Cintas',
    category: 'Cintas',
    description:
      'Cintas largas cortadas a cuchillo con textura porosa para abrazar bien el tuco o la crema. Disponibles al huevo o con espinaca fresca.',
    image: '/src/assets/images/product_cintas_1795111666505.jpg',
    imageAlt: 'Nidos de fideos cintas artesanales al huevo y de espinaca fresca',
    cookTime: '3 a 4 min',
    variantLabel: 'Masa',
    variants: ['Al huevo', 'De espinaca fresca', 'Mixto (mitad y mitad)'],
    prices: {
      '1/2 kg': 4900,
      '1 kg': 9200,
    },
    portions: {
      '1/2 kg': 'Rinde 2 a 3 porciones',
      '1 kg': 'Rinde 5 porciones',
    },
  },
];

export const DELIVERY_DAYS = [
  'Hoy (sujeto a stock del día)',
  'Mañana',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo (Mesa familiar)',
];

export const TIME_SLOTS = [
  '10:00 a 13:00 hs',
  '13:00 a 16:00 hs',
  '17:00 a 20:00 hs',
];
