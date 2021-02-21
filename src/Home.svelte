<script>
	let modalOpen = false;
	let tempo = 80;
	import Slider from "./HorizontalSlider.svelte";
	import { Modal } from "attractions";
	import { Dialog } from "attractions";
	import { Card } from "attractions";
	import { Button } from "attractions";
</script>

<template lang="pug">
    <body>
        div.background
            Card
                div.cardformat
                    h1.title Harmony
                    div
                        form.formcontainer
                            input.form-input(type='text' placeholder="Enter Meeting Code")
                            input.gradient-button.gradient-button-2(type='button', value='Join')
                    div.check-in
                    button.gradient-button.gradient-button-1(on:click!="{() => modalOpen = true}") Create Meeting
                        Modal(bind:open='{modalOpen}' let:closeCallback="{closeCallback}")
                            Dialog(title='Select Tempo!', closeCallback="{closeCallback}")
                                div.start-modal
                                    form.formcontainer
                                        input.tempo-input(type='number' placeholder="Enter the Tempo!" bind:value="{tempo}")
                                        input.gradient-button.gradient-button-3(type='button', value='Make My Meeting!', min="10", max="500")
                                        Slider(bind:value="{tempo}", min=10, max = 500)


    </body>

</template>

<style>
	.title {
		font-size: 7rem;
		font-style: italic;
		background: -webkit-linear-gradient(left, #184cdf, #bc03fc);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.tempo-input {
		font-size: 1.5rem;
		margin-top: 10px;
		margin-bottom: 30px;
		margin-right: 3rem;
		padding: 10px 10px;
		width: 40%;
		background: white;
		color: rgb(197, 194, 194);
		border: 1px solid rgba(38, 38, 38, 1);
		border-radius: 20px;
	}
	.start-modal {
		text-align: center;
		align: center;
	}

	.cardformat {
		padding-top: 0rem;
		padding-bottom: 5rem;
		padding-left: 10rem;
		padding-right: 10rem;
	}
	.formcontainer {
		text-align: left;
		align: left;
	}
	.check-in {
		text-align: center;
		align: center;
	}
	.form-input {
		font-size: 1.5rem;
		margin-top: 10px;
		margin-bottom: 30px;
		margin-right: 3rem;
		padding: 10px 10px;
		width: 60%;
		background: rgba(38, 38, 38, 1);
		color: white;
		border: 1px solid rgba(38, 38, 38, 0.1);
		border-radius: 20px;
	}
	.background {
		background: linear-gradient(
			to right,
			#262626 33%,
			#1459ff 33%,
			#c103ff 60% 67%,
			#262626 67% 100%
		);
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	html,
	body {
		margin: 0 0 0 0;
		padding: 0 0 0 0;
		overflow-x: hidden;
		width: 100%;
		height: 100%;
	}

	.gradient-button {
		margin: 10px;
		font-size: 20px;
		padding: 10px;
		text-align: center;
		transition: 0.5s;
		background-size: 200% auto;
		color: #fff;
		box-shadow: 0 0 20px #eee;
		border-radius: 10px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		cursor: pointer;
		display: inline-block;
		border-radius: 20px;
	}
	.gradient-button:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	}
	.gradient-button-1 {
		font-style: italic;
		background-image: linear-gradient(to right, #1459ff 0%, #c103ff 100%);
		text-decoration: none;
		width: 205px;
		font-size: 1.5rem;
	}
	.gradient-button-1:hover {
		background-position: right center;
	}

	.gradient-button-2 {
		font-style: italic;
		background-image: linear-gradient(to right, #8410ff 0%, #c103ff 100%);
		text-decoration: none;
		width: 100px;
		font-size: 1.5rem;
	}
	.gradient-button-2:hover {
		background-position: right center;
	}

	.gradient-button-3 {
		font-style: italic;
		background-image: linear-gradient(to right, #1459ff 0%, #c103ff 100%);
		text-decoration: none;
		width: 225px;
		font-size: 1.5rem;
	}
	.gradient-button-3:hover {
		background-position: right center;
	}

	@media only screen and (min-width: 768px) and (max-width: 1280px) {
	}

	@media only screen and (min-width: 325px) and (max-width: 768px) {
		.tempo-input {
			font-size: 1.5rem;
			width: 100%;
		}
		.title {
			font-size: 3rem;
			font-style: italic;
			background: -webkit-linear-gradient(#184cdf, #bc03fc);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.cardformat {
			padding-top: 0rem;
			padding-bottom: 0rem;
			padding-left: 0rem;
			padding-right: 0rem;
		}

		.gradient-button {
			font-size: 20px;
		}
		.form-input {
			width: 100%;
		}
		.formcontainer {
			text-align: center;
			align: center;
		}
	}
</style>
