import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { generateMetadata as generateSEOMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import Script from "next/script";

export const metadata: Metadata = generateSEOMetadata({
  title: "Portfolio - Our Interior Design Projects",
  description: "Explore our stunning portfolio of interior design projects in Nashik, Pune, and Mumbai. Residential, commercial, modular kitchen, and luxury interior designs.",
  keywords: ["interior design portfolio", "home design projects", "commercial interior design", "modular kitchen designs", "luxury interior projects"],
  url: `${process.env.NEXT_PUBLIC_APP_URL || "https://dskinterior.com"}/portfolio`,
});

export default function PortfolioPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: process.env.NEXT_PUBLIC_APP_URL || "https://dskinterior.com" },
    { name: "Portfolio", url: `${process.env.NEXT_PUBLIC_APP_URL || "https://dskinterior.com"}/portfolio` },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <PortfolioClient />
    </>
  );
}
