import type { ActionReturn } from "svelte/action";

interface IntersectionAttributes {
	onintersection?: (e: CustomEvent<IntersectionObserverEntry>) => void;
}

interface IntersectionObserverInitExtended extends IntersectionObserverInit {
	unobserveAfterIntersect?: boolean;
}

export function intersection(
	node: HTMLElement,
	options: IntersectionObserverInitExtended
): ActionReturn<IntersectionObserverInitExtended, IntersectionAttributes> {
	const observer = new IntersectionObserver((entries) => {
		const entry = entries[0];
		if (!entry) return;

		node.dispatchEvent(new CustomEvent("intersection", { detail: entry }));

		if (entry.isIntersecting && options.unobserveAfterIntersect) {
			observer.unobserve(node);
		}
	}, options);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
