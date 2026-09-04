import { useQuery } from "@tanstack/react-query";
import {
  fetchBrands,
  fetchStores,
  fetchProducts,
  fetchProduct,
} from "@/lib/api-client";

export function useBrands(query: string) {
  return useQuery({
    queryKey: ["brands", query],
    queryFn: () => fetchBrands(query),
  });
}

export function useStores(opts: { query: string; city?: string }) {
  return useQuery({
    queryKey: ["stores", opts.query, opts.city],
    queryFn: () => fetchStores(opts),
  });
}

export function useProducts(opts: { query: string; category?: string }) {
  return useQuery({
    queryKey: ["products", opts.query, opts.category],
    queryFn: () => fetchProducts(opts),
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    enabled: !!productId,
  });
}
