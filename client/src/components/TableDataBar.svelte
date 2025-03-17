<script lang="ts">
	import Table from './Table.svelte';
	import ActionCell from './TableActionCell.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { onEditClick, onDeleteClick } = $props<{
		onEditClick?: (bar: any) => void;
		onDeleteClick?: (bar: any) => void;
	}>();

	interface Bar {
		id: number;
		nom: string;
		adresse: number;
		tel: string;
		email: string;
		description: string;
	}

	let bars = $state<Bar[]>([]);

	const columns = [
		{ key: 'nom', label: 'Nom' },
		{ key: 'adresse', label: 'Adresse' },
		{ key: 'tel', label: 'Telephone' },
		{ key: 'email', label: 'Email' },
		{ key: 'description', label: 'Description' },
		{
			key: 'actions',
			label: 'Actions',
			component: ActionCell
		}
	];

	export const fetchBars = async () => {
		try {
			const response = await fetch(`http://localhost:3001/bars`);
			if (!response.ok) throw new Error('Failed to fetch bars');
			const data = await response.json();

			bars = data.map((bar: Bar) => ({
				...bar
			}));
		} catch (error) {
			console.error('Error fetching commandes:', error);
		}
	};
	onMount(() => {
		fetchBars();
	});
</script>

<Table data={bars} {columns} title="Liste des bars" {onEditClick} {onDeleteClick} />
