<script lang="ts">
    export let title = '';
    export let onclick = () => {};

    let buttonColor = ['+ Ajouter', 'Annuler', 'Manager ce bar', 'Bières', 'Commandes'].includes(title)
        ? 'bg-[#EAD982] hover:bg-[#B1A879]' 
        : ['Ajouter', 'Modifier'].includes(title)
            ? 'bg-[#54A56A] hover:bg-[#4D7C5A]'
            : 'bg-stone-50 hover: bg-stone-150'

    let buttonType: 'button' | 'submit' | 'reset' = title === 'Annuler' 
    ? 'button' 
    : 'submit'

    // Button style
    const styles = {
        button: ` rounded-xl p-2 w-30 text-[14px] text-center ${buttonColor}`,
    };
</script>

<button type = {buttonType} class={styles.button} on:click={onclick}>{title}</button>