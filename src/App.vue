<template>
  <div id="app">
    <Loading v-show="this.$store.state.loading">
    </Loading>
    <router-view/>
  </div>
</template>

<script>
import Loading from "@/components/common/Loading";
export default {
  name: 'App',
  components:{
    Loading,
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
