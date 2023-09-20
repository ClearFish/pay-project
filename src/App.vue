<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue';
</script>

<template>
  <router-view></router-view>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
  
}
html,body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: rgb(241, 241, 241);
  /* overflow:hidden; */
}
ul,li,p,div,a,span {
  padding: 0;
  margin: 0;
}
p {
  text-align: left;
}
li {
  list-style: none;
}
</style>
