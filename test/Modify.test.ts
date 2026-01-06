import { assert, describe, it } from "vitest";
import {
	$,
	$$,
	append,
	button,
	div,
	Modify,
	ModifyAll,
	option,
	select,
} from "../src";

describe(Modify, () => {
	it("text", () => {
		$(document.body, {
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
	it("[]", () => {
		const container = div();
		$(container, [div("Hello!")]);
		$(container, [div("World!")]);
		assert.deepEqual(
			[...container.children].map((c) => c.textContent),
			["World!"],
		);
	});
	it("append", () => {
		const container = div();
		$(container, [div("Hello!")]);
		$(container, append([div("World!")]));
		assert.deepEqual(
			[...container.children].map((c) => c.textContent),
			["Hello!", "World!"],
		);
	});
});

describe(ModifyAll, () => {
	it("text", () => {
		$(document.body, [button(), button(), button()]);
		$$("button", { text: "my-button" });
		assert.deepEqual(
			[...document.body.children].map((b) => b.textContent),
			["my-button", "my-button", "my-button"],
		);
	});
});
