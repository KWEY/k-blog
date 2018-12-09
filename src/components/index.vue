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
<style>
.kwe-index {
  background: rgba(0, 255, 255, .3);
}
html, body, div, li{
    margin: 0;
    padding: 0;
    color: #000;
}
address, caption, cite, code, dfn, em, strong, th, var {
    font-style: normal;
    font-weight: normal;
}
li {
    list-style: none outside none;
}
input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
}
a {
    text-decoration: none;
}
a:hover, a:focus {
    text-decoration: underline;
}
</style>
