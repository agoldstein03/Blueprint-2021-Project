<script>
	import Peaks from "peaks.js";
	import { audioContext } from "./store.js";
    import { onDestroy } from 'svelte';

	export let arrayBuffer, playheadPos;

    let waveform
    let peaks
    let blobURL
    $: if (peaks && playheadPos) peaks.player.seek(playheadPos)

    document.addEventListener('click', () => {
        if (!peaks) {
            $audioContext.resume()
            const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
            blobURL = window.URL.createObjectURL(blob);
            waveform.parentElement.querySelector('audio').src = blobURL;
            $audioContext.decodeAudioData(arrayBuffer).then(audioBuffer => {
                console.log(audioBuffer)
                const options = {
                    containers: {
                        overview: waveform,
                    },
                    mediaElement: waveform.parentElement.querySelector('audio'),
                    webAudio: {
                        audioBuffer: audioBuffer,
                    },
                    overviewWaveformColor: 'rgba(255, 255, 255, 1)',
                    playheadColor: 'rgba(255, 255, 255, 1)',
                }
                Peaks.init(options, function (err, instance) {
                    const view = instance.views.getView('overview');
                    view.setAmplitudeScale(0.8);
                    view.fitToContainer()
                    waveform.querySelector('.konvajs-content').removeChild(waveform.getElementsByTagName('canvas')[4])
                    peaks = instance
                    peaks.on('player.seeked', (time) => {
                        playheadPos = time
                    })
                })
            })
        }
    })
    onDestroy(() => {if (blobURL) window.URL.revokeObjectURL(blobURL)})

    export const player = {
        play() {
            if (peaks) {
                console.log('playing')
                peaks.player.play()
                return true
            }
            return false
        },
        pause() {
            if (peaks) {
                peaks.player.pause()
                playheadPos = peaks.player.getCurrentTime()
            }
        },
        grayout(muted) {
            if (muted) {
                waveform.classList.add('muted')
            } else {
                waveform.classList.remove('muted')
            }
        }
    }
</script>

<template lang="pug">
    div.waveform(bind:this="{waveform}")
    div.muted
    // Temporary
    audio()
        track(kind='captions')
</template>

<style>
	.waveform {
		flex-grow: 1;
		background: linear-gradient(
			to right,
			#1459ff,
			#3245ff,
			#681fff,
			#8410ff,
			#a509ff,
			#c103ff
		);
		border-radius: 16px;
        height: 100%;
	}
    .muted {
        background: linear-gradient(to right, #555555, #444444) !important;
    }
</style>
