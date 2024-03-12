import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FC, ReactNode } from "react";
import { Lato } from "next/font/google";

type RootLayoutProps = {
  children: ReactNode;
};

const description =
  "Embrace the power of daily affirmations and self-reflection with the intuitive note taking app. Capture moments of inspiration, motivation, and personal development to help you become the best version of yourself.";
const applicationName = "Next Notes";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName,
  title: applicationName,
  description,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: applicationName,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    title: applicationName,
    description,
    url: process.env.NEXTAUTH_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f4f6", // gray-100
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={lato.className}>
      <body className="bg-gray-100 antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
