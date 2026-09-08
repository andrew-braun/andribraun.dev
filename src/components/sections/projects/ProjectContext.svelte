<script lang="ts">
	import IconBox from "$components/content-blocks/IconBox.svelte";
	import Container from "$components/layout/containers/Container.svelte";
	import type { Project } from "$lib/cms/payload";
	import {
		UiIconArchive,
		UiIconCircleCheck,
		UiIconCircleQuestionMark,
		UiIconEqualApproximately,
		UiIconUser
	} from "$lib/data/icons";
	import { capitalizeFirstLetter } from "$lib/utils/text";
	import type { IconComponent } from "$ts/general";

	interface Props {
		clientName?: string | null | undefined;
		status?: Project["status"] | undefined;
	}

	let { clientName, status }: Props = $props();

	const normalizedClientName = $derived(clientName?.trim());
	const factCount = $derived(Number(Boolean(normalizedClientName)) + Number(Boolean(status)));

	const statusIcon: IconComponent = $derived.by(() => {
		switch (status) {
			case "ongoing":
				return UiIconEqualApproximately;
			case "completed":
			case "live":
				return UiIconCircleCheck;
			case "archived":
				return UiIconArchive;
			default:
				return UiIconCircleQuestionMark;
		}
	});
</script>

{#if factCount}
	<Container element="section">
		<div class:single={factCount === 1} class="context-strip">
			{#if normalizedClientName}
				<IconBox
					Icon={UiIconUser}
					title="Client"
					text={normalizedClientName}
					orientation="horizontal"
				/>
			{/if}
			{#if status}
				<IconBox
					Icon={statusIcon}
					title="Status"
					text={capitalizeFirstLetter(status)}
					orientation="horizontal"
				/>
			{/if}
		</div>
	</Container>
{/if}

<style lang="scss">
	.context-strip {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-lg);
		place-items: center;
		width: min(100%, 42rem);
		padding-block: var(--space-lg);
		margin-inline: auto;
		border-block: 1px solid color-mix(in srgb, var(--color-text) 18%, transparent);

		&.single {
			grid-template-columns: minmax(0, 20rem);
			justify-content: center;
		}

		@media (max-width: $breakpoint-sm) {
			grid-template-columns: minmax(0, 20rem);
			gap: var(--space-md);
			justify-content: center;
			width: min(100%, 24rem);
		}
	}
</style>
