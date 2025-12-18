import { assert, describe, it } from "vitest";
import { div } from "../../src";

describe("data", () => {
	it("get data from self", () => {
		let theme: string | undefined;
		div(
			{
				data: { theme: "dark" },
			},
			{
				data: {
					theme: (value: string) => {
						theme = value;
					},
				},
			},
		);
		assert.equal(theme, "dark");
	});

	it("get data from parent", () => {
		let theme: string | undefined;
		div(
			{
				data: { theme: "dark" },
			},
			[
				div({
					data: {
						theme: (value: string) => {
							theme = value;
						},
					},
				}),
			],
		);
		assert.equal(theme, "dark");
	});

	it("get data from grand parent", () => {
		let theme: string | undefined;
		div(
			{
				data: { theme: "dark" },
			},
			[
				div([
					div({
						data: {
							theme: (value: string) => {
								theme = value;
							},
						},
					}),
				]),
			],
		);
		assert.equal(theme, "dark");
	});

	it("get data from nearest ancestor", () => {
		let theme: string | undefined;
		div({ data: { theme: "light" } }, [
			div({ data: { theme: "dark" } }, [
				div({
					data: {
						theme: (value: string) => {
							theme = value;
						},
					},
				}),
			]),
		]);
		assert.equal(theme, "dark");
	});

	it("ignores callback if data isn't  set", () => {
		let counter = 0;
		div([
			div({
				data: {
					theme: () => {
						counter++;
					},
				},
			}),
		]);
		assert.equal(counter, 0);
	});

	it("calls callback only once", () => {
		let counter = 0;
		div({ data: { theme: "light" } }, [
			div(
				{ data: { theme: "dark" } },
				{
					data: {
						theme: () => {
							counter++;
						},
					},
				},
			),
		]);
		assert.equal(counter, 1);
	});

	it("supports multiple children", () => {
		let theme1: string | undefined;
		let theme2: string | undefined;
		div({ data: { theme: "dark" } }, [
			div([
				div({
					data: {
						theme: (value: string) => {
							theme1 = value;
						},
					},
				}),
				div({
					data: {
						theme: (value: string) => {
							theme2 = value;
						},
					},
				}),
			]),
		]);
		assert.equal(theme1, "dark");
		assert.equal(theme2, "dark");
	});

	it("multiple callbacks", () => {
		let counter = 0;
		div({ data: { theme: "dark" } }, [
			div(
				{
					data: {
						theme: () => {
							counter++;
						},
					},
				},
				{
					data: {
						theme: () => {
							counter++;
						},
					},
				},
			),
		]);
		assert.equal(counter, 2);
	});
});
