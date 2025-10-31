# Contributing to Hardhat's website

Thanks for your interest in contributing to Hardhat's website!

This website is built using [Astro](https://astro.build), and [Starlight](https://starlight.astro.build).

## Editing content

The website's content is located in the [`src/content`](./src/content) directory, and written in GitHub Flavored Markdown in MDX files.

You don't need to learn about Starlight to be able to edit the content.

### Using Astro components in MDX files

In MDX you can use an Astro component by importing it right below the frontmatter and then using it inline.

#### Starlight MDX components

You can use Starlight MDX components by following this guide: https://starlight.astro.build/components/using-components/#using-a-component-in-mdx

The most interesting ones are:

- [`Code`](https://starlight.astro.build/components/code/): When the triple backticks syntax is not enough
- [`FileTree`](https://starlight.astro.build/components/file-tree/): To display the file system srtucture
- [`Steps`](https://starlight.astro.build/components/steps/): For ordered steps that the user should follow

FileTree and Steps should be used whenever it makes sense. Code only when the triple backticks aren'y enough.

Note that the triple backticks in Starlight are more powerful than usual, as they are backed by ExpressiveCode. See:

- https://starlight.astro.build/guides/authoring-content/#code-blocks
- https://expressive-code.com/key-features/syntax-highlighting/
- https://expressive-code.com/key-features/frames/
- https://expressive-code.com/key-features/text-markers/
- https://expressive-code.com/key-features/word-wrap/
- https://expressive-code.com/key-features/code-component/

#### Custom components

- `@hh/Install.astro`: Which shows how to install npm packages with the different package managers (e.g. `pnpm add --save-dev foo`). Receives `packages` as prop.
- `@hh/Run.astro`: Which shows how to run an npm binary with the different package managers (e.g. `pnpm hardhat test`). Receives `command` as prop (array or string of arrays), and an optional `prefix`.
- `@hh/RunRemote.astro`: Which shows how to run a remote binary with the different package managers (e.g. `pnpm dlx hardhat --init`). Receives `command` as prop.

```mdx
---
title: Example
description: An example of MDX
---

import Install from "@hh/Install.astro";

<Install packages="hardhat" />
```

### Spell checking

We use [cspell](https://cspell.org/#documentation) as a spell checker. It runs as part of `pnpm lint`, or as `pnpm spellcheck`.

If if reports a typo for a word that you know is correct (e.g. a technical term), please add it to `cspell-dictionary.txt`.

Note that cspell doesn't autofix your typos.

### Adding a new page

In most cases, if you place a new `.mdx` file in a folder within the [`src/content`](./src/content) directory, it will be automatically added to the website. You can validate if it does by running the website locally and checking if it appears in its section's sidebar.

If it doesn't, you may need to edit the [`src/content.config.ts`](./src/content.config.ts) file to add it to the sidebar. We use [`starlight-sidebar-topics`](https://starlight-sidebar-topics.netlify.app/docs/getting-started/) to manage the different section's/topic's sidebars, so please refer to its documentation for more information.

### Moving a page

To move a page from one URL to another one, you have to do two things:

1. Move the `.mdx` file.
2. Create an entry in `src/redirects/moved-pages.ts`

### Internal links

All internal links should be absolute, starting from the root of the website. For example, if you want to link to the "Getting started" page, you should use `/docs/getting-started`.

Internal links, including `#hashes`, are validated when you run `pnpm build`.

## Running the website locally

To run the website locally, you'll need to install the dependencies:

```bash
pnpm install
```

Then, you can run the development server:

```bash
pnpm run dev
```

If you are running in a devcontainer you will have to run this instead:

```bash
pnpm run dev --host
```

## `@nomicfoundation/hardhat-errors` updates

To keep the list of errors updated, we render it using the latest version of `@nomicfoundation/hardhat-errors`.

We do this by installing the latest version of the package in the `errors` pnpm script and generating the `src/content/docs/docs/reference/errors.md` file.

The generated markdown file shouldn't be committed to the repository, and is ignored by git.

The `errors` script is run by the `prebuild` script of the `package.json` file.

This means that a build may modify your `package.json` lockfile, but please review these changes before committing them.

## Linting

We use `prettier`, `astro check`, and `starlight-links-validator` to lint/validate the website.

The first two can be run with `pnpm run lint` and `pnpm run lint:fix`. The latter only runs on `pnpm build`.

Note that `pnpm lint` ignores the community plugins list json, so that we don't get PRs adding plugins unecessarily blocked by the CI.
