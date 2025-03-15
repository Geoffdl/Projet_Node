<!-- <script lang="ts">
	import { page } from '$app/stores';
	import TableDataCommande from '../../../components/TableDataCommande.svelte';
	import TableDataBiereWithoutBarInfo from '../../../components/TableDataBiereWithoutBarInfo.svelte';
	import Button from '../../../components/Button.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import TableEditBtn from '../../../components/TableEditBtn.svelte';

	import ModalAddBiere from '../../../components/ModalAddBiere.svelte';

	const id = $page.params.id;

	const styles = {
		container: 'container mx-auto',
		buttonList: 'flex justify-between',
		tab: 'p-4',
		switch: 'pl-4',
		buttonAdd: 'pr-4'
	};

	let activeTab = $state('biere');
	const toggleTab = (tab: string) => {
		activeTab = tab;
	};
	let showModal = $state(false);

	// Reference to the table component with proper typing
	let biereTable: { fetchBieres: () => Promise<void> };
	let commandeTable: { fetchCommandes: () => Promise<void> };
	// Handle the biereAdded event
	function handleBiereAdded() {
		// Refresh the table data
		if (biereTable) {
			biereTable.fetchBieres();
		}
	}

	function handleCommandeAdded() {
		// Refresh the table data
		if (commandeTable) {
			commandeTable.fetchCommandes();
		}
	}
	let currentItem = $state(null);

	function handleEditClick(item: any) {
		currentItem = item;
		showModal = true;
		console.log('Edit clicked for item:', item);
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
			<Button title="+ Ajouter" onclick={() => (showModal = true)} />
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

<ModalAddBiere
	bind:showModal
	header={() => 'Ajouter une bière'}
	barId={id}
	onBiereAdded={handleBiereAdded}
/> -->
