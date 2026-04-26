<script lang="ts">
	import SynthwaveFooter from "$root/src/lib/assets/images/svgs/SynthwaveFooter.svelte";
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-columns">
			<div class={["footer-column", "attribution"]}>
				<p class="attribution-text">
					Designed and hand-coded by <a href="https://github.com/andrew-braun" target="_blank">
						Andri Braun</a
					>
				</p>
				<!-- <p style="text-align: center">&copy; {new Date().getFullYear()}</p> -->
			</div>
		</div>
		<div class="svg-wrapper">
			<div class="overlay"></div>
			<SynthwaveFooter />
		</div>
		<!-- <div class="text-wrapper">
			<p>&copy; {new Date().getFullYear()} Andri Braun. All rights reserved.</p>
			<p>Designed and built by me with SvelteKit.</p>
		</div> -->
	</div>
</footer>

<style lang="scss">
	.footer {
		position: relative;
		height: 210px;

		.footer-content {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.footer-columns {
				position: relative;
				z-index: 10;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: var(--space-md);
				height: 100%;

				.footer-column {
					padding: var(--space-sm);
				}

				.attribution {
					grid-column: 2;
					margin-top: auto;

					.attribution-text {
						padding: var(--space-sm);
						font-weight: 500;
						text-align: center;
						background: var(--color-background-translucent);
						border-radius: var(--border-radius-md);
					}
				}
			}

			.svg-wrapper {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 5;
				width: 100%;
				height: 100%;

				.overlay {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1; /* Ensure the overlay is above the SVG */
					width: 100%;
					height: 100%;
					pointer-events: none;
					background: linear-gradient(
						180deg,
						transparent 0%,
						transparent 18%,
						color-mix(in srgb, var(--color-background) 18%, transparent) 48%,
						color-mix(in srgb, var(--color-background) 34%, transparent) 100%
					);
				}
			}
		}
	}
</style>
