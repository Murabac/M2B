import React from 'react';
import { Language, ThemeMode, PageId } from '../types';
import { CAPABILITIES } from '../data/projectsData';
import { 
  Code2, 
  Settings2, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  CreditCard,
  Globe2,
  WifiOff,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface CapabilitiesViewProps {
  language: Language;
  theme: ThemeMode;
  onNavigate: (page: PageId) => void;
}

export const CapabilitiesView: React.FC<CapabilitiesViewProps> = ({
  language,
  theme,
  onNavigate,
}) => {
  const isDark = theme === 'dark';

  const threePillars = [
    {
      id: 'engineer',
      title: 'Engineer',
      titleSo: 'Farsamo & Dhisid',
      icon: Code2,
      tagline: 'High-durability codebases designed for variable networks and high data volume.',
      taglineSo: 'Barnaamijyo casri ah oo u adkaysan kara xawaaraha internetka ee kala duwan.',
      technologies: [
        { name: 'Laravel & Filament v3', desc: 'Enterprise administration panels, dual manager/supervisor gates, automated jobs.' },
        { name: 'Flutter 3.x', desc: 'High-performance consumer and staff field mobile apps with offline SQLite caches.' },
        { name: '.NET 8 / C#', desc: 'Low-latency commercial commerce APIs and affiliate settlement engines.' },
        { name: 'Next.js & TypeScript', desc: 'Fast server-rendered portals, student systems, and high-conversion storefronts.' },
        { name: 'GIS & Mapping (PostGIS)', desc: 'Sovereign telecom tower registries, radius buffers, and regional boundary layers.' },
        { name: 'Audio Streaming (Cloudflare R2)', desc: 'Sub-250ms verse-synced audio playback pipelines across 3G networks.' },
        { name: 'Cryptographic QR Gates', desc: 'Fraud-proof signed event passes with sub-second offline gate scanners.' },
        { name: 'Direct Mobile Money APIs', desc: 'Telesom ZAAD and Somtel eDahab instant checkout webhooks & ledgers.' }
      ]
    },
    {
      id: 'operate',
      title: 'Operate',
      titleSo: 'Hawlgal & Maamul',
      icon: Settings2,
      tagline: 'Ergonomic consoles, field worker apps, and ministerial compliance workflows.',
      taglineSo: 'Console-yo fududaynaya kormeerka goobaha, shaqaalaha, iyo warbixinnada.',
      technologies: [
        { name: 'Bilingual & RTL Ergonomics', desc: 'Tailored typography for longer Somali phrasing, Uthmani Arabic script, and English.' },
        { name: 'Field-Ready Offline UIs', desc: 'High sunlight contrast, 44px+ touch targets, and queueing for remote desert inspection.' },
        { name: 'Role-Based Access Control', desc: 'Granular permissions from ministerial executives to regional inspectors and school deans.' },
        { name: 'Staff Audits & Photo Proof', desc: 'Live GPS geostamping and mandatory photo upload trails before checklist clearance.' },
        { name: 'SMS Gateway Broadcasts', desc: 'Automated 10-minute parent attendance alerts and delivery notices.' },
        { name: 'Dual Currency Ledger', desc: 'Seamless automated conversion between USD and Somaliland Shilling daily market rates.' }
      ]
    },
    {
      id: 'lead',
      title: 'Lead',
      titleSo: 'Hoggaan & Khibrad',
      icon: Users,
      tagline: 'Senior software engineering leadership with 9+ years of proven delivery in the Horn.',
      taglineSo: 'Hoggaamin khibrad 9+ sano ah leh oo xaqiijinaysa guusha mashruucaaga.',
      technologies: [
        { name: 'System Discovery & Scoping', desc: 'Uncovering unwritten field bottlenecks before writing a single line of production code.' },
        { name: 'Stakeholder Alignment', desc: 'Translating ministerial policies, academic calendars, and business rules into architecture.' },
        { name: 'Remote & Cross-Border Delivery', desc: 'Leading blended technical squads connecting Hargeisa talent with international diaspora.' },
        { name: 'Production SLAs & Security', desc: 'Continuous patch management, uptime audits, and disaster recovery replication.' },
        { name: 'Staff Enablement', desc: 'Hands-on training for non-technical field supervisors, teachers, and ministry officers.' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen py-16 sm:py-24 transition-colors ${
      isDark ? 'bg-[#051329] text-white' : 'bg-[#FAFBFD] text-[#0A1E3B]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'so' ? 'KHARASHKA FARSAMO EE M2B' : 'FULL STUDIO CAPABILITIES'}</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight mb-5">
            {language === 'so' ? (
              <>
                Saddexda Tiir: <br />
                <span className="gold-gradient-text">Farsamo, Hawlgal, iyo Hoggaan.</span>
              </>
            ) : (
              <>
                Three Pillars: <br />
                <span className="gold-gradient-text">Engineer, Operate, and Lead.</span>
              </>
            )}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {language === 'so' ? (
              'M2B waxay isku daraysaa injineernimo caalami ah iyo fahamka dhabta ah ee duruufaha maxalliga ah ee Geeska Afrika.'
            ) : (
              'We don’t rely on third-party offshore subcontractors. Every operational layer — from database schemas to field mobile apps — is designed, coded, and delivered in-house.'
            )}
          </p>
        </div>

        {/* 3 Pillars Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {threePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`rounded-3xl border p-8 transition-all duration-300 flex flex-col justify-between ${
                  isDark 
                    ? 'bg-[#081B38] border-[#0B2F6B]/60 shadow-xl shadow-black/40' 
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-[#0B2F6B] text-[#D4AF37] shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-black text-3xl tracking-tight mb-3">
                    {language === 'so' ? pillar.titleSo : pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                    {language === 'so' ? pillar.taglineSo : pillar.tagline}
                  </p>

                  <div className="space-y-4">
                    {pillar.technologies.map((item, idx) => (
                      <div key={idx} className="border-t border-slate-200 dark:border-slate-800/80 pt-3">
                        <div className="font-display font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span>{item.name}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-slate-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{language === 'so' ? 'La Xidhiidh Kooxda' : `Commission ${pillar.title}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Callout: "We speak the local stack" */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#06152F] to-[#0A3A7A] text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] mb-4">
              <Globe2 className="w-3.5 h-3.5" />
              <span>THE LOCAL REALITY BENCHMARK</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
              We speak the local stack fluently.
            </h2>

            <p className="text-blue-200 text-base sm:text-lg leading-relaxed mb-8">
              Western frameworks assume fiber optics, credit cards, English UI, and Monday-to-Friday schedules. M2B designs from first principles for the realities of the Horn:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-[#D4AF37] mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span>ZAAD & eDahab Mobile Money</span>
                </div>
                <p className="text-slate-300">Direct merchant API integrations, automated reconciliation, and dual USD/SLS currency pricing.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-[#D4AF37] mb-1">
                  <Globe2 className="w-4 h-4" />
                  <span>Somali & Arabic Typography</span>
                </div>
                <p className="text-slate-300">Somali labels are 20-35% longer than English. We design dynamic layouts that never clip or hyphenate awkwardly.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-[#D4AF37] mb-1">
                  <WifiOff className="w-4 h-4" />
                  <span>Zero-Cellular Field Resilience</span>
                </div>
                <p className="text-slate-300">Offline SQLite synchronization for inspectors auditing telecom towers or cleaning supervisors in basement parking.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 font-bold text-[#D4AF37] mb-1">
                  <Layers className="w-4 h-4" />
                  <span>Saturday–Wednesday Cycles</span>
                </div>
                <p className="text-slate-300">Academic calendars and governmental shifts natively follow regional workweeks without messy calendar hacks.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
