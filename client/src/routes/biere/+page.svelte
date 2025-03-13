<script lang="ts">
	import Table from '../../components/Table.svelte';

	let bieres = $state([{ id: 1, nom: 'Beer Name', degree: 5.5, prix: 4.5 }]);

	const columns = [
		{ key: 'nom', label: 'Name' },
		{
			key: 'degree',
			label: 'Alcohol %',
			format: (value: number) => `${value}%`
		},
		{
			key: 'prix',
			label: 'Price',
			format: (value: number) => `${value}€`
		}
	];
</script>

<div class="container mx-auto p-4">
	<Table data={bieres} {columns} title="Liste des Bières" />
</div>
