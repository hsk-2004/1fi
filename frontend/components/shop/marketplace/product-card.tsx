import Link from "next/link";
import type { ProductSummary } from "@/backend/types";
import { formatINR } from "@/frontend/lib/utils";

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      href={`/shop/marketplace/${product.id}`}
      className="flex flex-col overflow-hidden rounded-[18px] border border-zinc-200 bg-white shadow-[0_2px_6px_rgba(20,14,50,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(20,14,50,0.06)]"
    >
      <div className="relative aspect-square w-full bg-zinc-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          src={product.image}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="line-clamp-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
          {product.brand}
        </p>
        <h3 className="line-clamp-2 text-[14px] font-semibold leading-[1.3] tracking-[-0.01em] text-gray-900">
          {product.name}
        </h3>
        <div className="mt-auto flex items-baseline gap-1.5 pt-1">
          <span className="text-[15px] font-bold text-gray-900">
            {formatINR(product.basePrice)}
          </span>
          {product.mrp > product.basePrice && (
            <span className="text-[12px] text-gray-400 line-through">
              {formatINR(product.mrp)}
            </span>
          )}
        </div>
        <span className="mt-1 inline-block w-fit rounded-full bg-[#f5f0ff] px-2 py-0.5 text-[10.5px] font-semibold text-[#712CDC]">
          No-cost EMI upto {product.maxEmiMonths}mo
        </span>
      </div>
    </Link>
  );
}
