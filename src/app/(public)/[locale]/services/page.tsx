import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { getLocaleFromParams } from "@/i18n/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const t = await getTranslations("ServicesPage");

  return <PlaceholderPage title={t("title")} />;
}
