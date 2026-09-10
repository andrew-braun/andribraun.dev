import type { Component } from "svelte";

/**
 * A tab list is heterogeneous: each tab renders a different component with a
 * different props shape, so once tabs are collected into a `Tab[]` the
 * container can no longer relate `content` to `props`. That erasure is
 * confined to the single `any` below.
 *
 * Build tabs with `defineTab` rather than bare object literals — it checks
 * `props` against the component's actual props at the call site, before the
 * type is erased.
 */
export interface Tab {
	label: string;
	value: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- see note above
	content: Component<any>;
	props?: Record<string, unknown>;
}

export function defineTab<TProps extends Record<string, unknown>>(tab: {
	label: string;
	value: string;
	content: Component<TProps>;
	props?: TProps;
}): Tab {
	return tab;
}

/**
 * Next tab index for a tablist key, or `null` if the key is not a tab command.
 * Left/Right wrap; Home/End jump to the ends.
 */
export function tabIndexFromKey(
	key: string,
	currentIndex: number,
	tabCount: number
): number | null {
	if (tabCount <= 0) {
		return null;
	}

	switch (key) {
		case "ArrowLeft":
			return (currentIndex - 1 + tabCount) % tabCount;
		case "ArrowRight":
			return (currentIndex + 1) % tabCount;
		case "Home":
			return 0;
		case "End":
			return tabCount - 1;
		default:
			return null;
	}
}
