import { getCollection } from "astro:content";

import { pluginsConfig } from "../../../config";

export async function GET() {
  const officialPlugins = await getCollection("officialPlugins");

  const parts: string[] = [
    "# Hardhat 3 official plugins",
    "",
    "A directory of Hardhat 3 official plugins.",
    "",
    "Extend Hardhat's functionality with these official plugins.",
    "",
    `You can also find plugins built by the community [here](https://hardhat.org/docs/plugins/community-plugins.md).`,
    "",
    "### Official plugins",
    "",
  ];

  for (const plugin of officialPlugins) {
    parts.push(
      `## ${plugin.data.shortName}`,
      "",
      plugin.data.description,
      "",
      `- Website: ${plugin.data.website}`,
      `- Author: [${pluginsConfig.officialPluginsAuthor}](${pluginsConfig.officialPluginsAuthorUrl})`,
      `- Tags: ${plugin.data.tags.join(", ")}`,
      "",
    );
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
