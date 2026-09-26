export type ContactChannel = "whatsapp" | "email" | "phone";

export type ContactLocation =
  | "floating_button"
  | "header"
  | "home_section"
  | "footer";

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

/** Fires contact click hooks for GA4 (wired in Wave 7). */
export function trackContactClick(
  channel: ContactChannel,
  location: ContactLocation,
) {
  if (typeof window === "undefined") return;

  const eventName = `${channel}_click`;

  window.dispatchEvent(
    new CustomEvent("m2b:contact_click", {
      detail: { channel, location, event: eventName },
    }),
  );

  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: eventName, location });
}
