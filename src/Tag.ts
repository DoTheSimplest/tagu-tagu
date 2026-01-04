import { div } from "./Elements";
import { $, type ElementInitializer } from "./Modify";

export type SvgElementInitializer =
	| {
			attr?: Record<string, string>;
			css?: Record<string, string>;
	  }
	| Element[];

export function Svg<K extends keyof SVGElementTagNameMap>(
	name: K,
	...initializers: SvgElementInitializer[]
): SVGElementTagNameMap[K] {
	const result = document.createElementNS("http://www.w3.org/2000/svg", name);
	return $(result, ...initializers);
}

/**
 * Create a plain HTMLElement with initializers applied.
 *
 * Shorthand for `document.createElement(tagName)` + `Modify`.
 *
 * @param tagName - Tag name such as "div", "span", "button".
 * @param initializers - Element initializers (attributes, children, etc).
 * @returns The created HTMLElement.
 *
 * @example
 * const btn = Html("button", "Click", { on: { click: () => alert("hi") } });
 */
export function Html<K extends keyof HTMLElementTagNameMap>(
	tagName: K,
	...initializers: ElementInitializer<HTMLElementTagNameMap[K]>[]
) {
	const result = document.createElement(tagName);
	$(result, ...initializers);
	return result;
}

export function Tag<T extends Element = Element>(
	html: string,
	...initializers: ElementInitializer<T>[]
) {
	const result = div({ html: html }).children[0] as T;
	return $(result, ...initializers);
}
