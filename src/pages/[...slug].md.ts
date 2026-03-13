import type { GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateMarkdown } from "../utils/generateMarkdown";

export const getStaticPaths = (async () => {
  const docs = await getCollection("docs");
  return docs.map((entry) => ({
    params: { slug: entry.id },
    props: {
      title: entry.data.title,
      description: entry.data.description,
      body: entry.body ?? "",
      filePath: entry.filePath,
    },
  }));
}) satisfies GetStaticPaths;

type Props = {
  title: string;
  description: string;
  body: string;
  filePath: string;
};

export function GET({ props }: { props: Props }) {
  const markdown = generateMarkdown(props);
  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
