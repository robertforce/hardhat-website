import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  filterGlossary,
  formatGlossaryPreamble,
  type GlossaryEntry,
} from "../../src/utils/componentGlossary.ts";

describe("filterGlossary", () => {
  it("returns empty array when source has no matching patterns", () => {
    const result = filterGlossary("plain text with no components");
    assert.deepStrictEqual(result, []);
  });

  it("returns matching non-code-modifier entries", () => {
    const result = filterGlossary(
      "<Tabs><TabItem label='a'>x</TabItem></Tabs>",
    );
    const names = result.map((e) => e.name);
    assert.ok(names.includes("<Tabs>"));
    assert.ok(names.includes("<TabItem>"));
  });

  it("excludes code modifier when no code block is present", () => {
    const result = filterGlossary('title="foo"');
    const names = result.map((e) => e.name);
    assert.ok(!names.includes('title="..."'));
  });

  it("includes code modifier when ``` is present", () => {
    const result = filterGlossary('```ts title="foo"\nconsole.log("hi")\n```');
    const names = result.map((e) => e.name);
    assert.ok(names.includes('title="..."'));
  });

  it("includes code modifier when <Code is present", () => {
    const result = filterGlossary('<Code code="x" title="foo" />');
    const names = result.map((e) => e.name);
    assert.ok(names.includes('title="..."'));
    assert.ok(names.includes("<Code>"));
  });

  it("includes code modifier when <CodeWithClientSideRandomNumber is present", () => {
    const result = filterGlossary(
      '<CodeWithClientSideRandomNumber code="x" title="foo" />',
    );
    const names = result.map((e) => e.name);
    assert.ok(names.includes('title="..."'));
    assert.ok(names.includes("<CodeWithClientSideRandomNumber>"));
  });

  it("returns multiple matches", () => {
    const result = filterGlossary(
      "<Tabs><TabItem label='a'>x</TabItem></Tabs>\n<Aside>note</Aside>",
    );
    assert.ok(result.length >= 3);
  });
});

describe("formatGlossaryPreamble", () => {
  it("returns empty string for empty entries", () => {
    assert.equal(formatGlossaryPreamble([], "  "), "");
  });

  it("formats a single entry correctly", () => {
    const entries: GlossaryEntry[] = [
      { pattern: "<Tabs", name: "<Tabs>", description: "Tabbed content." },
    ];
    const result = formatGlossaryPreamble(entries, "  ");
    assert.equal(
      result,
      "  Components used in this page:\n    - <Tabs>: Tabbed content.",
    );
  });

  it("formats multiple entries", () => {
    const entries: GlossaryEntry[] = [
      { pattern: "<Tabs", name: "<Tabs>", description: "Tabs desc." },
      { pattern: "<Aside", name: "<Aside>", description: "Aside desc." },
    ];
    const result = formatGlossaryPreamble(entries, "");
    const lines = result.split("\n");
    assert.equal(lines[0], "Components used in this page:");
    assert.equal(lines[1], "  - <Tabs>: Tabs desc.");
    assert.equal(lines[2], "  - <Aside>: Aside desc.");
  });
});
