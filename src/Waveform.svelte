<script>
	import Peaks from "peaks.js";
	import { audioContext } from "./store.js";

	export let audioBuffer;

    let peaks
    export const player = {
        play() {
            if (peaks) {
                peaks.player.play()
            }
        },
        pause() {
            if (peaks) {
                peaks.player.pause()
            }
        }
    }

    let initialized = false
    document.addEventListener('click', () => {
        if (!initialized) {
            initialized = true
            $audioContext.resume()
            const options = {
                containers: {
                    overview: document.querySelector('.waveform'),
                },
                mediaElement: document.querySelector('audio'),
                webAudio: {
                    audioContext: $audioContext,
                },
                overviewWaveformColor: 'rgba(255, 255, 255, 1)',
                playheadColor: 'rgba(255, 255, 255, 1)',
            }
            Peaks.init(options, function (err, instance) {
                const view = instance.views.getView('overview');
                view.setAmplitudeScale(0.8);
                view.fitToContainer()
                document.querySelector('.konvajs-content').removeChild(document.getElementsByTagName('canvas')[4])
                peaks = instance
            })
        }
    })
</script>

<template lang="pug">
    div.waveform

    // Temporary
    audio(src='../oof.mp3')
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
	}
</style>
