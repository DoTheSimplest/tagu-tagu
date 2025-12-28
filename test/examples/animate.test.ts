import { describe, it } from "vitest";
import { div, Modify } from "../../src";

describe("animate", () => {
	it("simple duration", () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { background: "blue" } },
				{ css: { background: "lime" }, animate: 1000 },
				{ text: "Animation Finished" },
			),
		]);
	});
});
