<template>
  <div class="kwe-404">
    <div class="kwe-404-wrap">
      <h1>404</h1>
      <img class="kwe-error" src="../assets/1.jpg"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'to404',
  data() {
    return {
    };
  },
};
</script>
<style lang="less">
.kwe-404 {
  height: 100%;
  text-align: center;
  &-wrap {
    width: 600px;
    height: 100%;
    min-height: 600px;
    margin: 0 auto;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
}
</style>
