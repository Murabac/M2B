/** Flagship case-study stories. Merged in getProjectBySlug when CMS fields are empty. */
export type CaseStoryBody = {
  problem: string;
  approach: string;
  highlights: string[];
  outcome?: string;
};

export type CaseStory = CaseStoryBody & {
  /** Optional stack override (e.g. correct Maps vendor) when CMS still has stale chips. */
  stack?: string[];
  /**
   * Locale overrides for story body.
   * Somali (`so`) is routed but kept out of the language switcher for now.
   * Arabic (`ar`) is public via the switcher.
   */
  so?: CaseStoryBody;
  ar?: CaseStoryBody;
};

export function resolveCaseStoryBody(
  story: CaseStory | undefined,
  locale: string,
): CaseStoryBody | undefined {
  if (!story) return undefined;
  if (locale === "so" && story.so) return story.so;
  if (locale === "ar" && story.ar) return story.ar;
  return {
    problem: story.problem,
    approach: story.approach,
    highlights: story.highlights,
    outcome: story.outcome,
  };
}

export const CASE_STORIES: Record<string, CaseStory> = {
  towerline: {
    problem:
      "Telecom and broadcast infrastructure expanded for years without a unified spatial registry. Field inspections lived on paper, license renewals lagged, and spectrum overlaps lacked a national audit trail.",
    approach:
      "We built a sovereign, role-gated GIS registry on the full Google Maps JavaScript API — custom map styling, marker clustering, InfoWindows, and Drawing/geometry tools for coverage and site work. Every mast gets a unique ID, GPS, structural data, frequency allocation, and operator tenancy. Offline-capable field tablets capture photo proof and score compliance (Classes A–C).",
    highlights: [
      "Google Maps Platform command room: styled basemap, clustering, and regional filter layers",
      "Tower structural database: height, equipment, co-location tenancies",
      "Field inspector tablet app with GPS photo verification and offline queueing",
      "Tiered licensing module (Class A / B / C) with renewal workflows",
      "Bilingual executive dashboard with one-click ministerial PDF reporting",
    ],
    outcome:
      "1,420+ telecom and broadcast installations indexed across the country. Field inspection review cycles were reduced by 65%, while ministerial fee compliance and safety audits reached 100% verification within the first 6 months of rollout.",
    stack: [
      "Laravel",
      "Filament",
      "Google Maps API",
      "PostGIS",
      "Flutter",
      "Tailwind",
    ],
    so: {
      problem:
        "Isgaadhsiinta iyo warbaahinta Somaliland waxay samaysay horumar ballaadhan, balse wasaaraddu ma lahayn xog-ururin khariidadaysan oo hal meel ah oo lagu ogaado dhammaan daaraadka dalka, dhererkooda, iyo shatiyada shaqada. Kormeerka goobuhu wuxuu ahaa warqado, waxaana adkayd in la ogaado meelaha isku cidhiidhyaya.",
      approach:
        "M2B waxay dhistay nidaam GIS ah oo ku dhisan Google Maps JavaScript API oo buuxa — khariidad qaabaysan, marker clustering, InfoWindows, iyo qalabka Drawing/geometry. Daar kasta waxay helaysaa lambar aqoonsi, GPS, xogta dhismaha, mowjadaha, iyo shirkadaha ku rakiban. Tablet-yada kormeerayaasha waxay kaydiyaan sawirro GPS leh oo offline ah, waxayna qiimeeyaan u hoggaansanaanta (Heerarka A–C).",
      highlights: [
        "Qolka amarka Google Maps Platform: basemap qaabaysan, clustering, iyo shaandhaynta gobollada",
        "Xogta buuxda ee daarta: joogga, qalabka, iyo shirkadaha ku wada jira",
        "App-ka kormeerayaasha goobta oo sawirada iyo GPS-ka kaydiya xitaa internet la’aan",
        "Nidaamka shatiyada heerarka A / B / C oo leh cusboonaysiin",
        "Dashboard wasiir ah oo Soomaali iyo Ingiriisi ah, PDF hal gujin ku diyaar",
      ],
      outcome:
        "In ka badan 1,420 daarood ayaa lagu diiwaangeliyay nidaamka. Waqtiga kormeerka goobaha waxaa la dhimay 65%, dakhliga iyo sharci-ku-dhaqankana waxaa kor loo qaaday 100%.",
    },
    ar: {
      problem:
        "توسّعت بنية الاتصالات والبث لسنوات دون سجلّ مكاني موحّد. كانت عمليات التفتيش الميدانية تُسجَّل على الورق، وتأخرت تجديدات التراخيص، ولم تتوفر سلسلة تدقيق وطنية لتداخل الطيف الترددي.",
      approach:
        "بنينا سجلاً سيادياً بنظام أدوار على واجهة Google Maps JavaScript API الكاملة — أنماط خرائط مخصّصة، وتجميع العلامات، ونوافذ المعلومات، وأدوات الرسم/الهندسة لتغطية المواقع. لكل صارية معرّف فريد وإحداثيات GPS وبيانات إنشائية وتخصيص ترددي وإشغال المشغّلين. أجهزة التفتيش اللوحية غير المتصلة تسجّل إثباتاً بالصور وتقيّم الامتثال (الفئات أ–ج).",
      highlights: [
        "غرفة قيادة Google Maps Platform: خريطة أساس مخصّصة وتجميع ومرشّحات إقليمية",
        "قاعدة بيانات إنشائية للأبراج: الارتفاع والمعدات والإشغال المشترك",
        "تطبيق تفتيش ميداني مع تحقق GPS بالصور ومزامنة دون اتصال",
        "وحدة تراخيص متدرجة (الفئات أ / ب / ج) مع سير عمل التجديد",
        "لوحة تنفيذية ثنائية اللغة مع تقارير PDF وزارية بنقرة واحدة",
      ],
      outcome:
        "فُهرس أكثر من 1,420 منشأة اتصالات وبث عبر البلاد. انخفضت دورات مراجعة التفتيش الميداني بنسبة 65%، وبلغ الامتثال للرسوم والتدقيقات الأمنية 100% خلال الأشهر الستة الأولى.",
    },
  },
  qaari: {
    problem:
      "Somali Quran recitations were scattered across low-bitrate clips and fragmented channels. Listeners faced buffering, no reliable offline saving, and zero verse-by-verse visual sync for memorization.",
    approach:
      "We designed an audio-first stack for variable networks: Cloudflare R2 with edge caching, Flutter + web players, and timestamp tools that sync Arabic Uthmani text to the reciter line-by-line.",
    highlights: [
      "High-performance web player with background playback",
      "Flutter apps with offline surah downloads",
      "Studio portal for lossless uploads and verse timestamping",
      "Real-time ayah highlight as the reciter speaks",
      "Edge distribution tuned for 3G/4G Horn and diaspora routes",
    ],
  },
  aragsan: {
    problem:
      "Facility operators depended on desk-distant field staff, intermittent connectivity, and mobile-money billing that did not reconcile cleanly. Accountability lived in spreadsheets, not live building health.",
    approach:
      "We shipped an ops console with green/amber/red facility health rings, supervisor mobile audits with GPS photo proof, and automated ZAAD/eDahab invoice reconciliation.",
    highlights: [
      "Facility health rings: Green / Amber / Red at a glance",
      "Supervisor mobile audits with before/after photo proof",
      "ZAAD and eDahab ledger auto-reconciliation",
      "Supply inventory tied to site checklists",
      "Live dashboard for contracts and overdue audits",
    ],
  },
  NOVA: {
    problem:
      "Facility operators depended on desk-distant field staff, intermittent connectivity, and mobile-money billing that did not reconcile cleanly. Accountability lived in spreadsheets, not live building health.",
    approach:
      "We shipped an ops console with green/amber/red facility health rings, supervisor mobile audits with GPS photo proof, and automated ZAAD/eDahab invoice reconciliation.",
    highlights: [
      "Facility health rings: Green / Amber / Red at a glance",
      "Supervisor mobile audits with before/after photo proof",
      "ZAAD and eDahab ledger auto-reconciliation",
      "Supply inventory tied to site checklists",
      "Live dashboard for contracts and overdue audits",
    ],
  },
  "dugsi-erp": {
    problem:
      "Secondary schools needed classes-first ERP for Saturday–Wednesday calendars, parent SMS attendance, bilingual report cards, and term grade compilation that previously took weeks.",
    approach:
      "We designed a Form 1–4 institutional ERP: attendance that triggers parent SMS, Somali/English dual report cards, fee schedules, and staff payroll — built for regional academic rhythms.",
    highlights: [
      "Form 1–4 class matrix with section-aware enrollments",
      "Attendance SMS to parents within minutes of the morning bell",
      "Bilingual Somali/English printable report cards",
      "Fee schedules and staff payroll in one console",
      "Term grade compilation reduced from weeks to minutes",
    ],
  },
  ekaadh: {
    problem:
      "Event organizers needed local mobile-money checkout and gate entry that still worked when cellular coverage dropped — without fraudulent duplicate tickets.",
    approach:
      "We built a Flutter + Laravel ticketing mesh with ZAAD/eDahab webhooks and cryptographically signed QR passes that offline scanners can verify at the gate.",
    highlights: [
      "Tiered tickets with ZAAD / eDahab checkout",
      "Cryptographically signed QR passes",
      "Offline gate scanners at ~0.8s scan speed",
      "Anti-fraud ticket issuance pipeline",
      "Organizer console for events and check-in analytics",
    ],
  },
  "reer-sh-yoonis": {
    problem:
      "Extended families needed a trustworthy digital lineage — not a social network — with verified elders, care ratings, and a transparent mutual-aid treasury across Horn and diaspora.",
    approach:
      "We shipped a Flutter + Supabase lineage platform (Cilmi Foundation) with patronymic naming, focused multi-generation trees, RBAC for admins/managers/members, and contribution tracking.",
    highlights: [
      "Verified digital family tree with care ratings",
      "RBAC for Super Admin, Managers, and Family Members",
      "Patronymic naming and diaspora-friendly profiles",
      "Mutual-aid treasury with transparent disbursements",
      "Companion web tree view for swipeable person cards",
    ],
  },
};
