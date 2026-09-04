import { CheckoutSummary } from "@/frontend/components/shop/marketplace/checkout-summary";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ variant?: string; plan?: string }>;
}) {
  const { productId } = await params;
  const { variant, plan } = await searchParams;

  return (
    <CheckoutSummary
      productId={productId}
      variantId={variant ?? ""}
      planId={plan ?? ""}
    />
  );
}
