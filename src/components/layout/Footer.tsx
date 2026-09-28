import { getTranslations } from "next-intl/server";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { ContactLink } from "@/components/contact/ContactLink";
import {
  IconEmail,
  IconPhone,
  IconWhatsApp,
} from "@/components/contact/icons";
import { EatClock } from "@/components/layout/EatClock";
import {
  getMailtoUrl,
  getTelUrl,
  getWhatsAppUrl,
  siteConfig,
} from "@/config/site";
import { Link } from "@/i18n/navigation";

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/portfolio", key: "portfolio" as const },
  { href: "/contact", key: "contact" as const },
];

export async function Footer() {
  const t = await getTranslations("Common");
  const tFooter = await getTranslations("Footer");
  const tContact = await getTranslations("Contact");
  const year = new Date().getFullYear();
  const whatsappHref = getWhatsAppUrl(tContact("whatsappMessage"));

  const contactItems = [
    {
      channel: "whatsapp" as const,
      href: whatsappHref,
      label: tContact("whatsapp"),
      icon: IconWhatsApp,
    },
    {
      channel: "email" as const,
      href: getMailtoUrl(),
      label: siteConfig.contactEmail,
      icon: IconEmail,
    },
    {
      channel: "phone" as const,
      href: getTelUrl(),
      label: siteConfig.contactPhone,
      icon: IconPhone,
    },
  ];

  return (
    <footer className="mt-auto border-t border-[rgba(11,47,107,0.4)] bg-[#030914] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-slate-800 pb-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span className="inline-flex rounded-lg bg-white p-1.5">
                <Image
                  src={siteConfig.logos.mark}
                  alt=""
                  width={40}
                  height={34}
                  unoptimized
                  className="h-8 w-auto"
                />
              </span>
              <span className="text-lg font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            <div className="pt-1">
              <span className="block font-mono text-xs font-bold tracking-widest text-gold uppercase">
                {siteConfig.positioning}
              </span>
              <p className="mt-1 text-sm font-medium text-slate-400">
                {tFooter("tagline")}
              </p>
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              {tFooter("studioBlurb")}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                <span>{tFooter("coordinates")}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/80 px-3 py-1.5">
                <Clock
                  className="h-3.5 w-3.5 text-emerald-400"
                  aria-hidden="true"
                />
                <EatClock />
              </div>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <span className="block font-mono text-xs font-bold tracking-wider text-gold uppercase">
              {tFooter("navigation")}
            </span>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {item.key === "contact" ? tFooter("contact") : t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-4">
            <span className="block font-mono text-xs font-bold tracking-wider text-gold uppercase">
              {tFooter("contact")}
            </span>
            <ul className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.channel}>
                    <ContactLink
                      channel={item.channel}
                      location="footer"
                      href={item.href}
                      className="inline-flex max-w-full items-center gap-2.5 text-sm text-slate-300 transition hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-gold" />
                      <span className="truncate">{item.label}</span>
                    </ContactLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="pt-6 text-xs text-slate-500">
          © {year} {siteConfig.name}. {tFooter("rights")}
        </p>
      </div>
    </footer>
  );
}
