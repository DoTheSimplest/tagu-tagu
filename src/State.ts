export class State<T = any> {
	#value: T;
	constructor(value: T) {
		this.#value = value;
	}

	get = () => this.#value;
	set(value: T) {
		this.#value = value;

		this.#dispatch();
	}
	#dispatch() {
		this.#listeners.forEach(listener => listener());
	}

	#listeners = new Set<()=>void>();
	on(listener: () => void) {
		this.#listeners.add(listener);
	}
}

export function useState<T>(states: State[], map: () => T): State<T>;
export function useState<TSrc, TDest>(
	state: State<TSrc>,
	map: (value: TSrc) => TDest,
): State<TDest>;
export function useState<T>(value: T): State<T>;
export function useState<T>(value: any, map?: any) {
	if (typeof map === "function") {
		if (Array.isArray(value)) {
			return fromStates(value, map);
		}
		return fromStates([value], () => map(value.get()));
	} else {
		return new State<T>(value);
	}
}

function fromStates<T>(states: State[], createValue: () => T) {
	const result = new State<T>(createValue());
	const update = () => {
		result.set(createValue());
	};
	for (const state of states) {
		state.on( update);
	}
	return result;
}
