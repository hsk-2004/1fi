import { NextResponse } from "next/server";
import { products } from "@/backend/data/products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}
