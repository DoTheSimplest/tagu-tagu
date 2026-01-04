import {
	InternalComputed,
	type InternalSignal,
	InternalState,
} from "./InternalSignal";

export function isSignal(obj: any): obj is Signal {
	return obj instanceof ConcreteSignal;
}

export interface Signal<T = any> {
	get(): T;
}

export interface State<T> {
	get(): T;
	set(value: T): void;
}

class ConcreteSignal<T = any> {
	protected dependencies = new Set<ConcreteSignal<any>>();
	internal: InternalSignal<T>;
	constructor(internal: InternalSignal<T>) {
		this.internal = internal;
	}

	get() {
		if (current) {
			this.internal.subscribers.add(current.internal as InternalComputed<any>);
			current.dependencies.add(this);
		}
		return this.internal.get();
	}
}

class ConcreteState<T> extends ConcreteSignal<T> {
	constructor(value: T) {
		super(new InternalState(value));
	}

	set(value: T) {
		(this.internal as InternalState<T>).set(value);
	}
}

let current: Computed<any> | undefined;

class Computed<T> extends ConcreteSignal<T> {
	constructor(map: () => T) {
		super(
			new InternalComputed(() => {
				this.#resetDependencies();
				const prev = current;
				current = this;

				const result = map();

				current = prev;
				return result;
			}),
		);
	}

	#resetDependencies() {
		for (const dependency of this.dependencies) {
			dependency.internal.subscribers.delete(
				this.internal as InternalComputed<any>,
			);
		}
		this.dependencies.clear();
	}
}

export interface Effect {
	onCleanup(callback: () => void): void;
}
export function useEffect(effectCallback: (effect: Effect) => void) {
	let cleanup: () => void;
	const effect = new Computed<void>(() => {
		cleanup?.();
		const e = {
			onCleanup(cb) {
				cleanup = cb;
			},
		} satisfies Effect;
		effectCallback(e);
	});
	effect.get();
}

/**
 * Create a reactive state container (Signal + mutator).
 *
 * The returned object has `get()` and `set(value)` methods. Use in combination
 * with `useComputed` and `useEffect` to react to updates.
 *
 * @param value - Initial state value.
 * @returns A State object with `get()` and `set()` methods.
 *
 * @example
 * const counter = useState(0);
 * counter.set(counter.get() + 1);
 */
export function useState<T>(value: T): State<T> {
	return new ConcreteState(value);
}

export function useComputed<T>(map: () => T): Signal<T> {
	return new Computed(map);
}
