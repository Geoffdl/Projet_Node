<script>
	let { onDelete } = $props();

	function handleClick() {
		onDelete?.();
	}
</script>

<button class="text-red-600 hover:text-red-800" aria-label="Delete" onclick={handleClick}>
	<i class="fas fa-trash"></i>
</button>
