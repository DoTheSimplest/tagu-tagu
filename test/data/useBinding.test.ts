import { describe, expect, it } from "vitest";
import { div, useState } from "../../src";
import { useBinding } from "../../src/data/useBinding";

describe("useBinding", () => {
	it("css, string", () => {
		const child = div({
			css: {
				background: useBinding("theme", (theme) =>
					theme === "dark" ? "darkblue" : "skyblue",
				),
			},
		});
		div({ data: { theme: "dark" } }, [child]);
		expect(child.style.background).toBe("darkblue");
	});

	it("css, State", () => {
		const theme = useState("dark");

		const child = div({
			css: {
				background: useBinding("theme", (theme) =>
					theme === "dark" ? "darkblue" : "skyblue",
				),
			},
		});
		div({ data: { theme } }, [child]);
		expect(child.style.background).toBe("darkblue");
		theme.set("light");
		expect(child.style.background).toBe("skyblue");
	});

	it("text, State", () => {
		const theme = useState("dark");

		const child = div({
			text: useBinding("theme", (theme) =>
				theme === "dark" ? "Dark" : "Light",
			),
		});
		div({ data: { theme } }, [child]);
		expect(child.textContent).toBe("Dark");
		theme.set("light");
		expect(child.textContent).toBe("Light");
	});

	it("attr, State", () => {
		const theme = useState("dark");

		const child = div({
			attr: {
				class: useBinding("theme", (theme) =>
					theme === "dark" ? "dark-mode" : "light-mode",
				),
			},
		});
		div({ data: { theme } }, [child]);
		expect(child.classList.toString()).toBe("dark-mode");
		theme.set("light");
		expect(child.classList.toString()).toBe("light-mode");
	});

	it("prop, State", () => {
		const theme = useState("dark");

		const child = div({
			prop: {
				textContent: useBinding("theme", (theme) =>
					theme === "dark" ? "Dark" : "Light",
				),
			},
		});
		div({ data: { theme } }, [child]);
		expect(child.textContent).toBe("Dark");
		theme.set("light");
		expect(child.textContent).toBe("Light");
	});

	it("html, State", () => {
		const theme = useState("dark");

		const child = div({
			html: useBinding("theme", (theme) =>
				theme === "dark" ? `Dark` : `Light`,
			),
		});
		div({ data: { theme } }, [child]);
		expect(child.innerHTML).toBe("Dark");
		theme.set("light");
		expect(child.innerHTML).toBe("Light");
	});
});
