# tagu-tagu

A lightweight helper for vanilla `HTMLElement`. No config, no jsx — only clean javascript.

## `tagu-tagu` is

just a helper for `HTMLElement`:

```html
<script type="module">
import {button} from "https://cdn.jsdelivr.net/npm/tagu-tagu@1.0.1/dist/bundle.min.js";

const myButton = button("Hello!");// `HTMLButtonElement`
document.body.appendChild(myButton);
</script>
```

with reactivity!

```html
<script type="module">
import {button, span, Modify, useState} from "https://cdn.jsdelivr.net/npm/tagu-tagu@1.0.1/dist/bundle.min.js";

const count = useState(4);

function decrementCount() {
    count.set(count.get() - 1);
}
function incrementCount() {
    count.set(count.get() + 1);
}

Modify(document.body, [
    button("-", { on: { click: decrementCount } }),// `HTMLButtonElement`
    span(count),// `HTMLSpanElement`
    button("+", { on: { click: incrementCount } }),// `HTMLButtonElement`
]);
</script>
```

No need to compile. But typescript is supported.

## Features

### `If`

```typescript
import { div, If, input, Modify, span, useState } from "tagu-tagu";

const isVisible = useState(false);

function toggle() {
	isVisible.set(!isVisible.get());
}

Modify(document.body, [
	input({
		attr: { type: "checkbox", checked: isVisible },
		on: { click: toggle },
	}),
	If(isVisible, () =>
		div({
			css: { background: "blue", width: "300px", height: "300px" },
		}),
	),
	span("Check to show rectangle"),
]);
```