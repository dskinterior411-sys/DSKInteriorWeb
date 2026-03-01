import { MetadataRoute } from "next";
import { getProjects } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dskinterior.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all projects for dynamic routes
  const projects = await getProjects();

  const projectUrls = projects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/career`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return [...staticRoutes, ...projectUrls];
}

