import type { Metadata } from "next";
import { Fraunces, Inter, Space_Mono } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} | Asesoría, Optimización y Componentes de Computadores`,
  description: brand.valueProp,
  keywords: [
    "asesoría pc chile",
    "optimización computadores santiago",
    "diagnostico gamer pyme",
    "mantencion computadores pyme chile",
    "upgrades pc santiago",
  ],
  openGraph: {
    title: `${brand.name} | Asesoría y Optimización de Equipos`,
    description: brand.valueProp,
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable} scroll-smooth`}
    >
      <body className="bg-[var(--paper)] text-[var(--ink)] font-sans antialiased selection:bg-[var(--orange)] selection:text-white">
        {children}
      </body>
    </html>
  );
}
