<template>
  <div class="">
    <div class='loginMain'>
      <div class='loginContent'>
        <div class='loginTitle'>
          <img src="./../assets/logo.png" alt="" style="height:60px;width: 140px">
        </div>
        <div class='loginOpr'>
          <Tabs value="name1">
            <TabPane label="账号" name="name1">
              <div class="margin-bottom15">
                <Input v-model="username" size="large" placeholder="" style="width: 260px" />
              </div>
              <div class="margin-bottom15">
                <Input v-model="password" size="large" placeholder="" style="width: 260px" />
              </div>
              <div>
                <Button type="info" size="large" style="width: 260px" long @click="goLogin">登录</Button>
              </div>
            </TabPane>
            <TabPane label="微信" name="name2" disabled></TabPane>
            <TabPane label="钉钉" name="name3" disabled></TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username:'',
      password:''
    }
  },
  methods:{
    goLogin(){
      var _self = this;
      var data = {
        username:this.username,
        password:this.password
      };
      if(_self.username != "" && _self.password != ""){
        _self.$api.get('/proxy/login',data,result => {
          console.log(result.data.data);
          if(result.data.data.length > 0){
            this.$Message.success('登录成功，正在跳转页面！');
            window.location.href="/"
          }else{
            this.$Message.error('账号或者密码错误！');
          }
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginMain{
    background: #f7f7f7;
    height:100%;
    width: 100%;
  }
  .loginContent{
    width: 480px;
    height:668px;
    background: #ffffff;
    margin:60px auto 0px auto;
    padding:90px 92px 30px 92px;
    box-shadow: 2px 2px 2px 2px #dddddd;
  }
  .loginTitle{
    font-size:35px;
    font-weight: bold;
    text-align: center;
  }
  .loginOpr{
    margin-top:65px;
  }
  .margin-bottom15{
    margin-bottom:15px;
  }
</style>
