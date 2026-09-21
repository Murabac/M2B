import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

type Props = {
  title: string;
  description?: string;
};

export async function PlaceholderPage({ title, description }: Props) {
  const t = await getTranslations("Common");

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
      <h1 className="max-w-2xl text-3xl font-bold text-navy md:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-lg text-base text-navy-mid">{description}</p>
      ) : null}
      <p className="mt-6 max-w-md text-sm text-navy-mid">{t("placeholder")}</p>
    </main>
  );
}
