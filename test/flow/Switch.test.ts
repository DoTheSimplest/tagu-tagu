import { assert, describe, it } from "vitest";
import { div, Switch, useState } from "../../src";

describe(Switch, () => {
	it("no element", () => {
		const value = useState(0);
		const element = div([Switch(value, [{ case: -1, show: () => div() }])]);
		assert(!element.childNodes[0]);
	});
	it("show element", () => {
		const value = useState(0);
		const element = div([Switch(value, [{ case: 0, show: () => div() }])]);
		assert(element.childNodes[0]);
	});
	it("default is called only once", () => {
		const value = useState(0);
		let counter = 0;
		div([
			Switch(value, [{ case: 0, show: () => div() }], () => {
				counter++;
				return div();
			}),
		]);
		value.set(-1);
		value.set(-2);
		assert.equal(counter, 1);
	});
});
