<script>
	import Logo from "$lib/assets/img/brand/abdev-logo-rectangle.svg?raw";
</script>

<a href="/">
	<div
		class="logo"
		role="img"
		aria-label="ABDev logo: a rocket ship blasting off into space, leaving a rainbow trail behind it, partially encircling the words 'ABDev'"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- static SVG bundled at build time, not dynamic content -->
		{@html Logo}
	</div>
</a>

<style>
	.logo {
		width: 140px;
		font-size: 1.5rem;
		font-weight: bold;
		transition: width 0.3s ease;
	}
</style>
