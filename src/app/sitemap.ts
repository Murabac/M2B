import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/routing";
import { getPublishedProjectSlugs } from "@/lib/supabase/queries";

const paths = [
  "",
  "/services",
  "/portfolio",
  "/products",
  "/studio",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const slugs = await getPublishedProjectSlugs().catch(() => []);
  const allPaths = [
    ...paths,
    ...slugs.map((slug) => `/portfolio/${slug}`),
  ];

  return allPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [code, `${base}/${code}${path}`]),
        ),
      },
    })),
  );
}
