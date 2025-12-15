import { ForMap } from "./flow/For";
import { IfFlow } from "./flow/If";
import { SwitchFlow } from "./flow/Switch";
import { applyStringOrState } from "./Modify";
import { State } from "./State";

export type ChildType =
	| Node
	| string
	| State
	| ForMap<any>
	| IfFlow
	| SwitchFlow<any>;
export function initializeChildBlock(element: Element, children: ChildType[]) {
	for (const child of resolveTextNode(children)) {
		initializeChild(element, child);
	}
}

function initializeChild(
	element: Element,
	child: ForMap<any> | IfFlow | SwitchFlow<any> | Node,
) {
	if (child instanceof ForMap) {
		child.run(element);
	} else if (child instanceof IfFlow) {
		child.run(element);
	} else if (child instanceof SwitchFlow) {
		child.run(element);
	} else {
		element.appendChild(child);
	}
}

export function resolveTextNode(children: ChildType[]) {
	return children.map((c) => {
		if (typeof c === "string" || c instanceof State) {
			const textNode = document.createTextNode("");
			applyStringOrState(c, (text) => {
				textNode.textContent = text;
			});
			return textNode;
		}
		return c;
	});
}
