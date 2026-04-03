import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./posi.css";

import { LanguageProvider } from "./i18n/LanguageProvider";

export const metadata: Metadata = {
  title: "Power Stewardship Initiative (POSI)",
  description:
    "A standardized, open stewardship framework for improving utility performance in frontier markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
