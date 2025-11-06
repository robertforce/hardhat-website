import { defineCollection } from "astro:content";
import { z } from "astro:schema";

import communityPluginsJson from "./community-plugins.json";
import { styleText } from "node:util";

const communityPluginsJsonSchema = z.object({
  plugins: z.array(
    z.object({
      name: z.string(),
      website: z.string().optional(),
      npmPackage: z.string().optional(),
      author: z.string(),
      authorUrl: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
    }),
  ),
});

const communityPluginsCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  website: z.string(),
  author: z.string(),
  authorUrl: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  downloads: z.number(),
});

async function getLastMonthDownloads(pluginName: string) {
  const endpoint = `https://api.npmjs.org/downloads/point/last-month/${pluginName}`;
  const res = await fetch(endpoint);

  if (res.status === 404) {
    return 0;
  }

  if (res.status === 429) {
    const retryAfter = res.headers.get("retry-after");

    console.error(
      `Too many requests when hitting ${endpoint}. retry-after: ${retryAfter}`,
    );
  }

  if (!res.ok) {
    throw new Error(
      `Error fetching npm downloads of plugin ${pluginName} — ${res.statusText}`,
    );
  }

  const json = (await res.json()) as { downloads: number };

  return json.downloads;
}

export const communityPlugins = defineCollection({
  loader: async () => {
    const pluginsFile = communityPluginsJsonSchema.parse(communityPluginsJson);

    const resolvedPlugins = [];
    for (const plugin of pluginsFile.plugins) {
      const npmPackage = plugin.npmPackage ?? plugin.name;

      console.log(
        styleText(
          ["cyan", "bold"],
          `Fetching downloads of community plugin ${npmPackage}`,
        ),
      );

      resolvedPlugins.push({
        id: plugin.name,
        name: plugin.name,
        npmPackage,
        website:
          plugin.website ??
          `https://www.npmjs.com/package/${plugin.npmPackage ?? plugin.name}`,
        author: plugin.author,
        authorUrl: plugin.authorUrl,
        description: plugin.description,
        tags: plugin.tags,
        downloads: await getLastMonthDownloads(
          plugin.npmPackage ?? plugin.name,
        ),
      });
    }

    const sortedPlugins = resolvedPlugins.sort(
      (a, b) => b.downloads - a.downloads,
    );

    return sortedPlugins;
  },
  schema: communityPluginsCollectionSchema,
});
