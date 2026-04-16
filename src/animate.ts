import { $ } from "./Modify";
import { isSignal, type State } from "./signal/Signal";

export function animate(
	properties: Record<string, string | State<string>>,
	options: number | { duration?: number; easing?: string },
) {
	return async (element: Element) => {
		const css = {} as Record<string, string>;
		for (const key in properties) {
			const value = properties[key];
			if (typeof value === "string") {
				css[key] = value;
			}
			if (isSignal(value)) {
				css[key] = value.get();
			}
		}

		if (options && typeof options !== "number") {
			options.duration ??= 400;
			options.easing ??= "swing";
			options.easing =
				options.easing === "swing" ? "ease-in-out" : options.easing;
		}

		const animation = element.animate([{}, css], options);
		await animation.finished;
		$(element, { css: properties });
	};
}
