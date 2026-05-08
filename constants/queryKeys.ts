export const queryKeys = {
  me: ["me"] as const,
  profiles: {
    all: ["all-profiles"] as const,
    detail: (id: number | string) => ["profile", id] as const,
    status: ["profile-status"] as const,
    related: (id: string | number, limit?: number) =>
      ["profile", id, "related", { limit }] as const,
  },
  projects: {
    all: (filters?: any) => ["projects", filters] as const,
    feed: (filters?: any) => ["projects-feed", filters] as const,
    detail: (id: number | string) => ["project", id] as const,
    activeDraft: ["active-draft"] as const,
    comments: (id: number | string) => ["project-comments", id] as const,
    rating: (id: number | string) => ["project-rating", id] as const,
  },
  lookup: {
    universities: ["universities"] as const,
    faculties: ["faculties"] as const,
    industries: ["industries"] as const,
    subIndustries: (industryId?: number) =>
      ["sub-industries", industryId] as const,
    countries: ["countries"] as const,
    cities: (countryId?: number) => ["cities", countryId] as const,
  },
} as const;
