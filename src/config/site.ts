export const siteConfig = {
  name: "M2B",
  description:
    "M2B is a software and IT services company delivering custom software, mobile apps, ERP systems, and websites.",
  tagline: "Connecting today, building tomorrow",
  positioning: "Technology | Innovation | Solutions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "252000000000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+252000000000",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  logos: {
    mark: "/brand/M2B.svg",
    markPng: "/brand/M2B.png",
    lockup: "/brand/M2B-lockup.svg",
    lockupPng: "/brand/M2B-lockup.png",
    icon: "/brand/M2B-icon.png",
  },
} as const;

export function getWhatsAppUrl(message: string) {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getMailtoUrl() {
  return `mailto:${siteConfig.contactEmail}`;
}

export function getTelUrl() {
  return `tel:${siteConfig.contactPhone.replace(/[\s()-]/g, "")}`;
}
