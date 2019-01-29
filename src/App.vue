<template>
  <div id="kwe">
		<transition name="fade" mode="out-in">
			<router-view class="view"></router-view>
		</transition>
	</div>
</template>

<script>

export default {
  name: 'home',
	data() {
		return { };
	},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
html, body {
    height: 100%;
    width: 100%;
}
html, body, div, ul, li, p{
    margin: 0;
    padding: 0;
    color: #33495e;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
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
a,
a:link,
a:link:hover,
a:visited,
a:hover,
a:active{
    text-decoration: none;
    color:inherit;
}
</style>
