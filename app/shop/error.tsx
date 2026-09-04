"use client";

import { TriangleAlert } from "lucide-react";

export default function ShopError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-zinc-200 bg-white px-6 py-9 text-center shadow-[0_2px_6px_rgba(20,14,50,0.04)]">
      <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
        <TriangleAlert className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold tracking-[-0.015em] text-gray-900">
        Something went wrong
      </h3>
      <p className="mt-1.5 max-w-[30ch] text-[13.5px] leading-[1.45] text-gray-500">
        We ran into an issue loading the Shop page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-full bg-[#712CDC] px-5 py-2.5 text-[13.5px] font-semibold text-white hover:bg-[#5b24b5]"
      >
        Try again
      </button>
    </div>
  );
}
