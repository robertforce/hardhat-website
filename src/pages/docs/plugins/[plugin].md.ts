import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

const NPM_BASE = "https://www.npmjs.com/package/";
const GITHUB_REPO = "https://github.com/NomicFoundation/hardhat";

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
    props.description,
    "",
    `npm: ${NPM_BASE}${props.name}`,

    `Source: ${GITHUB_REPO}/tree/main/v-next/${props.shortName}`,
    "",
    props.readme.trim(),
    "",
  ];

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
