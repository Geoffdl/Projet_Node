<script lang="ts">
	import Button from './Button.svelte';

	let { showModal = $bindable(), header, barId, onBiereAdded = $bindable() } = $props();

	let dialog: HTMLDialogElement | null = $state(null);
	let nom = $state('');
	let degree = $state(0);
	let prix = $state(0);
	let isSubmitting = $state(false);

	$effect(() => {
		if (showModal && dialog) dialog.showModal();
	});

	const styles = {
		dialog:
			'max-w-[64rem] rounded-[0.2em] border-none p-0 backdrop:bg-[rgba(0, 0, 0, 0.3)] relative mt-[5rem] ml-[30rem]',
		content: 'p-[1em]',
		formChild: 'flex flex-col p-2',
		formInput: 'drop-shadow-s rounded-xl p-1 border'
	};

	function handleButtonClick() {
		console.log('Button clicked!');
		submitForm();
	}

	async function submitForm() {
		console.log('Form submitted!');

		if (isSubmitting) return;
		isSubmitting = true;

		try {
			console.log('Submitting form with data:', { nom, degree, prix, barId });

			const formData = {
				nom,
				degree,
				prix
			};

			const response = await fetch(`http://localhost:3001/bars/${barId}/biere`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				console.log('Form submitted successfully');
				// Reset form fields
				nom = '';
				degree = 0;
				prix = 0;

				// Call the callback prop instead of dispatching an event
				if (onBiereAdded) onBiereAdded();

				// Close the dialog
				if (dialog) dialog.close();
			} else {
				console.error('Failed to submit form:', await response.text());
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<dialog
	class={styles.dialog}
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog && dialog) dialog.close();
	}}
>
	<div class={styles.content}>
		{#if header}
			<h2 class="mb-4 text-xl font-bold">{header()}</h2>
		{/if}

		<div>
			<div class={styles.formChild}>
				<label for="nom">Nom</label>
				<input type="text" id="nom" class={styles.formInput} bind:value={nom} required />

				<label for="degree">Degré</label>
				<input
					type="number"
					id="degree"
					class={styles.formInput}
					bind:value={degree}
					min="0"
					step="0.1"
					required
				/>

				<label for="prix">Prix</label>
				<input
					type="number"
					id="prix"
					class={styles.formInput}
					bind:value={prix}
					min="0"
					step="0.01"
					required
				/>
			</div>

			<div class="mt-4 flex justify-end">
				<Button title="Valider" onclick={handleButtonClick} />
			</div>
		</div>
	</div>
</dialog>
