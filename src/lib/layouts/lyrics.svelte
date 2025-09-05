<script context="module">
	import SongTitle from '$lib/components/music/SongTitle.svelte';
	import PerformerList from '$lib/components/music/PerformerList.svelte';
	import PerformerName from '$lib/components/music/PerformerName.svelte';

	export { SongTitle as h2, PerformerList as h3, PerformerName as h4 };
</script>

<script>
	import SongLyrics from '$lib/components/music/SongLyrics.svelte';
</script>

<SongLyrics>
	<slot />
</SongLyrics>

