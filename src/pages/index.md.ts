const body = `# Hardhat 3

Hardhat is a development environment for Ethereum and EVM-compatible blockchains. It helps developers compile, deploy, test, and debug Solidity smart contracts. Hardhat 3 is the latest major version, featuring a Rust-powered runtime for outstanding performance, comprehensive Solidity and TypeScript testing, multi-chain support (including OP Stack and Base simulation), and a powerful plugin ecosystem.

This is a subset of the different sections of the website. Explore the [llms.txt](https://hardhat.org/llms.txt) file to find more.

## Getting Started

- [Getting started with Hardhat 3](https://hardhat.org/docs/getting-started.md): Set up a new Hardhat project
- [Hardhat 3 Tutorial](https://hardhat.org/docs/tutorial.md): Step-by-step Hardhat 3 tutorial
- [What's new in Hardhat 3](https://hardhat.org/docs/hardhat3/whats-new.md): Overview of new features in Hardhat 3
- [Migration from Hardhat 2 to Hardhat 3](https://hardhat.org/docs/hardhat3/migration.md): Step-by-step migration guide

## Guides

- [Writing contracts overview](https://hardhat.org/docs/guides/writing-contracts.md): Overview of writing smart contracts
- [Managing dependencies](https://hardhat.org/docs/guides/writing-contracts/dependencies.md): Using npm packages in your contracts
- [Testing overview](https://hardhat.org/docs/guides/testing.md): Overview of testing approaches
- [Writing Solidity tests](https://hardhat.org/docs/guides/testing/using-solidity.md): Fast unit tests in Solidity
- [Testing with Viem](https://hardhat.org/docs/guides/testing/using-viem.md): Integration tests with Viem
- [Testing with Ethers](https://hardhat.org/docs/guides/testing/using-ethers.md): Integration tests with Ethers.js
- [Gas statistics](https://hardhat.org/docs/guides/testing/gas-statistics.md): Get gas usage reports
- [Code coverage](https://hardhat.org/docs/guides/testing/code-coverage.md): Measure test coverage
- [Deployment overview](https://hardhat.org/docs/guides/deployment.md): Overview of deployment options

## Cookbook

- [Cookbook](https://hardhat.org/docs/cookbook.md): Recipes for common tasks

## Reference

- [Configuration](https://hardhat.org/docs/reference/configuration.md): Hardhat configuration reference
- [Network Manager](https://hardhat.org/docs/reference/network-manager.md): Network management reference
- [EDR Simulated Networks](https://hardhat.org/docs/reference/edr-simulated-networks.md): Simulated network reference
- [JSON-RPC Methods](https://hardhat.org/docs/reference/json-rpc-methods.md): Supported JSON-RPC methods
- [Artifacts](https://hardhat.org/docs/reference/artifacts.md): Build artifacts reference
- [Console Log](https://hardhat.org/docs/reference/console-log.md): Solidity console.log reference
- [Foundry Compatibility](https://hardhat.org/docs/reference/foundry-compatibility.md): Foundry compatibility details

## Hardhat Ignition

- [Getting started](https://hardhat.org/ignition/docs/getting-started.md): Get started with Hardhat Ignition
- [Creating modules](https://hardhat.org/ignition/docs/guides/creating-modules.md): Define deployment modules
- [Deploying a module](https://hardhat.org/ignition/docs/guides/deploy.md): Deploy with Hardhat Ignition

## Plugin Development

- [Plugin development overview](https://hardhat.org/docs/plugin-development.md): Build Hardhat plugins
- [Your first plugin](https://hardhat.org/docs/plugin-development/tutorial.md): Plugin development tutorial
- [Using the plugin template](https://hardhat.org/docs/plugin-development/guides/hardhat3-plugin-template.md): Start from a template
- [Publishing a plugin](https://hardhat.org/docs/plugin-development/guides/publishing.md): Publish to npm

## Resources

- [GitHub Repository](https://github.com/NomicFoundation/hardhat)
- [npm: hardhat](https://www.npmjs.com/package/hardhat)
- [Discord Community](https://hardhat.org/discord)
- [Machine-readable docs index](https://hardhat.org/llms.txt)
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
