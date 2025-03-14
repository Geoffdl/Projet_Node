<script lang="ts">
    export let title = '';
    export let onclick = () => {};
    let buttonColor = title === '+ Ajouter' || 'Valider' || 'Annuler' || 'Manager ce bar'
        ? 'bg-[#EAD982]' 
        : title === "Supprimer"
            ? 'bg-[#E43347]'
            : 'bg-stone-50'

    // Button style
    const styles = {
        button: ` rounded-xl p-2 w-30 text-[14px] text-center ${buttonColor}`,
    };
</script>

<button class={styles.button} on:click={onclick}>{title}</button>