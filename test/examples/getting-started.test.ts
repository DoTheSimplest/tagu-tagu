import { describe, it } from "vitest";
import { useComputed, useState } from "../../src";
import { button, div, span, style } from "../../src/Elements";
import { $ } from "../../src/Modify";

describe("getting started", () => {
	it("add button", () => {
		$(document.body, [button("Click me!")]);
	});
	it("counter", () => {
		const count = useState(4);

		function decrementCount() {
			count.set(count.get() - 1);
		}
		function incrementCount() {
			count.set(count.get() + 1);
		}

		$(document.body, [
			button("-", { on: { click: decrementCount } }),
			span(count),
			button("+", { on: { click: incrementCount } }),
		]);
	});
	it("State can be assigned as css value", () => {
		const background = useState("green" as "red" | "green" | "blue");

		$(document.body, [
			div({
				css: { width: "300px", height: "300px", background: background },
			}),
			button("red", { on: { click: () => background.set("red") } }),
			button("green", { on: { click: () => background.set("green") } }),
			button("blue", { on: { click: () => background.set("blue") } }),
		]);
	});

	it("State can be assigned as attr value", () => {
		const background = useState("small" as "small" | "large");

		$(document.body, [
			button("small", { on: { click: () => background.set("small") } }),
			button("large", { on: { click: () => background.set("large") } }),
			div(
				{
					attr: {
						class: background,
					},
				},
				[
					style({
						".small": {
							width: "100px",
							height: "100px",
							background: "blue",
						},
						".large": {
							width: "300px",
							height: "300px",
							background: "skyblue",
						},
					}),
				],
			),
		]);
	});

	it("State can be assigned as text value", () => {
		const count = useState(0);

		function incrementCount() {
			count.set(count.get() + 1);
		}
		function decrementCount() {
			count.set(count.get() - 1);
		}

		$(document.body, [
			div({
				text: count,
			}),
			button("-", { on: { click: decrementCount } }),
			button("+", { on: { click: incrementCount } }),
		]);
	});

	it("State can be assigned as html value", () => {
		const count = useState(0);

		function incrementCount() {
			count.set(count.get() + 1);
		}
		function decrementCount() {
			count.set(count.get() - 1);
		}

		$(document.body, [
			div({
				html: useComputed(() => `${count.get()}`),
			}),
			button("-", { on: { click: decrementCount } }),
			button("+", { on: { click: incrementCount } }),
		]);
	});

	it("Modify by selector", () => {
		$(document.body, [div({ attr: { id: "my-div" } })]);
		$("#my-div", {
			css: { background: "blue", width: "100px", height: "100px" },
		});
	});
});
