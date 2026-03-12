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

function stripImports(body: string): string {
  const withoutImports = body.replace(/^import\s+.*?;?\s*$/gm, "");
  // Collapse runs of 3+ newlines down to 2
  return withoutImports.replace(/\n{3,}/g, "\n\n").trim();
}

export function generateMarkdown({
  title,
  description,
  id,
  body,
}: GenerateMarkdownOptions): string {
  const cleanBody = stripImports(body);
  const sourceUrl = `${REPO_BASE}${id}.mdx`;
  const glossaryEntries = filterGlossary(cleanBody);
  const glossaryBlock = formatGlossaryPreamble(glossaryEntries);

  const parts: string[] = [
    `# ${title}`,
    "",
    description,
    "",
    `Source: ${sourceUrl}`,
  ];

  if (glossaryBlock) {
    parts.push("", glossaryBlock);
  }

  parts.push("", cleanBody, "");

  return parts.join("\n");
}
