import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-zinc-200 bg-white px-6 py-9 text-center shadow-[0_2px_6px_rgba(20,14,50,0.04)]">
      <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold tracking-[-0.015em] text-gray-900">{title}</h3>
      <p className="mt-1.5 max-w-[30ch] text-[13.5px] leading-[1.45] text-gray-500">
        {description}
      </p>
    </div>
  );
}
