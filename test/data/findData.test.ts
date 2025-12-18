import { describe, expect, it } from "vitest";
import { div } from "../../src";
import { findData } from "../../src/data/data";

describe(findData, () => {
	it("find data from ancestors", () => {
		const child = div();
		div({ data: { theme: "dark" } }, [child]);
		expect(findData(child, "theme")).toBe("dark");
	});

	it("returns undefined if ancestors don't have data", () => {
		const child = div();
		div({ data: { theme: "dark" } }, [child]);
		expect(findData(child, "invalid-key")).toBeUndefined();
	});
});
