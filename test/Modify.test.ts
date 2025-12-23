import { assert, describe, it } from "vitest";
import { Modify } from "../src";

describe(Modify, () => {
	it("text", () => {
		Modify(document.body, {
			text: "Hello!",
		});
		assert.equal(document.body.textContent, "Hello!");
	});
});
