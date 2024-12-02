/** @type {import('svelte/action').Action<HTMLElement, { portalId: string }>} */

export function portal(node: HTMLElement, { portalId }: { portalId: string }) {
	const teleportContainer = document.getElementById(portalId);

	if (!teleportContainer) {
		console.warn(`Portal: No element found with id "${portalId}"`);
		return;
	}

	teleportContainer.appendChild(node);

	// Optional: Focus the container if needed
	// teleportContainer.focus();

	// Cleanup: Remove the node from the container when the element is unmounted

	// $effect(() => {
	// 	return () => {
	// 		teleportContainer.removeChild(node);
	// 	};
	// });
}
