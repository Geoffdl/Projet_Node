<script lang="ts">
	import Table from '../../components/Table.svelte';

	let bars = $state([]);

	const columns = [
		{ key: 'nom', label: 'Name' },
		{ key: 'adresse', label: 'Address' },
		{ key: 'tel', label: 'Phone' },
		{ key: 'email', label: 'Email' },
		{ key: 'description', label: 'Description' }
	];

	// Fetch bars data when component mounts
	const fetchBars = async () => {
		try {
			const response = await fetch('http://localhost:3001/bars');
			if (!response.ok) throw new Error('Failed to fetch bars');
			bars = await response.json();
		} catch (error) {
			console.error('Error fetching bars:', error);
		}
	};

	fetchBars();
</script>

<div class="container mx-auto p-4">
	<Table data={bars} {columns} title="Liste des Bars" />
</div>
<br />
