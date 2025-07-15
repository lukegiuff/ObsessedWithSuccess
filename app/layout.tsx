import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings, getNavigation } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata from CMS settings
export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = getSiteSettings();
  
  return {
    title: siteSettings.site_title,
    description: siteSettings.site_description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get site data for header and footer
  const siteSettings = getSiteSettings();
  const navigation = getNavigation();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header navigation={navigation} siteSettings={siteSettings} />
        <main>
          {children}
        </main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
