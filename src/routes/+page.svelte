<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { onDestroy, onMount } from 'svelte';
	import { sineIn } from 'svelte/easing';

	const nospace =
		'no space, no spaces. follow change to hollow places, carve out space, this is our basis';

	const nospaceLong = [nospace, nospace, nospace].join('  |  ');

	let nospaceIndex: number = $state(0);
	let textInterval: ReturnType<typeof setInterval> | undefined = $state();

	let noscpaceRolling = $derived(nospaceLong.slice(-nospaceIndex - nospace.length, -nospaceIndex));

	const splinePos = (i: number) => {
		const offset = 15;
		const y = 5.75 - sineIn((i + offset) / 18) * 2;

		return `top: ${y}rem; left: ${i / 1.75}em;`;
	};

	onMount(() => {
		textInterval = setInterval(() => {
			nospaceIndex = (nospaceIndex + 1) % (nospace.length * 2);
		}, 300);
	});

	onDestroy(() => {
		clearInterval(textInterval);
	});
</script>

{#snippet rose(flip = false)}
	<div class="flex flex-col items-center space-y-2">
		<img class="w-20" src="/images/triangle.png" />
		<img class="w-32 {flip ? '-scale-x-100' : ''}" src="/images/roses.png" />
	</div>
{/snippet}

<header class="mt-4 mb-4 space-y-4 text-center">
	<h2 class="font-serif text-sm">
		THE DIY-GENDER-BENDING-BINARY-ENDING COLLECTIVE TAKING OUT THE T.R.A.S.H
	</h2>
	<h1 class="text-4xl font-black">ANTIFACIST DIY QUEER FEMINIST PUNKS</h1>
</header>

<div class="grid grid-cols-3 gap-y-6 mt-8">
	{@render rose()}
	<nav class="mt-8">
		<ul class="space-y-3 font-serif text-center">
			<li class="ms-2">about [WIP]</li>
			<li><a href={localizeHref('/music')}>MUSIC</a></li>
			<li>mutual aid and rants [WIP]</li>
			<li class="ms-6">material objects [WIP]</li>
			<li class="ms-4">get angry [WIP]</li>
		</ul>
	</nav>
	{@render rose(true)}
	<p class="font-serif text-lg leading-10 -rotate-2 col-3 ms-8">
		how many weapons, <br />
		do you measure per day?
	</p>
</div>

<p class="overflow-hidden relative w-full h-28 -translate-y-12">
	<img class="absolute top-0 left-[15rem] w-22" src="/images/lizard.png" />
	{#each noscpaceRolling as char, i ('nospace-' + i)}
		<span class="absolute font-mono font-bold" style={splinePos(i)}>{char}</span>
	{/each}
</p>
