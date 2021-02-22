<script lang="ts">
	import Track from './Track.svelte'
	import Peer from 'peerjs'
	import type { PeerDataType } from './PeerDataType'
	import { Label } from 'attractions'
	import { onMount } from 'svelte'
	import { Button } from 'attractions'
	import Play from 'svelte-material-icons/Play.svelte'
	import Pause from 'svelte-material-icons/Pause.svelte'

	export let id: string | undefined, bpm: number
	console.log({ id })

	let peer: Peer | undefined

	function send(conn: Peer.DataConnection, data: PeerDataType) {
		conn.send(data)
	}

	onMount(() => {
		peer = new Peer(id)
		console.log({ peer })
		peer.on('open', (localId) => {
			//peer.id = peer.id;
		})
		peer.on('error', console.error)

		peer.on('connection', (conn) => {
			console.log({ conn })
			conn.on('open', () => {
				console.log('OPEN!!')
				connData[conn.peer] = {}
				send(conn, { type: 'bpm', bpm })
			})
			conn.on('data', (data: PeerDataType) => {
				console.log({ data })
				switch (data.type) {
					case 'label':
						connData[conn.peer].label = data.label
						break
					case 'audio':
						connData[conn.peer].audio = new Int8Array(data.audio)
						break
					case 'bpm':
						break
				}
			})
			conn.on('error', console.error)
		})
	})

	let connData: {
		[id: string]: {
			label?: string
			audio?: Int8Array
		}
	} = {}

	console.log({ connData })

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
    div.bruh
      h1.title Harmony
      h2.code {window.location.href.slice(window.location.href.indexOf('/create/') + 8, window.location.href.indexOf('/create/') + 16)}
      Button.big-play(hidden, filled, style="position: absolute; bottom: 3em; right: 3em; background: white; border-radius: 3em; padding: 8px; width: 6em; height: 6em;", on:click!="{playAll}")
        Play(color="{iconColor}", width="{iconSize}", height="{iconSize}")
      Button.big-pause(hidden, filled, style="display: none; position: absolute; bottom: 3em; right: 3em; background: white; border-radius: 3em; padding: 8px; width: 6em; height: 6em;", on:click!="{pauseAll}")
        Pause(color="{iconColor}", width="{iconSize}", height="{iconSize}")
    div.gradient

    +each("Object.entries(connData).filter(([key, value]) => (value && value.label && value.audio)) as [trackId, track] (trackId)")
      Track(label="{track.label}" audio="{track.audio}")
    //- Track(label="test" audio="oh no" bind:isPlaying="{isPlaying}" bind:playheadPos="{playheadPos}")
    //- Track(label="test" audio="oh no" bind:isPlaying="{isPlaying}" bind:playheadPos="{playheadPos}")

    div.rest
</template>

<style lang="scss">
	.code {
		text-align: center;
		font-weight: 300;
		font-style: italic;
		padding-block-start: 1em;
		padding-block-end: 1em;
		margin-block-start: 0em;
		margin-block-end: 0em;
		background-color: white;
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

	.rest {
		background-color: #262626;
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
