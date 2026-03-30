import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { formatSmartDate } from "../../src/utils/formatSmartDate.ts";

// Pin "now" to 2026-06-15T12:00:00Z for all tests
const NOW = new Date("2026-06-15T12:00:00Z").getTime();

function makeDate(daysAgo: number): Date {
  return new Date(NOW - daysAgo * 24 * 60 * 60 * 1000);
}

describe("formatSmartDate", () => {
  it('returns "Today" for same day', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(formatSmartDate(makeDate(0)), "Today");
    mock.timers.reset();
  });

  it('returns "Yesterday" for 1 day ago', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(formatSmartDate(makeDate(1)), "Yesterday");
    mock.timers.reset();
  });

  it('returns "3 days ago" for 3 days ago', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(formatSmartDate(makeDate(3)), "3 days ago");
    mock.timers.reset();
  });

  it('returns "Last week" for 8 days ago', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(formatSmartDate(makeDate(8)), "Last week");
    mock.timers.reset();
  });

  it('returns "2 weeks ago" for 15 days ago', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(formatSmartDate(makeDate(15)), "2 weeks ago");
    mock.timers.reset();
  });

  it('returns "Last month" for exactly 1 month ago', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    // May 15 is 1 month before June 15, and 31 days back
    assert.equal(
      formatSmartDate(new Date("2026-05-15T12:00:00Z")),
      "Last month",
    );
    mock.timers.reset();
  });

  it('returns "Mon DD" format for same year, >21 days ago', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    // Jan 15, 2026 - same year, well past 21 days and >1 month
    assert.equal(formatSmartDate(new Date("2026-01-15T12:00:00Z")), "Jan 15");
    mock.timers.reset();
  });

  it('returns "Mon DD, YYYY" format for different year', () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(
      formatSmartDate(new Date("2025-01-15T12:00:00Z")),
      "Jan 15, 2025",
    );
    mock.timers.reset();
  });

  it("accepts date strings", () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(formatSmartDate("2026-06-15T10:00:00Z"), "Today");
    mock.timers.reset();
  });

  it("accepts Date objects", () => {
    mock.timers.enable({ apis: ["Date"], now: NOW });
    assert.equal(
      formatSmartDate(new Date("2026-06-14T10:00:00Z")),
      "Yesterday",
    );
    mock.timers.reset();
  });
});
