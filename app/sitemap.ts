import type { MetadataRoute } from "next";
import { caseStudiesData } from "@/lib/caseStudiesData";
import { blogPlaybooks } from "@/lib/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://leadgrowagency.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/case-studies",
    "/pricing",
    "/about",
    "/blog",
    "/contact",
    "/templates/hvac",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = Object.keys(caseStudiesData).map(
    (slug) => ({
      url: `${baseUrl}/case-studies/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const blogRoutes: MetadataRoute.Sitemap = blogPlaybooks.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes];
}
