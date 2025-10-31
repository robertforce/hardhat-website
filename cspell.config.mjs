import { defineConfig } from "cspell";

export default defineConfig({
  version: "0.2",
  dictionaryDefinitions: [
    {
      name: "cspell-dictionary",
      path: "./cspell-dictionary.txt",
      addWords: true,
    },
  ],
  dictionaries: ["cspell-dictionary"],
  ignorePaths: [
    "/node_modules",
    "/.github",
    "/.vercel",
    "/.astro",
    "/dist",
    "/cspell-dictionary.txt",
  ],
});
