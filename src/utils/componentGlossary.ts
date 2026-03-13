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
    description:
      "Tabbed content sections. Props: `syncKey` to synchronize tab selection across multiple tab groups.",
  },
  {
    pattern: "<TabItem",
    name: "<TabItem>",
    description: "A tab within <Tabs>. Props: `label`, `icon`.",
  },
  {
    pattern: "<LinkCard",
    name: "<LinkCard>",
    description:
      "A styled link with title and description. Props: `href`, `title`, `description`.",
  },
  {
    pattern: "<CardGrid",
    name: "<CardGrid>",
    description:
      "A grid layout for multiple LinkCards. Props: `stagger` for staggered layout.",
  },
  {
    pattern: "<Aside",
    name: "<Aside>",
    description:
      "JSX aside component. Props: `type` (`note`/`tip`/`caution`/`danger`), `title`, `icon`.",
  },
  {
    pattern: "<Badge",
    name: "<Badge>",
    description: "Inline badge/label. Props: `text`, `variant`, `size`.",
  },
  {
    pattern: "<Card",
    name: "<Card>",
    description: "Content card. Props: `title`, `icon`.",
  },
  {
    pattern: "<Icon",
    name: "<Icon>",
    description: "Displays a built-in Starlight icon. Prop: `name`.",
  },
  {
    pattern: "<Steps",
    name: "<Steps>",
    description: "Wraps an ordered list to render as numbered steps. No props.",
  },
  {
    pattern: "<FileTree",
    name: "<FileTree>",
    description:
      "Displays file/folder structure from an unordered list. Supports `**bold**` for highlighting, `...` for placeholders, and comments after filenames.",
  },
  {
    pattern: "<LinkButton",
    name: "<LinkButton>",
    description:
      "Styled button link. Props: `href`, `variant` (`primary`/`secondary`/`minimal`), `icon`, `iconPlacement`.",
  },
  {
    pattern: "<Code",
    name: "<Code>",
    description:
      "Expressive Code component for programmatic code blocks. Props: `code`, `lang`, `title`, `mark`, etc.",
  },
  {
    pattern: ":::note",
    name: ":::note",
    description:
      'An informational callout block. Supports custom title `:::note[Title]` and icon `:::note{icon="name"}` syntax.',
  },
  {
    pattern: ":::tip",
    name: ":::tip",
    description:
      'A helpful tip callout block. Supports custom title `:::tip[Title]` and icon `:::tip{icon="name"}` syntax.',
  },
  {
    pattern: ":::caution",
    name: ":::caution",
    description:
      'A warning callout block. Supports custom title `:::caution[Title]` and icon `:::caution{icon="name"}` syntax.',
  },
  {
    pattern: ":::danger",
    name: ":::danger",
    description:
      'A critical warning callout block. Supports custom title `:::danger[Title]` and icon `:::danger{icon="name"}` syntax.',
  },
  {
    pattern: "collapse=",
    name: "collapse={X-Y}",
    description:
      "Collapses line ranges in code blocks. Supports multiple ranges: `collapse={1-5, 12-14}`.",
  },
  {
    pattern: "collapseStyle=",
    name: "collapseStyle=...",
    description:
      "Style for collapsed sections: `github`, `collapsible-start`, `collapsible-end`, `collapsible-auto`.",
  },
  {
    pattern: "showLineNumbers",
    name: "showLineNumbers",
    description:
      "Shows line numbers in code blocks. Use `showLineNumbers=false` to disable.",
  },
  {
    pattern: "startLineNumber=",
    name: "startLineNumber=N",
    description: "Sets the starting line number for code blocks.",
  },
  {
    pattern: "title=",
    name: 'title="..."',
    description: "Sets a title/filename on the code block frame.",
  },
  {
    pattern: "wrap",
    name: "wrap",
    description:
      "Enables word wrapping in code blocks. Use `wrap=false` to disable.",
  },
  {
    pattern: "mark=",
    name: "mark={X} / ins={X} / del={X}",
    description:
      'Line markers: highlight (`mark`), insert (`ins`), or delete (`del`) lines. Supports ranges like `{1, 4-8}`. Also works inline with strings: `"text"`, `ins="text"`, `del="text"`.',
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
export function formatGlossaryPreamble(
  entries: GlossaryEntry[],
  indent: string,
): string {
  if (entries.length === 0) return "";
  const lines = entries.map((e) => `${indent}  - ${e.name}: ${e.description}`);
  return `${indent}Components used in this page:\n${lines.join("\n")}`;
}
