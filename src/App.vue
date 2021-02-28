<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
        <top-bar />
        <router-view/>
  </div>
</template>

<script>
import TopBar from '@/components/navigation/top-bar';

export default {
  components: { TopBar }
}
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif;
  color: #363636;
}
body {
  margin: 0;
  padding: 0;
}
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
