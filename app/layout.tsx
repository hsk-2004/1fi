import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { BottomNav } from "@/frontend/components/bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1Fi - Mutual Fund backed EMIs",
  description: "1Fi - Customer App",
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#712CDC",
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <div className="mx-auto w-full max-w-[500px]">
            <main className="flex flex-1 flex-col gap-5 px-4 py-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">
              {children}
            </main>
          </div>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
