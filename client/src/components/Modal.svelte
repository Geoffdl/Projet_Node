<script>
	import Button from "./Button.svelte";

	let { showModal = $bindable(), header, children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});

    const styles = {
        dialog:'max-w-[32rem] rounded-[0.2em] border-none p-0 backdrop:bg-[rgba(0, 0, 0, 0.3)] mx-[50rem] my-[10rem]',
        content:'p-[1em]',

    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class={styles.dialog}
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
	<div class={styles.content}>
		{@render header?.()}
		<hr />
		{@render children?.()}
		<hr />
		<!-- svelte-ignore a11y_autofocus -->
		<Button title="close modal" onclick={() => dialog.close()}/>
	</div>
</dialog>
