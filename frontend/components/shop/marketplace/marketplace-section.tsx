"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { SearchInput } from "../search-input";
import { EmptyState } from "../empty-state";
import { ProductCard } from "./product-card";
import { useProducts } from "@/frontend/hooks/use-shop-data";
import { useDebouncedValue } from "@/frontend/hooks/use-debounced-value";

export function MarketplaceSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const debouncedQuery = useDebouncedValue(query, 250);
  const { data, isLoading, isError } = useProducts({ query: debouncedQuery, category });

  return (
    <div className="flex flex-col gap-3">
      <SearchInput value={query} onChange={setQuery} placeholder="Search products..." />

      <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900">
        1Fi Marketplace
      </p>

      {data && data.categories.length > 0 && (
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => setCategory(undefined)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              !category
                ? "border-[#712CDC] bg-[#712CDC] text-white"
                : "border-zinc-200 bg-white text-gray-600"
            }`}
          >
            All
          </button>
          {data.categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                category === c
                  ? "border-[#712CDC] bg-[#712CDC] text-white"
                  : "border-zinc-200 bg-white text-gray-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-[18px] border border-zinc-200 bg-white"
            >
              <div className="aspect-square w-full bg-zinc-100" />
              <div className="flex flex-col gap-2 p-3">
                <div className="h-2.5 w-1/2 rounded bg-zinc-100" />
                <div className="h-3.5 w-full rounded bg-zinc-200" />
                <div className="h-3.5 w-2/3 rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          icon={PackageSearch}
          title="Something went wrong"
          description="We couldn't load products right now. Please try again."
        />
      )}

      {!isLoading && !isError && data?.data.length === 0 && (
        <EmptyState
          icon={PackageSearch}
          title="No products found"
          description="Try a different product or category."
        />
      )}

      {!isLoading && !isError && data && data.data.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {data.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
