import { assert, describe, it } from "vitest";
import { Div, If, useState } from "../../src";

describe("data with control-flow", () => {
	it(`supports ${If.name}`, () => {
		let theme1: string | undefined;
		const condition = useState(false);
		Div({ data: { theme: "dark" } }, [
			Div([
				If(condition, () =>
					Div({
						data: {
							theme: (value: string) => {
								theme1 = value;
							},
						},
					}),
				),
			]),
		]);
		assert.equal(theme1, undefined);
		condition.set(true);
		assert.equal(theme1, "dark");
	});

	it(`supports else in ${If.name}`, () => {
		let theme1: string | undefined;
		const condition = useState(true);
		Div({ data: { theme: "dark" } }, [
			Div([
				If(
					condition,
					() => Div(),
					() =>
						Div({
							data: {
								theme: (value: string) => {
									theme1 = value;
								},
							},
						}),
				),
			]),
		]);
		assert.equal(theme1, undefined);
		condition.set(false);
		assert.equal(theme1, "dark");
	});
});
