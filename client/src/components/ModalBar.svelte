<script lang="ts">
	import Button from './Button.svelte';

	let {
		showModal = $bindable(false),
		header,
		tableType = 'bar',
		onSubmit,
		mode = 'add',
		currentItem = null
	} = $props<{
		showModal?: boolean;
		header?: () => any;
		tableType?: string;
		onSubmit?: (data: any, type: string, mode: string, id?: number) => void;
		mode?: 'add' | 'edit' | 'delete';
		currentItem?: any;
	}>();

	let dialog = $state<HTMLDialogElement | null>(null);

	type BarFormData = {
		nom: string;
		adresse: string;
		tel: string;
		email: string;
		description: string;
	};

	type FormData = BarFormData;

	let formData = $state<FormData>({} as FormData);

	$effect(() => {
		if (mode === 'add') {
			formData = {
				nom: '',
				adresse: '',
				tel: '',
				email: '',
				description: ''
			} as BarFormData;
		} else if (mode === 'edit' && currentItem) {
			formData = {
				nom: currentItem.nom || '',
				adresse: currentItem.adresse || '',
				tel: currentItem.tel?.toString() || '',
				email: currentItem.email.toString() || '',
				description: currentItem.description || ''
			} as BarFormData;
		}
	});

	$effect(() => {
		if (showModal && dialog) dialog.showModal();
	});

	function handleSubmit(event: Event) {
		event.preventDefault();

		if (onSubmit) {
			const id = (mode === 'edit' || mode === 'delete') && currentItem ? currentItem.id : undefined;

			onSubmit(formData, tableType, mode, id);
		}
		if (dialog) dialog.close();
	}

	function handleInputChange(field: string, value: string) {
		formData = {
			...formData,
			[field]: value
		};
	}

	const styles = {
		dialog:
			'min-w-96 w-3/4 max-w-[80rem] rounded-[0.2em] border-none p-0 backdrop:bg-[rgba(0, 0, 0, 0.3)] relative mt-[5rem] mx-auto',
		content: 'p-[1.5em]',
		formChild: 'flex flex-col p-2',
		formInput: 'drop-shadow-s rounded-xl p-1 border',
		formActions: 'mt-4 flex justify-end gap-2'
	};
</script>

<dialog
	class={styles.dialog}
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog?.close();
	}}
>
	<div class={styles.content}>
		{#if header}
			{header()}
		{/if}

		{#if mode === 'delete'}
			<div class="p-4 text-center">
				<p>Voulez vous vraiment supprimer {currentItem?.nom}?</p>
				<div class={styles.formActions}>
					<Button title="Annuler" onclick={() => dialog?.close()} />
					<button
						type="button"
						class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
						onclick={(e) => handleSubmit(e)}
					>
						Supprimer
					</button>
				</div>
			</div>
		{:else}
			<form onsubmit={handleSubmit}>
				{#if tableType === 'bar'}
					<div class={styles.formChild}>
						<label for="nom">Nom</label>
						<input
							type="text"
							id="nom"
							class={styles.formInput}
							value={formData.nom}
							oninput={(e) => handleInputChange('nom', (e.target as HTMLInputElement).value)}
							required
						/>
					</div>
					<div class={styles.formChild}>
						<label for="adresse">Adresse</label>
						<input
							type="text"
							id="adresse"
							class={styles.formInput}
							value={'adresse' in formData ? formData.adresse : ''}
							oninput={(e) => handleInputChange('adresse', (e.target as HTMLInputElement).value)}
							required
						/>
					</div>
					<div class={styles.formChild}>
						<label for="tel">Telephone</label>
						<input
							type="number"
							id="tel"
							class={styles.formInput}
							value={formData.tel}
							oninput={(e) => handleInputChange('tel', (e.target as HTMLInputElement).value)}
						/>
					</div>
					<div class={styles.formChild}>
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							class={styles.formInput}
							value={'email' in formData ? formData.email : ''}
							oninput={(e) => handleInputChange('email', (e.target as HTMLInputElement).value)}
						/>
					</div>
					<div class={styles.formChild}>
						<label for="description">description</label>
						<input
							type="description"
							id="description"
							class={styles.formInput}
							value={'description' in formData ? formData.description : ''}
							oninput={(e) =>
								handleInputChange('description', (e.target as HTMLInputElement).value)}
						/>
					</div>
				{/if}

				<div class={styles.formActions}>
					<Button type="button" title="Annuler" onclick={() => dialog?.close()} />

					<button
						type="submit"
						class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					>
						{mode === 'add' ? 'Ajouter' : 'Modifier'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</dialog>
