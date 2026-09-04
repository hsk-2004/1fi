import type { Brand, NearbyStore, Product, ProductSummary } from "@/lib/types";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchBrands(query?: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  const { data } = await getJSON<{ data: Brand[] }>(`/api/shop/brands?${params}`);
  return data;
}

export async function fetchStores(opts: { query?: string; city?: string }) {
  const params = new URLSearchParams();
  if (opts.query) params.set("q", opts.query);
  if (opts.city) params.set("city", opts.city);
  return getJSON<{ data: NearbyStore[]; cities: string[] }>(
    `/api/shop/stores?${params}`
  );
}

export async function fetchProducts(opts: { query?: string; category?: string } = {}) {
  const params = new URLSearchParams();
  if (opts.query) params.set("q", opts.query);
  if (opts.category) params.set("category", opts.category);
  return getJSON<{ data: ProductSummary[]; categories: string[] }>(
    `/api/marketplace/products?${params}`
  );
}

export async function fetchProduct(productId: string) {
  const { data } = await getJSON<{ data: Product }>(
    `/api/marketplace/products/${productId}`
  );
  return data;
}
