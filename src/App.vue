<template>
	<div id="kwe">
		<transition name="fade" mode="out-in">
			<router-view class="view"></router-view>
		</transition>
	</div>
</template>
<script>
export default {
	name: "kwe",
	data() {
		return {
		}
	},
	computed: {
	},
	mounted() {
	},
	methods: {
	},
	components: {
	}
}
</script>
<style>
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body{
	background: #eee;
}
li{
	list-style: none;
}
</style>