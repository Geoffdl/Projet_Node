<script>
	const styles = {
		header: 'relative z-20 flex flex-col h-70 text-neutral-50 bg-[url(/images/background.png)] bg-cover bg-no-repeat bg-center ' +
				'after:absolute after:inset-0 after:bg-[#70342A] after:opacity-45 after:z-[-1]',
		headerChild: 'mx-auto flex w-full max-w-[1400px] items-center justify-end p-4 pt-6 pb-0',
		title: 'font-semibold mx-auto my-auto text-center text-5xl',
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

	<div class={styles.title}>
		<h1 >
			Bar
			<span class="text-amber-300">Manager</span>
		</h1>
		<p class="text-xl">Managez vos bars en un clic !</p>
	</div>

</header>
