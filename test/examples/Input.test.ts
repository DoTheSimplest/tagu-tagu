import { describe, it } from "vitest";
import { $, button, input, useState } from "../../src";

describe(input, () => {
	it("checkbox", () => {
		$(document.body, { html: "" }, [input({ attr: { type: "checkbox" } })]);
	});
	it("two checkboxes", () => {
		const isChedked = useState(false);

		const onClick = () => {
			isChedked.set(!isChedked.get());
		};

		$(document.body, { html: "" }, [
			input({
				attr: {
					type: "checkbox",
					checked: isChedked,
				},
				on: { click: onClick },
			}),
			input({
				attr: {
					type: "checkbox",
					checked: isChedked,
				},
				on: { click: onClick },
			}),
		]);
	});

	it("two textboxes", () => {
		const value = useState("Hello");

		function updateValue(e: Event) {
			const newValue = (e.target as HTMLInputElement).value;
			value.set(newValue);
		}

		$(document.body, { html: "" }, [
			input({
				attr: { value },
				on: { input: updateValue },
			}),
			input({
				attr: { value },
				on: { input: updateValue },
			}),
		]);
	});

	it("clear textbox", () => {
		const value = useState("Hello");

		function updateValue(e: Event) {
			const newValue = (e.target as HTMLInputElement).value;
			value.set(newValue);
		}
		function clearValue() {
			value.set("");
		}

		$(document.body, { html: "" }, [
			input({
				attr: { value },
				on: { input: updateValue },
			}),
			button("clear", {
				on: { click: clearValue },
			}),
		]);
	});
});
