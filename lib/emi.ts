import type { EmiPlan } from "@/lib/types";

export function monthlyAmount(price: number, plan: EmiPlan) {
  return Math.ceil((price + plan.processingFee) / plan.months);
}
