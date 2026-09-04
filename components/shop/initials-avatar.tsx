export function InitialsAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-white"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
