"use client";

export type ShopTab = "top-brands" | "nearby-stores" | "marketplace";

const tabs: { id: ShopTab; label: string }[] = [
  { id: "top-brands", label: "Top Brands" },
  { id: "nearby-stores", label: "Nearby Stores" },
  { id: "marketplace", label: "1Fi Marketplace" },
];

export function ShopTabs({
  active,
  onChange,
}: {
  active: ShopTab;
  onChange: (tab: ShopTab) => void;
}) {
  return (
    <div
      className="flex gap-2 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`relative flex-1 rounded-full py-[11px] text-center text-sm font-semibold tracking-[-0.005em] transition-all ${
              isActive
                ? "bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-1.5 left-1/2 h-[2.5px] w-[22px] -translate-x-1/2 rounded-full bg-[#712CDC]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
