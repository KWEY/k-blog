<template>
  <div class="kwe-loading-g">
    <img src="@/assets/loading.gif" alt="">
  </div>
</template>    
<script>
export default {
  name: 'Loading',
  data() {
    return {}
  }
}
</script>

<style lang="less">
.kwe-loading-g {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  line-height: 100vh;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
