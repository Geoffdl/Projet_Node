<script>
	import { page } from '$app/stores';
	const styles = {
		header: 'relative z-20 flex flex-col text-stone-50',
		headerChild: 'mx-auto flex w-full max-w-[1400px] items-center  p-4 pt-6 pb-0',
		title: 'font-semibold',
		nav : 'hidden items-center gap-6 md:flex',
		navChild : 'cursor-pointer duration-200 hover:text-amber-400'
	}

	$: styles.header = $page.url.pathname === "/"
        ? styles.header + ' h-70 bg-[url(/images/background.png)] bg-cover bg-no-repeat bg-center ' +
          'after:absolute after:inset-0 after:bg-[#70342A] after:opacity-45 after:z-[-1]'
        : styles.header + 'bg-none'
	$: styles.title = $page.url.pathname === "/"
		? styles.title + 'mx-auto my-auto text-center text-5xl'
		: styles.title
	$:  styles.headerChild = $page.url.pathname === "/"
		? styles.headerChild + 'flex justify-end'
		: styles.headerChild + 'flex justify-between'
</script>

<header class={styles.header}>
	<div class={styles.headerChild}>
		{#if $page.url.pathname !== "/"}
		<a href="/">
			<h1 class={styles.title}>
				Bar
				<span class="text-amber-300">Manager</span>
			</h1>
		</a>
		{/if}
		<nav class={styles.nav}>
			<a href="/bar" class={styles.navChild}>Bars</a>
			<a href="/biere" class={styles.navChild}>Bieres</a>
			<a href="/commande" class={styles.navChild}>Commandes</a>
		</nav>
	</div>
	{#if $page.url.pathname === "/"}
		<div class={styles.title}>
			<h1 >
				Bar
				<span class="text-amber-300">Manager</span>
			</h1>
			<p class="text-xl">Managez vos bars en un clic !</p>
		</div>
	{/if}

</header>
