<template lang="pug">
  Router({url})
    nav
      Link(to='/') Index
      Link(to='/home') Home
    main
      Route(path='/home' component="{HelloWorld}")
      Route(path='/')
          HelloWorld({name})
          HelloWorldStores({name})
</template>

<script>
  import HelloWorld from './HelloWorld.svelte';
  import HelloWorldStores from './HelloWorldStores.svelte';
  import { Router, Link, Route } from 'svelte-routing';
  const name = 'world';
  export let url = '';
</script>

<style lang="scss" global>
  html, body {
    position: relative;
    width: 100%;
    height: 100%;
  }

  body {
    color: #333;
    margin: 0;
    padding: 8px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  a {
    color: rgb(0,100,200);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:visited {
    color: rgb(0,80,160);
  }

  label {
    display: block;
  }

  input, button, select, textarea {
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  input:disabled {
    color: #ccc;
  }

  button {
    color: #333;
    background-color: #f4f4f4;
    outline: none;
  }

  button:disabled {
    color: #999;
  }

  button:not(:disabled):active {
    background-color: #ddd;
  }

  button:focus {
    border-color: #666;
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