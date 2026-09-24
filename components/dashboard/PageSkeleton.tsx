type PageSkeletonProps = {
  className?: string;
};

export function PageSkeleton({ className }: PageSkeletonProps) {
  return (
    <div
      className={`mx-auto w-full space-y-4 px-4 py-10 sm:px-6 ${className ?? ""}`}
    >
      <div className="h-8 w-48 animate-pulse rounded-md bg-zinc-900" />
      <div className="h-32 animate-pulse rounded-lg bg-zinc-900" />
      <div className="h-32 animate-pulse rounded-lg bg-zinc-900" />
    </div>
  );
}
