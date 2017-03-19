<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    import 'normalize.css';

    export default {
      name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    ul {
        list-style-type: none;
    }

    a {
        text-decoration: none;
    }
</style>
