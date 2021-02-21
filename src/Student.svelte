<script lang="ts">
	import { audioContext } from "./store.js";
	import { TextField } from "attractions";
	import Peer, { DataConnection, PeerConnectOption } from "peerjs";
	import { onMount } from "svelte";
	import type { PeerDataType } from "./PeerDataType";
	/// <reference types="dom-mediacapture-record" />

	export let id: string;

	let peer: Peer | undefined;
	let conn: DataConnection | undefined;

	onMount(() => {
		peer = new Peer();
		peer.on("open", (localId) => {
			peer.id = peer.id;
			conn = peer.connect(id, { reliable: true });
			conn.on("error", console.error);
			conn.on("open", () => {
				console.log("OPEN");
			});
			console.log({ conn });
		});
		peer.on("error", console.error);
		console.log({ peer });

		peer.on("connection", (conn) => {
			console.log({ conn });
			conn.on("open", () => {});
			conn.on("data", (data: PeerDataType) => {});
		});
	});

	function send(data: PeerDataType) {
		conn.send(data);
	}

	function sendAudio(audio: ArrayBuffer) {
		send({
			type: "audio",
			audio,
		});
	}

	function sendLabel(label: string) {
		send({
			type: "label",
			label,
		});
	}

	console.log(sendLabel);

	let timeStart: number | undefined;
	let timerID: number | undefined;
	var recording = false;
	let min = "00";
	let sec = "00";

	function check() {
		recording = !recording;
		if (recording) {
			console.log("entered");
			start();
		} else {
			stop();
			finished = true;
		}
	}

	function tick() {
		let timeElapsed = Math.floor((Date.now() - timeStart) / 1000);
		min = pad(Math.floor(timeElapsed / 60));
		sec = pad(timeElapsed % 60);
	}

	function pad(n) {
		return n < 10 ? "0" + n : n;
	}

	function start() {
		timeStart = Date.now();
		timerID = window.setInterval(tick, 100);
	}

	function stop() {
		console.log("stopped");
		mediaRecorder.stop();
		clearInterval(timerID);
	}

	let mediaPresent = false;
	let finished = false;
	let label = "";
	$: disabled = finished || !mediaPresent || label === "";
	$: {
		console.log({ finished, mediaPresent, label });
	}
	let mediaRecorder: MediaRecorder | undefined;

	navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then((media) => {
			mediaPresent = true;
			return new Promise((resolve) => {
				mediaRecorder = new MediaRecorder(media);
				mediaRecorder.ondataavailable = ({ data }) => {
					resolve(data);
				};
				mediaRecorder.start();
			});
		})
		.then((blob: Blob) => blob.arrayBuffer())
		//.then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer));
		.then((arrayBuffer) => {
			sendLabel(label);
			sendAudio(arrayBuffer);
			console.log({ label, arrayBuffer });
		});
</script>

<template lang="pug">
	//- p Student
	//- p {peer?.id}
	.background
		.text
			h1.record-title Enter a Label Below to Record!
			form.formcontainer
				input.form-input(placeholder="Label Here!" bind:value="{label}" disabled="{recording || finished}")
		div(data-role='controls')
			.shadow(class:round="{!recording}" class:square="{recording}")
				button(on:click!="{check}" title="Record" disabled="{disabled}")
		h1.time
			span#minutes {min}
			span :
			span#seconds {sec}
</template>

<style lang="scss">
	@use './theme/theme.scss';
	@use 'sass:color';

	$buttonLeft: #184cdf;
	$buttonRight: #bc03fc;
	$hoverDarkness: 30%;
	$disabledDesaturation: 75%;

	$buttonDiameterRound: 7em;
	$buttonLengthSquare: 6em;
	$buttonDiff: $buttonDiameterRound - $buttonLengthSquare;

	$buttonShadowRadius: 3em;
	$timeMargin: 1em;

	$oneMinusSqrt2: 0.41421356237;

	@mixin makeGradient($start, $end, $direction: to right) {
		background-color: color.mix($start, $end);
		background-image: linear-gradient($direction, $start, $end);
	}

	.record-title {
		color: white;
		font-size: 2rem;
		padding-left: 2rem;
		padding-right: 2rem;
	}

	.background {
		background: #262626;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text {
		padding-bottom: 1em;
	}

	button {
		display: block;
		outline: none;
		border: none;
		@include makeGradient($buttonLeft, $buttonRight);

		&:hover {
			&:not([disabled]) {
				@include makeGradient(
					color.scale($buttonLeft, $lightness: -$hoverDarkness),
					color.scale($buttonRight, $lightness: -$hoverDarkness)
				);
				cursor: pointer;
			}
		}

		&[disabled] {
			@include makeGradient(
				color.scale($buttonLeft, $saturation: -$disabledDesaturation),
				color.scale($buttonRight, $saturation: -$disabledDesaturation)
			);
			cursor: not-allowed;
		}

		.round > & {
			width: $buttonDiameterRound;
			height: $buttonDiameterRound;
			margin: $buttonShadowRadius + $timeMargin auto;
			border-radius: 50%;
		}

		.square > & {
			width: $buttonLengthSquare;
			height: $buttonLengthSquare;
			margin: $buttonShadowRadius + $timeMargin + $buttonDiff / 2 auto;
		}
	}

	.shadow {
		border-radius: 50%;
		//box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3) inset, 0px 0px 0px 40px #fff, 0px 0px 0px 35px #333;
		&.round {
			box-shadow: 0 0 0 $buttonShadowRadius #fff;
		}
		&.square {
			box-shadow: 0 0 0 $buttonShadowRadius + ($buttonDiff * $oneMinusSqrt2)
				#fff;
		}
	}

	.time {
		color: white;
	}

	.formcontainer {
		text-align: center;
		align: center;
	}
	.check-in {
		text-align: center;
		align: center;
	}
	.form-input {
		font-size: 1.5rem;
		margin-top: 10px;
		margin-bottom: 30px;
		margin-right: 1rem;
		padding: 12px 12px;
		width: 60%;
		background: rgba(38, 38, 38, 1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 20px;
	}
</style>
