import { contextData } from "../context";
import { nodeData } from "../data/data";
import { getNextNodeSibling } from "../initializeChildBlock";
import { type Signal, useEffect } from "../signal/Signal";

import { ControlFlow } from "./ControlFlow";
import type { SwitchSection } from "./SwitchBlockState";

export function Switch<T>(
	value: Signal<T>,
	sections: SwitchSection<T>[],
	createDefault?: () => Element,
): ControlFlow;
export function Switch(
	value: Signal<string>,
	sections: Record<string, () => Element>,
	createDefault?: () => Element,
): ControlFlow;
export function Switch<T>(
	value: Signal,
	sections: SwitchSection<T>[] | Record<string, () => Element>,
	createDefault?: () => Element,
): ControlFlow {
	if (Array.isArray(sections)) {
		return new SwitchFlow(value, sections, createDefault);
	}

	return Switch(
		value,
		Object.keys(sections).map((key) => ({ case: key, show: sections[key] })),
		createDefault,
	);
}

export class SwitchFlow<T> extends ControlFlow {
	#value: Signal<T>;
	#sections: SwitchSection<T>[];
	#createDefault?: () => Element;

	constructor(
		value: Signal<T>,
		sections: SwitchSection<T>[],
		createDefault?: () => Element,
	) {
		super();
		this.#value = value;
		this.#sections = sections;
		this.#createDefault = createDefault;
	}

	run(element: Element) {
		const value2Element = new Map<T, Element>();
		const value2Section = new Map<T, SwitchSection<T>>();

		for (const section of this.#sections) {
			value2Section.set(section.case, section);
		}

		let currentElement: Element | undefined;
		let defaultElement: Element | undefined;

		const getElementFromValue = (value: T) => {
			const section = value2Section.get(value);
			if (section) {
				// If element is not created yet, create and cache
				if (!value2Element.has(value)) {
					const newElement = section.show();
					value2Element.set(value, newElement);
				}
				return value2Element.get(value)!;
			}

			// ensure default
			if (this.#createDefault && !defaultElement) {
				defaultElement = this.#createDefault();
			}
			return defaultElement;
		};

		const dataStack = contextData.cloneStack();

		useEffect(() => {
			const value = this.#value.get();
			const nextNode = getNextNodeSibling(this);

			const newElement = contextData.saveAndRestore(dataStack, () =>
				getElementFromValue(value),
			);

			// data
			newElement && nodeData.resolveCallbacks(element, newElement);
			// insert `newElement`
			currentElement?.remove();
			newElement && element.insertBefore(newElement, nextNode);
			currentElement = newElement;
		});
	}
}
