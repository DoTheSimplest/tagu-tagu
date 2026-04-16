import type { Signal } from "../signal/Signal";
import type { ControlFlow } from "./ControlFlow";
import { Switch } from "./Switch";

export function If(
	condition: Signal<boolean> | (() => boolean),
	show: () => Element,
	showElse?: () => Element,
): ControlFlow {
	return Switch(
		() => `${typeof condition === "function" ? condition() : condition.get()}`,
		{ true: show },
		showElse,
	);
}
