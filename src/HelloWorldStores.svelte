<template lang="pug">
	h1 Hello {name}!
	p With stores this time.
	HelloWorldStoresDisplay
	button(on:click!="{() => {$count++}}") Click to go from {$count} to {countPlusOne}
</template>

<script>
	import { count } from './store.js'
	import HelloWorldStoresDisplay from './HelloWorldStoresDisplay.svelte'

	export let name;

	$: countPlusOne = $count + 1;

</script>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100
	}
</style>
