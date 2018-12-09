<template>
  <div class="kwe-right">right</div>
</template>

<script>
export default {
  name: 'rightPanel',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.kwe-right {
  position: absolute;
  right: 0;
  left: 310px;
  min-height: 100%;
  text-align: center;
  line-height: 2;
  background: #eaeaea;
}


@media screen and (max-width: 800px){
  .kwe-right {
    margin-left: 0;
  }

}
</style>
