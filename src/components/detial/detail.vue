<template>
  <div class="detail">
    <div>
      <div class="detail-title">
        {{data.title}}
      </div>
      <div class="detail-main-author">
        {{$moment(data.sendTime).format("YYYY-MM-DD")}} by {{data.author}}
      </div>
      <Divider />
      <div class="detail-content">
        <div v-html="dataList"></div>
        <!--<mavon-editor v-model="dataList" :ishljs = "true" :toolbarsFlag="false" :subfield="false" :boxShadow="false" defaultOpen="preview" codeStyle="github"/>-->
      </div>
    </div>
    <div class="home-line"></div>
    <div class="detail-main-tags">
      <span>
        <label v-if="data.class == 1">个人笔记</label>
        <label v-if="data.class == 2">技术记录</label>
        <label v-if="data.class == 3">曲艺杂谈</label>
        <label v-if="data.class == 4">其他</label>
      </span>
      <Divider type="vertical" class="detail-line-vertical"/>
      <span>
        <label v-if="data.type == 1">前端</label>
        <label v-if="data.type == 2">nodejs</label>
        <label v-if="data.type == 3">vuejs</label>
        <label v-if="data.type == 4">react</label>
        <label v-if="data.type == 5">webApp</label>
        <label v-if="data.type == 6">其他</label>
      </span>
      <span class="detail-copyright">
        <Button type="dashed" size="small">转载请注明《{{data.title}}》</Button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataList:'',
      data:''
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      this.$Loading.start();
      this.$api.get('/proxy/articalVue/detail',{id:this.$route.query.id},res => {
        this.dataList = this.$md.render(res.data.data[0].content);
        this.data = res.data.data[0];
        this.$Loading.finish();
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
  text-align: left ;
  width: 950px;
  margin:20px auto;
}
.detail-title{
  text-align: center;
  font-size:26px;
  color:#434343;
}
.detail-content{
  font-size:18px;
  color:#888888;
  margin:5px 0px;
  word-wrap:break-word;
  word-break:normal;
}
.home-line{
  height:1px;
  background: #dddddd;
}
.detail-main-author{
  text-align: center;
  font-size:14px;
  color:#a0a0a0;
}
.detail-line-vertical{
  margin:0px 3px !important;
}
.detail-main-tags{
  text-align: left;
  margin-top:10px;
}
.detail-copyright{
  text-align: center;
  margin-bottom:10px;
  margin-left:10px;
}
.detail-copyright .ivu-btn-dashed{
  background: #eeeeee;
}
</style>
