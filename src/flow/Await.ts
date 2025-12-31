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
	const promiseState = useState("pending");

	let value: T;
	let error: any;
	promise
		.then((v) => {
			value = v;
			promiseState.set("fulfilled");
		})
		.catch((reason) => {
			error = reason;
			promiseState.set("rejected");
		});

	const switchOptions = {
		pending: options?.pending,
	} as Record<string, () => Element>;

	if (options?.fulfilled) {
		switchOptions.fulfilled = () => options.fulfilled!(value);
	}
	if (options?.rejected) {
		switchOptions.rejected = () => options.rejected!(error);
	}

	for (const key in switchOptions) {
		if (!switchOptions[key]) delete switchOptions[key];
	}

	return Switch(promiseState, switchOptions);
}
