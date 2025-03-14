<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../components/Card.svelte';
	let bars: any[] = [];

	const fetchBars = async () => {
		try {
			const response = await fetch('http://localhost:3001/bars');
			if (!response.ok) throw new Error('Failed to fetch bars');
			bars = await response.json();
		} catch (error) {
			console.error('Error fetching bars:', error);
			bars = [];
		}
	};

	onMount(() => {
		fetchBars();
	});
</script>

<Card {bars}></Card>
