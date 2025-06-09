import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { SfProText } from "sf-pro/text"; // <- my own package
import "./globals.css";

export const metadata: Metadata = {
  title: "Captcha",
  description: "Please verify that you are not a robot.",
};

export default function ProtectionRootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={SfProText.className}>
        {children}
      </body>
    </html>
  );
}
