# This folder is for redirects

They are organized in different files, by category. In this order of priority (higher is better):

1. Redirects to the HH2 site
2. Redirects needed to keep URLs of the Next.js version of the site alive
3. Error code redirects
4. Manually created short links
5. In app shortlinks (i.e. printed by Hardhat)
6. Moved pages

## Astro vs Vercel redirects

Astro redirects are more limited, redirecting fixed URLs, and case insensitive. For more complex/general redirects, we need to use `vercel.json`'s redirects. We should keep those to the minimum, and only use them for redirects that are not covered by the `redirects` field in the Astro config.

## Redirects to `.md` versions

We automatically apply `.md` redirections to all the Astro redirections, otherwise the `.vercel.json` ones take priority and things like `/docs` end up redirecting to `/docs.md` instead of `/docs/getting-started.md`. The way we do this is that we add a redirect from `/docs.md` to `/docs/getting-started`, so that then the usual Astro redirection logic applies.
