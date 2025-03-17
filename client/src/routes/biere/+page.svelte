<script lang="ts">
	import { onMount } from 'svelte';
	import Table from '../../components/Table.svelte';
	import ActionCell from '../../components/TableActionCell.svelte';

	interface Biere {
		nom: string;
		degree: string;
		prix: number;
		barId: number;
	}

	let bieres = $state<Biere[]>([]);

	const columns = [
		{ key: 'nom', label: 'Nom' },
		{ key: 'degree', label: 'degré' },
		{ key: 'prix', label: 'Prix' },
		{ key: 'barId', label: 'barId' }
	];

	const fetchBieres = async () => {
		try {
			const response = await fetch('http://localhost:3001/biere');
			if (!response.ok) throw new Error('Failed to fetch biere');
			const data = await response.json();

			bieres = data.map((biere: Biere) => ({
				...biere
			}));
		} catch (error) {
			console.error('Error fetching bars:', error);
		}
	};
	onMount(() => {
		fetchBieres();
	});
</script>

<div class="container mx-auto p-4">
	<Table data={bieres} {columns} title="Liste des Bières" />
</div>
