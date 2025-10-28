## Overview

Hardhat can optionally show statistics on the gas consumed by your contracts' public functions during a test run. Use the `--gas-stats` flag when running your tests to display this information.

## Getting gas statistics from your tests

You can pass the `--gas-stats` flag to either the `test` task or to one of the specific subtasks (e.g. `test solidity`):

::::tabsgroup{options=npm,pnpm,yarn}

:::tab{value=npm}

```bash
npx hardhat test --gas-stats
npx hardhat test solidity --gas-stats
npx hardhat test nodejs --gas-stats
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test --gas-stats
pnpm hardhat test solidity --gas-stats
pnpm hardhat test nodejs --gas-stats
```

:::

:::tab{value=yarn}

```bash
yarn hardhat test --gas-stats
yarn hardhat test solidity --gas-stats
yarn hardhat test nodejs --gas-stats
```

:::

::::

Output:

```bash
| contracts/Calculator.sol:Calculator |                 |          |        |       |        |
| ----------------------------------- | --------------- | -------- | ------ | ----- | ------ |
| Deployment Cost                     | Deployment Size |          |        |       |        |
| 324722                              | 1291            |          |        |       |        |
| Function name                       | Min             | Average  | Median | Max   | #calls |
| result                              | 23510           | 23510    | 23510  | 23510 | 24     |
| multiply(uint256,uint256)           | 22355           | 31355    | 27155  | 44255 | 7      |
| multiply(uint256,uint256,uint256)   | 27776           | 32051    | 27776  | 44876 | 4      |
| divide                              | 27217           | 29661.57 | 27217  | 44317 | 7      |
| subtract                            | 22340           | 29602.4  | 27140  | 44252 | 5      |
| reset                               | 21486           | 21486    | 21486  | 21486 | 3      |
|                                     |                 |          |        |       |        |
| contracts/Counter.sol:Counter       |                 |          |        |       |        |
| ----------------------------------- | --------------- | -------- | ------ | ----- | ------ |
| Deployment Cost                     | Deployment Size |          |        |       |        |
| 234940                              | 870             |          |        |       |        |
| Function name                       | Min             | Average  | Median | Max   | #calls |
| x                                   | 23466           | 23466    | 23466  | 23466 | 5      |
| inc                                 | 26383           | 32083    | 26383  | 43483 | 3      |
| add(uint256)                        | 24004           | 26353.33 | 26816  | 26840 | 6      |
| add(uint256,bool)                   | 27186           | 27321    | 27321  | 27456 | 6      |
```

The statistics are collected from the functions called by the tests you executed. This means that running `test solidity --gas-stats` will produce a different result than running `test nodejs --gas-stats`, because different tests will have been run.

## Understanding the Gas Statistics Table

The gas statistics table shows the following information for each function:

- _count_: Number of times the function was called
- _min_: Minimum gas consumed in a single call
- _max_: Maximum gas consumed in a single call
- _avg_: Average gas consumed across all calls
- _median_: Median gas consumed across all calls

For deployments, the table shows:

- _gas_: Gas cost of executing the deployment
- _size_: Size of the deployed bytecode in bytes

The deployment information reflects the last deployment of each contract, not an average or aggregate.

### Statistics are limited to only public functions called directly by tests

Gas statistics only include public functions that are called directly by your tests. If a public function is called by another function but not directly by a test, it won't be included in the statistics.

For example, consider this contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
  uint256 public count;

  function inc() public {
    _incInternal();
  }

  function _incInternal() private {
    count++;
  }

  function incBy(uint256 value) public {
    count += value;
  }

  function reset() public {
    count = 0;
  }
}

```

And this test:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Counter.sol";

contract CounterTest {
  Counter counter;

  function setUp() public {
    counter = new Counter();
  }

  function testInc() public {
    counter.inc();
  }

  function testIncBy() public {
    counter.incBy(5);
  }
}
```

The output will be:

```bash
| Gas Usage Statistics          |                 |         |        |       |        |
| ----------------------------- | --------------- | ------- | ------ | ----- | ------ |
| contracts/Counter.sol:Counter |                 |         |        |       |        |
| ----------------------------- | --------------- | ------- | ------ | ----- | ------ |
| Deployment Cost               | Deployment Size |         |        |       |        |
| 179915                        | 616             |         |        |       |        |
| Function name                 | Min             | Average | Median | Max   | #calls |
| inc                           | 43485           | 43485   | 43485  | 43485 | 1      |
| incBy                         | 43938           | 43938   | 43938  | 43938 | 1      |
```

The statistics include `inc()` and `incBy()` because they're called directly by the tests. The `reset()` function doesn't appear because it's never called by the tests. The `_incInternal()` function doesn't appear because it's private and only called by `inc()`, not directly by the tests.
