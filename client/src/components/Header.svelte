<script>
	import Card from './Card.svelte';

	const styles = {
		header: 'relative z-20 flex flex-col',
		headerChild: 'mx-auto flex w-full max-w-[1400px] items-center justify-between p-4 py-6',
		nav : 'hidden items-center gap-6 md:flex',
		navChild : 'cursor-pointer duration-200 hover:text-amber-400'
	}

</script>

<header class={styles.header}>
	<div class={styles.headerChild}>
		<a href="/">
			<h1 class="font-semibold">
				Bar
				<span class="text-amber-300">Manager</span>
			</h1>
		</a>

		<button aria-label="headerBtn" class="grid place-items-center md:hidden">
			<i class="fa-solid fa-bars"></i>
		</button>
		<nav class={styles.nav}>
			<a href="/biere" class={styles.navChild}>Bieres</a>
			<a href="/bar" class={styles.navChild}>Bars</a>
			<a href="/commande" class={styles.navChild}>Commandes</a>
		</nav>
	</div>
</header>
