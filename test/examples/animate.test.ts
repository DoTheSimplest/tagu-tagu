import { describe, it } from "vitest";
import { div, Modify, useState } from "../../src";

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

	it("state", () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { background: "blue" } },
				{ css: { background: useState("lime") }, animate: 1000 },
				{ text: "Animation Finished" },
			),
		]);
	});

	it("animate: {}", () => {
		Modify(document.body, { html: "" }, [
			div(
				"Hello!",
				{ css: { background: "blue" } },
				{ css: { background: "lime" }, animate: {} },
				{ text: "Animation Finished" },
			),
		]);
	});
});
