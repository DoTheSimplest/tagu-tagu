import { assert, describe, it } from "vitest";
import { div, sleep, span } from "../../src";
import { Await } from "../../src/flow/Await";

describe(Await, () => {
	it("Loading", () => {
		async function func() {
			await sleep(1);
		}
		const log = [] as string[];
		div([
			Await(func(), {
				pending: () =>
					span(() => {
						log.push("Loading...");
					}),
			}),
		]);
		assert.deepEqual(log, ["Loading..."]);
	});

	it("fulfilled", async () => {
		async function func() {
			await sleep(1);
			return "value from func()";
		}
		const log = [] as string[];
		await new Promise<void>((resolve) =>
			div([
				Await(func(), {
					fulfilled: (value) =>
						span(() => {
							log.push("fulfilled", value);
							resolve();
						}),
				}),
			]),
		);
		assert.deepEqual(log, ["fulfilled", "value from func()"]);
	});

	it("rejected", async () => {
		async function func() {
			throw "Error!";
		}
		const log = [] as string[];
		await new Promise<void>((resolve) =>
			div([
				Await(func(), {
					rejected: (error) =>
						span(() => {
							log.push("rejected", error);
							resolve();
						}),
				}),
			]),
		);
		assert.deepEqual(log, ["rejected", "Error!"]);
	});
});
