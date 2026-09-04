"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { Navigation, Search } from "lucide-react";

export function LocationDrawer({
  open,
  onOpenChange,
  onSelectCity,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCity: (city: string) => void;
}) {
  const [pincode, setPincode] = useState("122001");

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-[500px] flex-col rounded-t-[24px] bg-white p-5 pb-[calc(20px+env(safe-area-inset-bottom))] outline-none">
          <div className="mx-auto mb-4 h-[5px] w-8 shrink-0 rounded-full bg-zinc-200" />
          <Drawer.Title className="text-lg font-bold tracking-[-0.015em] text-gray-900">
            Select Your Location
          </Drawer.Title>

          <button
            type="button"
            onClick={() => {
              onSelectCity("Gurugram");
              onOpenChange(false);
            }}
            className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-[#712CDC] bg-white p-3.5 text-left"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0ff] text-[#712CDC]">
              <Navigation className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[14.5px] font-semibold text-gray-900">
                Use Current Location
              </span>
              <span className="block text-[12.5px] text-gray-500">
                Grant location access to sort stores
              </span>
            </span>
          </button>

          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-zinc-200" />
            <span className="text-[11px] font-semibold tracking-wide text-gray-400">OR</span>
            <span className="h-px flex-1 bg-zinc-200" />
          </div>

          <label className="text-[13px] font-semibold text-gray-900">Enter Pincode</label>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex h-[46px] flex-1 items-center gap-[10px] rounded-full border border-gray-200 bg-white px-4">
              <Search className="h-[17px] w-[17px] shrink-0 text-gray-400" />
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                inputMode="numeric"
                maxLength={6}
                className="flex-1 bg-transparent text-[13.5px] text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectCity("Gurugram");
                onOpenChange(false);
              }}
              className="shrink-0 px-2 text-[14px] font-semibold text-[#712CDC]"
            >
              Search
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
