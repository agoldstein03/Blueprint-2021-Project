<script>
    import { audioContext } from './store.js'
    import VerticalSlider from './VerticalSlider.svelte'
    
    export let gainNode
    let gain = 0
    $: if (gainNode) gainNode.gain.value = gain

    document.addEventListener('click', () => {
        if (!gainNode) {
            $audioContext.resume()
            gainNode = $audioContext.createGain()
        }
    })
</script>

<template lang="pug">
    VerticalSlider(bind:value="{gain}")
</template>
