import type { Metadata } from "next";
import "./globals.css";
import "./posi.css";

import { IBM_Plex_Mono, Inter, Syne } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Power Stewardship Initiative (POSI)",
  description:
    "A standardized, open stewardship framework for improving utility performance in frontier markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
