<script>
    import { audioContext } from './store.js'
    import VerticalSlider from './VerticalSlider.svelte'
    
    export let gainNode
    let gain = 1

    document.addEventListener('click', () => {
        if (!gainNode) {
            $audioContext.resume()
            gainNode = $audioContext.createGain()
        }
    })
    $: changeGain(gain)
    function changeGain(newGain) {
        if (!gainNode) {
            $audioContext.resume()
            gainNode = $audioContext.createGain()
        }
        gainNode.gain.value = gain
    }
</script>

<template lang="pug">
    VerticalSlider(bind:value="{gain}")
</template>
