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
  description:
    "I'm a Full Stack Developer with 0+ years of experience in building scalable web applications and high-growth digital products.",
  verification: {
    google: "qjd--RVCVJE2cxxG0MeQjp10KNB3H0niuS1Jw6m1onc",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Abdelmajid Hermouch | Full Stack Developer",
    description:
      "I'm a Full Stack Developer with 0+ years of experience in building scalable web applications and high-growth digital products.",
    images: [{ url: "/my-image.png", width: 1200, height: 630 }],
    type: "website",
    url: "https://abdelmajidhermouch.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelmajid Hermouch | Full Stack Developer",
    description:
      "I'm a Full Stack Developer with 0+ years of experience in building scalable web applications and high-growth digital products.",
    images: ["/my-image.png"],
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
