<template>
  <div class="kwe-index">
    <left-panel></left-panel>
    <right-panel></right-panel>
  </div>
</template>

<script>
import leftPanel from './left';
import rightPanel from './right';

export default {
  name: 'index',
  components: {
    'left-panel': leftPanel,
    'right-panel': rightPanel,
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.kwe-index {
  // background: rgba(0, 255, 255, .3);
}
</style>
