import type { ProductVariant } from "@/lib/types";

export function VariantSelector({
  label,
  variants,
  selectedId,
  onSelect,
}: {
  label: string;
  variants: ProductVariant[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-gray-900">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {variants.map((variant) => {
          const active = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelect(variant.id)}
              className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                active
                  ? "border-[#712CDC] bg-[#f5f0ff] text-[#712CDC]"
                  : "border-zinc-200 bg-white text-gray-600"
              }`}
            >
              {variant.label}
              {variant.priceDelta > 0 ? ` (+₹${variant.priceDelta.toLocaleString("en-IN")})` : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
