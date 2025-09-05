<script lang="ts">
	import '../app.css';
	import '@fontsource/libertinus-keyboard';

	let { children } = $props();
</script>

<main class="mx-auto w-2xl">
	{@render children()}
</main>
