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
      id: entry.id,
      body: entry.body ?? "",
    },
  }));
}) satisfies GetStaticPaths;

type Props = {
  title: string;
  description: string;
  id: string;
  body: string;
};

export function GET({ props }: { props: Props }) {
  const markdown = generateMarkdown(props);
  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
