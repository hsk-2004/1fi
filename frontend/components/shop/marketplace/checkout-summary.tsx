"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, PackageX } from "lucide-react";
import { useProduct } from "@/frontend/hooks/use-shop-data";
import { formatINR } from "@/frontend/lib/utils";
import { monthlyAmount } from "@/backend/emi";
import { DetailHeader } from "./detail-header";
import { EmptyState } from "../empty-state";

export function CheckoutSummary({
  productId,
  variantId,
  planId,
}: {
  productId: string;
  variantId: string;
  planId: string;
}) {
  const { data: product, isLoading, isError } = useProduct(productId);
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <DetailHeader title="" />
        <div className="h-40 w-full animate-pulse rounded-[20px] bg-zinc-100" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col gap-4">
        <DetailHeader title="Checkout" />
        <EmptyState
          icon={PackageX}
          title="Product not found"
          description="This product may have been removed or is unavailable."
        />
      </div>
    );
  }

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const plan = product.emiPlans.find((p) => p.id === planId) ?? product.emiPlans[0];
  const price = product.basePrice + (variant?.priceDelta ?? 0);
  const monthly = plan ? monthlyAmount(price, plan) : 0;

  if (confirmed) {
    return (
      <div className="flex flex-col items-center gap-4 pt-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f0ff] text-[#712CDC]">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="text-lg font-bold tracking-[-0.015em] text-gray-900">
          Plan selected successfully
        </h1>
        <p className="max-w-[30ch] text-[13.5px] leading-[1.45] text-gray-500">
          {formatINR(monthly)}/mo for {plan?.months} months on {product.name}. This is a demo
          flow for the assignment — no real order has been placed.
        </p>
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="mt-2 rounded-full bg-[#712CDC] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#5b24b5]"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-44">
      <DetailHeader title="Confirm your plan" />

      <div className="flex items-center gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
            src={product.image}
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-gray-900">{product.name}</p>
          <p className="text-[12.5px] text-gray-500">{variant?.label}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-[18px] border border-zinc-200 bg-white p-4">
        <Row label="Product price" value={formatINR(price)} />
        <Row label="EMI tenure" value={`${plan?.months} months`} />
        <Row label="Interest" value="No-cost EMI" />
        <div className="my-1 h-px bg-zinc-100" />
        <Row label="Monthly payment" value={`${formatINR(monthly)}/mo`} bold />
      </div>

      <div className="fixed inset-x-0 bottom-[calc(96px+env(safe-area-inset-bottom))] z-40 px-3">
        <div className="mx-auto max-w-[500px] rounded-[20px] border border-zinc-200 bg-white p-3 shadow-[0_8px_32px_rgba(20,14,50,0.12)]">
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="w-full rounded-full bg-[#712CDC] py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#5b24b5]"
          >
            Confirm & Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13.5px] text-gray-500">{label}</span>
      <span
        className={`text-[13.5px] ${bold ? "font-bold text-gray-900" : "font-medium text-gray-800"}`}
      >
        {value}
      </span>
    </div>
  );
}
