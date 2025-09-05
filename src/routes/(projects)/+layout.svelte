<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';

	let { children } = $props();
</script>

<header class="my-6 space-y-4 text-center">
	<nav class="w-full">
		<ul class="flex gap-8 justify-center space-y-3 font-serif">
			<li><a href={localizeHref('/')}>home</a></li>
			<li><a href={localizeHref('/music')}>MUSIC</a></li>
		</ul>
	</nav>
</header>

<main class="mx-auto w-2xl">
	{@render children()}
</main>
