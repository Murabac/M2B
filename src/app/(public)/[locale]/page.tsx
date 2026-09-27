import { setRequestLocale } from "next-intl/server";
import { CapabilitiesBand } from "@/components/home/CapabilitiesBand";
import { ContactSection } from "@/components/home/ContactSection";
import { Hero } from "@/components/home/Hero";
import { ProcessOrbit } from "@/components/home/ProcessOrbit";
import { ProductsBento } from "@/components/home/ProductsBento";
import { TrustStrip } from "@/components/home/TrustStrip";
import { getLocaleFromParams } from "@/i18n/locale";
import {
  getBentoProjects,
  getHeroProjects,
  getPublishedProcessSteps,
  getPublishedServices,
  getPublishedTrustSectors,
} from "@/lib/supabase/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function HomePage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const [services, heroProjects, bentoProjects, sectors, processSteps] =
    await Promise.all([
      getPublishedServices(),
      getHeroProjects(),
      getBentoProjects(),
      getPublishedTrustSectors(),
      getPublishedProcessSteps(),
    ]);

  return (
    <main>
      <Hero projects={heroProjects} />
      <TrustStrip sectors={sectors} />
      <CapabilitiesBand services={services} />
      <ProductsBento projects={bentoProjects} />
      <ProcessOrbit steps={processSteps} />
      <ContactSection />
    </main>
  );
}
