<template>
  <div class="detail">
    <div class="detail-main">
      <img :src="data.mainImg" alt="" class="img-class">
    </div>
    <div class="detail-item">
      <Card :bordered="false" class="detail-card">
        <div class="detail-title">
          {{data.title}}
          <div class="detail-title-line"></div>
        </div>
        <div class="detail-author">
          <span>{{data.description}}</span>
          <Divider type="vertical" class="home-line-vertical"/>
          <span>Equipment:</span>
          <span>{{data.equipment}}</span>
        </div>
        <div class="detail-author">
          <Avatar icon="ios-person" size="small" />
          <span>{{data.author}}</span>
        </div>
        <div class="detail-content" v-for="(item,index) in dataList" :key="index">
          <div v-html="item"></div>
        </div>
      </Card>
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
      this.$api.get('/proxy/imgArticle/detail',{id:this.$route.query.id},res => {
        var data =  res.data.data[0].content.replace("/\r\n/g",'\n');
        var dataImg = data.split("\n");
        var imgArr = [];
        for(var i=0;i<dataImg.length;i++){
          imgArr.push(this.$md.render(dataImg[i]));
        }
        this.dataList = imgArr;
        this.data = res.data.data[0];
        this.$Loading.finish();
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
  text-align: center ;
  margin:0px auto;
}
.detail-main{
  text-align: center;
  height:350px;
  background: #ffffff;
}
.detail-item{
  background: #ffffff;
  width: 950px;
  height:20px;
  margin:20px auto;
}
.detail-title{
  font-size:12px;
  text-align: left;
  margin-top:5px;
  position: relative;
}
.detail-title-line{
  width: 5px;
  height:20px;
  background: #2db7f5;
  position: absolute;
  left:-16px;
  top:0px;
}
.detail-author{
  font-size: 12px;
  text-align: left;
  margin-top:5px;
}
.detail-content{
  background: #dddddd;
  height:450px;
  margin-top:5px;
}
line-vertical{
  margin:0px 3px !important;
}
.detail-card{
  margin-bottom:20px;
}
.img-class{
  height:100%;
  width: 100%;
}
</style>
