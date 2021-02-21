<template lang="pug">
    div.track(bind:this="{track}")
        p Label: {label}
        p Audio: {audio}
        VolumeControl(bind:gainNode="{gainNode}")
        div.track-buttons
            Button.play(hidden, filled, style="background: white; border-radius: 16px; padding: 8px; margin-bottom: 8px;", on:click!="{play}")
                Play(color="{iconColor}", width="{iconSize}", height="{iconSize}")
            Button.pause(filled, style="display: none; background: white; border-radius: 16px; padding: 8px; margin-bottom: 8px;", on:click!="{pause}")
                Pause(color="{iconColor}", width="{iconSize}", height="{iconSize}")
            Button.mute(filled, style="background: white; padding: 8px; border-radius: 16px;", on:click!="{mute}")
                Headphones(color="{iconColor}", width="{iconSize}", height="{iconSize}")
            Button.unmute(filled, style="display: none; background: white; padding: 8px; border-radius: 16px;", on:click!="{unmute}")
                HeadphonesOff(color="{iconColor}", width="{iconSize}", height="{iconSize}")
        Waveform(bind:player="{waveform}")
</template>

<style>
    .track {
        height: 200px;
        display: flex;
        align-items: center;
        padding: 16px;
        background-color: #262626;
    }
    .track-buttons {
        display: block;
        padding: 16px;
    }
</style>

<script>
    import { audioContext } from './store.js'
    import VolumeControl from './VolumeControl.svelte'
    import Waveform from './Waveform.svelte'
    import { Button } from 'attractions'
    import Play from "svelte-material-icons/Play.svelte";
    import Pause from "svelte-material-icons/Pause.svelte";
    import Headphones from "svelte-material-icons/Headphones.svelte";
    import HeadphonesOff from "svelte-material-icons/HeadphonesOff.svelte";

    export let label, audio;
    
    let iconColor = "#262626";
    let iconSize = "32px";

    let track
    let waveform
    let source
    let gainNode

    export let isPlaying = false
    export let isMuted = false

    function play() {
        waveform.play()
        isPlaying = true
        track.querySelector('.play').style.display = 'none'
        track.querySelector('.pause').style.display = 'block'
        track.querySelector('.play').style['padding-bottom'] = '4px'
        track.querySelector('.pause').style['padding-bottom'] = '4px'

        if (!source) {
            $audioContext.resume();
            source = $audioContext.createMediaElementSource(document.querySelector('audio'))
            source.connect(gainNode).connect($audioContext.destination)
        }
    }
    function pause() {
        waveform.pause()
        isPlaying = false
        track.querySelector('.play').style.display = 'block'
        track.querySelector('.pause').style.display = 'none'
    }
    function mute() {
        isMuted = true
        track.querySelector('.mute').style.display = 'none'
        track.querySelector('.unmute').style.display = 'block'
        track.querySelector('.mute').style['padding-bottom'] = '4px'
        track.querySelector('.unmute').style['padding-bottom'] = '4px'
    }
    function unmute() {
        isMuted = false
        track.querySelector('.mute').style.display = 'block'
        track.querySelector('.unmute').style.display = 'none'
    }
</script>
