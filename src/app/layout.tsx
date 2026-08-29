import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { profile } from "@/config/portfolioData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Full-stack developer and ERP integration specialist building enterprise platforms, resilient ERPNext integrations, n8n data pipelines and modern web architectures.";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Full-Stack Developer",
    "ERP Integration",
    "ERPNext",
    "Frappe",
    "Next.js",
    "Plasmic",
    "n8n",
    "GraphQL",
    "PostgreSQL",
    "Chennai",
  ],
  authors: [{ name: profile.name, url: profile.socials[0].href }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: `${profile.name} · Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-base font-sans">{children}</body>
    </html>
  );
}
