import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Career - Join Our Team",
  description: "Join DSK Interior's creative team. We're hiring talented interior designers and creative professionals in Nashik, Pune, and Mumbai.",
  keywords: ["interior design jobs", "designer jobs", "career in interior design", "DSK Interior careers"],
  url: `${process.env.NEXT_PUBLIC_APP_URL || "https://dskinterior.com"}/career`,
});

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

