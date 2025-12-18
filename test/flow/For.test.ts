import { describe, expect, it } from "vitest";
import { div, For, ForMap, useState } from "../../src";

describe(ForMap, () => {
	it("conserve prev element", () => {
		const items = useState([1, 2, 3]);
		const element = div([div("0"), For(items, (item) => div(`${item}`))]);
		expect([...element.childNodes].map((c) => c.textContent)).toEqual([
			"0",
			"1",
			"2",
			"3",
		]);
	});

	it("order is conserved after set(): [For, Node]", () => {
		const items = useState([1, 2, 3]);
		const element = div([For(items, (item) => div(`${item}`)), div("Last")]);
		items.set([1, 2, 3]);
		expect([...element.childNodes].map((c) => c.textContent)).toEqual([
			"1",
			"2",
			"3",
			"Last",
		]);
	});

	it("order is conserved: [For, For, Node]", () => {
		const items1 = useState([1, 2, 3]);
		const items2 = useState([-1, -2]);
		const element = div([
			For(items1, (item) => div([`${item}`])),
			For(items2, (item) => div([`${item}`])),
			div("Last"),
		]);
		items1.set([1, 2, 3]);
		expect([...element.childNodes].map((c) => c.textContent)).toEqual([
			"1",
			"2",
			"3",
			"-1",
			"-2",
			"Last",
		]);
	});
});
