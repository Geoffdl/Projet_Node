<script lang="ts">
	import { page } from '$app/stores';
	import TableDataCommande from '../../../components/TableDataCommande.svelte';
	import TableDataBiereWithoutBarInfo from '../../../components/TableDataBiereWithoutBarInfo.svelte';
	import Button from '../../../components/Button.svelte';
	import ModalAdd from '../../../components/ModalAdd.svelte';

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
</script>

<div class={styles.container}>
	<h1>Bar à l'ID {id}</h1>

	<div class={styles.buttonList}>
		<div class={styles.switch}>
			<Button title="Bières" onclick={() => toggleTab('biere')} />
			<Button title="Commandes" onclick={() => toggleTab('commande')} />
		</div>
		<div class={styles.buttonAdd}>
			<Button title="+ Ajouter" />
		</div>
	</div>

	<div id="commande" class={styles.tab} hidden={activeTab !== 'commande'}>
		<TableDataCommande />
	</div>
	<div id="biere" class={styles.tab} hidden={activeTab !== 'biere'}>
		<TableDataBiereWithoutBarInfo />
	</div>
</div>
