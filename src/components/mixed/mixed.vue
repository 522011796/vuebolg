<template>
  <div class="mixed">
    <div class="mixed-main-img">
      <img src="https://cnblog.skypixel.com/wp-content/themes/nisarg/images/headers/skyline.png" alt="" class="img-class">
    </div>
    <div class="mixed-main-comment">
      <Divider class="mixed-title">远方</Divider>
      <div class="mixed-item" v-for="(item,index) in dataList" :key="index" @click="showDetail(item.id)">
        <div class="mixed-img-item">
          <img :src="item.mainImg" alt="" class="img-class">
          <div class="mixed-img-text">{{item.title}}</div>
          <div class="mixed-img-time">{{$moment(item.createTime).format('YYYY-MM-DD')}}</div>
        </div>
      </div>

      <Divider class="mixed-title">遇见</Divider>
      <div class="mixed-card-main">
        <Row :gutter="16">
          <Col span="6" class="mixed-card-item" v-for="(item,index) in dataWall" :key="index">
            <div class="mixed-card-content" v-html="$md.render(item)">

            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataList:[],
      dataWall:[]
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      this.$Loading.start();
      this.$api.get('/proxy/imgArticle',{},res => {
        this.dataList = res.data.data;
      });
      this.$api.get('/proxy/imgWall',{},res => {
        //console.log(this.$md.render(res.data.data));
        var imgArr = [];
        for(var i=0;i<res.data.data.length;i++){
          imgArr.push(res.data.data[i].imgAddr);
        }
        this.dataWall = imgArr;
        this.$Loading.finish();
      });
    },
    showDetail(id){
      this.$router.push({name: 'MixedDetail',query: {id: id}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mixed{
  text-align: left ;
}
.mixed-title{

}
.mixed-main-img{
  height:350px;
  width: 100%;
  border:1px solid #dddddd;
  text-align: center;
}
.mixed-main-comment{
  width: 1020px;
  margin:0px auto;
  background: #ffffff;
  margin-top:20px;
  padding:10px 0px;
  text-align: center;
}
.mixed-img-item{
  height:150px;
  width: 80%;
  margin:0 auto;
  position: relative;
  background: #dddddd;
  border: 1px solid #dddddd;
}
.mixed-img-item .mixed-img-text{
  font-size:24px;
  color:#ffffff;
  text-align: center;
  position: absolute;
  top:45px;
  width: 100%;
}
.mixed-img-item .mixed-img-time{
  font-size:12px;
  color:#ffffff;
  text-align: center;
  position: absolute;
  top:75px;
  width: 100%;
}
.mixed-item{
  margin-bottom:15px;
}
.mixed-card-main{
  margin:0 auto;
  position: relative;
  padding:10px 25px;
}
.mixed-card-item{
  margin-bottom:15px;
}
.mixed-card-content{
  height:130px;
  width: 100%;
  background: #dddddd;
}
.img-class{
  height:100%;
  width: 100%;
}
</style>
