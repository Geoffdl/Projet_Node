<script>
	let { onEdit } = $props();

	function handleClick() {
		onEdit?.();
	}
</script>

<button class="text-blue-600 hover:text-blue-800" aria-label="edit" onclick={handleClick}>
	<i class="fas fa-edit"></i>
</button>
