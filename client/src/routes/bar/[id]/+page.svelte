<script lang="ts">
	import { page } from '$app/stores';
	import TableDataCommande from '../../../components/TableDataCommande.svelte';
	import TableDataBiereWithoutBarInfo from '../../../components/TableDataBiereWithoutBarInfo.svelte';

	const id = $page.params.id;
</script>

<div class="container mx-auto p-4">
	<TableDataCommande />
</div>

<h1>Bar à l'ID {id}</h1>

<div class="container mx-auto p-4">
	<TableDataBiereWithoutBarInfo />
</div>
