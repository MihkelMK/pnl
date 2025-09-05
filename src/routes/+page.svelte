<script lang="ts">
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

<div class="mt-8 grid grid-cols-3 gap-y-6">
	{@render rose()}
	<nav class="mt-8">
		<ul class="space-y-3 text-center font-serif">
			<li class="ms-2">about</li>
			<li>MUSIC</li>
			<li>mutual aid and rants</li>
			<li class="ms-6">material objects</li>
			<li class="ms-4">get angry</li>
		</ul>
	</nav>
	{@render rose(true)}
	<p class="col-3 ms-8 -rotate-2 font-serif text-lg leading-10">
		how many weapons, <br />
		do you measure per day?
	</p>
</div>

<p class="relative h-28 w-full -translate-y-12 overflow-hidden">
	<img class="absolute top-0 left-[15rem] w-22" src="/images/lizard.png" />
	{#each noscpaceRolling as char, i ('nospace-' + i)}
		<span class="absolute font-mono font-bold" style={splinePos(i)}>{char}</span>
	{/each}
</p>
