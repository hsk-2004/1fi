"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";
import { EmptyState } from "./empty-state";
import { LogoImage } from "./logo-image";
import { useBrands } from "@/frontend/hooks/use-shop-data";
import { useDebouncedValue } from "@/frontend/hooks/use-debounced-value";

export function TopBrandsSection() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 250);
  const { data, isLoading, isError } = useBrands(debouncedQuery);

  return (
    <div className="flex flex-col gap-3">
      <SearchInput value={query} onChange={setQuery} placeholder="Search online stores..." />

      <div className="flex items-center justify-between gap-3">
        <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900">
          Top Brands
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5"
            >
              <div className="h-16 w-16 shrink-0 rounded-xl bg-zinc-100" />
              <div className="min-w-0 flex-1 py-0.5">
                <div className="h-[16px] w-3/4 rounded bg-zinc-200" />
                <div className="mt-1.5 h-3 w-1/2 rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          icon={Search}
          title="Something went wrong"
          description="We couldn't load brands right now. Please try again."
        />
      )}

      {!isLoading && !isError && data?.length === 0 && (
        <EmptyState
          icon={Search}
          title="No matching stores found"
          description="Try a different store or brand name."
        />
      )}

      {!isLoading &&
        !isError &&
        data?.map((brand) => (
          <button
            key={brand.id}
            type="button"
            className="flex w-full cursor-pointer items-center gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5 text-left shadow-[0_2px_6px_rgba(20,14,50,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(20,14,50,0.06)]"
          >
            <div className="relative mr-2 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200">
              <LogoImage src={brand.logo} alt={brand.name} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[18px] font-semibold leading-[1.25] tracking-[-0.012em] text-gray-900">
                {brand.name}
              </h3>
              <p className="mt-1 line-clamp-3 text-[13px] leading-[1.45] text-gray-500">
                No-cost EMIs upto {brand.maxEmiMonths} months
              </p>
            </div>
          </button>
        ))}
    </div>
  );
}
