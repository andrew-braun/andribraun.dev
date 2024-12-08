<script lang="ts">
	export let isOpen = false;
	export let onClick = () => {};
</script>

<button class="menu-button {isOpen ? 'open' : ''}" onclick={onClick} aria-label="Toggle Menu">
	<span></span>
	<span></span>
	<span></span>
</button>

<style lang="scss">
	.menu-button {
		position: absolute;
		top: var(--spacing-md);
		right: var(--spacing-md);
		z-index: 100;
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 10px;
		background: none;
		border: none;
		cursor: pointer;

		span {
			width: 30px;
			height: 3px;
			border-radius: 3px;
			background: var(--color-text);
			transition:
				transform 0.3s,
				opacity 0.3s;
		}

		&.open {
			span:nth-child(1) {
				transform: rotate(45deg) translate3d(2px, 10px, 0);
			}

			span:nth-child(2) {
				opacity: 0;
			}

			span:nth-child(3) {
				transform: rotate(-45deg) translate3d(0px, -10px, 0);
			}
		}
	}
</style>
