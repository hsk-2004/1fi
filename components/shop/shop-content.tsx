"use client";

import { useState } from "react";
import { ShopBanner } from "./shop-banner";
import { ShopTabs, type ShopTab } from "./shop-tabs";
import { TopBrandsSection } from "./top-brands-section";
import { NearbyStoresSection } from "./nearby-stores-section";
import { MarketplaceSection } from "./marketplace/marketplace-section";

export function ShopContent({ initialTab = "top-brands" }: { initialTab?: ShopTab }) {
  const [tab, setTab] = useState<ShopTab>(initialTab);

  return (
    <div className="relative pb-24">
      <ShopBanner />

      <div className="relative z-[2] -mt-7 flex flex-col gap-4 px-1">
        <ShopTabs active={tab} onChange={setTab} />
      </div>

      <div className="mt-3.5 px-1">
        {tab === "top-brands" && <TopBrandsSection />}
        {tab === "nearby-stores" && <NearbyStoresSection />}
        {tab === "marketplace" && <MarketplaceSection />}
      </div>
    </div>
  );
}
