<template lang="pug">
	h1 Hello {name}!
	p Visit the #[a(href='https://svelte.dev/tutorial') Svelte tutorial] to learn how to build Svelte apps.
	p Counter: {count}
	button(on:click!="{() => {count++}}") Click to go from {count} to {countPlusOne}
	Button(on:click!="{() => {alert('hello')}}") TESTING
</template>

<script>
	import { Button } from 'attractions'

	export let name;
	let count = 0;
	$: countPlusOne = count + 1;

</script>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100
	}
</style>
