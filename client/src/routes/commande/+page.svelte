<script lang="ts">
	import { onMount } from 'svelte';
	import Table from '../../components/Table.svelte';

	import ActionCell from '../../components/TableActionCell.svelte';

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
			const response = await fetch('http://localhost:3001/bars/1/commandes');
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

<div class="container mx-auto p-4">
	<Table data={commandes} {columns} title="Liste des Commandes" />
</div>
