import { NextResponse } from "next/server";
import { brands } from "@/lib/mock/brands";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim();

  const data = q ? brands.filter((b) => b.name.toLowerCase().includes(q)) : brands;

  return NextResponse.json({ data });
}
