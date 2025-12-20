import { assert, describe, it } from "vitest";
import { div, For, If, Switch, useState } from "../../src";
import { waitForData } from "../../src/data/data";

describe(`data with ${If.name}`, () => {
	it(`calls callbacks when condition becomes true`, () => {
		let theme1: string | undefined;
		const condition = useState(false);
		div({ data: { theme: "dark" } }, [
			div([
				If(condition, () =>
					div((node) => {
						waitForData(node, {
							theme: (data) => {
								theme1 = data;
							},
						});
					}),
				),
			]),
		]);
		assert.equal(theme1, undefined);
		condition.set(true);
		assert.equal(theme1, "dark");
	});

	it(`calls callbacks for \`else\` when condition becomes false`, () => {
		let theme1: string | undefined;
		const condition = useState(true);
		div({ data: { theme: "dark" } }, [
			div([
				If(
					condition,
					() => div(),
					() =>
						div((node) => {
							waitForData(node, {
								theme: (data) => {
									theme1 = data;
								},
							});
						}),
				),
			]),
		]);
		assert.equal(theme1, undefined);
		condition.set(false);
		assert.equal(theme1, "dark");
	});
});

describe(`data with ${Switch.name}`, () => {
	it(`calls callbacks when value matches`, () => {
		let theme: string | undefined;
		const condition = useState(0);
		div({ data: { theme: "dark" } }, [
			div([
				Switch(condition, [
					{
						case: 2,
						show: () =>
							div((node) => {
								waitForData(node, {
									theme: (data) => {
										theme = data;
									},
								});
							}),
					},
				]),
			]),
		]);
		assert.equal(theme, undefined);
		condition.set(2);
		assert.equal(theme, "dark");
	});

	it(`calls callbacks in default when value is in default`, () => {
		let theme: string | undefined;
		let theme2: string | undefined;
		const condition = useState(2);
		div({ data: { theme: "dark" } }, [
			div([
				Switch(
					condition,
					[
						{
							case: 2,
							show: () =>
								div((node) => {
									waitForData(node, {
										theme: (data) => {
											theme = data;
										},
									});
								}),
						},
					],
					() =>
						div((node) => {
							waitForData(node, {
								theme: (data) => {
									theme2 = data;
								},
							});
						}),
				),
			]),
		]);

		assert.equal(theme, "dark");
		assert.equal(theme2, undefined);
		condition.set(0);
		assert.equal(theme2, "dark");
	});
});

describe(`data with ${For.name}`, () => {
	it(`calls callbacks new item is added`, () => {
		const themes = [] as string[];
		const people = useState(["Newton", "Darwin"]);

		div({ data: { theme: "dark" } }, [
			div([
				For(people, () =>
					div(async (node) => {
						waitForData(node, {
							theme: (data) => themes.push(data),
						});
					}),
				),
			]),
		]);

		assert.deepEqual(themes, ["dark", "dark"]);
		people.set([...people.get(), "Einstein"]);
		assert.deepEqual(themes, ["dark", "dark", "dark"]);
	});
});
