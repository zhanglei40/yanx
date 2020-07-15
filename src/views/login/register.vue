<template>
  <div>
     <van-nav-bar title="用户注册" left-arrow/>
     <!-- 页面的主体css样式 -->
     <div id="login">
       <van-form>
       <p class="login-head">平台用户注册</p>
       <van-field placeholder="手机号" class="inp" v-model="mobile" right-icon="graphic" />
       <!-- 密码框 -->
       <van-field placeholder="密码" class="inp"  v-model="pwd"
       :type="hidePwd ?'password':'text'" 
       :right-icon="hidePwd ?'closed-eye':'eye-o'"
       @click-right-icon="hidePwd = !hidePwd"
       
       />
       <!-- 确认密码框 -->
       <van-field placeholder="确认密码" class="inp"  v-model="confirm_pwd"
       :type="hidePwd1 ?'password':'text'" 
       :right-icon="hidePwd1 ?'closed-eye':'eye-o'"
       @click-right-icon="hidePwd1 = !hidePwd1"
       />

       <van-field placeholder="用户名" class="inp" v-model="nick" right-icon="user-o" />
       <van-field placeholder="图形验证码" class="inp" v-model="picCode" >
          <template #right-icon>
              <van-image :src="imgUrl" @click="createImgCode"/>
          </template>
       </van-field>
       <!-- 城市信息 -->
       <van-field placeholder="城市" class="inp"  v-model="area" right-icon="location-o" @click="areaShow=true"/>
       <!-- 城市列表，底部弹出层 -->
       <van-popup v-model="areaShow" position="bottom">
          <van-area title="选择城市" :area-list="aresList" @cancel="areaShow=false" @confirm="selectedArea"/>
       </van-popup>

       <van-field placeholder="手机验证码" class="inp"  v-model="code" >
         <template #button>
           <van-button type="danger" plain size="small" :disabled="btnIsDisabled" @click="sendCode">{{msg}}</van-button>
         </template>
       </van-field>
       <van-button type="info" block class="btn" @click="checkForm">立即注册</van-button>
       <p class="link-login"><router-link to="/shop/login">已有账号? 立即登陆</router-link></p>
       </van-form>
     </div>
  </div>
</template>

<script>
import "@/assets/style/login.css";
import AreaList from "@/utils/area";
export default {
  name: '',
  mounted(){
    this.createImgCode();
  },
  data() {
    return {
      //基本的表单数据
      mobile: "",//手机号
      pwd: "",//密码
      nick:"",//用户名信息
      confirm_pwd: "",//确认密码
      picCode:"", //图形验证码
      code:"",//手机验证码

      //控制密码显示隐藏的标志  true代表密码框，false代表的是文本框
      hidePwd: true,
      hidePwd1: true,

      //图形验证码的操作
      imgUrl: "",
      picKey: "",//图像验证码的key值

      //选择城市信息
      areaShow: false,
      aresList: AreaList,//城市列表数据
      area:"",
      province: "",
      city: "",

      //倒计时的功能
      msg:'发送验证码',
      btnIsDisabled: false,
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    //基本的表单校验
    checkForm(){
      //验证表单的基本信息不能为空
      if(this.mobile == "" || this.pwd=="" || this.nick =="" || this.code == "" || this.picCode ==""){
        //提示错误信息
        this.$toast.fail("手机号,密码，用户名，验证码不能为空");
        return false;
      }

      //校验手机号的格式是否合法
      var reg = /^1[345678]\d{9}$/;
      if(!reg.test(this.mobile)){
        this.$toast.fail("请输入正确的手机号");
        return false;
      }

      //确认密码和密码是否一致
      if(this.confirm_pwd != this.pwd){
        this.$toast.fail("密码不一致，请重新输入");
        return false;
      }

      this.submitRegister();//提交注册信息
      
    },
    //生成图形验证码
    createImgCode(){
      //生成生成图像验证码的随机参数
      this.picKey = (new Date()).getTime();
      let apiUrl = "https://api.it120.cc/small4/verification/pic/get";
      this.imgUrl = `${apiUrl}?key=${this.picKey}`;
    },
    //选择城市函数
    selectedArea(arr){
      this.areaShow = false;
      //去除数组中的name值
      let tmp = arr.map(item =>{
        return item.name;
      });
      //处理省份和市
      this.province = tmp[0];
      this.city = tmp[1];
      //数组转换程字符串
      this.area = tmp.join(" ");
    },
    //倒计时的功能
    countSeconds(){
      this.btnIsDisabled = true;
      //倒计时的时间
      let timeout = 60;
      //倒计时间歇
      let timer = setInterval(() => {
        //读秒结束
        if(timeout<1){
          this.btnIsDisabled =false;
          //清除定时器
          clearInterval(timer);
          this.msg = `重新发送`;
          return false;
        }
        //正在倒计时的时候
        this.msg = `${timeout}s后再试`
        timeout--;
      }, 1000);
    },

    //发送验证码接口
    sendCode(){
      this.$axios({
        url:"https://api.it120.cc/small4/verification/sms/get",
        params:{
          mobile: this.mobile,
          key: this.picKey,
          picCode: this.picCode,
        }
      }).then(res=>{
        console.log(res);
        //校验失败的时候
        if(res.code !=0){
          this.$toast.fail(res.msg);
          return false;
        }
        this.countSeconds();//调用倒计时的方法
      })
    },

    //提交注册
    submitRegister(){
      this.$axios({
        url: "https://api.it120.cc/small4/user/m/register",
        params:{
          mobile: this.mobile,
          pwd: this.pwd,
          code: this.code,
          nick: this.nick,
          province: this.province,
          city: this.city
        }
      }).then(res=>{
        console.log(res);
        if(res.code != 0){
          this.$toast.fail(res.msg);
          return false;
        }
        this.$toast.success("恭喜你,注册成功");
        this.$router.push("/");
      })

    }

  },
};
</script>
<style lang="scss" scoped>
</style>
