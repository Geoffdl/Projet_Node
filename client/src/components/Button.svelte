<script lang="ts">
    export let title = '';
    export let onclick = () => {};
    let buttonColor = title === '+ Ajouter' || 'Valider' || 'Annuler' || 'Manager ce bar' || 'Bières' || 'Commandes'
        ? 'bg-[#EAD982] hover:bg-[#B1A879]' 
        : title === "Supprimer"
            ? 'bg-[#E43347] hover: bg-[#99333F]'
            : 'bg-stone-50 hover: bg-stone-150'

    // Button style
    const styles = {
        button: ` rounded-xl p-2 w-30 text-[14px] text-center ${buttonColor}`,
    };
</script>

<button class={styles.button} on:click={onclick}>{title}</button>