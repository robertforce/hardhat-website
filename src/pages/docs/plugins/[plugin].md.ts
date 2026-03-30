import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { globalConfig } from "../../../config";

const NPM_BASE = "https://www.npmjs.com/package/";

export const getStaticPaths = (async () => {
  const plugins = await getCollection("officialPlugins");

  return Promise.all(
    plugins.map(async (plugin) => ({
      params: { plugin: plugin.data.slug },
      props: {
        name: plugin.data.name,
        shortName: plugin.data.shortName,
        description: plugin.data.description,
        readme: plugin.data.readmeMd,
      },
    })),
  );
}) satisfies GetStaticPaths;

type Props = {
  name: string;
  shortName: string;
  description: string;
  readme: string;
};

export function GET({ props }: { props: Props }) {
  const parts = [
    `# ${props.shortName}`,
    "",
    `Description: ${props.description}`,
    `Npm package: ${NPM_BASE}${props.name}`,
    `Source code: ${globalConfig.hardhatRepoUrl}/tree/main/v-next/${props.shortName}`,
    "",
    props.readme.trim(),
    "",
  ];

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
