import type { Redirects } from "./types";

export default [
  ["/config", "/docs/reference/configuration"],
  ["/chaining-async-matchers", "/docs/plugins/hardhat-ethers-chai-matchers"], //#limitations TODO: missing section
  ["/console-log", "/docs/reference/console-log"],
  [
    "/verify-custom-networks",
    "/docs/guides/smart-contract-verification#verifying-on-a-block-explorer-of-a-different-network",
  ],
  ["/ignition-errors", "/ignition/docs/explanations/error-handling"],
  [
    "/report-bug",
    "https://github.com/NomicFoundation/hardhat/issues/new/choose",
  ],
  [
    "/hardhat-network-helpers-fixtures",
    "/docs/plugins/hardhat-network-helpers", //#fixtures TODO: missing section
  ],
  ["/ethers-library-linking", "/docs/plugins/hardhat-ethers#library-linking"],
  ["/hd-wallet-config", "/docs/reference/configuration#hd-wallet-config"],
  ["/getting-started", "/docs/getting-started"],
] satisfies Redirects;
