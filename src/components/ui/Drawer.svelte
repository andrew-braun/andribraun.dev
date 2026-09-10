<script lang="ts">
	import { cubicInOut } from "svelte/easing";
	import { fly } from "svelte/transition";
	import { prefersReducedMotion } from "$utils/ui/motion";
	import type { Attachment } from "svelte/attachments";
	import type { Snippet } from "svelte";
	import type { TransitionConfig } from "svelte/transition";
	import MenuButton from "./buttons/MenuButton.svelte";

	interface DrawerProps {
		isOpen: boolean;
		position?: "right" | "left";
		onClose: () => void;
		header?: Snippet;
		children: Snippet;
		label?: string;
		id?: string;
		styles?: {
			background?: "default" | "blur";
			width?: "default" | "full";
		};
	}

	let {
		isOpen,
		position = "right",
		onClose,
		header,
		children,
		styles,
		label = "Menu",
		id
	}: DrawerProps = $props();

	/**
	 * Mounting the dialog is what opens it, and it stays open — and so stays in the top
	 * layer — until the slide-out has played and Svelte removes the node. Closing it any
	 * earlier drops it out of the top layer mid-animation, which is what Firefox and Safari
	 * do without `transition: overlay`.
	 *
	 * Teardown hands focus back, because removing a dialog, unlike `close()`, does not.
	 */
	const openAsModal: Attachment<HTMLDialogElement> = (node) => {
		const invoker = document.activeElement as HTMLElement | null;

		node.showModal();

		return () => invoker?.focus();
	};

	/** Slides the panel off its own edge — measured, since `--drawer-width` is a clamp. */
	function slideOver(node: HTMLElement): TransitionConfig {
		return fly(node, {
			x: position === "right" ? node.offsetWidth : -node.offsetWidth,
			duration: prefersReducedMotion() ? 0 : 300,
			easing: cubicInOut
		});
	}
</script>

{#if isOpen}
	<dialog
		{id}
		class={["drawer", position, styles?.background, styles?.width]}
		aria-label={label}
		oncancel={(event) => {
			// Let the slide-out play rather than have the UA tear the dialog down on Escape.
			event.preventDefault();
			onClose();
		}}
		onclick={(event) => {
			if (event.target === event.currentTarget) onClose();
		}}
		transition:slideOver
		{@attach openAsModal}
	>
		<MenuButton {isOpen} onClick={onClose} />
		{#if header}
			<header class="drawer-header">
				{@render header()}
			</header>
		{/if}
		{@render children()}
	</dialog>
{/if}

<style lang="scss">
	.drawer {
		--drawer-width: clamp(220px, 85vw, 320px);

		position: fixed;
		inset: 0 0 0 auto;
		z-index: 90;
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: var(--drawer-width);
		max-width: none;
		height: 100%;
		max-height: none;
		padding: 0;
		margin: 0;
		color: inherit;
		background: var(--color-background-mid);
		border: none;
		box-shadow: -2px 0 5px rgb(0 0 0 / 10%);

		&.left {
			inset: 0 auto 0 0;
		}

		&.blur {
			background: transparent;
			backdrop-filter: blur(10px);
		}

		&.full {
			--drawer-width: 100%;
		}

		&::backdrop {
			background: hsl(0deg 0% 0% / 50%);
		}

		.drawer-header {
			padding: var(--space-md);
		}
	}
</style>
