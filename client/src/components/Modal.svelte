<script>
	import Button from "./Button.svelte";

	let { showModal = $bindable(), header } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});

    const styles = {
        dialog:'max-w-[64rem] rounded-[0.2em] border-none p-0 backdrop:bg-[rgba(0, 0, 0, 0.3)] relative mt-[5rem] ml-[30rem]',
        content:'p-[1em]',
        formChild: 'flex flex-col p-2',
        formInput: 'drop-shadow-s rounded-xl p-1 border',
    };
</script>

<dialog class={styles.dialog}
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
	<div class={styles.content}>
		{@render header?.()}

        <form action="">
            <div class= {styles.formChild}>
                <label for="">nom</label>
                <input type="text" class={styles.formInput}>
            </div>
        </form>


		<Button title="Valider" onclick={() => dialog.close()}/>
	</div>
</dialog>
