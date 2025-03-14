<script lang="ts">
	/**
	 * Type for a single column definition
	 */
	interface Column<T = any> {
		key: keyof T;
		label: string;
		format?: (value: T[keyof T]) => string;
		html?: boolean;
	}

	// Table styles
	const styles = {
		container: 'overflow-x-auto bg-white shadow-md sm:rounded-lg',
		title: 'p-4 text-xl font-semibold text-gray-800',
		table: 'w-full text-left text-sm text-gray-500',
		thead: 'bg-gray-50 text-xs uppercase text-gray-700',
		th: 'px-6 py-3',
		tr: 'border-b bg-white hover:bg-gray-50',
		td: 'px-6 py-4',
		noData: 'px-6 py-4 text-center'
	} as const;

	// Props with type safety
	export let data: any[] = [];
	export let columns: Column[] = [];
	export let title = '';
</script>

<div class={styles.container}>
	{#if title}
		<h2 class={styles.title}>{title}</h2>
	{/if}

	<table class={styles.table}>
		<thead class={styles.thead}>
			<tr>
				{#each columns as column}
					<th scope="col" class={styles.th}>
						{column.label}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as row}
				<tr class={styles.tr}>
					{#each columns as column}
						<td class={styles.td}>
							{#if column.html}
								{@html row[column.key]}
							{:else if column.format}
								{column.format(row[column.key])}
							{:else}
								{row[column.key]}
							{/if}
						</td>
					{/each}
				</tr>
			{:else}
				<tr>
					<td colspan={columns.length} class={styles.noData}> No data available </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
