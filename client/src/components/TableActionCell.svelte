<script lang="ts">
	import DeleteBtn from './TableDeleteBtn.svelte';
	import EditBtn from './TableEditBtn.svelte';

	let { row, onEditClick, onDeleteClick } = $props<{
		row: any;
		onEditClick?: (row: any) => void;
		onDeleteClick?: (row: any) => void;
	}>();

	function handleEdit() {
		onEditClick?.(row);
	}

	function handleDelete() {
		onDeleteClick?.(row);
	}
</script>

<div class="flex gap-2">
	<EditBtn onEdit={handleEdit} />
	<DeleteBtn onDelete={handleDelete} />
</div>
