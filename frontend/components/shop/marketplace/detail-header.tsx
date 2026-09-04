"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function DetailHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 -mx-4 flex items-center gap-3 bg-white/90 px-4 py-3 backdrop-blur md:-mx-6 lg:-mx-8">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-gray-700 active:scale-95"
      >
        <ArrowLeft className="h-[18px] w-[18px]" />
      </button>
      <h1 className="truncate text-[16px] font-semibold tracking-[-0.012em] text-gray-900">
        {title}
      </h1>
    </div>
  );
}
