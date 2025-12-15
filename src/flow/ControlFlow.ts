export abstract class ControlFlow {
	prev: ControlFlow | Node | null = null;
	next: ControlFlow | Node | null = null;
	nodes = [] as Node[];

	abstract run(element: Element): void;
}
