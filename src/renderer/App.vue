<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'filereader'
  }
</script>

<style>
  /* CSS */
  @import url("./assets/css/common.less");
  @import url("./assets/css/reset.css");
</style>
