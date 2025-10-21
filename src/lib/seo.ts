const SITE = {
  name: "Guido Vizoso",
  getDynamicName: (title?: string) => (title ? `${title} | G` : "Guido Vizoso"),
  domain: "https://www.gvizo.so",
  description: "Building systems that make products shine.",
  getDynamicDescription: (description?: string) =>
    description || "Building systems that make products shine.",
  ogImage: "https://www.gvizo.so/og",
  getDynamicOgImage: (title?: string) =>
    `https://www.gvizo.so/og?title=${title}`,
  twitter: {
    site: "@guido_vizoso",
    creator: "@guido_vizoso",
  },
};

export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.domain,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.domain}/search?q={query}`,
    "query-input": "required name=query",
  },
};

export const jsonLdPersonOrOrg = {
  "@context": "https://schema.org",
  "@type": "Person", // or "Organization"
  name: "Guido Vizoso",
  url: SITE.domain,
};

export function pageSEO(partial?: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  const title = SITE.getDynamicName(partial?.title);
  const description = SITE.getDynamicDescription(partial?.description);
  const url = partial?.url ?? SITE.domain;
  const image = SITE.getDynamicOgImage(partial?.title);

  const meta = [
    // Base title/description
    { title },
    { name: "description", content: description },

    { name: "theme-color", content: "#ffffff" },

    // Open Graph
    { property: "og:site_name", content: SITE.name },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: `${SITE.name} – Open Graph image` },
    { property: "og:image:type", content: "image/webp" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: "en_US" }, // adjust if needed

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: SITE.twitter.site },
    { name: "twitter:creator", content: SITE.twitter.creator },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: `${SITE.name} – Open Graph image` },

    // Misc UX hints
    { name: "color-scheme", content: "light dark" },
  ];

  const links = [
    // Canonical
    { rel: "canonical", href: url },

    // Icons (SVG fav + PNG fallbacks)
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    {
      rel: "icon",
      href: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      href: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
  ];

  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify(jsonLdWebsite),
    },
    {
      type: "application/ld+json",

      children: JSON.stringify(jsonLdPersonOrOrg),
    },
  ];

  return { meta, links, scripts };
}
