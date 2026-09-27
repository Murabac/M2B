export default function Loading() {
  return (
    <div
      className="flex flex-1 items-center justify-center bg-[#051329] py-32"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-pulse rounded-full border-2 border-[#D4AF37]/40 border-t-[#D4AF37]" />
    </div>
  );
}
