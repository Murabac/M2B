import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getLocaleFromParams } from "@/i18n/locale";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const { slug } = await params;
  const t = await getTranslations("ProjectPage");

  return <PlaceholderPage title={t("title")} description={slug} />;
}
