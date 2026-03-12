const body = `# Hardhat 3

Hardhat is a development environment for Ethereum and EVM-compatible blockchains. It helps developers compile, deploy, test, and debug Solidity smart contracts. Hardhat 3 is the latest major version, featuring a Rust-powered runtime for outstanding performance, comprehensive Solidity and TypeScript testing, multi-chain support (including OP Stack and Base simulation), and a powerful plugin ecosystem.

## Getting Started

- [Getting started with Hardhat 3](https://hardhat.org/docs/getting-started.md): Set up a new Hardhat project
- [What's new in Hardhat 3](https://hardhat.org/docs/hardhat3/whats-new.md): Overview of new features in Hardhat 3
- [Migration from Hardhat 2 to Hardhat 3](https://hardhat.org/docs/hardhat3/migration.md): Step-by-step migration guide

## Tutorial

- [Hardhat 3 Tutorial](https://hardhat.org/docs/tutorial.md): Step-by-step Hardhat 3 tutorial
- [Setting up a project](https://hardhat.org/docs/tutorial/setup.md): Create and configure a new project
- [Writing and testing a contract](https://hardhat.org/docs/tutorial/writing-and-testing.md): Write and test a Solidity contract
- [Using an assertions library](https://hardhat.org/docs/tutorial/assertions-library.md): Add assertion helpers
- [Writing fuzz tests](https://hardhat.org/docs/tutorial/fuzz-tests.md): Fuzz testing in Solidity
- [Using a plugin](https://hardhat.org/docs/tutorial/plugins.md): Extend Hardhat with plugins
- [Writing TypeScript tests](https://hardhat.org/docs/tutorial/typescript-tests.md): Test in TypeScript
- [Measuring test coverage](https://hardhat.org/docs/tutorial/coverage.md): Code coverage for your tests
- [Deploying a contract](https://hardhat.org/docs/tutorial/deploying.md): Deploy with Hardhat Ignition
- [Using Configuration Variables](https://hardhat.org/docs/tutorial/configuration-variables.md): Manage secrets
- [Verifying a contract](https://hardhat.org/docs/tutorial/verifying.md): Verify on Etherscan

## Guides

### Writing Smart Contracts

- [Writing contracts overview](https://hardhat.org/docs/guides/writing-contracts.md): Overview of writing smart contracts
- [Configuring the compiler](https://hardhat.org/docs/guides/writing-contracts/configuring-the-compiler.md): Solidity compiler configuration
- [Managing dependencies](https://hardhat.org/docs/guides/writing-contracts/dependencies.md): Using npm packages in your contracts
- [Build profiles](https://hardhat.org/docs/guides/writing-contracts/build-profiles.md): Configure multiple build profiles
- [Import remappings](https://hardhat.org/docs/guides/writing-contracts/remappings.md): Configure import remappings
- [Isolated builds](https://hardhat.org/docs/guides/writing-contracts/isolated-builds.md): Reproducible builds

### Testing Smart Contracts

- [Testing overview](https://hardhat.org/docs/guides/testing.md): Overview of testing approaches
- [Writing Solidity tests](https://hardhat.org/docs/guides/testing/using-solidity.md): Fast unit tests in Solidity
- [Testing with Viem](https://hardhat.org/docs/guides/testing/using-viem.md): Integration tests with Viem
- [Testing with Ethers](https://hardhat.org/docs/guides/testing/using-ethers.md): Integration tests with Ethers.js
- [Gas statistics](https://hardhat.org/docs/guides/testing/gas-statistics.md): Get gas usage reports
- [Code coverage](https://hardhat.org/docs/guides/testing/code-coverage.md): Measure test coverage

### Deploying Smart Contracts

- [Deployment overview](https://hardhat.org/docs/guides/deployment.md): Overview of deployment options
- [Deploying with Ignition](https://hardhat.org/docs/guides/deployment/using-ignition.md): Declarative deployments with Hardhat Ignition
- [Deploying with scripts](https://hardhat.org/docs/guides/deployment/using-scripts.md): Script-based deployments

### Other Guides

- [Smart contract verification](https://hardhat.org/docs/guides/smart-contract-verification.md): Verify contracts on Etherscan
- [Configuration variables](https://hardhat.org/docs/guides/configuration-variables.md): Manage secrets and config vars
- [Writing tasks](https://hardhat.org/docs/guides/writing-tasks.md): Create custom Hardhat tasks
- [Writing scripts](https://hardhat.org/docs/guides/writing-scripts.md): Automate workflows with scripts
- [Forking mainnet](https://hardhat.org/docs/guides/forking.md): Fork and test against live networks
- [Hardhat Node](https://hardhat.org/docs/guides/hardhat-node.md): Run a local Ethereum node
- [Hardhat Console](https://hardhat.org/docs/guides/hardhat-console.md): Interactive JavaScript console

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
- [Errors](https://hardhat.org/docs/reference/errors.md): Error codes reference

## Hardhat Ignition

- [Getting started](https://hardhat.org/ignition/docs/getting-started.md): Get started with Hardhat Ignition
- [Creating modules](https://hardhat.org/ignition/docs/guides/creating-modules.md): Define deployment modules
- [Deploying a module](https://hardhat.org/ignition/docs/guides/deploy.md): Deploy with Hardhat Ignition
- [Using in tests](https://hardhat.org/ignition/docs/guides/tests.md): Use Ignition in your test suite
- [Modifying a module](https://hardhat.org/ignition/docs/guides/modifications.md): Modify an existing module
- [Verifying deployments](https://hardhat.org/ignition/docs/guides/verify.md): Verify deployed contracts
- [Upgradeable contracts](https://hardhat.org/ignition/docs/guides/upgradeable-proxies.md): Proxy and upgradeable patterns
- [Deploying via create2](https://hardhat.org/ignition/docs/guides/create2.md): Deterministic deployments
- [Using Ethers](https://hardhat.org/ignition/docs/guides/ethers.md): Ethers.js integration
- [Deploying with Ledger](https://hardhat.org/ignition/docs/guides/ledger.md): Hardware wallet deployments
- [Deploying within scripts](https://hardhat.org/ignition/docs/guides/scripts.md): Use Ignition in Hardhat scripts

## Migrate from Hardhat 2

- [Migration overview](https://hardhat.org/docs/migrate-from-hardhat2.md): How to migrate from Hardhat 2 to Hardhat 3
- [Migrate Mocha tests](https://hardhat.org/docs/migrate-from-hardhat2/guides/mocha-tests.md): Migrate Mocha tests from Hardhat 2

## Plugin Development

- [Plugin development overview](https://hardhat.org/docs/plugin-development.md): Build Hardhat plugins
- [Your first plugin](https://hardhat.org/docs/plugin-development/tutorial.md): Plugin development tutorial
- [Using the plugin template](https://hardhat.org/docs/plugin-development/guides/hardhat3-plugin-template.md): Start from a template
- [Plugin dependencies](https://hardhat.org/docs/plugin-development/guides/dependencies.md): Use other plugins as dependencies
- [Integration tests](https://hardhat.org/docs/plugin-development/guides/integration-tests.md): Test your plugin
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
