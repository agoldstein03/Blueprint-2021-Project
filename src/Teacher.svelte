<script lang="ts">
	import Track from "./Track.svelte";
	import Peer from "peerjs";
	import type { PeerDataType } from "./PeerDataType";
	import { Label } from "attractions";
	import { onMount } from "svelte";

	export let id: string | undefined;

	let peer: Peer;

	onMount(() => {
		peer = new Peer(/*id*/);
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
  p Teacher
  p {peer?.id}
  +each("Object.entries(connData) as [id, track] (id)")
    Track(label="{track.label}" audio="{track.audio}")
</template>

<style lang="scss">
</style>
