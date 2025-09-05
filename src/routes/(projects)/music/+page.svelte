<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="grid grid-cols-2 mt-12">
	{#each data.projects as project (project.slug)}
		<a href={localizeHref('/music/' + project.slug)} class="group">
			<div
				class="relative gap-2 justify-center shadow-md transition-shadow group-hover:shadow-lg aspect-square rounded-xs">
				<img
					class="object-cover absolute top-0 left-0 w-full h-full rounded-xs"
					alt="{project.title} cover art"
					src="/images/music/{project.slug}.jpg" />
				<div
					class="flex absolute bottom-0 flex-col justify-start py-4 px-2 w-full font-bold transition-colors font-keyboard bg-secondary-foreground/75 group-hover:bg-secondary-foreground/80">
					{#each project.title.split(' ') as word, i (word)}
						<p
							class="text-2xl leading-5 text-primary-foreground text-shadow-lg"
							style="margin-top: {0.5 * i}rem">
							{word}
						</p>
					{/each}
				</div>
			</div>
		</a>
	{/each}
</div>
