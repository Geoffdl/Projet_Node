<script lang="ts">
	import { page } from '$app/stores';
	import TableDataCommande from '../../../components/TableDataCommande.svelte';
	import TableDataBiereWithoutBarInfo from '../../../components/TableDataBiereWithoutBarInfo.svelte';
	import Button from '../../../components/Button.svelte';
	import TestingModal from '../../../components/testing/TestingModal.svelte';

	const id = $page.params.id;

	const styles = {
		container: 'container mx-auto',
		buttonList: 'flex justify-between',
		tab: 'p-4',
		switch: 'pl-4',
		buttonAdd: 'pr-4'
	};

	let activeTab = $state('biere');

	let showModal = $state(false);

	let currentItem = $state(null);

	let mode = $state('add');

	const toggleTab = (tab: string) => {
		activeTab = tab;
	};
	function handleFormSubmit(formData: any, tableType: string, mode: string, id?: number) {
		console.log('Form submitted:', formData, 'for table:', tableType, 'mode:', mode, 'id:', id);

		if (tableType === 'biere') {
			if (mode === 'add') {
				fetch(`http://localhost:3001/bars/${id}/biere`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
					.then((response) => {
						if (!response.ok) throw new Error('Failed to add beer');
						return response.json();
					})
					.then((data) => {
						console.log('Beer added:', data);
						if (biereTable) {
							biereTable.fetchBieres();
						}
					})
					.catch((error) => {
						console.error('Error adding beer:', error);
					});
			} else if (mode === 'edit' && id) {
				fetch(`http://localhost:3001/biere/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
					.then((response) => {
						if (!response.ok) throw new Error('Failed to update beer');
						return response.json();
					})
					.then((data) => {
						console.log('Beer updated:', data);
						if (biereTable) {
							biereTable.fetchBieres();
						}
					})
					.catch((error) => {
						console.error('Error updating beer:', error);
					});
			}
		} else if (tableType === 'commande') {
			if (mode === 'add') {
				fetch(`http://localhost:3001/bars/${id}/commandes`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
					.then((response) => {
						if (!response.ok) throw new Error('Failed to add command');
						return response.json();
					})
					.then((data) => {
						console.log('Command added:', data);
						if (commandeTable) {
							commandeTable.fetchCommandes();
						}
					})
					.catch((error) => {
						console.error('Error adding command:', error);
					});
			} else if (mode === 'edit' && id) {
				fetch(`http://localhost:3001/commande/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
					.then((response) => {
						if (!response.ok) throw new Error('Failed to update command');
						return response.json();
					})
					.then((data) => {
						console.log('Command updated:', data);
						if (commandeTable) {
							commandeTable.fetchCommandes();
						}
					})
					.catch((error) => {
						console.error('Error updating command:', error);
					});
			}
		}
	}

	let biereTable: { fetchBieres: () => Promise<void> };
	let commandeTable: { fetchCommandes: () => Promise<void> };

	function handleBiereAdded() {
		if (biereTable) {
			biereTable.fetchBieres();
		}
	}

	function handleCommandeAdded() {
		if (commandeTable) {
			commandeTable.fetchCommandes();
		}
	}

	function handleAddClick() {
		currentItem = null;
		mode = 'add';
		showModal = true;
	}

	function handleEditClick(item: any) {
		currentItem = item;
		mode = 'edit';
		showModal = true;
		console.log('Edit clicked for item:', item, id, mode);
	}

	function handleDeleteClick(item: any) {
		currentItem = item;
		showModal = true;
		console.log('Delete clicked for item:', item);
	}
</script>

<div class={styles.container}>
	<h1>Bar à l'ID {id}</h1>

	<div class={styles.buttonList}>
		<div class={styles.switch}>
			<Button title="Bières" onclick={() => toggleTab('biere')} />
			<Button title="Commandes" onclick={() => toggleTab('commande')} />
		</div>
		<div class={styles.buttonAdd}>
			<Button title="+ Ajouter" onclick={handleAddClick} />
		</div>
	</div>

	<div id="commande" class={styles.tab} hidden={activeTab !== 'commande'}>
		<TableDataCommande
			bind:this={commandeTable}
			onEditClick={handleEditClick}
			onDeleteClick={handleDeleteClick}
		/>
	</div>
	<div id="biere" class={styles.tab} hidden={activeTab !== 'biere'}>
		<TableDataBiereWithoutBarInfo
			bind:this={biereTable}
			onEditClick={handleEditClick}
			onDeleteClick={handleDeleteClick}
		/>
	</div>
</div>

<TestingModal
	bind:showModal
	header={() =>
		`${mode === 'add' ? 'Ajouter' : 'Modifier'} ${activeTab === 'biere' ? 'une bière' : 'une commande'}`}
	tableType={activeTab}
	{mode}
	{currentItem}
	onSubmit={handleFormSubmit}
/>
