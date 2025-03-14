<script>
	import Card from './Card.svelte';
</script>

<header class="relative z-20 flex flex-col">
	<div class="mx-auto flex w-full max-w-[1400px] items-center justify-between p-4 py-6">
		<a href="/">
			<h1 class="font-semibold">
				Bar
				<span class="text-amber-300">Manager</span>
			</h1>
		</a>

		<button aria-label="headerBtn" class="grid place-items-center md:hidden">
			<i class="fa-solid fa-bars"></i>
		</button>
		<nav class="hidden items-center gap-6 md:flex">
			<a href="/biere" class="cursor-pointer duration-200 hover:text-amber-400">Bieres</a>
			<a href="/bar" class="cursor-pointer duration-200 hover:text-amber-400">Bars</a>
			<a href="/commande" class="cursor-pointer duration-200 hover:text-amber-400">Commandes</a>
		</nav>
	</div>
</header>
