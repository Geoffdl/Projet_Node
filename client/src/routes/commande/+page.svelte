<script lang="ts">
	import { onMount } from 'svelte';
	import Table from '../../components/Table.svelte';

	interface Commande {
		nom: string;
		prix: string;
		date: Date;
		status: string;
		barId: number;
		actions?: string;
	}

	let commandes = $state<Commande[]>([]);

	const columns = [
		{ key: 'nom', label: 'Nom' },
		{ key: 'prix', label: 'Prix' },
		{ key: 'date', label: 'Date' },
		{ key: 'status', label: 'Status' },
		{ key: 'barId', label: 'barId' },

		{
			key: 'actions',
			label: 'Actions',
			html: true
		}
	];

	// Fetch bars data when component mounts
	const fetchCommandes = async () => {
		try {
			const response = await fetch('http://localhost:3001/bars/1/commandes');
			if (!response.ok) throw new Error('Failed to fetch biere');
			const data = await response.json();
			// Add actions HTML to each bar
			commandes = data.map((commande: Commande) => ({
				...commande,
				actions: `
					<div class="flex gap-2">
						<button class="text-blue-600 hover:text-blue-800">
							<i class="fas fa-edit"></i>
						</button>
						<button class="text-red-600 hover:text-red-800">
							<i class="fas fa-trash"></i>
						</button>
					</div>
				`
			}));
		} catch (error) {
			console.error('Error fetching bars:', error);
		}
	};
	onMount(() => {
		fetchCommandes();
	});
</script>

<div class="container mx-auto p-4">
	<Table data={commandes} {columns} title="Liste des Commandes" />
</div>
