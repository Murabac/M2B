"use client";

import { useTranslations } from "next-intl";
import { ContactLink } from "@/components/contact/ContactLink";
import { IconWhatsApp } from "@/components/contact/icons";
import { getWhatsAppUrl } from "@/config/site";

export function FloatingWhatsApp() {
  const t = useTranslations("Contact");
  const href = getWhatsAppUrl(t("whatsappMessage"));

  return (
    <ContactLink
      channel="whatsapp"
      location="floating_button"
      href={href}
      aria-label={t("floatingWhatsApp")}
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
    >
      <IconWhatsApp className="h-7 w-7" />
    </ContactLink>
  );
}
