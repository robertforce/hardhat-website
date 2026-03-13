import { globalConfig } from "../config";
import { filterGlossary, formatGlossaryPreamble } from "./componentGlossary";

interface GenerateMarkdownOptions {
  title: string;
  description: string;
  /** Raw MDX body (without frontmatter) */
  body: string;
  /** Path to the source file */
  filePath: string;
}

export function generateMarkdown({
  title,
  description,
  body,
  filePath,
}: GenerateMarkdownOptions): string {
  const parts: string[] = [`# ${title}`, "", `Description: ${description}`, ""];

  if (filePath.endsWith(".mdx")) {
    const sourceUrl = `${globalConfig.baseGitHubDeploymentBranchViewUrl}/${filePath}`;
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
