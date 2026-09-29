import { siteConfig } from "@/config/site";
import { getSiteSettings } from "@/lib/supabase/queries";

export type ContactChannels = {
  email: string;
  phone: string;
  phoneSecondary: string;
  whatsapp: string;
  city: string;
  country: string;
  coordinates: string;
  hoursWeekdays: string;
  hoursFriday: string;
  timezone: string;
  officeAddress: string;
};

/** Prefer CMS site_settings; fall back to env defaults in siteConfig. */
export async function getContactChannels(): Promise<ContactChannels> {
  const settings = await getSiteSettings();
  return {
    email: settings?.email || siteConfig.contactEmail,
    phone: settings?.phone_primary || siteConfig.contactPhone,
    phoneSecondary: settings?.phone_secondary || "",
    whatsapp: (settings?.whatsapp || siteConfig.whatsappNumber).replace(
      /\D/g,
      "",
    ),
    city: settings?.city || "Worldwide",
    country: settings?.country || "",
    coordinates: settings?.coordinates || "",
    hoursWeekdays: settings?.business_hours_weekdays || "08:00 – 17:00 EAT",
    hoursFriday: settings?.business_hours_friday || "Closed for prayer",
    timezone: settings?.timezone || "EAT · UTC+3",
    officeAddress: settings?.office_address || "",
  };
}

export function formatLocation(city: string, country: string) {
  return [city, country].map((part) => part.trim()).filter(Boolean).join(", ");
}

export function buildWhatsAppUrl(whatsappDigits: string, message: string) {
  const digits = whatsappDigits.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(email: string, subject?: string) {
  const base = `mailto:${email}`;
  return subject
    ? `${base}?subject=${encodeURIComponent(subject)}`
    : base;
}

export function buildTelUrl(phone: string) {
  return `tel:${phone.replace(/[\s()-]/g, "")}`;
}
