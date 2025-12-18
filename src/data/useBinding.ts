export function useBinding<T>(key: string, map: (value: T) => string) {
	return new Binding(key, map);
}

export class Binding<T = any> {
	constructor(
		public key: string,
		public map: (value: T) => string,
	) {}
}
