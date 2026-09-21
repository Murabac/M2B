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
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
