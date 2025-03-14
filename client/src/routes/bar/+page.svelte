<script lang="ts">
	import { onMount } from 'svelte';
	import Table from '../../components/Table.svelte';
	import Button from '../../components/Button.svelte';

	interface Bar {
		nom: string;
		adresse: string;
		tel: string;
		email: string;
		description: string;
		actions?: string;
	}

	let bars = $state<Bar[]>([]);

	const columns = [
		{ key: 'nom', label: 'Name' },
		{ key: 'adresse', label: 'Address' },
		{ key: 'tel', label: 'Phone' },
		{ key: 'email', label: 'Email' },
		{ key: 'description', label: 'Description' },
		{
			key: 'actions',
			label: 'Actions',
			html: true
		}
	];

	// Fetch bars data when component mounts
	const fetchBars = async () => {
		try {
			const response = await fetch('http://localhost:3001/bars');
			if (!response.ok) throw new Error('Failed to fetch bars');
			const data = await response.json();
			// Add actions HTML to each bar
			bars = data.map((bar: Bar) => ({
				...bar,
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
		fetchBars();
	});
</script>

<Button title="Supprimer"/>

<div class="container mx-auto p-4">
	<Table data={bars} {columns} title="Liste des Bars" />
</div>
<br />
