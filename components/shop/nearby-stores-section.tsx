"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { SearchInput } from "./search-input";
import { EmptyState } from "./empty-state";
import { LocationDrawer } from "./location-drawer";
import { useStores } from "@/hooks/use-shop-data";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

export function NearbyStoresSection() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Gurugram");
  const [locationDrawerOpen, setLocationDrawerOpen] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 250);
  const { data, isLoading, isError } = useStores({ query: debouncedQuery, city });

  return (
    <div className="flex flex-col gap-3">
      <SearchInput value={query} onChange={setQuery} placeholder="Search stores..." />

      <div className="flex items-center justify-between gap-3">
        <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900">
          Nearby Stores
        </p>
        <button
          type="button"
          onClick={() => setLocationDrawerOpen(true)}
          className="flex items-center gap-1 rounded-full border border-[#ece5ff] bg-[#f5f0ff] px-3 py-1.5 text-sm font-semibold text-[#712CDC]"
        >
          {city}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <LocationDrawer
        open={locationDrawerOpen}
        onOpenChange={setLocationDrawerOpen}
        onSelectCity={setCity}
      />

      {isLoading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5"
            >
              <div className="h-16 w-16 shrink-0 rounded-xl bg-zinc-100" />
              <div className="min-w-0 flex-1 py-0.5">
                <div className="h-[16px] w-3/4 rounded bg-zinc-200" />
                <div className="mt-1.5 h-3 w-full rounded bg-zinc-100" />
                <div className="mt-1.5 h-3 w-2/3 rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <EmptyState
          icon={MapPin}
          title="Something went wrong"
          description="We couldn't load stores right now. Please try again."
        />
      )}

      {!isLoading && !isError && data?.data.length === 0 && (
        <EmptyState
          icon={MapPin}
          title="No matching stores found"
          description="Try a different store or brand name."
        />
      )}

      {!isLoading &&
        !isError &&
        data?.data.map((store) => (
          <div
            key={store.id}
            className="flex items-center gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5 shadow-[0_2px_6px_rgba(20,14,50,0.04)]"
          >
            <div className="flex h-16 w-16 relative overflow-hidden rounded-xl border border-gray-200 items-center justify-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={store.name}
                loading="lazy"
                className="object-cover absolute inset-0 h-full w-full"
                src={store.logo}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-[16px] font-semibold leading-[1.25] tracking-[-0.012em] text-gray-900">
                  {store.name}
                </h3>
                <span className="shrink-0 rounded-full bg-[#f5f0ff] px-2 py-0.5 text-[11px] font-semibold text-[#712CDC]">
                  {store.distanceKm} KM
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.45] text-gray-500">
                {store.address}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
