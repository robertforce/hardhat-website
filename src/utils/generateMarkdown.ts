import { filterGlossary, formatGlossaryPreamble } from "./componentGlossary";

const REPO_BASE =
  "https://github.com/NomicFoundation/hardhat-website/blob/main/src/content/docs/";

interface GenerateMarkdownOptions {
  title: string;
  description: string;
  /** Content collection entry id, e.g. "docs/getting-started" */
  id: string;
  /** Raw MDX body (without frontmatter) */
  body: string;
}

export function generateMarkdown({
  title,
  description,
  id,
  body,
}: GenerateMarkdownOptions): string {
  const sourceUrl = `${REPO_BASE}${id}.mdx`;
  const glossaryEntries = filterGlossary(body);
  const glossaryBlock = formatGlossaryPreamble(glossaryEntries);

  const parts: string[] = [
    `# ${title}`,
    "",
    description,
    "",
    "<--",
    `Source: ${sourceUrl}`,
  ];

  if (glossaryBlock) {
    parts.push("", glossaryBlock);
  }

  parts.push("-->");

  parts.push("", body, "");

  return parts.join("\n");
}
