import type { AstroConfig } from "astro";

import hh2 from "./hh2";
import nextToStarlight from "./next-to-starlight";
import errorRedirects from "./error-codes";
import shortlinks from "./shortlinks";
import inAppShortlinks from "./in-app-shortlinks";
import movedPagesRedirects from "./moved-pages";
import { globalConfig } from "../config";

const redirects: Record<
  string,
  Exclude<AstroConfig["redirects"][string], string>
> = {};

// Sorted in increasing importance/presedence
const redirectCategories = [
  hh2,
  nextToStarlight,
  errorRedirects,
  shortlinks,
  inAppShortlinks,
  movedPagesRedirects,
];

for (const category of redirectCategories) {
  for (const [from, to] of category) {
    if (redirects[from] !== undefined) {
      throw new Error(`Duplicated redirect found!

From: ${from}
Lower priority redirection: ${redirects[from].destination}
Higher priority redirection: ${to}

How to resolve this error:

- If you just added the lower priority redirect, you should add a different one.
- If you just added the higher priority one, you can either add a different one, or decide that it has higher priority and remove the lower priority one`);
    }

    redirects[from] = {
      destination: to,
      status: 302,
    };

    // We apply .md redirections to all the internal astro redirections,
    // otherwise the `.vercel.json` ones take priority and things like `/docs`
    // end up redirecting to `/docs.md` instead of `/docs/getting-started.md`.
    if (
      !from.endsWith(".md") &&
      !from.endsWith(".html") &&
      !from.endsWith(".txt")
    ) {
      let destination = to;

      if (to.startsWith("/")) {
        const urlString = `${globalConfig.url}${to}`;
        const url = URL.parse(urlString);
        if (url === null) {
          throw new Error(`Invalid Astro redirect destination: ${to}

It doesn't form a valid URL: ${urlString}`);
        }

        destination = `${url.pathname}.md${url.search}${url.hash}`;
      }

      const fromMd = `${from}.md`;

      if (redirects[fromMd] !== undefined) {
        throw new Error(
          `Adding a .md redirection for ${from} would overwrite an existing redirection: ${fromMd}`,
        );
      }

      redirects[fromMd] = {
        destination,
        status: 302,
      };
    }
  }
}

// Also add /.md -> /index.md redirect
redirects["/.md"] = {
  destination: "/index.md",
  status: 302,
};

export default redirects satisfies AstroConfig["redirects"];
