import { NextResponse } from "next/server";
import { nearbyStores, nearbyStoreCities } from "@/lib/mock/stores";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim();
  const city = searchParams.get("city");

  let data = nearbyStores;
  if (city) data = data.filter((s) => s.city === city);
  if (q) data = data.filter((s) => s.name.toLowerCase().includes(q));

  return NextResponse.json({ data, cities: nearbyStoreCities });
}
