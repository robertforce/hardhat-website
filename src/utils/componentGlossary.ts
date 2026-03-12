export interface GlossaryEntry {
  /** String to search for in MDX source */
  pattern: string;
  /** Display name */
  name: string;
  /** Human-readable description */
  description: string;
}

export const componentGlossary: GlossaryEntry[] = [
  {
    pattern: "<Run",
    name: '<Run cmd="..."/>',
    description: "Runs a command in the terminal with npm/pnpm/yarn.",
  },
  {
    pattern: "<RunRemote",
    name: "<RunRemote>",
    description: "Runs a command in the terminal with npx/pnpm dlx/yarn dlx.",
  },
  {
    pattern: "<Install",
    name: '<Install pkg="..."/>',
    description: "Installs a package in the terminal with npm/pnpm/yarn.",
  },
  {
    pattern: "<CodeWithClientSideRandomNumber",
    name: "<CodeWithClientSideRandomNumber>",
    description: "A code block with a random placeholder value.",
  },
  {
    pattern: "<Tabs",
    name: "<Tabs>",
    description: "Tabbed content sections.",
  },
  {
    pattern: "<TabItem",
    name: "<TabItem>",
    description: "A tab within <Tabs>. Has a `label` attribute.",
  },
  {
    pattern: "<LinkCard",
    name: "<LinkCard>",
    description: "A styled link with title and description.",
  },
  {
    pattern: "<CardGrid",
    name: "<CardGrid>",
    description: "A grid layout for multiple LinkCards.",
  },
  {
    pattern: ":::note",
    name: ":::note",
    description: "An informational callout block.",
  },
  {
    pattern: ":::tip",
    name: ":::tip",
    description: "A helpful tip callout block.",
  },
  {
    pattern: ":::caution",
    name: ":::caution",
    description: "A warning callout block.",
  },
  {
    pattern: ":::danger",
    name: ":::danger",
    description: "A critical warning callout block.",
  },
];

/**
 * Returns only the glossary entries whose patterns appear in the given source.
 */
export function filterGlossary(source: string): GlossaryEntry[] {
  return componentGlossary.filter((entry) => source.includes(entry.pattern));
}

/**
 * Formats a filtered glossary as an HTML comment preamble for a single .md file.
 */
export function formatGlossaryPreamble(entries: GlossaryEntry[]): string {
  if (entries.length === 0) return "";
  const lines = entries.map((e) => `  - ${e.name}: ${e.description}`);
  return `Components used in this page:\n${lines.join("\n")}`;
}

/**
 * Formats the full glossary as a blockquote for llms.txt.
 */
export function formatFullGlossary(): string {
  return componentGlossary
    .map((e) => `> - \`${e.name}\`: ${e.description}`)
    .join("\n");
}
