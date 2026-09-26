import localFont from "next/font/local";

export const kamerik = localFont({
  src: [
    {
      path: "../fonts/Kamerik105-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Kamerik105-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-kamerik",
  display: "swap",
});

export const ibmPlexArabic = localFont({
  src: [
    {
      path: "../fonts/IBMPlexSansArabic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexSansArabic-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexSansArabic-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexSansArabic-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});
