<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'filereader',
    created () {
      if (!CK.getCookie('valid_time')) {
        this.$router.replace({name: 'valid'})
      }
    }
  }
</script>

<style>
  /* CSS */
  @import url("./assets/css/common.less");
  @import url("./assets/css/reset.css");
</style>
