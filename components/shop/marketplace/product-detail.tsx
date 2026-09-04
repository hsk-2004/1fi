"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, PackageX } from "lucide-react";
import { useProduct } from "@/hooks/use-shop-data";
import { formatINR } from "@/lib/utils";
import { monthlyAmount } from "@/lib/emi";
import { DetailHeader } from "./detail-header";
import { VariantSelector } from "./variant-selector";
import { EmiPlanSelector } from "./emi-plan-selector";
import { EmptyState } from "../empty-state";

export function ProductDetail({ productId }: { productId: string }) {
  const { data: product, isLoading, isError } = useProduct(productId);
  const router = useRouter();

  const [variantId, setVariantId] = useState<string>("");
  const [emiPlanId, setEmiPlanId] = useState<string>("");

  const effectiveVariantId = variantId || product?.variants[0]?.id || "";
  const effectiveEmiPlanId = emiPlanId || product?.emiPlans[0]?.id || "";

  const price = useMemo(() => {
    if (!product) return 0;
    const variant = product.variants.find((v) => v.id === effectiveVariantId);
    return product.basePrice + (variant?.priceDelta ?? 0);
  }, [product, effectiveVariantId]);

  const selectedPlan = product?.emiPlans.find((p) => p.id === effectiveEmiPlanId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <DetailHeader title="" />
        <div className="aspect-square w-full animate-pulse rounded-[20px] bg-zinc-100" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-200" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-100" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col gap-4">
        <DetailHeader title="Product" />
        <EmptyState
          icon={PackageX}
          title="Product not found"
          description="This product may have been removed or is unavailable."
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-44">
      <DetailHeader title={product.name} />

      <div className="relative aspect-square w-full overflow-hidden rounded-[20px] border border-zinc-200 bg-zinc-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          src={product.image}
        />
      </div>

      <div>
        <p className="text-[12px] font-medium uppercase tracking-wide text-gray-400">
          {product.brand}
        </p>
        <h1 className="mt-0.5 text-[20px] font-semibold leading-[1.25] tracking-[-0.015em] text-gray-900">
          {product.name}
        </h1>
        <div className="mt-1.5 flex items-center gap-1.5">
          <Star className="h-[15px] w-[15px] fill-amber-400 text-amber-400" />
          <span className="text-[13px] font-semibold text-gray-700">{product.rating}</span>
          <span className="text-[12.5px] text-gray-400">
            ({product.ratingCount.toLocaleString("en-IN")} ratings)
          </span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-[22px] font-bold text-gray-900">{formatINR(price)}</span>
          {product.mrp > product.basePrice && (
            <span className="text-[14px] text-gray-400 line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>
      </div>

      <VariantSelector
        label={product.variantGroupLabel}
        variants={product.variants}
        selectedId={effectiveVariantId}
        onSelect={setVariantId}
      />

      <EmiPlanSelector
        plans={product.emiPlans}
        price={price}
        selectedId={effectiveEmiPlanId}
        onSelect={setEmiPlanId}
      />

      <div>
        <p className="text-[13px] font-semibold text-gray-900">Product details</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[13px] leading-[1.5] text-gray-600">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gray-400" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(96px+env(safe-area-inset-bottom))] z-40 px-3">
        <div className="mx-auto flex max-w-[500px] items-center justify-between gap-3 rounded-[20px] border border-zinc-200 bg-white p-3 shadow-[0_8px_32px_rgba(20,14,50,0.12)]">
          <div className="min-w-0">
            <p className="text-[11px] text-gray-500">Selected plan</p>
            <p className="truncate text-[15px] font-bold text-gray-900">
              {selectedPlan
                ? `${formatINR(monthlyAmount(price, selectedPlan))}/mo × ${selectedPlan.months}mo`
                : "—"}
            </p>
          </div>
          <button
            type="button"
            disabled={!selectedPlan}
            onClick={() =>
              router.push(
                `/shop/marketplace/${product.id}/checkout?variant=${variantId}&plan=${emiPlanId}`
              )
            }
            className="shrink-0 rounded-full bg-[#712CDC] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#5b24b5] disabled:opacity-50"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
