import type { Metadata } from "next";
import { kamerik } from "@/config/fonts";
import "../../globals.css";

export const metadata: Metadata = {
  title: "M2B Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kamerik.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#030914] font-sans text-white">{children}</body>
    </html>
  );
}
