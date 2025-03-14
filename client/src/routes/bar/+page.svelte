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

<button onclick={() => (showModal = true)}> show modal </button>

<div class="container mx-auto p-4">
	<Table data={bars} {columns} title="Liste des Bars" />
</div>
<br />

<Modal bind:showModal>
	{#snippet header()}
		<h2>
			modal
			<small><em>adjective</em> mod·al \ˈmō-dəl\</small>
		</h2>
	{/snippet}

	<ol class="definition-list">
		<li>of or relating to modality in logic</li>
		<li>
			containing provisions as to the mode of procedure or the manner of taking effect —used of a
			contract or legacy
		</li>
		<li>of or relating to a musical mode</li>
		<li>of or relating to structure as opposed to substance</li>
		<li>
			of, relating to, or constituting a grammatical form or category characteristically indicating
			predication
		</li>
		<li>of or relating to a statistical mode</li>
	</ol>

	<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
</Modal>
