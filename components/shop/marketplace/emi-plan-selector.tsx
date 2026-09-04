import type { EmiPlan } from "@/lib/types";
import { formatINR } from "@/lib/utils";
import { monthlyAmount } from "@/lib/emi";

export function EmiPlanSelector({
  plans,
  price,
  selectedId,
  onSelect,
}: {
  plans: EmiPlan[];
  price: number;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-gray-900">Choose an EMI plan</p>
      <div className="mt-2 flex flex-col gap-2">
        {plans.map((plan) => {
          const active = plan.id === selectedId;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              className={`flex items-center justify-between gap-3 rounded-[16px] border p-3.5 text-left transition-colors ${
                active
                  ? "border-[#712CDC] bg-[#f5f0ff]"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <div>
                <p className="text-[14px] font-semibold text-gray-900">
                  {plan.months} months
                </p>
                <p className="mt-0.5 text-[12px] text-gray-500">No-cost EMI · no interest</p>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-bold text-gray-900">
                  {formatINR(monthlyAmount(price, plan))}
                  <span className="text-[11px] font-medium text-gray-500">/mo</span>
                </p>
              </div>
              <span
                className={`ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  active ? "border-[#712CDC]" : "border-zinc-300"
                }`}
              >
                {active && <span className="h-2.5 w-2.5 rounded-full bg-[#712CDC]" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
