"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const count = images.length;

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (count === 0) return null;

  const current = images[index] ?? images[0];
  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + count) % count);
  };

  return (
    <section aria-label={galleryLabel} className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-mono text-xs font-bold tracking-[0.18em] text-[#D4AF37] uppercase">
          {galleryLabel}
        </h2>
        <span className="font-mono text-[11px] text-slate-500">
          {index + 1} / {count}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#081B38] shadow-2xl">
        <div className="relative aspect-[16/10] w-full bg-[#051329]">
          <Image
            key={current.id}
            src={current.image_url}
            alt={current.alt_text || `${title} screenshot ${index + 1}`}
            fill
            className="object-contain p-2 sm:p-4"
            sizes="(max-width: 1024px) 100vw, 70vw"
            priority={index === 0}
          />
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={prevLabel}
              className="absolute top-1/2 start-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#051329]/85 text-[#D4AF37] backdrop-blur transition hover:border-[#D4AF37]/50 hover:bg-[#0B2F6B]"
            >
              <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={nextLabel}
              className="absolute top-1/2 end-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#051329]/85 text-[#D4AF37] backdrop-blur transition hover:border-[#D4AF37]/50 hover:bg-[#0B2F6B]"
            >
              <ChevronRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${title} ${i + 1}`}
              aria-current={i === index}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition sm:h-20 sm:w-28 ${
                i === index
                  ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/40"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.image_url}
                alt=""
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
