import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us - Get in Touch",
  description: "Contact DSK Interior for premium interior design services in Nashik, Pune, and Mumbai. Call us at +91 9226146504 or visit our studio.",
  keywords: ["contact interior designer", "interior design consultation", "DSK Interior contact", "Nashik interior designer contact"],
  url: `${process.env.NEXT_PUBLIC_APP_URL || "https://dskinterior.com"}/contact`,
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

