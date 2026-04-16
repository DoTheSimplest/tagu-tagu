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
	useState,
} from "../src";

describe(Modify, () => {
	describe("text", () => {
		it("string", () => {
			$(document.body, {
				text: "Hello!",
			});
			assert.equal(document.body.textContent, "Hello!");
		});
		it("computed", () => {
			const text = useState("Hello!");
			$(document.body, {
				text: () => text.get(),
			});
			text.set("World!");
			assert.equal(document.body.textContent, "World!");
		});
	});
	describe("prop", () => {
		it("number", () => {
			function PropExample() {
				return select([option("One"), option("Two"), option("Three")], {
					prop: { selectedIndex: 1 },
				});
			}
			const selectElement = PropExample();
			assert.equal(selectElement.selectedIndex, 1);
		});
		it("function", () => {
			const selectedIndex = useState(1);
			function PropExample() {
				return select([option("One"), option("Two"), option("Three")], {
					prop: { selectedIndex: () => selectedIndex.get() },
				});
			}
			const selectElement = PropExample();
			selectedIndex.set(2);
			assert.equal(selectElement.selectedIndex, 2);
		});
	});

	describe("attr", () => {
		it("string", () => {
			$(document.body, {
				attr: { id: "Hello" },
			});
			assert.equal(document.body.id, "Hello");
		});
		it("function", () => {
			const id = useState("Hello");
			$(document.body, {
				attr: { id: () => id.get() },
			});
			id.set("World");
			assert.equal(document.body.id, "World");
		});
	});
	describe("css", () => {
		it("string", () => {
			const element = div();
			$(element, {
				css: { background: "blue" },
			});
			assert.equal(element.style.background, "blue");
		});
		it("function", () => {
			const element = div();
			const isBlue = useState(false);
			$(element, {
				css: { background: () => (isBlue.get() ? "blue" : "red") },
			});
			isBlue.set(true);
			assert.equal(element.style.background, "blue");
		});
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
		$(container, append(div("World!")));
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
