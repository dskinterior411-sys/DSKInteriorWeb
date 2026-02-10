import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSK Interior - Elevate Your Space with Luxury",
  description: "Premium interior design services in Nashik, Pune, and Mumbai. Elevate your space with luxury. Expert design solutions for residential, commercial, retail, and corporate spaces.",
  keywords: ["interior design", "home design", "commercial interior", "interior decorator", "Nashik interior design", "Pune interior design", "Mumbai interior design", "luxury interior design"],
  authors: [{ name: "DSK Interior" }],
  openGraph: {
    title: "DSK Interior - Elevate Your Space with Luxury",
    description: "Premium interior design services in Nashik, Pune, and Mumbai",
    type: "website",
  },
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
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






