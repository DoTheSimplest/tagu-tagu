import { assert, describe, it } from "vitest";
import { Modify, option, select } from "../src";

describe(Modify, () => {
	it("text", () => {
		Modify(document.body, {
			text: "Hello!",
		});
		assert.equal(document.body.textContent, "Hello!");
	});
	it("attr", () => {
		function AttrExample() {
			return select([option("One"), option("Two"), option("Three")], {
				prop: { selectedIndex: 1 },
			});
		}
		const selectElement = AttrExample();
		assert.equal(selectElement.selectedIndex, 1);
	});
});
