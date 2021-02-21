<script lang="ts">
	//import Track from "./Track.svelte";
	import Peer from "peerjs";
	import type { PeerDataType } from "./PeerDataType";
	import { Label } from "attractions";
	import { onMount } from "svelte";

	export let id: string | undefined;

	let peer: Peer | undefined;

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
</script>

<template lang="pug">
  body
    div.header
      h1.title Harmony
      h2.code a08w9fa
      h1.thing Joe is Cute
    div.main
      
    p Teacher
    p {peer.id}
    +each("Object.entries(connData) as [id, track] (id)")
      //Track(label="{track.label}" audio="{track.audio}")
</template>

<style lang="scss">
	.header {
		width: 100%;
		border: 10px;
		border-color: black;
		background: white;
		display: flex;
		text-align: left;
		margin: auto;
		align: left;
	}

	.code {
		margin: 0 0 0 0;
		padding: 0 0 0 0;
		text-align: left;
		font-weight: 300;
		font-style: italic;
		margin: auto;
	}

	.title {
		margin-left: 2rem;
		font-size: 4rem;
		font-style: italic;
		background: -webkit-linear-gradient(left, #184cdf, #bc03fc);
		background-size: 100%;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		-webkit-text-fill-color: transparent;
		-moz-text-fill-color: transparent;
		padding: 0;
	}
	.nameheader {
		text-align: left;
		align: left;
	}

	.codesection {
		text-align: center;
		align: center;
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
