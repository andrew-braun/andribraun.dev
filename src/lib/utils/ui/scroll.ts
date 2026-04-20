export function scrollTo(element: HTMLElement | null, options?: ScrollIntoViewOptions) {
	if (!element) return;
	element.scrollIntoView(options);
}
