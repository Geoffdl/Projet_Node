<script lang="ts">
	import { onMount } from 'svelte';
	import Table from '../../components/Table.svelte';

	
  

  import ActionCell from '../../components/TableActionCell.svelte';
	import Button from '../../components/Button.svelte';
	import Modal from '../../components/Modal.svelte';


	interface Bar {
		nom: string;
		adresse: string;
		tel: string;
		email: string;
		description: string;
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
			component: ActionCell
		}
	];

	const fetchBars = async () => {
		try {
			const response = await fetch('http://localhost:3001/bars');
			if (!response.ok) throw new Error('Failed to fetch bars');
			const data = await response.json();

			bars = data.map((bar: Bar) => ({
				...bar
			}));
		} catch (error) {
			console.error('Error fetching bars:', error);
		}
	};
	onMount(() => {
		fetchBars();
	});

	let showModal = $state(false);
</script>

<Button title="+ Ajouter" onclick={() => (showModal = true)}/>

<div class="container mx-auto p-4">
	<Table data={bars} {columns} title="Liste des Bars" />
</div>
<br />

<Modal bind:showModal>
	{#snippet header()}
		<h2>
			Ajouter un bar
		</h2>
	{/snippet}


</Modal>
