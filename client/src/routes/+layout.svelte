<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/bar">Bars</a></li>
		<li><a href="/biere">Bieres</a></li>
		<li><a href="/commande">Commandes</a></li>
	</ul>
</nav>

{@render children()}
