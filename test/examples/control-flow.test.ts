import { describe, it } from "vitest";
import { useState } from "../../src";
import { button, div, input, span } from "../../src/Elements";
import { If } from "../../src/flow/If";
import { Switch } from "../../src/flow/Switch";
import { $ } from "../../src/Modify";

describe("control-flow", () => {
	it("If then", () => {
		const isDisplayed = useState(false);

		$(document.body, { html: "" }, [
			input({
				attr: { type: "checkbox", checked: isDisplayed },
				on: {
					click: () => {
						isDisplayed.set(!isDisplayed.get());
					},
				},
			}),
			If(isDisplayed, () =>
				div({
					css: { background: "blue", width: "300px", height: "300px" },
				}),
			),
			span("Check to show rectangle"),
		]);
	});

	it("If else", () => {
		const isDisplayed = useState(false);

		$(document.body, { html: "" }, [
			input({
				attr: { type: "checkbox", checked: isDisplayed },
				on: {
					click: () => {
						isDisplayed.set(!isDisplayed.get());
					},
				},
			}),
			If(
				isDisplayed,
				() =>
					div({
						css: { background: "blue", width: "300px", height: "300px" },
					}),
				() => div("No rectangle"),
			),
			span("Check to show rectangle"),
		]);
	});

	it("Switch", () => {
		const state = useState(
			"triangle" as "triangle" | "rectangle" | "circle" | "pentagon",
		);

		$(document.body, { html: "" }, [
			button("Triangle", { on: { click: () => state.set("triangle") } }),
			button("Rectangle", { on: { click: () => state.set("rectangle") } }),
			button("Circle", { on: { click: () => state.set("circle") } }),
			button("Pentagon", { on: { click: () => state.set("pentagon") } }),
			Switch(
				state,
				{
					triangle: () => div("▲"),
					rectangle: () => div("■"),
					circle: () => div("●"),
				},
				() => div("?"),
			),
		]);
	});
});
