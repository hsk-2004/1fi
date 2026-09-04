"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Store, ReceiptIndianRupee, ChartNoAxesCombined, User } from "lucide-react";
import { cn } from "@/frontend/lib/utils";

const items = [
  { href: "/dashboard", label: "Home", icon: House },
  { href: "/shop", label: "Shop", icon: Store },
  { href: "/emi-dues", label: "EMI Dues", icon: ReceiptIndianRupee },
  { href: "/pledged-funds", label: "Limit", icon: ChartNoAxesCombined },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-[500px] items-stretch rounded-[28px] bg-white border border-white/40 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset]">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center transition-all duration-200",
                active ? "text-[#712CDC]" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {active && (
                <>
                  <span
                    className="absolute left-1/2 -top-[3px] h-[3px] w-8 -translate-x-1/2 rounded-full bg-[#712CDC]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-1 rounded-[14px] opacity-50"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 30%, rgba(113,44,220,0.12) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />
                </>
              )}
              <Icon
                className={cn(
                  "relative h-[22px] w-[22px] transition-transform duration-200 group-active:scale-90",
                  active && "drop-shadow-[0_0_6px_rgba(113,44,220,0.3)]"
                )}
                strokeWidth={active ? 2 : 1.75}
              />
              <span
                className={cn(
                  "relative max-w-full truncate text-[10px] tracking-wide",
                  active ? "font-bold" : "font-medium"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
