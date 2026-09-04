export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-100" />
      <div className="aspect-square w-full animate-pulse rounded-[20px] bg-zinc-100" />
      <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-200" />
      <div className="h-4 w-1/3 animate-pulse rounded bg-zinc-100" />
    </div>
  );
}
