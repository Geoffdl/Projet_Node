<script lang="ts">
	// Combine all props into a single $props() call
	let { data = [], columns = [], title = '', actions = () => {} } = $props();

	// Type for column definition
	type Column = {
		key: string;
		label: string;
		format?: (value: any) => string;
	};
</script>

<div class="overflow-x-auto bg-white shadow-md sm:rounded-lg">
	{#if title}
		<h2 class="p-4 text-xl font-semibold text-gray-800">{title}</h2>
	{/if}

	<table class="w-full text-left text-sm text-gray-500">
		<thead class="bg-gray-50 text-xs uppercase text-gray-700">
			<tr>
				{#each columns as column}
					<th scope="col" class="px-6 py-3">
						{column.label}
					</th>
				{/each}
				{#if actions}
					<th scope="col" class="px-6 py-3"> Actions </th>
				{/if}
			</tr>
		</thead>
		<tbody>
			{#each data as row}
				<tr class="border-b bg-white hover:bg-gray-50">
					{#each columns as column}
						<td class="px-6 py-4">
							{#if column.format}
								{column.format(row[column.key])}
							{:else}
								{row[column.key]}
							{/if}
						</td>
					{/each}
					{#if actions}
						<td class="px-6 py-4">
							{@render actions(row)}
						</td>
					{/if}
				</tr>
			{:else}
				<tr>
					<td colspan={columns.length + (actions ? 1 : 0)} class="px-6 py-4 text-center">
						No data available
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
