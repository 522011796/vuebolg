<template>
  <div class="header">
    <div class="header-logo">
      <img src="./../../assets/logo.png" alt="" style="width: 140px;height:50px;">
    </div>
    <div class="header-main">
      <router-link to="/" class="head-menu-child-item"  :class="{'head-active':active=='home'}"  @click.native="activeMenu($event,'home')">
        <span>
          杂
        </span>
      </router-link>

      <router-link to="/mixed" class="head-menu-child-item" :class="{'head-active':active=='mixed'}"  @click.native="activeMenu($event,'mixed')">
        <span>
          影
        </span>
      </router-link>
    </div>
    <div class="header-author">
      <Dropdown v-if="manager == 'admin'">
        <a href="javascript:void(0)">
          admin
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem  @click.native="addArticle">添加文章</DropdownItem>
          <DropdownItem  @click.native="addImgArticle">添加图文</DropdownItem>
          <DropdownItem  @click.native="addImgWall">添加图片墙</DropdownItem>
          <DropdownItem  @click.native="logout">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <!--添加文章-->
    <Modal
      fullscreen
      v-model="getModalStatus == 'show' ? true : modal"
      title="Common Modal dialog box title"
      @on-visible-change="showChangeStatus">
      <Form :model="ruleForm" ref="ruleForm" :label-width="80" inline>
        <div>
          <FormItem label="标题" prop="title" :rules="$filter_rules({required:true})">
            <Input v-model="ruleForm.title" placeholder="" style="width:300px" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="标签" prop="tags" :rules="$filter_rules({required:true})">
            <Input v-model="ruleForm.tags" placeholder="" style="width:300px" :maxlength="20"></Input>
          </FormItem>
        </div>
        <div>
          <FormItem label="分类" prop="type" :rules="$filter_rules({required:true})">
            <Select v-model="ruleForm.type" style="width:300px">
              <Option value="1">前端</Option>
              <Option value="2">nodejs</Option>
              <Option value="3">vuejs</Option>
              <Option value="4">react</Option>
              <Option value="5">webApp</Option>
              <Option value="6">其他</Option>
            </Select>
          </FormItem>
          <FormItem label="类型" prop="classType" :rules="$filter_rules({required:true})">
            <Select v-model="ruleForm.classType" style="width:300px">
              <Option value="1">个人笔记</Option>
              <Option value="2">技术记录</Option>
              <Option value="3">曲艺杂谈</Option>
              <Option value="4">其他</Option>
            </Select>
          </FormItem>
        </div>
      </Form>
      <div>
        <mavon-editor v-model="ruleForm.content" style="z-index: 0"/>
      </div>
      <div  slot="footer">
        <span class="error-tips">{{errorTips}}</span>
        <Button type="primary" @click="getModalStatus == 'show' ? updateImgWall('ruleFormImgWall') : ok('ruleForm')">确定</Button>
        <Button @click="cancel('ruleForm')">取消</Button>
      </div>
    </Modal>

    <!--添加图文相关-->
    <Modal
      fullscreen
      v-model="modalImgArticle"
      title="Common Modal dialog box title">

      <Form :model="ruleFormImgArticle" ref="ruleFormImgArticle" :label-width="80" inline>
        <div>
          <FormItem label="标题" prop="title" :rules="$filter_rules({required:true})">
            <Input v-model="ruleFormImgArticle.title" placeholder="" style="width:300px" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="介绍" prop="description" :rules="$filter_rules({required:true})">
            <Input v-model="ruleFormImgArticle.description" placeholder="" style="width:300px" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="标签" prop="tags" :rules="$filter_rules({required:true})">
            <Input v-model="ruleFormImgArticle.tags" placeholder="" style="width:300px" :maxlength="20"></Input>
          </FormItem>
        </div>
        <div>
          <FormItem label="设备" prop="equipment" :rules="$filter_rules({required:true})">
            <Input v-model="ruleFormImgArticle.equipment" placeholder="" style="width:300px" :maxlength="20"></Input>
          </FormItem>
          <FormItem label="分类" prop="classType" :rules="$filter_rules({required:true})">
            <Select v-model="ruleFormImgArticle.classType" style="width:300px">
              <Option value="1">前端</Option>
              <Option value="2">nodejs</Option>
              <Option value="3">vuejs</Option>
              <Option value="4">react</Option>
              <Option value="5">webApp</Option>
              <Option value="6">其他</Option>
            </Select>
          </FormItem>
          <FormItem label="主图" prop="mainImg" :rules="$filter_rules({required:true})">
            <Input v-model="ruleFormImgArticle.mainImg" placeholder="" style="width:300px" :maxlength="1200"></Input>
          </FormItem>
        </div>
      </Form>
      <div>
        <mavon-editor v-model="ruleFormImgArticle.content" style="z-index: 0"/>
      </div>
      <div  slot="footer">
        <span class="error-tips">{{errorTips}}</span>
        <Button type="primary" @click="okImgArticle('ruleFormImgArticle')">确定</Button>
        <Button @click="cancelImgArticle('ruleFormImgArticle')">取消</Button>
      </div>
    </Modal>

    <!--添加图片墙-->
    <Modal
      fullscreen
      v-model="modalImgWall"
      title="Common Modal dialog box title">

      <div>
        <mavon-editor v-model="ruleFormImgWall.content" style="z-index: 0"/>
      </div>
      <div  slot="footer">
        <span class="error-tips">{{errorTips}}</span>
        <Button type="primary" @click="okImgWall('ruleFormImgWall')">确定</Button>
        <Button @click="cancelImgWall('ruleFormImgWall')">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'hederMenu',
  computed: {
    ...mapGetters(['getModalStatus','getModalData'])
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      active:'home',
      modal:false,
      modalImgArticle:false,
      modalImgWall:false,
      errorTips:'',
      manager:'',
      ruleForm:{
        id:'',
        title:'',
        tags:'',
        type:'',
        classType:'',
        content:''
      },
      ruleFormImgArticle:{
        title:'',
        description:'',
        tags:'',
        classType:'',
        content:'',
        equipment:'',
        mainImg:''
      },
      ruleFormImgWall:{
        content:''
      }
    }
  },
  created(){
    this.getSession();
  },
  methods:{
    ...mapMutations(['setModalStatus','setModalData']),
    activeMenu(event,name){
      this.active = name;
      localStorage.setItem('topMenu',name);
    },
    addArticle(){
      this.modal = true;
    },
    ok(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            title: this.ruleForm.title,
            tags: this.ruleForm.tags,
            type: this.ruleForm.type,
            classType: this.ruleForm.classType,
            content: this.ruleForm.content
          }
          console.log(data);
          this.$api.postQs('/proxy/articalVue/insert',data,res=>{
            console.log(res);
            if(res.data.code == 200){
              this.errorTips = '发布成功';
            }else{
              this.errorTips = '发布失败';
            }
          },null,{"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'});
        }
      })
    },
    cancel(name){
      this.$refs[name].resetFields();
      this.setModalStatus('');
      this.modal = false;
      this.ruleForm.content = '';
      this.ruleForm.id = '';
      this.errorTips = '';
    },
    addImgArticle(){
      this.modalImgArticle = true;
    },
    okImgArticle(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = {
            title:this.ruleFormImgArticle.title,
            description:this.ruleFormImgArticle.description,
            tags:this.ruleFormImgArticle.tags,
            classType:this.ruleFormImgArticle.classType,
            content:this.ruleFormImgArticle.content,
            equipment:this.ruleFormImgArticle.equipment,
            mainImg:this.ruleFormImgArticle.mainImg
          }
          console.log(data);
          this.$api.postQs('/proxy/imgArticle/insert',data,res=>{
            console.log(res);
            if(res.data.code == 200){
              this.errorTips = '发布成功';
            }else{
              this.errorTips = '发布失败';
            }
          },null,{"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'});
        }
      })
    },
    cancelImgArticle(name){
      this.$refs[name].resetFields();
      this.modalImgArticle = false;
      this.ruleFormImgArticle.content = '';
      this.errorTips = '';
    },
    addImgWall(){
      this.modalImgWall = true;
    },
    okImgWall(){
      let data = {
        content:this.ruleFormImgWall.content
      }
      console.log(data);
      this.$api.postQs('/proxy/imgWall/insert',data,res=>{
        if(res.data.code == 200){
          this.errorTips = '发布成功';
        }else{
          this.errorTips = '发布失败';
        }
      },null,{"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'});
    },
    updateImgWall(name) {
      let data = {
        id: this.ruleForm.id,
        title: this.ruleForm.title,
        tags: this.ruleForm.tags,
        type: this.ruleForm.type,
        classType: this.ruleForm.classType,
        content: this.ruleForm.content
      }
      this.$api.postQs('/proxy/articalVue/update', data, res => {
        console.log(res);
        if (res.data.code == 200) {
          this.errorTips = '更新成功';
        } else {
          this.errorTips = '更新失败';
        }
      }, null, {"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'});
    },
    cancelImgWall(name){
      this.modalImgWall = false;
      this.ruleFormImgWall.content = '';
      this.errorTips = '';
    },
    showChangeStatus(status){
      if(status == true && this.getModalStatus == 'show'){
        this.ruleForm = {
          id:this.getModalData.id,
          title:this.getModalData.title,
          tags:this.getModalData.tags,
          type:""+this.getModalData.type,
          classType:""+this.getModalData.class,
          content:this.getModalData.content
        };
        console.log(this.ruleForm);
      }
    },
    logout(){
      var data = {
        username : localStorage.getItem('manager')
      };
      this.$api.get('/proxy/logout',data,res => {
        localStorage.removeItem('manager');
        window.location.href="/"
      });
    },
    getSession(){
      this.$api.get('/proxy/sessionInfo',{},result => {
        this.admin = result.data.data;
        localStorage.removeItem('manager');
        localStorage.setItem('manager',result.data.data);
        this.manager = localStorage.getItem('manager');
      });
    }
  },
  mounted(){
    this.active = localStorage.getItem('topMenu') ? localStorage.getItem('topMenu') : 'home';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  border-bottom:1px solid #dddddd;
  height:50px;
  line-height:50px;
  color:#888;
  position: relative;
}
.header-logo{
  position: absolute;
  left:0;
  width: 200px;
  text-align: center;
}
.header-main{
  width: 1020px;
  margin:0 auto;
}
.head-menu-child-item{
  width:100px;
  display:inline-block;
  height:50px;
  line-height:50px;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  border-bottom-color:transparent;
  color:#a5a5a5;
}
.head-active{
  border-bottom-color:#3da8f5;
  color:#434343;
}
.header-author{
  position: absolute;
  right:50px;
  top:0;
}
.header-addArticle{
  margin-bottom:10px;
}
.error-tips{
  color:#f00;
}
</style>
