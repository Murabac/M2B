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
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
  formatLocation,
  getContactChannels,
} from "@/lib/contact/channels";

export async function ContactSection() {
  const t = await getTranslations("HomePage");
  const tContact = await getTranslations("Contact");
  const channelsConfig = await getContactChannels();
  const whatsappHref = buildWhatsAppUrl(
    channelsConfig.whatsapp,
    tContact("whatsappMessage"),
  );

  const channels = [
    {
      channel: "whatsapp" as const,
      href: whatsappHref,
      title: tContact("whatsapp"),
      hint: tContact("whatsappHint"),
      detail: channelsConfig.phone,
      icon: IconWhatsApp,
      className:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
      iconWrap: "bg-emerald-500 text-white",
    },
    {
      channel: "email" as const,
      href: buildMailtoUrl(channelsConfig.email),
      title: tContact("email"),
      hint: tContact("emailHint"),
      detail: channelsConfig.email,
      icon: IconEmail,
      className:
        "border-[#0B2F6B]/50 bg-[#0B2F6B]/20 text-blue-300 hover:bg-[#0B2F6B]/30",
      iconWrap: "bg-[#0B2F6B] text-[#D4AF37]",
    },
    {
      channel: "phone" as const,
      href: buildTelUrl(channelsConfig.phone),
      title: tContact("phone"),
      hint: tContact("phoneHint"),
      detail: channelsConfig.phone,
      icon: IconPhone,
      className:
        "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#E5BE4A] hover:bg-[#D4AF37]/20",
      iconWrap: "bg-[#D4AF37] text-slate-950",
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-28 border-b border-[#0B2F6B]/50 bg-[#051329] py-16 text-white sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("contactLabel")}</span>
          </div>
          <h2 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t("contactTitleBefore")} <br />
            <span className="gold-gradient-text">{t("contactTitleAccent")}</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            {t("contactSupporting")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-3xl border border-slate-800 bg-[#081B38] p-8 shadow-xl sm:p-10">
              <span className="mb-4 block font-mono text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
                {t("contactChannelsLabel")}
              </span>
              <div className="space-y-4">
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
                          <span className="block text-sm font-bold text-inherit">
                            {item.title}
                          </span>
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
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-800 bg-[#081B38] p-8">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-[#D4AF37]">
                <MapPin className="h-4 w-4" />
                <span>{t("studioHq")}</span>
              </div>
              <h3 className="mb-2 text-2xl font-extrabold tracking-tight">
                {formatLocation(channelsConfig.city, channelsConfig.country)}
              </h3>
              {channelsConfig.coordinates ? (
                <div className="mb-4 font-mono text-xs text-slate-400">
                  GPS: {channelsConfig.coordinates}
                </div>
              ) : (
                <div className="mb-4" />
              )}
              <p className="mb-6 text-sm leading-relaxed text-slate-300">
                {t("studioBlurb")}
              </p>

              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#051329] p-4">
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase">
                    {t("localTimeLabel")}
                  </span>
                  <span className="font-mono text-lg font-bold text-[#D4AF37]">
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

              <div className="mt-4 space-y-1 border-t border-slate-800 pt-4 font-mono text-xs text-slate-500">
                <div className="flex justify-between gap-4">
                  <span>{t("hoursWeekdays")}</span>
                  <span className="font-bold text-slate-300">
                    {channelsConfig.hoursWeekdays}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{t("hoursFriday")}</span>
                  <span>{channelsConfig.hoursFriday}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                <span>{channelsConfig.timezone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
