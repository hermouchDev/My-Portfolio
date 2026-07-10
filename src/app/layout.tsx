import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import MaskCursor from "@/components/ui/MaskCursor";
import { ClientLayout } from "@/components/layout/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdelmajid Hermouch",
  description: "Portfolio of Abdelmajid Hermouch",
  verification: {
    google: "qjd--RVCVJE2cxxG0MeQjp10KNB3H0niuS1Jw6m1onc",
  },
  openGraph: {
    title: "Abdelmajid Hermouch",
    description: "Portfolio of Abdelmajid Hermouch",
    images: [{ url: "/my-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelmajid Hermouch",
    description: "Portfolio of Abdelmajid Hermouch",
    images: ["/my-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-primary-text">
        <ClientLayout>
          <MaskCursor />
          <SmoothScrolling>{children}</SmoothScrolling>
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
