import type { Metadata } from "next";
import "./globals.css";
import { FC, ReactNode } from "react";
import { Lato } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";

type RootLayoutProps = {
  children: ReactNode;
};

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Notes",
  description:
    "Notes app for everyday use, such as TODO tasks, personal ideas or insights from learning",
  applicationName: "next-notes",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={lato.className}>
      <body className="bg-gray-100">
        <Navbar />
        <main className="mx-auto max-w-screen-lg min-h-[42rem]">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
