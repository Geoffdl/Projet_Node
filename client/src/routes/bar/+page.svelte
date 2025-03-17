<script lang="ts">
	import TableDataBar from '../../components/TableDataBar.svelte';
	import Button from '../../components/Button.svelte';
	import ModalBar from '../../components/ModalBar.svelte';

	let barTable: { fetchBars: () => Promise<void> };

	let currentItem = $state(null);
	let mode = $state<'add' | 'edit' | 'delete'>('add');

	function handleAddClick() {
		currentItem = null;
		mode = 'add';
		showModal = true;
	}

	function handleEditClick(item: any) {
		currentItem = item;
		mode = 'edit';
		showModal = true;
		console.log('Edit clicked for item:', item);
	}

	function handleDeleteClick(item: any) {
		currentItem = item;
		showModal = true;
		mode = 'delete';
		console.log('Delete clicked for item:', item);
	}

	function handleFormSubmit(formData: any, tableType: string, mode: string, id?: number) {
		console.log('Form submitted:', formData, 'for table:', tableType, 'mode:', mode, 'id:', id);

		if (mode === 'add') {
			fetch(`Http://localhost:3001/bars`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
				.then((response) => {
					if (!response.ok) throw new Error('Failed to add bar');
					return response.json();
				})
				.then((data) => {
					console.log('Bar added:', data);
					barTable.fetchBars();
				})
				.catch((error) => {
					console.error('Error adding bar:', error);
				});
		} else if (mode === 'edit') {
			fetch(`Http://localhost:3001/bars/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
				.then((response) => {
					if (!response.ok) throw new Error('Failed to update bar');
					return response.json();
				})
				.then((data) => {
					console.log('Bar added:', data);
					barTable.fetchBars();
				})
				.catch((error) => {
					console.error('Error updating bar:', error);
				});
		} else if (mode === 'delete') {
			fetch(`Http://localhost:3001/bars/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
				.then((response) => {
					if (!response.ok) throw new Error('Failed to delete bar');
					return response.json();
				})
				.then((data) => {
					console.log('Bar added:', data);
					barTable.fetchBars();
				})
				.catch((error) => {
					console.error('Error deleting bar:', error);
				});
		}
	}
	const styles = {
		container: 'container mx-auto',
		button: 'pr-4 flex flex-row-reverse',
		table: 'p-4'
	};
	let showModal = $state(false);
</script>

<Button title="+ Ajouter" onclick={handleAddClick} />

<TableDataBar
	bind:this={barTable}
	onEditClick={handleEditClick}
	onDeleteClick={handleDeleteClick}
/>

<ModalBar
	bind:showModal
	header={() =>
		mode === 'add' ? 'Ajouter un bar' : mode === 'edit' ? 'Modifier un bar' : 'Supprimer un bar'}
	{currentItem}
	{mode}
	onSubmit={handleFormSubmit}
/>
