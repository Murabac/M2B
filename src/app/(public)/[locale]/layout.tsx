import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ibmPlexArabic, kamerik } from "@/config/fonts";
import { getLocaleFromParams } from "@/i18n/locale";
import { isRtlLocale, routing } from "@/i18n/routing";
import "../../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const messages = await getMessages();
  const rtl = isRtlLocale(locale);

  return (
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={`${kamerik.variable} ${ibmPlexArabic.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col ${rtl ? "font-arabic" : "font-sans"}`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
