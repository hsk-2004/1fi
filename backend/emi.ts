import type { EmiPlan } from "@/backend/types";

export function monthlyAmount(price: number, plan: EmiPlan) {
  return Math.ceil((price + plan.processingFee) / plan.months);
}
