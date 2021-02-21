<script>
	import VolumeControl from "./VolumeControl.svelte";
	import Waveform from "./Waveform.svelte";

	export let label, audio;
</script>

<template lang="pug">
    div.track
        p Label: {label}
        p Audio: {audio}
        VolumeControl
        Waveform
</template>

<style>
	.track {
		height: 200px;
		border-radius: 16px;
		display: flex;
	}
</style>
