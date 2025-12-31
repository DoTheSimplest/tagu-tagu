import { useState } from "../signal/Signal";
import { Switch } from "./Switch";

export function Await<T>(
	promise: Promise<T>,
	options?: {
		pending?: () => Element;
		fulfilled?: (value: T) => Element;
		rejected?: (error: any) => Element;
	},
) {
	const pending = "pending";
	const fulfilled = "fulfilled";
	const rejected = "rejected";
	const promiseState = useState(pending);

	let value: T;
	let error: any;
	promise
		.then((v) => {
			value = v;
			promiseState.set(fulfilled);
		})
		.catch((reason) => {
			error = reason;
			promiseState.set(rejected);
		});

	const switchOptions = {} as Record<string, () => Element>;

	if (options?.pending) {
		switchOptions[pending] = options.pending;
	}
	if (options?.fulfilled) {
		switchOptions[fulfilled] = () => options.fulfilled!(value);
	}
	if (options?.rejected) {
		switchOptions[rejected] = () => options.rejected!(error);
	}

	return Switch(promiseState, switchOptions);
}
