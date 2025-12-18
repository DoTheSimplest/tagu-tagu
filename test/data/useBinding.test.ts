import { describe, expect, it } from "vitest";
import { Div } from "../../src";
import { useBinding } from "../../src/data/useBinding";

describe("useBinding", () => {
	it("css, string", () => {
		const child = Div({
			css: {
				background: useBinding("theme", (theme) =>
					theme === "dark" ? "darkblue" : "skyblue",
				),
			},
		});
		Div({ data: { theme: "dark" } }, [child]);
		expect(child.style.background).toBe("darkblue");
	});
});
