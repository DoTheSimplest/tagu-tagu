import { assert, describe, expect, it } from "vitest";
import { Div, useState } from "../../src";
import { ControlFlow } from "../../src/flow/ControlFlow";
import {
	connectNeighbours,
	resolveTextNode,
} from "../../src/initializeChildBlock";

describe(resolveTextNode, () => {
	it("string to Text", () => {
		const input = ["Hello"];
		const actual = resolveTextNode(input);
		assert(actual[0] instanceof Text);
		expect(actual[0].textContent).toBe("Hello");
	});
	it("State<string> to Text", () => {
		const input = [useState("Hello")];
		const actual = resolveTextNode(input);
		assert(actual[0] instanceof Text);
		expect(actual[0].textContent).toBe("Hello");
	});
});

class ControlFlowMock extends ControlFlow {
	run(_: Element) {}
}
describe(connectNeighbours, () => {
	it("connect ControlFlow and <div>", () => {
		const children = [new ControlFlowMock(), Div()];
		connectNeighbours(children);
		assert(children[0] instanceof ControlFlow);
		expect(children[0].prev).toBe(null);
		expect(children[0].next).toBe(children[1]);
	});

	it("connect <div> and ControlFlow", () => {
		const children = [Div(), new ControlFlowMock()];
		connectNeighbours(children);
		assert(children[1] instanceof ControlFlow);
		expect(children[1].prev).toBe(children[0]);
		expect(children[1].next).toBe(null);
	});
});
