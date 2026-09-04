export function PageStub({ title }: { title: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-lg font-bold tracking-[-0.015em] text-gray-900">{title}</h1>
      <p className="mt-1.5 max-w-[30ch] text-[13.5px] leading-[1.45] text-gray-500">
        This section is outside the scope of this assignment.
      </p>
    </div>
  );
}
