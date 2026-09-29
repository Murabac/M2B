type Props = {
  label: string;
  title: string;
  verse: string;
  closing: string;
  parts: {
    glyph: string;
    surname: string;
    line: string;
  }[];
  equation: string;
};

export function StudioNameOrigin({
  label,
  title,
  verse,
  closing,
  parts,
  equation,
}: Props) {
  return (
    <section
      aria-labelledby="studio-name-origin"
      className="relative mb-20 overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#081B38] via-[#06152F] to-[#0A2850] p-8 shadow-xl sm:p-12 lg:p-16"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dot-pattern-dark opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -start-16 h-80 w-80 rounded-full bg-[#2A5082]/40 blur-3xl"
        aria-hidden
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="mb-3 block font-mono text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
            {label}
          </span>
          <h2
            id="studio-name-origin"
            className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mb-5 text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8">
            {verse}
          </p>
          <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
            {closing}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-8 flex items-end justify-center gap-2 sm:gap-3">
            <span
              className="gold-gradient-text text-7xl font-black leading-none tracking-tight sm:text-8xl lg:text-9xl"
              aria-hidden
            >
              M
            </span>
            <span
              className="pb-2 font-mono text-2xl font-bold text-[#D4AF37]/70 sm:pb-3 sm:text-3xl"
              aria-hidden
            >
              +
            </span>
            <span
              className="gold-gradient-text text-7xl font-black leading-none tracking-tight sm:text-8xl lg:text-9xl"
              aria-hidden
            >
              2B
            </span>
          </div>

          <p className="mb-8 text-center font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">
            {equation}
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {parts.map((part) => (
              <div
                key={part.surname}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#051329]/70 p-5 transition hover:border-[#D4AF37]/40"
              >
                <div
                  className="pointer-events-none absolute top-0 start-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-60"
                  aria-hidden
                />
                <div className="mb-3 font-mono text-3xl font-black text-[#D4AF37]">
                  {part.glyph}
                </div>
                <div className="mb-1 text-sm font-bold tracking-tight">
                  {part.surname}
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  {part.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
