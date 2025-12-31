# `animate`

```typescript
import { button } from "tagu-tagu";

function AnimateExample() {
	return button(
		"Animating",
		{ css: { width: "200px", height: "100px" } },
		{
			css: { width: "300px", height: "300px" },
			animate: 1000,
		},
		{ css: { width: "100px" }, animate: 2000 },
		"Finished",
	);
}

document.body.appendChild(AnimateExample());
```

[JSFiddle](https://jsfiddle.net/do_the_simplest/Lba9qpmf/1/)

## with callback

```typescript
import { button, sleep } from "tagu-tagu";

function AnimateWithCallbackExample() {
	return button(
		"Animating 1",
		{ css: { width: "200px", height: "100px" } },
		{
			css: { width: "300px", height: "300px" },
			animate: 1000,
		},
		"Sleeping 1000ms",
		async (button) => {
			await sleep(1000);
		},
		"Animating 2",
		{ css: { width: "100px" }, animate: 2000 },
		"Finished",
	);
}

document.body.appendChild(AnimateWithCallbackExample());
```

[JSFiddle](https://jsfiddle.net/do_the_simplest/vze3htLg/3/)