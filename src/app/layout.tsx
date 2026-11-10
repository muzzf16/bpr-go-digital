import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BPR Go Digital — Creva",
  description: "Portal Sistem Informasi Manajemen dan Kepatuhan BPR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 antialiased font-sans text-slate-700">
        {children}
      </body>
    </html>
  );
}
