export type DataContext<T> = (
	value: T,
	createElement: () => Element,
) => Element;

class ContextData {
	context2DataStack = new Map<DataContext<any>, any[]>();

	peek<T>(context: DataContext<T>) {
		return this.context2DataStack.get(context)?.at(-1) as T;
	}

	push<T>(context: DataContext<T>, value: T) {
		if (!this.context2DataStack.has(context))
			this.context2DataStack.set(context, []);

		this.context2DataStack.get(context)?.push(value);
	}

	pop(context: DataContext<any>) {
		this.context2DataStack.get(context)?.pop();
	}

	save() {
		const result = new Map<DataContext<any>, any[]>();
		for (const key of this.context2DataStack.keys()) {
			const value = this.context2DataStack.get(key);
			if (value) result.set(key, [...value]);
		}
		return result;
	}
}

export const contextData = new ContextData();
export function useContext<T>(context: DataContext<T>): T {
	return contextData.peek(context);
}

export function createContext<T>() {
	const context = (value: T, createElement: () => Element) => {
		contextData.push(context, value);
		const result = createElement();
		contextData.pop(context);

		return result;
	};
	return context;
}
