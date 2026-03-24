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
	const observer = new IntersectionObserver(([entry]) => {
		node.dispatchEvent(new CustomEvent("intersection", { detail: entry }));
		console.log("Intersection observed:", entry);
		if (entry.isIntersecting && options.unobserveAfterIntersect) {
			observer.unobserve(node);
			return;
		}
	}, options);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
