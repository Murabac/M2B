import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getLocaleFromParams } from "@/i18n/locale";

type Props = {
  params: Promise<{ locale: string }>;
};

const teamIds = ["abdirahmaan", "mohamed", "adnan"] as const;

export default async function StudioPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const t = await getTranslations("StudioPage");

  const stats = [
    {
      value: t("stats.years.value"),
      title: t("stats.years.title"),
      note: t("stats.years.note"),
    },
    {
      value: t("stats.spectrum.value"),
      title: t("stats.spectrum.title"),
      note: t("stats.spectrum.note"),
    },
    {
      value: t("stats.platforms.value"),
      title: t("stats.platforms.title"),
      note: t("stats.platforms.note"),
    },
    {
      value: t("stats.languages.value"),
      title: t("stats.languages.title"),
      note: t("stats.languages.note"),
    },
  ];

  const principles = [
    t("principles.one"),
    t("principles.two"),
    t("principles.three"),
  ];

  const team = teamIds.map((id) => ({
    id,
    initials: t(`team.members.${id}.initials`),
    name: t(`team.members.${id}.name`),
    role: t(`team.focus.${id}`),
    badge: t(`team.members.${id}.badge`),
    bio: t(`team.members.${id}.bio`),
    skills: [
      t(`team.members.${id}.skills.one`),
      t(`team.members.${id}.skills.two`),
      t(`team.members.${id}.skills.three`),
      t(`team.members.${id}.skills.four`),
    ],
  }));

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

        <div className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-800 bg-[#081B38] p-6"
            >
              <div className="mb-1 text-3xl font-black text-[#D4AF37] sm:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm font-bold">{stat.title}</div>
              <div className="mt-0.5 font-mono text-xs text-slate-500">
                {stat.note}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            <h2 className="text-3xl font-extrabold tracking-tight">
              {t("philosophy.title")}
            </h2>
            <p className="text-base leading-relaxed text-slate-300">
              {t("philosophy.p1")}
            </p>
            <p className="text-base leading-relaxed text-slate-300">
              {t("philosophy.p2")}
            </p>
            <div className="space-y-3 pt-2">
              {principles.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center lg:col-span-6">
            <div className="relative w-full max-w-md rounded-3xl border border-[#D4AF37]/30 bg-[#081B38] p-8 text-center shadow-2xl">
              <div className="mx-auto my-4 flex justify-center">
                <span className="inline-flex items-center justify-center rounded-2xl border border-gold/25 bg-white p-4 shadow-sm">
                  <Image
                    src={siteConfig.logos.lockup}
                    alt={siteConfig.name}
                    width={220}
                    height={120}
                    unoptimized
                    className="h-auto w-full max-w-[220px]"
                    priority
                  />
                </span>
              </div>
              <div className="mt-6 border-t border-slate-800 pt-4 font-mono text-xs text-slate-500">
                {t("hq")}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#081B38] p-8 shadow-xl sm:p-12">
          <div className="mx-auto max-w-6xl">
            <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              {t("team.label")}
            </span>
            <h2 className="mb-3 text-2xl font-black tracking-tight sm:text-3xl">
              {t("team.title")}
            </h2>
            <p className="mb-10 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {t("team.supporting")}
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col rounded-2xl border border-slate-800 bg-[#051329]/60 p-6"
                >
                  <div className="mb-5 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#0B2F6B] via-[#0A3A7A] to-[#071C40] p-1 shadow-xl">
                      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-[#081B38] text-white">
                        <span className="text-3xl font-black text-[#D4AF37]">
                          {member.initials}
                        </span>
                        <span className="mt-1 font-mono text-[9px] tracking-widest text-blue-200 uppercase">
                          {member.badge}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold tracking-tight">
                      {member.name}
                    </h3>
                    <span className="mt-1 font-mono text-xs text-[#D4AF37]">
                      {member.role}
                    </span>
                  </div>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-300">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 border-t border-slate-800 pt-4 font-mono text-xs text-slate-500">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded bg-slate-800/80 px-2.5 py-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
