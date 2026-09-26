import { setRequestLocale } from "next-intl/server";
import { CapabilitiesBand } from "@/components/home/CapabilitiesBand";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedCases } from "@/components/home/FeaturedCases";
import { Hero } from "@/components/home/Hero";
import { ProcessOrbit } from "@/components/home/ProcessOrbit";
import { ProductsBento } from "@/components/home/ProductsBento";
import { TrustStrip } from "@/components/home/TrustStrip";
import { getLocaleFromParams } from "@/i18n/locale";
import {
  getFeaturedProjects,
  getPublishedProjects,
  getPublishedServices,
} from "@/lib/supabase/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function HomePage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const [services, featured, published] = await Promise.all([
    getPublishedServices(),
    getFeaturedProjects(),
    getPublishedProjects(),
  ]);

  return (
    <main>
      <Hero />
      <TrustStrip />
      <FeaturedCases projects={featured} />
      <CapabilitiesBand services={services} />
      <ProductsBento projects={published} />
      <ProcessOrbit />
      <ContactSection />
    </main>
  );
}
