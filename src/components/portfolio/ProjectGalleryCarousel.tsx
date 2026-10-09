"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectImage } from "@/lib/supabase/types";

type Props = {
  images: ProjectImage[];
  title: string;
  prevLabel: string;
  nextLabel: string;
  galleryLabel: string;
};

export function ProjectGalleryCarousel({
  images,
  title,
  prevLabel,
  nextLabel,
  galleryLabel,
}: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  useEffect(() => {
    setIndex(0);
  }, [images]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (!lightbox && !stageRef.current) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "Escape") {
        setLightbox(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  if (count === 0) return null;

  const current = images[index] ?? images[0];
  const alt = current.alt_text || `${title} screenshot ${index + 1}`;

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (Math.abs(delta) < 48) return;
    go(delta > 0 ? -1 : 1);
  };

  return (
    <section aria-label={galleryLabel} className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <h2>
          <span className="inline-flex items-center gap-2.5">
            <span className="grid shrink-0 grid-cols-2 gap-0.5" aria-hidden>
              <span className="h-1.5 w-1.5 bg-[#D4AF37]" />
              <span className="h-1.5 w-1.5 bg-[#D4AF37]/35" />
              <span className="h-1.5 w-1.5 bg-[#D4AF37]/35" />
              <span className="h-1.5 w-1.5 bg-[#D4AF37]" />
            </span>
            <span className="text-[15px] font-bold tracking-tight text-[#E5BE4A] sm:text-base">
              {galleryLabel}
            </span>
          </span>
          <span className="mt-2.5 flex items-center gap-2" aria-hidden>
            <span className="h-px w-7 bg-[#D4AF37]" />
            <span className="h-px min-w-0 flex-1 bg-gradient-to-r from-[#D4AF37]/45 via-[#D4AF37]/15 to-transparent" />
          </span>
        </h2>
        <span className="font-mono text-[11px] text-slate-500">
          {index + 1} / {count}
        </span>
      </div>

      <div className="mx-auto grid max-w-4xl gap-3 lg:grid-cols-[minmax(0,1fr)_4.5rem]">
        <div
          ref={stageRef}
          tabIndex={0}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#081B38] outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="relative block h-[220px] w-full bg-[#051329] sm:h-[280px] md:h-[320px]"
              aria-label={`Expand ${alt}`}
            >
              <Image
                key={current.id}
                src={current.image_url}
                alt={alt}
                fill
                className="object-contain p-2 transition duration-300 group-hover:scale-[1.02] sm:p-3"
                sizes="(max-width: 1024px) 100vw, 640px"
                priority={index === 0}
              />
              <span className="pointer-events-none absolute end-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#051329]/80 text-[#D4AF37] opacity-0 backdrop-blur transition group-hover:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden />
              </span>
            </button>

            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={prevLabel}
                  className="absolute top-1/2 start-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#051329]/85 text-[#D4AF37] backdrop-blur transition hover:border-[#D4AF37]/50 hover:bg-[#0B2F6B] sm:start-3 sm:h-9 sm:w-9"
                >
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={nextLabel}
                  className="absolute top-1/2 end-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#051329]/85 text-[#D4AF37] backdrop-blur transition hover:border-[#D4AF37]/50 hover:bg-[#0B2F6B] sm:end-3 sm:h-9 sm:w-9"
                >
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </>
            ) : null}
          </div>

          {count > 1 ? (
            <div className="flex justify-center gap-2 border-t border-white/5 px-3 py-4">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${title} ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-[#D4AF37]"
                      : "w-2 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>

        {count > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-0.5 lg:max-h-[320px] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${title} ${i + 1}`}
                aria-current={i === index}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition lg:h-14 lg:w-full ${
                  i === index
                    ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/40"
                    : "border-white/10 opacity-65 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020817]/92 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#051329] text-white hover:border-[#D4AF37]/50"
          >
            <X className="h-5 w-5" />
          </button>

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label={prevLabel}
                className="absolute start-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#051329]/90 text-[#D4AF37] sm:start-6"
              >
                <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label={nextLabel}
                className="absolute end-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#051329]/90 text-[#D4AF37] sm:end-6"
              >
                <ChevronRight className="h-5 w-5 rtl:rotate-180" />
              </button>
            </>
          ) : null}

          <div
            className="relative h-[min(78vh,720px)] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={current.image_url}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-400">
            {index + 1} / {count}
          </div>
        </div>
      ) : null}
    </section>
  );
}
