<script lang="ts">
	import Track from './Track.svelte'
	import Peer from 'peerjs'
	import type { PeerDataType } from './PeerDataType'
	import { Label } from 'attractions'
	import { onMount } from 'svelte'
	import { Button } from 'attractions'
	import Play from 'svelte-material-icons/Play.svelte'
	import Pause from 'svelte-material-icons/Pause.svelte'

	export let id: string | undefined

	let peer: Peer | undefined

	onMount(() => {
		peer = new Peer(id)
		console.log({ peer })
		peer.on('open', (localId) => {
			peer.id = peer.id
		})
		peer.on('error', console.error)

		peer.on('connection', (conn) => {
			console.log({ conn })
			conn.on('open', () => {
				console.log('OPEN!!')
				connData[conn.peer] = {}
			})
			conn.on('data', (data: PeerDataType) => {
				console.log({ data })
				switch (data.type) {
					case 'label':
						connData[conn.peer].label = data.label
						break
					case 'audio':
						connData[conn.peer].audio = data.audio
						break
				}
			})
			conn.on('error', console.error)
		})
	})

	let connData: {
		[id: string]: {
			label?: string
			audio?: ArrayBuffer
		}
	} = {}

	let isPlaying,
		playheadPos = 0

	let iconColor = '#262626'
	let iconSize = '6em'

	function playAll() {
		isPlaying = true
		document.querySelector('.big-play').style.display = 'none'
		document.querySelector('.big-pause').style.display = 'block'
		document.querySelector('.big-play').style.padding = '0'
		document.querySelector('.big-pause').style.padding = '0'
	}

	function pauseAll() {
		isPlaying = false
		document.querySelector('.big-play').style.display = 'block'
		document.querySelector('.big-pause').style.display = 'none'
		document.querySelector('.big-play').style.padding = '0'
		document.querySelector('.big-pause').style.padding = '0'
	}
</script>

<template lang="pug">
    div
      h1.title Harmony
      h2.code a08w9fa
      Button.big-play(hidden, filled, style="position: absolute; bottom: 3em; right: 3em; background: white; border-radius: 3em; padding: 8px; width: 6em; height: 6em;", on:click!="{playAll}")
        Play(color="{iconColor}", width="{iconSize}", height="{iconSize}")
      Button.big-pause(hidden, filled, style="display: none; position: absolute; bottom: 3em; right: 3em; background: white; border-radius: 3em; padding: 8px; width: 6em; height: 6em;", on:click!="{pauseAll}")
        Pause(color="{iconColor}", width="{iconSize}", height="{iconSize}")
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
		background: linear-gradient(to right, #1459ff, #3245ff, #681fff, #8410ff, #a509ff, #c103ff);
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
