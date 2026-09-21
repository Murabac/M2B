import localFont from "next/font/local";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

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

export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});
