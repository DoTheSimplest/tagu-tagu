import { describe, it } from "vitest";
import { $, button, div, For, useState } from "../../src";

describe("For", () => {
	it("shows children from data", () => {
		const numbers = useState([1, 2, 3]);

		$(document.body, { html: "" }, [For(numbers, (n) => button(`${n}`))]);
	});

	it("adds and removes item", () => {
		const numbers = useState([1, 2, 3].map((n) => ({ n })));
		let id = numbers.get().length;

		function addNumber() {
			id++;
			numbers.set([...numbers.get(), { n: id }]);
		}
		function removeNumber(n: number) {
			numbers.set(numbers.get().filter((value) => value.n !== n));
		}

		$(document.body, { html: "" }, [
			div([
				For(numbers, (n) =>
					button(`${n.n}`, {
						on: { click: () => removeNumber(n.n) },
					}),
				),
			]),
			button("+", { on: { click: addNumber } }),
		]);
	});
});
