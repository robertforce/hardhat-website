import { getCollection } from "astro:content";

interface Section {
  title: string;
  filter: (id: string) => boolean;
}

const sections: Section[] = [
  {
    title: "Hardhat",
    filter: (id) =>
      (id.startsWith("docs/") &&
        !id.startsWith("docs/migrate-from-hardhat2") &&
        !id.startsWith("docs/plugin-development")) ||
      id === "hardhat2",
  },
  {
    title: "Hardhat Ignition",
    filter: (id) => id.startsWith("ignition/"),
  },
  {
    title: "Migrate from Hardhat 2",
    filter: (id) => id.startsWith("docs/migrate-from-hardhat2"),
  },
  {
    title: "Plugin Development",
    filter: (id) => id.startsWith("docs/plugin-development"),
  },
];

export async function GET() {
  const docs = await getCollection("docs");

  const preamble = `# Hardhat 3

> Hardhat is a development environment for Ethereum and EVM-compatible blockchains.
> It helps developers compile, deploy, test, and debug Solidity smart contracts.
> Solidity is the primary programming language for writing smart contracts on Ethereum.
>
> This documentation covers Hardhat 3, the latest major version.
> The docs are organized into sections: core Hardhat usage, Hardhat Ignition
> (a declarative deployment system), migration guides from Hardhat 2,
> and a plugin development guide.

`;

  const sectionBlocks = sections.map((section) => {
    const entries = docs
      .filter((entry) => section.filter(entry.id))
      .sort((a, b) => a.id.localeCompare(b.id));

    const lines = entries.map((entry) => {
      const url = `https://hardhat.org/${entry.id}.md`;
      return `- [${entry.data.title}](${url}): ${entry.data.description}`;
    });

    return `## ${section.title}\n\n${lines.join("\n")}`;
  });

  const body = [preamble, ...sectionBlocks, ""].join("\n\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
