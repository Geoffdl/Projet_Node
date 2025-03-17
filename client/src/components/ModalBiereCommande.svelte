<script lang="ts">
	import Button from './Button.svelte';

	let {
		showModal = $bindable(false),
		header,
		tableType = 'biere',
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

	type BiereFormData = {
		nom: string;
		degree: string;
		prix: string;
	};

	type CommandeFormData = {
		nom: string;
		prix: string;
		date: string;
		status: string;
	};

	type FormData = BiereFormData | CommandeFormData;

	let formData = $state<FormData>({} as FormData);

	$effect(() => {
		if (mode === 'add') {
			if (tableType === 'biere') {
				formData = {
					nom: '',
					degree: '',
					prix: ''
				} as BiereFormData;
			} else if (tableType === 'commande') {
				formData = {
					nom: '',
					prix: '',
					date: new Date().toISOString().split('T')[0],
					status: 'brouillon'
				} as CommandeFormData;
			}
		} else if (mode === 'edit' && currentItem) {
			if (tableType === 'biere') {
				formData = {
					nom: currentItem.nom || '',
					degree: currentItem.degree?.toString() || '',
					prix: currentItem.prix?.toString() || ''
				} as BiereFormData;
			} else if (tableType === 'commande') {
				const [day, month, year] = currentItem.date.split('/');
				const formattedDate = `${year}-${month}-${day}`;
				formData = {
					nom: currentItem.nom || '',
					prix: currentItem.prix?.toString() || '',
					date: formattedDate,
					status: currentItem.status || 'brouillon'
				} as CommandeFormData;
			}
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
		{@render header?.()}

		{#if mode === 'delete'}
			<div class="p-4 text-center">
				<p>Voulez vous vraiment supprimer {currentItem?.nom}?</p>
				<div class={styles.formActions}>
					<Button title="Annuler" onclick={() => dialog?.close()} />
					<button
						type="button"
						class="rounded-xl p-2 w-30 text-[14px] text-center bg-[#E43347] hover:bg-[#99333F]"
						onclick={(e) => handleSubmit(e)}
					>
						Supprimer
					</button>
				</div>
			</div>
		{:else}
			<form onsubmit={handleSubmit}>
				{#if tableType === 'biere'}
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
						<label for="degree">Degré</label>
						<input
							type="number"
							id="degree"
							class={styles.formInput}
							value={'degree' in formData ? formData.degree : ''}
							oninput={(e) => handleInputChange('degree', (e.target as HTMLInputElement).value)}
							required
							step="0.1"
							min="0"
						/>
					</div>
					<div class={styles.formChild}>
						<label for="prix">Prix</label>
						<input
							type="number"
							id="prix"
							class={styles.formInput}
							value={formData.prix}
							oninput={(e) => handleInputChange('prix', (e.target as HTMLInputElement).value)}
							required
							step="0.01"
							min="0"
						/>
					</div>
				{:else if tableType === 'commande'}
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
						<label for="prix">Prix</label>
						<input
							type="number"
							id="prix"
							class={styles.formInput}
							value={formData.prix}
							oninput={(e) => handleInputChange('prix', (e.target as HTMLInputElement).value)}
							required
							step="0.01"
							min="0"
						/>
					</div>
					<div class={styles.formChild}>
						<label for="date">Date</label>
						<input
							type="date"
							id="date"
							class={styles.formInput}
							value={'date' in formData ? formData.date : ''}
							oninput={(e) => handleInputChange('date', (e.target as HTMLInputElement).value)}
							required
						/>
					</div>
					<div class={styles.formChild}>
						<label for="status">Status</label>
						<select
							id="status"
							class={styles.formInput}
							value={'status' in formData ? formData.status : ''}
							onchange={(e) => handleInputChange('status', (e.target as HTMLSelectElement).value)}
							required
						>
							<option value="brouillon">brouillon</option>
							<option value="en cours">en cours</option>
							<option value="terminée">terminée</option>
						</select>
					</div>
				{/if}

				<div class={styles.formActions}>
					<Button type="button" title="Annuler" onclick={() => dialog?.close()} />

					<Button title={mode === 'add' ? 'Ajouter' : 'Modifier'}/>
				</div>
			</form>
		{/if}
	</div>
</dialog>
