import {
	InternalComputed,
	type InternalSignal,
	InternalState,
} from "./InternalSignal";

export class Signal<T = any> {
	protected dependencies = new Set<Signal<any>>();
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

export class State<T> extends Signal<T> {
	constructor(value: T) {
		super(new InternalState(value));
	}

	set(value: T) {
		(this.internal as InternalState<T>).set(value);
	}
}

let current: Computed<any> | undefined;

export class Computed<T> extends Signal<T> {
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

export function useState<T>(value: T) {
	return new State(value);
}

export function useComputed<T>(map: () => T) {
	return new Computed(map);
}
