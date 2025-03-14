<script lang="ts">
	interface Bar {
		id: number;
		nom: string;
		description: string;
		imageUrl: string;
	}

	const styles = {
		container: 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3',
		card: 'max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
		image: 'rounded-t-lg',
		content: 'p-5',
		title: 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white',
		description: 'mb-3 font-normal text-gray-700 dark:text-gray-400',
		button:
			'inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
	} as const;

	export let bars: Bar[] = [];
</script>

<div class={styles.container}>
	{#each bars as bar}
		<div class={styles.card}>
			<a href="/">
				<img class={styles.image} src="/images/bar{bar.id}.PNG" alt={bar.nom} />
			</a>
			<div class={styles.content}>
				<a href="/">
					<h5 class={styles.title}>
						{bar.nom}
					</h5>
				</a>
				<p class={styles.description}>{bar.description}</p>
				<a href="/" class={styles.button}> Manager ce bar </a>
			</div>
		</div>
	{/each}
</div>

<!-- <div
	class="max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
>
	<a href="/">
		<img class="rounded-t-lg" src="/images/bar1.PNG" alt="bar" />
	</a>
	<div class="p-5">
		<a href="/">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				Mon super bar
			</h5>
		</a>
		<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Ma description du super bar</p>
		<a
			href="/"
			class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Gerer ce bar
		</a>
	</div>
</div> -->
