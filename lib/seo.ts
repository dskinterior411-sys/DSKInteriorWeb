import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dskinterior.com";
const siteName = "DSK Interior";
const defaultDescription = "Premium interior design services in Nashik, Pune, and Mumbai. Elevate your space with luxury. Expert design solutions for residential, commercial, retail, and corporate spaces.";
const defaultKeywords = [
  "interior design",
  "home design",
  "commercial interior",
  "interior decorator",
  "Nashik interior design",
  "Pune interior design",
  "Mumbai interior design",
  "luxury interior design",
  "residential interior design",
  "modular kitchen",
  "office interior design",
  "interior renovation",
];

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  nofollow?: boolean;
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title,
    description = defaultDescription,
    keywords = defaultKeywords,
    image = `${siteUrl}/logo.jpeg`,
    url = siteUrl,
    type = "website",
    noindex = false,
    nofollow = false,
  } = config;

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Elevate Your Space with Luxury`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      locale: "en_IN",
      url,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@dskinterior",
    },
    alternates: {
      canonical: url,
    },
    icons: {
      icon: "/logo.jpeg",
      apple: "/logo.jpeg",
    },
    metadataBase: new URL(siteUrl),
  };
}

// Structured Data (JSON-LD) generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    name: siteName,
    description: defaultDescription,
    url: siteUrl,
    logo: `${siteUrl}/logo.jpeg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-92261-46504",
      contactType: "Customer Service",
      areaServed: ["IN"],
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No 3, Aaradhya Nakshtra, Near Ashoka College, Chandshi",
      addressLocality: "Nashik",
      postalCode: "422003",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Nashik",
      },
      {
        "@type": "City",
        name: "Pune",
      },
      {
        "@type": "City",
        name: "Mumbai",
      },
    ],
    sameAs: [
      "https://www.facebook.com/dskinteriors",
      "https://instagram.com/dskinteriorsofficial",
      "https://www.linkedin.com/company/dsk-interiors",
      "https://www.youtube.com/@DskInteriors",
    ],
  };
}

export function generateServiceSchema(service: { title: string; description: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description,
    provider: {
      "@type": "InteriorDesignBusiness",
      name: siteName,
    },
    areaServed: {
      "@type": "City",
      name: ["Nashik", "Pune", "Mumbai"],
    },
    ...(service.image && {
      image: service.image,
    }),
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  images: string[];
  location?: string;
  year?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.images,
    creator: {
      "@type": "Organization",
      name: siteName,
    },
    ...(project.location && {
      locationCreated: {
        "@type": "Place",
        name: project.location,
      },
    }),
    ...(project.year && {
      dateCreated: `${project.year}-01-01`,
    }),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

