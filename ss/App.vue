<template>
  <div class="kwe">
		<transition name="fade" mode="out-in">
			<router-view class="view"></router-view>
		</transition>
	</div>
</template>

<script>

export default {
  /**
 * [SSR获取所有组件的asyncData并执行获得初始数据]
 * @param  {[Object]} store [Vuex Store]
 * 此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
 */
  asyncData(store, router) {
    return store.dispatch('fetchLists'); // 服务端渲染触发
  },
  name: 'kwe',
  data() {
    return { };
  },
  // 计算属性
  computed: {
    directory() {
      return this.$store.getters.getDirectory; // 文章列表
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
html,body,div,p{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	background: #eee;
}
li {
	list-style: none;
}
</style>
