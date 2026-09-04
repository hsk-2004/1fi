export interface Brand {
  id: string;
  name: string;
  logo: string;
  maxEmiMonths: number;
}

export interface NearbyStore {
  id: string;
  name: string;
  initials: string;
  color: string;
  address: string;
  city: string;
  distanceKm: number;
}

export interface ProductVariant {
  id: string;
  label: string;
  priceDelta: number;
}

export interface EmiPlan {
  id: string;
  months: number;
  processingFee: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  basePrice: number;
  mrp: number;
  rating: number;
  ratingCount: number;
  highlights: string[];
  variantGroupLabel: string;
  variants: ProductVariant[];
  emiPlans: EmiPlan[];
}

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  basePrice: number;
  mrp: number;
  maxEmiMonths: number;
}
