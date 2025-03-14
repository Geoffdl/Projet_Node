<script lang="ts">
	import { onMount } from 'svelte';
	import Table from './Table.svelte';
	import ActionCell from './TableActionCell.svelte';
	import { page } from '$app/stores';

	const id = $page.params.id;

	interface Biere {
		nom: string;
		degree: string;
		prix: number;
	}

	let bieres = $state<Biere[]>([]);

	const columns = [
		{ key: 'nom', label: 'Nom' },
		{ key: 'degree', label: 'degré' },
		{ key: 'prix', label: 'Prix' },

		{
			key: 'actions',
			label: 'Actions',
			component: ActionCell
		}
	];

	const fetchBieres = async () => {
		try {
			const response = await fetch(`http://localhost:3001/bars/${id}/biere`);
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

<Table data={bieres} {columns} title="Liste des Bières" />
