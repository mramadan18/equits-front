import { MetadataRoute } from "next";

const BASE_URL = "https://equits.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/talents`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/help-center`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Dynamic project pages
  // TODO: Uncomment when ready to include all published projects in the sitemap
  // try {
  //   const response = await fetchServer<Project[]>("/projects", { params: { limit: 1000 } });
  //   const projects = response.data || [];
  //   const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
  //     url: `${BASE_URL}/projects/${project.id}`,
  //     lastModified: new Date(project.updatedAt || project.createdAt),
  //     changeFrequency: "weekly" as const,
  //     priority: 0.6,
  //   }));
  //   return [...staticPages, ...projectPages];
  // } catch {
  //   return staticPages;
  // }

  return staticPages;
}
