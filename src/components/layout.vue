<template>
  <div class="">
    <div>
      <Header></Header>
    </div>
    <div :style="styleMenuObject">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './layout/header'
export default {
  name: 'layout',
  components: { Header },
  data () {
    return {
      styleMenuObject: {
        height: '',
        'overflow-y':'auto',
      }
    }
  },
  created(){
    this.hh();
  },
  methods:{
    hh(){
      console.log(window.innerHeight-50);
      this.styleMenuObject.height = window.innerHeight-50+'px';
    }
  },
  mounted () {
    // 注：window.onresize只能在项目内触发1次
    var _self = this;
    window.onresize = function (){
      _self.hh();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
