<script>
	const styles = {
		header: 'relative z-20 flex flex-col bg-red-400 h-70',
		headerChild: 'mx-auto flex w-full max-w-[1400px] items-center justify-between p-4 pt-6 pb-0',
		title: 'font-semibold mx-auto my-auto',
		nav : 'hidden items-center gap-6 md:flex',
		navChild : 'cursor-pointer duration-200 hover:text-amber-400'
	}

</script>

<header class={styles.header}>
	<div class={styles.headerChild}>

		<nav class={styles.nav}>
			<a href="/bar" class={styles.navChild}>Bars</a>
			<a href="/biere" class={styles.navChild}>Bieres</a>
			<a href="/commande" class={styles.navChild}>Commandes</a>
		</nav>
	</div>
	<h1 class={styles.title}>
		Bar
		<span class="text-amber-300">Manager</span>
	</h1>
</header>
