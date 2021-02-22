<script>
	import Peaks from "peaks.js";
	import { audioContext } from "./store.js";

	export let arrayBuffer, playheadPos;

	let waveform;
	let peaks;
	$: if (peaks && playheadPos) peaks.player.seek(playheadPos);

    const buf = new ArrayBuffer(arrayBuffer.byteLength);
    const dataView = new DataView(buf)
    arrayBuffer.forEach((b, i) => {
        dataView.setInt32(i * arrayBuffer.BYTES_PER_ELEMENT, b)
    })
    console.log(arrayBuffer.byteLength)
	document.addEventListener("click", () => {
		if (!peaks) {
			$audioContext.resume();
			const options = {
				containers: {
					overview: waveform,
				},
				mediaElement: waveform.parentElement.querySelector("audio"),
				webAudio: {
					audioBuffer: $audioContext.decodeAudioData(
						buf
					),
				}, 
				overviewWaveformColor: "rgba(255, 255, 255, 1)",
				playheadColor: "rgba(255, 255, 255, 1)",
			};
			Peaks.init(options, function (err, instance) {
				const view = instance.views.getView("overview");
				view.setAmplitudeScale(0.8);
				view.fitToContainer();
				waveform
					.querySelector(".konvajs-content")
					.removeChild(waveform.getElementsByTagName("canvas")[4]);
				peaks = instance;
				peaks.on("player.seeked", (time) => {
					playheadPos = time;
				});
			});
		}
	});

	export const player = {
		play() {
			if (peaks) {
				peaks.player.play();
				return true;
			}
			return false;
		},
		pause() {
			if (peaks) {
				peaks.player.pause();
				playheadPos = peaks.player.getCurrentTime();
			}
		},
		grayout(muted) {
			if (muted) {
				waveform.classList.add("muted");
			} else {
				waveform.classList.remove("muted");
			}
		},
	};
</script>

<template lang="pug">
    div.waveform(bind:this="{waveform}")
    div.muted
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
