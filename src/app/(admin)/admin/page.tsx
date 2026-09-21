import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function AdminPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <Image
        src={siteConfig.logos.markPng}
        alt={siteConfig.name}
        width={180}
        height={153}
        priority
        className="mb-8 h-24 w-auto"
      />
      <h1 className="text-3xl font-bold text-navy md:text-4xl">Admin</h1>
      <p className="mt-4 max-w-md text-sm text-navy-mid">
        The CMS will be built in a later wave.
      </p>
    </main>
  );
}
