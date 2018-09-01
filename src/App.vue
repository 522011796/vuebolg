<template>
  <div id="app">
    <i class="fa fa-home"></i>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      admin:''
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  background: #ffffff;
}
</style>
