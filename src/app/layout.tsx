import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FC, ReactNode } from "react";
import { Lato } from "next/font/google";

type RootLayoutProps = {
  children: ReactNode;
};

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "Next Notes",
  title: "Next Notes",
  description:
    "Notes app for everyday use, such as TODO tasks, personal ideas or insights from learning",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Next Notes",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Next Notes",
    title: "Next Notes",
    description: "Notes app for everyday use",
  },
  twitter: {
    card: "summary",
    title: "Next Notes",
    description: "Notes app for everyday use",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={lato.className}>
      <body className="bg-gray-100 antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
