<script lang="ts">
	import Track from "./Track.svelte";
	import Peer from "peerjs";
	import type { PeerDataType } from "./PeerDataType";
	import { Label } from "attractions";
	import { onMount } from "svelte";

	export let id: string | undefined, bpm: number;

	let peer: Peer | undefined;

	function send(conn: Peer.DataConnection, data: PeerDataType) {
		conn.send(data);
	}

	onMount(() => {
		peer = new Peer(id);
		console.log({ peer });
		peer.on("open", (localId) => {
			peer.id = peer.id;
		});
		peer.on("error", console.error);

		peer.on("connection", (conn) => {
			console.log({ conn });
			conn.on("open", () => {
				console.log("OPEN!!");
				connData[conn.peer] = {};
				send(conn, { type: "bpm", bpm });
			});
			conn.on("data", (data: PeerDataType) => {
				console.log({ data });
				switch (data.type) {
					case "label":
						connData[conn.peer].label = data.label;
						break;
					case "audio":
						connData[conn.peer].audio = data.audio;
						break;
				}
			});
			conn.on("error", console.error);
		});
	});

	let connData: {
		[id: string]: {
			label?: string;
			audio?: ArrayBuffer;
		};
	} = {};

	let isPlaying,
		playheadPos = 0;
</script>

<template lang="pug">
  body
    div
      h1.title Harmony
      h2.code a08w9fa
    div.gradient

    +each("Object.entries(connData) as [id, track] (id)")
      Track(label="{track.label}" audio="{track.audio}")
    Track(label="test" audio="oh no" bind:isPlaying="{isPlaying}" bind:playheadPos="{playheadPos}")
    Track(label="test" audio="oh no" bind:isPlaying="{isPlaying}" bind:playheadPos="{playheadPos}")
</template>

<style lang="scss">
	.code {
		text-align: center;
		font-weight: 300;
		font-style: italic;
		margin-block-start: 1em;
		margin-block-end: 1em;
	}

	.title {
		position: absolute;
		left: 0.4em;
		top: -0.6em;
		font-size: 3rem;
		font-style: italic;
		background: -webkit-linear-gradient(left, #184cdf, #bc03fc);
		background-size: 100%;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		padding: 0;
	}

	.gradient {
		background: linear-gradient(
			to right,
			#1459ff,
			#3245ff,
			#681fff,
			#8410ff,
			#a509ff,
			#c103ff
		);
		height: 1em;
	}

	html,
	body {
		margin: 0 0 0 0;
		padding: 0 0 0 0;
		overflow-x: hidden;
		width: 100%;
		height: 100%;
	}
</style>
