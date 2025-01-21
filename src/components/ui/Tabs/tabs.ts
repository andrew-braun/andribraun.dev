import type { Component } from "svelte";

export interface Tab {
	label: string;
	value: string;
	content: Component;
}
