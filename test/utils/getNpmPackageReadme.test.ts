import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getNpmPackageReadme } from "../../src/utils/getNpmPackageReadme.ts";

describe("getNpmPackageReadme", () => {
  it("fetches README for a real package", async () => {
    const readme = await getNpmPackageReadme(
      "@nomicfoundation/hardhat-typechain",
      "latest",
    );
    assert.equal(typeof readme, "string");
    assert.ok(
      readme.includes("# hardhat-typechain"),
      "README should have the right title",
    );
    assert.ok(readme.length > 100, "README should have substantial content");
  });

  it("throws for non-existent package", async () => {
    await assert.rejects(
      () =>
        getNpmPackageReadme(
          "@nomicfoundation/this-package-does-not-exist-xyz-123",
        ),
      { message: /Failed to fetch package metadata/ },
    );
  });

  it("throws for non-existent version tag", async () => {
    await assert.rejects(
      () =>
        getNpmPackageReadme(
          "@nomicfoundation/hardhat-typechain",
          "nonexistent-tag-xyz",
        ),
      { message: /Version '.*' not found/ },
    );
  });
});
