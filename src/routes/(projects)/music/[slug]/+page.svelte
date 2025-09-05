<script lang="ts">
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages.js';
	import { getLocale, locales, setLocale } from '$lib/paraglide/runtime';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let viewOriginal = $state(false);
	let otherLocale: 'en' | 'et' = $derived(getLocale() === 'en' ? 'et' : 'en');
</script>

{#snippet langSwitchButton(locale: 'en' | 'et')}
	<button
		class="cursor-pointer underline-offset-4 hover:underline {!viewOriginal &&
		locale !== otherLocale
			? 'font-bold'
			: ''}"
		onclick={() => {
			viewOriginal = false;
			if (locale === otherLocale) {
				setLocale(otherLocale);
			}
		}}>
		{locale.toUpperCase()}
	</button>
{/snippet}

<div class="mt-24">
	<h1 class="text-2xl font-bold">
		{data.meta.title}
		{m.lyrics()}
	</h1>
	<div>
		<data.content />
	</div>
	<div class="flex gap-12 mt-2 mb-14">
		<p>{m.translations()}:</p>
		{#each locales as locale (locale)}
			{@render langSwitchButton(locale)}
		{/each}
		<button
			class="cursor-pointer underline-offset-4 hover:underline {viewOriginal ? 'font-bold' : ''}"
			onclick={() => (viewOriginal = !viewOriginal)}>
			{m.original()}
		</button>
	</div>

	{#if viewOriginal}
		<data.lyrics.original />
	{:else}
		<data.lyrics.translated />
	{/if}
</div>
