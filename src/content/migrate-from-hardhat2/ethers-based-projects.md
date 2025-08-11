# Migrating an Ethers.js based project

This guide assumes that your proejct is based on the `@nomicfoundation/hardhat-toolbox` plugin, which is the recommended setup for Ethers.js based projects in Hardhat 2.

## Prerequisites

Hardhat 3 requires a recent installation of Node.js. Please upgrade to Node.js 22.10 or later.

## Setting your project as ESM

Hardhat 3 only supports EcmaScript Modules (ESM) projects. To enabled them you need to ad the `"type": "module"` field to your `package.json` file.

```json
{
  "type": "module"
  // ...
}
```

## Updating your dependencies

To upgrade your Hardhat dependencies to the latest version, you should uninstall any incompatible one first. If you project was based on `@nomicfoundation/hardhat-toolbox`, that may be all you need to remove.

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npm uninstall @nomicfoundation/hardhat-toolbox
```

:::

:::tab{value=pnpm}

```bash
pnpm uninstall @nomicfoundation/hardhat-toolbox
```

:::

::::

If you installed other plugins, we recommend uninstalling them first, and then reinstalling the new versions or alternative ones as needed.

Now, you can install Hardhat and the new toolbox for Mocha and Ethers:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npm add --save-dev hardhat@next @nomicfoundation/hardhat-toolbox-mocha-ethers@next
```

:::

:::tab{value=pnpm}

```bash
pnpm add --save-dev hardhat@next @nomicfoundation/hardhat-toolbox-mocha-ethers@next
```

:::

::::

:::tip
If your project was based on Ethers.js v5, you should upgrade it to Ethers.js v6.
:::

## Updating your configuration

The Hardhat 3 configuration is now fully declarative, so the way you import your plugins has changed.

While previously you would have `require("@nomicfoundation/hardhat-toolbox");` or `import "require("@nomicfoundation/hardhat-toolbox";`, you should make them part of your config object now.

So something like this

```ts
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  // ...
};
```

would turn into something like this:

```ts
import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.28",
  plugins: [hardhatToolboxMochaEthersPlugin],
};
```

Note that you should use `import` and `export default` instead of `require` and `module.exports`.

## Updating your existing tests and scripts

You don't need to rewrite your tests and scripts to work with Hardhat 3, but you do need to update them to work with ESM, some imports, and adapt it to and the new Network Management API.

The first of these things means switching to `import` instead of `require`. For example, this is the how the example test in the sample project starts:

```js
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
```

Now, it should change to this:

```js
import { network } from "hardhat";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";

const {
  ethers,
  networkHelpers: { loadFixture, time },
} = await network.connect();
```

Note that while previously, importing `hardhat` would have initialized a network connection, you now need to initialize it yourself, using `hre.network.connect`. This returns an `NetworkConnection` object, which exposes most of the functionality of the old `hre.network` object, including the network helpers.

You should also notice that `anyValue` is not imported from `@nomicfoundation/hardhat-chai-matchers/withArgs` anymore, but instead from `@nomicfoundation/hardhat-ethers-chai-matchers/withArgs`, which means that you also need to install that package:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npm install --save-dev @nomicfoundation/hardhat-ethers-chai-matchers@next
```

:::

:::tab{value=pnpm}

```bash
pnpm install --save-dev @nomicfoundation/hardhat-ethers-chai-matchers@next
```

:::

::::

With these modifications, you should now be able to run

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat test
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test
```

:::

::::

## Updating Hardhat Ignition

While Hardhat Ignition comes with the `@nomicfoundation/hardhat-toolbox-mocha-ethers` plugin, you'll need to update `@nomicfoundation/hardhat-ignition` to the latest version by running:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npm install --save-dev @nomicfoundation/hardhat-ignition@next
```

:::

:::tab{value=pnpm}

```bash
pnpm install --save-dev @nomicfoundation/hardhat-ignition@next
```

:::

::::

Once you do that, all you need to do is to update your Ignition modules is switching to the new `export default` syntax.

So instead of having somthing like this:

```js
module.exports = buildModule("LockModule", (m) => {
  // ...
});
```

it should look like this:

```js
export default buildModule("LockModule", (m) => {
  // ...
});
```

## Code coverage support

Code coverage is integrated into Hardhat 3, all you need to run it is adding `--coverage` to your `hardhat test` command.

## Feedback is welcome!

Hardhat 3 is still in beta. There are features that are still work in progress, some plugins that haven't been ported yet, and some issues that you may enocunter. If any fo this rings a bell, please let us know by [opening an issue](https://github.com/NomicFoundation/hardhat/issues/new).
