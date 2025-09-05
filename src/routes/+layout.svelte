<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header class="mt-4 mb-4 space-y-4 text-center">
	<h2 class="font-serif text-sm">
		THE DIY-GENDER-BENDING-BINARY-ENDING COLLECTIVE TAKING OUT THE T.R.A.S.H
	</h2>
	<h1 class="text-4xl font-black">ANTIFACIST DIY QUEER FEMINIST PUNKS</h1>
</header>
<main class="mx-auto w-2xl">
	{@render children()}
</main>
