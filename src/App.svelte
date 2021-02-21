<template lang="pug">
  Router({url})
    main
      Route(path='/')
        Home
      Route(path='/submit/:id' let:params="{params}")
        Student(id="{params.id}")
      Route(path='/create/:id' let:params="{params}")
        Teacher(id="{params.id}")
</template>

<script>
  import { Router, Link, Route } from 'svelte-routing';
  import { Button, Modal, Dialog } from 'attractions'
  import Home from './Home.svelte'
  import Student from './Student.svelte'
  import Teacher from './Teacher.svelte'

  export let url = '';
</script>

<style lang="scss" global>
  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    padding: 8px;
    box-sizing: border-box;
  }

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

</style>