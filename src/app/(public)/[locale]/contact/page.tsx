import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExternalLink, MapPin, Sparkles } from "lucide-react";
import { ContactInquiryForm } from "@/components/contact/ContactInquiryForm";
import { ContactLink } from "@/components/contact/ContactLink";
import { IconEmail, IconPhone, IconWhatsApp } from "@/components/contact/icons";
import { EatClock } from "@/components/layout/EatClock";
import { getLocaleFromParams } from "@/i18n/locale";
import {
  buildMailtoUrl,
  buildTelUrl,
  buildWhatsAppUrl,
  formatLocation,
  getContactChannels,
} from "@/lib/contact/channels";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");
  const tContact = await getTranslations("Contact");
  const tHome = await getTranslations("HomePage");
  const channels = await getContactChannels();

  const whatsappHref = buildWhatsAppUrl(
    channels.whatsapp,
    tContact("whatsappMessage"),
  );
  const mailtoHref = buildMailtoUrl(channels.email, t("emailSubject"));
  const telHref = buildTelUrl(channels.phone);

  return (
    <main className="min-h-screen bg-[#051329] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("label")}</span>
          </div>

          <h1 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t("titleBefore")} <br />
            <span className="gold-gradient-text">{t("titleAccent")}</span>
          </h1>

          <p className="text-lg leading-relaxed text-slate-300">
            {t("supporting")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-800 bg-[#081B38] p-8 shadow-xl sm:p-10">
              <ContactInquiryForm />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-slate-800 bg-[#081B38] p-8">
              <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold text-[#D4AF37]">
                <MapPin className="h-4 w-4" />
                <span>{tHome("studioHq")}</span>
              </div>

              <h2 className="mb-2 text-2xl font-extrabold tracking-tight">
                {formatLocation(channels.city, channels.country)}
              </h2>

              {channels.coordinates ? (
                <div className="mb-4 font-mono text-xs text-slate-400">
                  GPS: {channels.coordinates}
                </div>
              ) : (
                <div className="mb-4" />
              )}

              <p className="mb-6 text-sm leading-relaxed text-slate-300">
                {tHome("studioBlurb")}
              </p>

              <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#051329] p-4">
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase">
                    {tHome("localTimeLabel")}
                  </span>
                  <span className="font-mono text-lg font-bold text-[#D4AF37]">
                    <EatClock />
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    {tHome("studioActive")}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1 border-t border-slate-800 pt-4 font-mono text-xs text-slate-500">
                <div className="flex justify-between gap-4">
                  <span>{tHome("hoursWeekdays")}</span>
                  <span className="font-bold text-slate-300">
                    {channels.hoursWeekdays}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{tHome("hoursFriday")}</span>
                  <span>{channels.hoursFriday}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-800 bg-[#081B38] p-8">
              <span className="block font-mono text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
                {t("channelsLabel")}
              </span>

              <ContactLink
                channel="whatsapp"
                location="contact_page"
                href={whatsappHref}
                className="group flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 transition-all hover:bg-emerald-500/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 font-bold text-white">
                    <IconWhatsApp className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-inherit">
                      {t("whatsappTitle")}
                    </span>
                    <span className="font-mono text-xs opacity-80">
                      {channels.phone}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ContactLink>

              <ContactLink
                channel="email"
                location="contact_page"
                href={mailtoHref}
                className="group flex items-center justify-between rounded-2xl border border-[#0B2F6B]/50 bg-[#0B2F6B]/20 p-4 text-blue-300 transition-all hover:bg-[#0B2F6B]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B2F6B] font-bold text-[#D4AF37]">
                    <IconEmail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-inherit">
                      {t("emailTitle")}
                    </span>
                    <span className="font-mono text-xs opacity-80">
                      {channels.email}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ContactLink>

              <ContactLink
                channel="phone"
                location="contact_page"
                href={telHref}
                className="group flex items-center justify-between rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-4 text-[#E5BE4A] transition-all hover:bg-[#D4AF37]/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37] font-bold text-slate-950">
                    <IconPhone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-inherit">
                      {t("phoneTitle")}
                    </span>
                    <span className="font-mono text-xs opacity-80">
                      {channels.phone}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </ContactLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
