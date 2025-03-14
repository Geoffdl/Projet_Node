<script lang="ts">
	import { page } from '$app/stores';
	import TableDataCommande from '../../../components/TableDataCommande.svelte';
	import TableDataBiereWithoutBarInfo from '../../../components/TableDataBiereWithoutBarInfo.svelte';
	import ModalAdd from '../../../components/ModalAdd.svelte';

	const id = $page.params.id;
	let showModal = $state(false);
</script>

<div class="container mx-auto p-4">
	<TableDataCommande />
</div>

<h1>Bar à l'ID {id}</h1>
<button aria-label="add" class="btn" onclick={() => (showModal = true)}>+Ajouter</button>

<ModalAdd bind:showModal header={() => 'Ajouter une bière'} barId={id}></ModalAdd>

<div class="container mx-auto p-4">
	<TableDataBiereWithoutBarInfo />
</div>
