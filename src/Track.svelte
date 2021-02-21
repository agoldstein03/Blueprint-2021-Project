<template lang="pug">
    div.track
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

<script>
    import VolumeControl from './VolumeControl.svelte'
    import Waveform from './Waveform.svelte'
</script>