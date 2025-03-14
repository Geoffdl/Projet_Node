<script lang="ts">

    //button style
    const styles={
        button: 'bg-[#EAD982] border border-black p-4 w-32 text-center' ,
    } as const;

    export let title = '';
</script>

<button class={styles.button}>{title}</button>
