import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightSidebarTopics from "starlight-sidebar-topics";
import starlightLinksValidator from "starlight-links-validator";
import partytown from "@astrojs/partytown";
import vercel from "@astrojs/vercel";
import { setGlobalDispatcher, Agent } from "undici";
import { unwatchFile, watchFile } from "node:fs";
import { glob, utimes } from "node:fs/promises";

import { globalConfig } from "./src/config";
import redirects from "./src/redirects";
import { officialPluginsList } from "./src/content/officialPluginList";
import { sidebarTopics, sidebarTopicOptions } from "./src/sidebar";
import path from "node:path";

// We set this up to prefer IPv4 connections to IPv6 connections
// as otherwise the Vercel deployments were failing when trying to access
// the Ghost API
setGlobalDispatcher(new Agent({ connect: { family: 4 } }));

export default defineConfig({
  site: globalConfig.url + "/",
  adapter: vercel({}),
  integrations: [
    starlight({
      title: "Hardhat 3",
      favicon: "/favicon.ico",
      disable404Route: true,
      logo: {
        light: "./src/assets/hardhat-logo-light.svg",
        dark: "./src/assets/hardhat-logo-dark.svg",
        replacesTitle: true,
      },
      editLink: {
        baseUrl:
          "https://github.com/NomicFoundation/hardhat-website/edit/main/",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: globalConfig.url + "/thumbnail.png",
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/NomicFoundation/hardhat",
        },
        {
          icon: "x.com",
          label: "X",
          href: "https://x.com/HardhatHQ",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://hardhat.org/discord",
        },
      ],
      plugins: [
        // While we use this multi-sidebar plugin, each item of the array of
        // sidebars is configured like a normal Starlight sidebar.
        // See: https://starlight.astro.build/guides/sidebar/
        starlightSidebarTopics(sidebarTopics, sidebarTopicOptions),
        starlightLinksValidator({
          exclude: Object.keys(redirects)
            .concat(officialPluginsList.map((p) => `/docs/plugins/${p.slug}`))
            .concat([
              "/docs/plugins/official-plugins",
              "/docs/plugins/community-plugins",
            ]),
        }),
      ],
      customCss: ["./src/styles/custom-starlight-theme.css"],
      components: {
        Sidebar: "./src/components/starlight-overrides/Sidebar.astro",
        Header: "./src/components/starlight-overrides/Header.astro",
      },
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  trailingSlash: "never",
  redirects,
  vite: {
    server: {
      watch: {
        ignored: [
          "./.vercel/**",
          "./.vscode/**",
          "./dist/**",
          "./.git/**",
          "**/node_modules/**",
        ],
      },
    },
    plugins: [
      {
        name: "custom-watcher",
        async configureServer(_server) {
          const files = await Array.fromAsync(
            glob(path.join(import.meta.dirname, "src", "**", "*.{json,ts,js}")),
          );

          for (const file of files) {
            watchFile(file, { interval: 1000 }, async (curr, prev) => {
              if (curr.mtimeMs === prev.mtimeMs) {
                return;
              }

              for (const fileToRemove of files) {
                unwatchFile(fileToRemove);
              }

              console.log("File modified", file);
              const now = new Date();
              // We `touch` the config so that astro does its thing
              await utimes(import.meta.filename, now, now);
            });
          }
        },
      },
    ],
  },
});
