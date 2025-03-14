<script lang="ts">
	import { page } from '$app/stores';
	import TableDataCommande from '../../../components/TableDataCommande.svelte';
	import TableDataBiereWithoutBarInfo from '../../../components/TableDataBiereWithoutBarInfo.svelte';
	import Button from '../../../components/Button.svelte';

	const id = $page.params.id;

	const styles = {
		tab : 'container mx-auto p-4'
	}

	let activeTab = 'biere'; // Valeur par défaut
	const toggleTab = (tab: string) => {
		activeTab = tab;
	};
</script>

<Button title='Bières' onclick={() => toggleTab('biere')}/>
<Button title='Commandes' onclick={() => toggleTab('commande')}/>

<div id="commande" class={styles.tab} hidden={activeTab !== 'commande'}>
	<TableDataCommande />
</div>

<h1>Bar à l'ID {id}</h1>

<div id="biere" class={styles.tab} hidden={activeTab !== 'biere'}>
	<TableDataBiereWithoutBarInfo />
</div>
