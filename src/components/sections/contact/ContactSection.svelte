<script>
	import Contact from "$components/forms/Contact/Contact.svelte";
	import Title from "$components/text/Title.svelte";
	import Rocket1 from "$root/src/lib/assets/images/svgs/Rocket1.svelte";

	let submitted = $state(false);

	$effect(() => {
		console.log("submitted changed:", submitted);
	});
</script>

<section id="contact" class={["page-section", "contact-section"]}>
	<Title title="Contact Me" tag="h2" />
	<div class="contact-form-wrapper">
		<div class="svg-wrapper">
			<Rocket1 launching={submitted} />
		</div>
		<div class="form-wrapper">
			<Contact bind:submitted />
		</div>
	</div>
</section>

<style lang="scss">
	.contact-form-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-lg);
		justify-content: space-between;

		.svg-wrapper {
			flex: 1;
			width: 45%;
			min-width: 280px;
		}

		.form-wrapper {
			flex: 1;
			width: 45%;
			min-width: 280px;
		}
	}
</style>
