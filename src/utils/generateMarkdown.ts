import { globalConfig } from "../config";
import { filterGlossary, formatGlossaryPreamble } from "./componentGlossary";

const DOCS_BASE_URL = `${globalConfig.baseGitHubDeploymentBranchViewUrl}/src/content/docs/`;

interface GenerateMarkdownOptions {
  title: string;
  description: string;
  /** Content collection entry id, e.g. "docs/getting-started" */
  id: string;
  /** Raw MDX body (without frontmatter) */
  body: string;
  /** Path to the source file */
  filePath: string;
}

export function generateMarkdown({
  title,
  description,
  id,
  body,
  filePath,
}: GenerateMarkdownOptions): string {
  const parts: string[] = [`# ${title}`, "", `Description: ${description}`, ""];

  if (filePath.endsWith(".mdx")) {
    const sourceUrl = `${DOCS_BASE_URL}${id}.mdx`;
    const glossaryEntries = filterGlossary(body);
    const glossaryBlock = formatGlossaryPreamble(glossaryEntries, "  ");
    parts.push(
      "Note: This document was authored using MDX",
      "",
      `  Source: ${sourceUrl}`,
    );

    if (glossaryBlock) {
      parts.push("", glossaryBlock);
    }

    parts.push("");
  }

  parts.push(body, "");

  return parts.join("\n");
}
