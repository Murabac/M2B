import { getTranslations } from "next-intl/server";
import { Clock, ExternalLink, MapPin, Sparkles } from "lucide-react";
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

export async function ContactSection() {
  const t = await getTranslations("HomePage");
  const tContact = await getTranslations("Contact");
  const whatsappHref = getWhatsAppUrl(tContact("whatsappMessage"));

  const channels = [
    {
      channel: "whatsapp" as const,
      href: whatsappHref,
      title: tContact("whatsapp"),
      hint: tContact("whatsappHint"),
      detail: siteConfig.contactPhone,
      icon: IconWhatsApp,
      className:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20",
      iconWrap: "bg-emerald-500 text-white",
    },
    {
      channel: "email" as const,
      href: getMailtoUrl(),
      title: tContact("email"),
      hint: tContact("emailHint"),
      detail: siteConfig.contactEmail,
      icon: IconEmail,
      className:
        "border-navy/30 bg-navy/10 text-navy hover:bg-navy/20",
      iconWrap: "bg-navy text-gold",
    },
    {
      channel: "phone" as const,
      href: getTelUrl(),
      title: tContact("phone"),
      hint: tContact("phoneHint"),
      detail: siteConfig.contactPhone,
      icon: IconPhone,
      className:
        "border-gold/40 bg-gold/10 text-foreground hover:bg-gold/20",
      iconWrap: "bg-gold text-slate-950",
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-b border-slate-200 bg-[#FAFBFD] py-16 text-foreground sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("contactLabel")}</span>
          </div>
          <h2 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t("contactTitleBefore")}{" "}
            <span className="gold-gradient-text">{t("contactTitleAccent")}</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            {t("contactSupporting")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <span className="block font-mono text-xs font-bold tracking-wider text-gold uppercase">
              {t("contactChannelsLabel")}
            </span>
            {channels.map((item) => {
              const Icon = item.icon;
              return (
                <ContactLink
                  key={item.channel}
                  channel={item.channel}
                  location="home_section"
                  href={item.href}
                  className={`group flex items-center justify-between rounded-2xl border p-4 transition-all ${item.className}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${item.iconWrap}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold">{item.title}</span>
                      <span className="font-mono text-xs opacity-80">
                        {item.detail}
                      </span>
                      <span className="mt-0.5 block text-[11px] opacity-70">
                        {item.hint}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </ContactLink>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-gold">
                <MapPin className="h-4 w-4" />
                <span>{t("studioHq")}</span>
              </div>
              <h3 className="mb-2 text-2xl font-extrabold tracking-tight">
                {t("studioCity")}
              </h3>
              <div className="mb-4 font-mono text-xs text-slate-400">
                GPS: {t("studioCoords")}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                {t("studioBlurb")}
              </p>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase">
                    {t("localTimeLabel")}
                  </span>
                  <span className="font-mono text-lg font-bold text-gold">
                    <EatClock />
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    {t("studioActive")}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1 border-t border-slate-200 pt-4 font-mono text-xs text-slate-500">
                <div className="flex justify-between gap-4">
                  <span>{t("hoursWeekdays")}</span>
                  <span className="font-bold text-slate-700">
                    {t("hoursWeekdaysValue")}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{t("hoursFriday")}</span>
                  <span>{t("hoursFridayValue")}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{t("timezoneNote")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
