import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSK Interior - Creative Interior Design Solutions",
  description: "Transform your space with DSK Interior. Expert interior design services for residential, commercial, retail, and corporate spaces.",
  keywords: ["interior design", "home design", "commercial interior", "interior decorator"],
  authors: [{ name: "DSK Interior" }],
  openGraph: {
    title: "DSK Interior - Creative Interior Design Solutions",
    description: "Transform your space with expert interior design services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

