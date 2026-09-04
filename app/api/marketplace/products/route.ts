import { NextResponse } from "next/server";
import { products } from "@/backend/data/products";
import type { ProductSummary } from "@/backend/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim();
  const category = searchParams.get("category");

  let list = products;
  if (category) list = list.filter((p) => p.category === category);
  if (q) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  const data: ProductSummary[] = list.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    image: p.image,
    basePrice: p.basePrice,
    mrp: p.mrp,
    maxEmiMonths: Math.max(...p.emiPlans.map((e) => e.months)),
  }));

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return NextResponse.json({ data, categories });
}
