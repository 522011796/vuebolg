<template>
  <div class="home">
    <div class="home-main">
      <div v-if="dataList.length > 0">
        <div class="home-list" v-for="(item,index) in dataList" :key="index">
          <div class="home-main-title" @click="showDetail(item.id)">
            {{item.title}}
          </div>
          <div class="home-main-author">
            <span>{{$moment(item.sendTime).format('YYYY-MM-DD')}}</span>
            <Divider type="vertical" class="home-line-vertical"/>
            <span>{{item.author}}</span>
            <Divider type="vertical" class="home-line-vertical"/>
            <span>
              <label v-if="item.class == 1">个人笔记</label>
              <label v-if="item.class == 2">技术记录</label>
              <label v-if="item.class == 3">曲艺杂谈</label>
              <label v-if="item.class == 4">其他</label>
            </span>
            <Divider type="vertical" class="home-line-vertical"/>
            <span>
              <label v-if="item.type == 1">前端</label>
              <label v-if="item.type == 2">nodejs</label>
              <label v-if="item.type == 3">vuejs</label>
              <label v-if="item.type == 4">react</label>
              <label v-if="item.type == 5">webApp</label>
              <label v-if="item.type == 6">其他</label>
            </span>
            <Divider type="vertical" class="home-line-vertical"/>
            <span v-if="manager == 'admin'">
              <Button size="small" @click="updateData(item)">修改{{item.id}}</Button>
              <Button size="small" @click="delData(item.id)">删除</Button>
            </span>
          </div>
          <div class="home-main-content">
            {{$utils.removeAllHtml($md.render(item.content)).substring(0,320)+'...'}}
          </div>
          <div class="home-main-tags">
            <span>tags:</span>
            <span>{{item.tags}}</span>
          </div>
          <div class="home-line"></div>
        </div>
      </div>
      <div v-else="dataList.length == 0" class="home-null">
        <div>
          <img src="./../../assets/none.png" alt="" class="home-logo">
        </div>
        <div class="home-null-text">你一定有洁癖</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters(['getModalStatus','getModalData'])
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataList:[],
      manager:''
    }
  },
  created(){
    this.init();
  },
  methods:{
    ...mapMutations(['setModalStatus','setModalData']),
    init(){
      this.$Loading.start();
      this.manager = localStorage.getItem('manager');
      this.$api.get('/proxy/articalVue',{},res => {
        this.dataList = res.data.data;
        this.$Loading.finish();
      });
    },
    showDetail(id){
      this.$router.push({name: 'Detail',query: {id: id}});
    },
    delData(id){
      this.$api.postQs('/proxy/articalVue/delete',{id:id},res => {
        this.init();
      },null,{"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'})
    },
    updateData(item){
      this.setModalStatus('show');
      var dataobj = {
        id: item.id,
        author:item.author,
        sendTime:item.sendTime,
        tags:item.tags,
        title:item.title,
        type:item.type,
        class:item.class,
        content:item.content
      };
      //console.log(dataobj);
      this.setModalData(dataobj);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  text-align: center;
}
.home-main{
  width: 1020px;
  margin:15px auto;
  text-align: left;
}
.home-list{

}
.home-main-title{
  font-size:25px;
  color:#434343;
  cursor: pointer;
}
.home-main-author{
  font-size:12px;
  color:#a5a5a5;
}
.home-main-content{
  font-size:15px;
  color:#888888;
  margin:5px 0px;
  word-wrap:break-word;
  word-break:normal;
}
.home-main-tags{
  font-size:10px;
  color:#a5a5a5;
  height:25px;
  line-height:25px;
}
.home-line{
  height:1px;
  background: #dddddd;
  margin:10px 0px;
}
.home-line-vertical{
  margin:0px 3px !important;
}
.home-null{
  text-align: center;
}
.home-null-text{
  color:#9ea7b4;
}
.home-logo{
  height:80px;
  width: 80px;
  margin-top:80px;
}
</style>
