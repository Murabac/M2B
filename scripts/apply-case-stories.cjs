const fs = require("fs");
const { createClient } = require("@supabase/supabase-js");

const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((l) => !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  db: { schema: "m2b" },
  auth: { persistSession: false },
});

const stories = {
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
    stack: [
      "Laravel",
      "Filament",
      "Google Maps API",
      "PostGIS",
      "Flutter",
      "Tailwind",
    ],
    cover_image_url: "/projects/gallery/towerline/01-cover.jpg",
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
    cover_image_url: "/projects/gallery/qaari/01-brand.png",
    logo_url: "/projects/xulka-quraada-logo.png",
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
    cover_image_url: "/projects/gallery/aragsan/03-brand.png",
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
    cover_image_url: "/projects/gallery/aragsan/03-brand.png",
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
    cover_image_url: "/projects/dugsi-erp-logo.png",
    logo_url: "/projects/dugsi-erp-logo.png",
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
    cover_image_url: "/projects/ekaadh-logo.png",
  },
  "reer-sh-yoonis": {
    title: "Cilmi Foundation",
    client_name: "Cilmi Foundation",
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
    cover_image_url: "/projects/cilmi-foundation-logo.png",
    logo_url: "/projects/cilmi-foundation-logo.png",
  },
};

const gallery = [
  ["towerline", "/projects/gallery/towerline/01-cover.jpg", "TowerLine GIS cover", 1],
  ["towerline", "/projects/gallery/towerline/02-logo.jpg", "TowerLine mark", 2],
  ["towerline", "/projects/gallery/towerline/extra-wide.png", "TowerLine wide visual", 3],
  ["qaari", "/projects/gallery/qaari/01-brand.png", "Xulka Qur'aada brand", 1],
  ["qaari", "/projects/gallery/qaari/02-mark.png", "Xulka Qur'aada circular mark", 2],
  ["qaari", "/projects/gallery/qaari/03-mark-dark.png", "Xulka Qur'aada mark on dark", 3],
  ["qaari", "/projects/gallery/qaari/extra-logo-green-bg.jpg", "Xulka Qur'aada green brand field", 4],
  ["aragsan", "/projects/gallery/aragsan/03-brand.png", "NOVA / Aragsan brand", 1],
  ["aragsan", "/projects/gallery/aragsan/extra-ba-boardroom-after.png", "Facility after cleaning audit", 2],
  ["aragsan", "/projects/gallery/aragsan/extra-ba-boardroom-before.jpg", "Facility before cleaning audit", 3],
  ["aragsan", "/projects/gallery/aragsan/extra-ba-kitchen-after.png", "Kitchen after audit", 4],
  ["NOVA", "/projects/gallery/aragsan/03-brand.png", "NOVA / Aragsan brand", 1],
  ["NOVA", "/projects/gallery/aragsan/extra-ba-boardroom-after.png", "Facility after cleaning audit", 2],
  ["NOVA", "/projects/gallery/aragsan/extra-ba-boardroom-before.jpg", "Facility before cleaning audit", 3],
  ["NOVA", "/projects/gallery/aragsan/extra-ba-kitchen-after.png", "Kitchen after audit", 4],
  ["dugsi-erp", "/projects/gallery/dugsi-erp/01-logo.png", "Dugsi ERP wordmark", 1],
  ["ekaadh", "/projects/gallery/ekaadh/01-logo.png", "Ekaadh Tickets mark", 1],
  ["reer-sh-yoonis", "/projects/gallery/cilmi/01-logo.png", "Cilmi Foundation logo", 1],
];

(async () => {
  // Add columns if missing via a no-op update test — user may run SQL separately.
  // Try updating with new fields; if columns missing, print clear error.
  for (const [slug, patch] of Object.entries(stories)) {
    const { data, error } = await sb
      .from("projects")
      .update(patch)
      .eq("slug", slug)
      .select("slug,title,problem");
    console.log(slug, error ? `ERR ${error.message}` : `ok ${data?.[0]?.title}`);
  }

  const { data: projects } = await sb.from("projects").select("id,slug");
  const bySlug = Object.fromEntries((projects ?? []).map((p) => [p.slug, p.id]));

  // Remove prior gallery seeds
  const galleryUrls = gallery.map((g) => g[1]);
  await sb.from("project_images").delete().in("image_url", galleryUrls);

  const rows = gallery
    .map(([slug, image_url, alt_text, sort_order]) => {
      const project_id = bySlug[slug];
      if (!project_id) return null;
      return { project_id, image_url, alt_text, sort_order };
    })
    .filter(Boolean);

  const { error: imgErr } = await sb.from("project_images").insert(rows);
  console.log("gallery", imgErr ? imgErr.message : `inserted ${rows.length}`);
})();
