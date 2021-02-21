<template lang="pug">
  Router({url})
    main
      Route(path='/')
        Home
      Route(path='/submit/:id' let:params="{params}")
        Student(id="{params.id}")
      Route(path='/create/:id' let:params="{params}")
        Track
</template>

<script>
  import { Router, Link, Route } from 'svelte-routing';
  import { Button, Modal, Dialog } from 'attractions'
  import Home from './Home.svelte'
  import Student from './Student.svelte'
  import Track from './Track.svelte'

  export let url = '';
</script>

<style lang="scss" global>
	@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");

	html,
	body {
		width: 100%;
		height: 100%;
		font-family: "Open Sans", sans-serif;
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
</style>
