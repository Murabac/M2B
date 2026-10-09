import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata, Viewport } from "next";
import { FloatingWhatsApp } from "@/components/contact/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ibmPlexArabic, kamerik } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { getLocaleFromParams } from "@/i18n/locale";
import { isRtlLocale, routing } from "@/i18n/routing";
import {
  buildWhatsAppUrl,
  getContactChannels,
} from "@/lib/contact/channels";
import "../../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  // light dark = we handle both; stops Android Chrome Auto Dark from rewriting colors
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05142e" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    applicationName: t("siteName"),
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar" : locale === "so" ? "so" : "en",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "color-scheme": "light dark",
      "supported-color-schemes": "light dark",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const messages = await getMessages();
  const rtl = isRtlLocale(locale);
  const tContact = await getTranslations({ locale, namespace: "Contact" });
  const channels = await getContactChannels();
  const whatsappHref = buildWhatsAppUrl(
    channels.whatsapp,
    tContact("whatsappMessage"),
  );
  const siteUrl = siteConfig.url.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "M2B",
        alternateName: ["m2btek", "M2B Tek"],
        url: siteUrl,
        logo: `${siteUrl}/brand/M2B-icon.png`,
        email: channels.email,
      },
      {
        "@type": "WebSite",
        name: "m2btek",
        alternateName: "M2B",
        url: siteUrl,
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={`${kamerik.variable} ${ibmPlexArabic.variable} h-full antialiased`}
      style={{ colorScheme: "light dark" }}
    >
      <body
        className={`flex min-h-full flex-col ${rtl ? "font-arabic" : "font-sans"}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
          <FloatingWhatsApp href={whatsappHref} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
