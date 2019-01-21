<template>
	<div class="kwe-index">
		 <div class="kwe-directory" v-for="item in directory" :key="item.id">
			<div class="kwe-title">{{item.title}}</div>
			<div class="kwe-description">{{item.description}}</div>
			<div class="kwe-time">{{item.time}}</div>
		</div>
	</div>
</template>
<script>
export default {
	/**
	 * [SSR获取所有组件的asyncData并执行获得初始数据]
	 * @param  {[Object]} store [Vuex Store]
	 * 此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：
	 */
	asyncData (store, route) {
		return store.dispatch('fetchLists') // 服务端渲染触发
	},
	name: "home",
	data() {
		return { }
	},
	// 计算属性
	computed: {
		directory () {
			return this.$store.getters.getDirectory // 文章列表
		},
	},
}
</script>
<!--当前组件的样式 -->
<style lang="less">
.kwe-index {
	max-width: 800px;
	padding: 10px 0;
	margin: 0 auto;
	min-height: 100%;
	text-align: center;
	line-height: 2;
	transition: left .3s;
	// background: #eaeaea;

	.kwe-directory {
		width: 96%;
		margin: 8px auto;
		padding: 4px 8px;
		border-radius: 2px;
		transition: all .2s;
		background: #fff;
		box-sizing: border-box;
		box-shadow: 0 0 2px 2px #ccc;
		cursor: pointer;

		&:hover {
		box-shadow: 1px 1px 10px 1px #cc82ff;
		}
		.kwe-title {
		font-size: 16px;
		text-align: left;
		}
		.kwe-description {
		font-size: 12px;
		text-align: left;
		}
		.kwe-time {
		font-size: 14px;
		text-align: right;
		}
  	}
}
</style>