<template lang="pug">
    input(type='range', bind:value='{value}' name='volume', min='{min}', max='{max}')
</template>

<script>
    export let min = -10, max = 10
    export let value
</script>

<style>
    input[type='range'] {
        -webkit-appearance: none;
        width: 200px;
    }
    input[type='range']:focus {
        outline: none;
    }
    input[type='range']::-webkit-slider-runnable-track {
        width: 200px;
        height: 3px;
        cursor: pointer;
        background: gray;
        border-radius: 1.5px;
    }
    input[type='range']::-webkit-slider-thumb {
        box-shadow: 0 0 10px #000000;
        height: 18px;
        width: 18px;
        border-radius: 9px;
        background: #ffffff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -8px;
    }
    input[type='range']:focus::-webkit-slider-runnable-track {
        background: gray;
    }
    input[type='range']::-moz-range-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        background: gray;
        border-radius: 1.5px;
    }
    input[type='range']::-moz-range-thumb {
        box-shadow: 0 0 10px #000000;
        height: 18px;
        width: 18px;
        border-radius: 9px;
        background: #ffffff;
        cursor: pointer;
    }
    input[type='range']::-ms-track {
        width: 100%;
        height: 3px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type='range']::-ms-fill-lower {
        background: gray;
        border-radius: 1.5px;
    }
    input[type='range']::-ms-fill-upper {
        background: gray;
        border-radius: 1.5px;
    }
    input[type='range']::-ms-thumb {
        height: 18px;
        width: 18px;
        border-radius: 9px;
        background: #ffffff;
        cursor: pointer;
    }
    input[type='range']:focus::-ms-fill-lower {
        background: gray;
    }
    input[type='range']:focus::-ms-fill-upper {
        background: gray;
    }
</style>
