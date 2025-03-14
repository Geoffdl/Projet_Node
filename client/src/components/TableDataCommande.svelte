<script lang="ts">
	import Table from './Table.svelte';
	import ActionCell from './TableActionCell.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	const id = $page.params.id;
	interface Commande {
		id: number;
		nom: string;
		prix: number;
		status: string;
		date: string;
	}

	let commandes = $state<Commande[]>([]);

	const columns = [
		{ key: 'nom', label: 'Nom' },
		{ key: 'prix', label: 'Prix' },
		{ key: 'date', label: 'Date' },
		{ key: 'status', label: 'Status' },
		{
			key: 'actions',
			label: 'Actions',
			component: ActionCell
		}
	];

	const fetchCommandes = async () => {
		try {
			const response = await fetch(`http://localhost:3001/bars/${id}/commandes`);
			if (!response.ok) throw new Error('Failed to fetch commandes');
			const data = await response.json();

			commandes = data.map((commande: Commande) => ({
				...commande,
				date: new Date(commande.date).toLocaleDateString('fr-FR')
			}));
		} catch (error) {
			console.error('Error fetching commandes:', error);
		}
	};
	onMount(() => {
		fetchCommandes();
	});
</script>

<Table data={commandes} {columns} title="Liste des Commandes" />
