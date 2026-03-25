import { getCollection } from "astro:content";

import { pluginsConfig } from "../../../config";

export async function GET() {
  const communityPlugins = await getCollection("communityPlugins");

  const parts: string[] = [
    "# Hardhat 3 community plugins",
    "",
    "A directory of Hardhat 3 community plugins.",
    "",
    "Community Plugins are developed and maintained by the Hardhat community. They have not been written, reviewed, or endorsed by Nomic Foundation, so please use them at your own risk.",
    "",
    `If you believe a plugin in this list is malicious, please report it to ${pluginsConfig.maliciousPluginReportingEmail}.`,
    "",
    "### Community plugins sorted by npm downloads",
    "",
  ];

  for (const plugin of communityPlugins) {
    parts.push(
      `## ${plugin.data.name}`,
      "",
      plugin.data.description,
      "",
      `- Website: ${plugin.data.website}`,
      `- Author: [${plugin.data.author}](${plugin.data.authorUrl})`,
      `- Tags: ${plugin.data.tags.join(", ")}`,
      "",
    );
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
