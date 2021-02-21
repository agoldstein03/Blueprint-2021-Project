<script>
	import { Router, Link, Route } from "svelte-routing";
	import { Button, Modal, Dialog } from "attractions";
	import Home from "./Home.svelte";
	import Student from "./Student.svelte";
	import Teacher from "./Teacher.svelte";

	export let url = "";
</script>

<template lang="pug">
  Router({url})
    main
      Route(path='/')
        Home
      Route(path='/submit/:id' let:params="{params}")
        Student(id="{params.id}")
      Route(path='/create/:id?bpm=:bpm' let:params="{params}")
        Teacher(id="{params.id}" bpm="{params.bpm}")
</template>

<style lang="scss" global>
	@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");

	html,
	body {
		width: 100%;
		height: 100%;
		font-family: "Open Sans", sans-serif;
	}

	.testingclass {
		color: white;
	}

	.inputlabel {
		border-color: white;
		border-width: 10px;
	}

	body {
		margin: 0;
		box-sizing: border-box;
	}

	main {
		text-align: center;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	html,
	body {
		margin: 0 0 0 0;
		padding: 0 0 0 0;
		overflow-x: hidden;
		width: 100%;
		height: 100%;
	}

	@media only screen and (min-width: 768px) and (max-width: 1280px) {
	}

	@media only screen and (min-width: 325px) and (max-width: 768px) {
	}
</style>
