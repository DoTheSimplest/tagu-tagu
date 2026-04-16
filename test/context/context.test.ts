import { assert, describe, expect, it } from "vitest";
import { div, If, useState } from "../../src";
import { createContext, useContext } from "../../src/context";

describe("context", () => {
	it("is used in component", async () => {
		const ThemeContext = createContext<string>();

		const log = [] as string[];
		function Child() {
			const value = useContext(ThemeContext) as string;
			log.push(value);
			return div();
		}
		const element = ThemeContext("dark", Child);
		expect(element.tagName).toBe("DIV");
		assert.deepEqual(log, ["dark"]);
	});

	it("can be nested", async () => {
		const log = [] as string[];

		const ThemeContext = createContext<string>();

		function Child() {
			const value = useContext(ThemeContext) as string;
			log.push(value);
			return div();
		}

		ThemeContext("dark", () => div([ThemeContext("light", Child), Child()]));

		assert.deepEqual(log, ["light", "dark"]);
	});

	it("can be used in Switch", async () => {
		const log = [] as string[];

		const ThemeContext = createContext<string>();

		function Child() {
			const value = useContext(ThemeContext) as string;
			log.push(value);
			return div();
		}

		const visible = useState(false);
		ThemeContext("dark", () => div([If(visible, Child)]));

		assert.deepEqual(log, []);
		visible.set(true);
		assert.deepEqual(log, ["dark"]);
	});
});
