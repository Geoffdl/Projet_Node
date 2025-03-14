<script>
	import Card from '../components/Card.svelte';

	const barsData = [
		{
			id: 1,
			name: 'Le Petit Bistrot',
			description: 'Un charmant bistrot traditionnel au cœur de la ville',
			imageUrl: '/images/bar1.PNG'
		},
		{
			id: 2,
			name: 'La Cave à Bières',
			description: 'Large sélection de bières artisanales dans une ambiance conviviale',
			imageUrl: '/images/bar2.PNG'
		},
		{
			id: 3,
			name: 'Le Bar à Vins',
			description: 'Un endroit élégant pour déguster des vins fins',
			imageUrl: '/images/bar3.PNG'
		},
		{
			id: 4,
			name: 'Le Pub Irlandais',
			description: "L'authentique ambiance irlandaise avec musique live",
			imageUrl: '/images/bar4.PNG'
		}
	];
</script>

<Card bars={barsData}></Card>
