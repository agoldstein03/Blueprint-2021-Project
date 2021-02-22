<template lang="pug">
    div.track(bind:this="{track}")
        p.track-label {label}
        VolumeControl(bind:gainNode="{gainNode}")
        div.track-buttons
            Button.play(hidden, filled, style="background: white; border-radius: 16px; padding: 8px; padding-bottom: 4px; margin-bottom: 8px;", on:click!="{play}")
                Play(color="{iconColor}", width="{iconSize}", height="{iconSize}")
            Button.pause(filled, style="display: none; background: white; border-radius: 16px; padding: 8px; padding-bottom: 4px; margin-bottom: 8px;", on:click!="{stopPlaying}")
                Pause(color="{iconColor}", width="{iconSize}", height="{iconSize}")
            Button.mute(filled, style="background: white; padding: 8px; border-radius: 16px;", on:click!="{mute}")
                Headphones(color="{iconColor}", width="{iconSize}", height="{iconSize}")
            Button.unmute(filled, style="display: none; background: white; padding: 8px; border-radius: 16px;", on:click!="{unmute}")
                HeadphonesOff(color="{iconColor}", width="{iconSize}", height="{iconSize}")
        Waveform(bind:player="{waveform}" bind:playheadPos="{playheadPos}" bind:arrayBuffer="{audio}")
</template>

<style>
    .track {
        height: 200px;
        display: flex;
        align-items: center;
        padding: 16px;
        background-color: #262626;
    }
    .track-label {
        color: white;
        transform: rotate(270deg);
        transform-origin: left;
        font-size: 18px;
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

    export let label, audio, playheadPos;
    let iconColor = "#262626";
    let iconSize = "32px";

    let track
    let waveform
    let source
    let gainNode
    let muteNode

    export let isPlaying = false
    export let isMuted = false

    $: if (waveform && isPlaying) play()
    $: if (waveform && !isPlaying) pause()

    function stopPlaying() {
        if (!isPlaying) {
            pause()
        } else {
            isPlaying = false
        }
    }

    function play() {
        if (waveform.play()) {
            track.querySelector('.play').style.display = 'none'
            track.querySelector('.pause').style.display = 'block'

            if (!source) {
                $audioContext.resume();
                source = $audioContext.createMediaElementSource(track.querySelector('audio'))
                source.connect(gainNode).connect($audioContext.destination)
                muteNode = $audioContext.createGain()
                muteNode.gain.value = 0
            }
        } else {
            isPlaying = false
        }
    }
    function pause() {
        waveform.pause()
        track.querySelector('.play').style.display = 'block'
        track.querySelector('.pause').style.display = 'none'
    }

    function mute() {
        waveform.grayout(true)
        isMuted = true
        track.querySelector('.mute').style.display = 'none'
        track.querySelector('.unmute').style.display = 'block'
        track.querySelector('.mute').style['padding-bottom'] = '4px'
        track.querySelector('.unmute').style['padding-bottom'] = '4px'

        if (source) {
            source.disconnect()
            source.connect(muteNode).connect($audioContext.destination)
        }
    }
    function unmute() {
        waveform.grayout(false)
        isMuted = false
        track.querySelector('.mute').style.display = 'block'
        track.querySelector('.unmute').style.display = 'none'

        if (source) {
            source.disconnect()
            source.connect(gainNode).connect($audioContext.destination)
        }
    }
</script>
