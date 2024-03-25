<template>
  <div class="body">
    <form @submit.prevent="check">
      <div class="container">
        <div class="content">
          <h1>欢迎回来！</h1>
          <p>验证码登录</p>
          <input
            type="text"
            placeholder="请输入您的账号..."
            v-model="username"
          />
          <br />
          <input
            type="password"
            placeholder="请输入验证码..."
            v-model="password"
          />
          <button style="width:90px" class="btn-second" @click="sendVerificationCode">
             {{second===totalSecond ? "获取验证码":second+"秒后获取"}}
            </button>
          <br />
          <button class="btn-first" @click="goChat">登录</button>
          <button @click="goToHomePage" class="btn-first" style="margin-left: 40px;">返回</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      totalSecond:60,
      second:60,
      timer:null,
    };
  },
  methods: {
    goToHomePage() {
      // 使用路由进行跳转
      this.$router.push('/login');
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.username)) {
        alert('请输入正确的手机号')
        return false
      }
      return true
    },
    async sendVerificationCode() {
      if (!this.validFn()) {
        // 如果没通过校验，没必要往下走了
        return
      }
      if(!this.timer&&this.second===this.totalSecond){
        console.log('lalala')
      try {
        const response = await axios.post(
          "/user/sendSms",
          {
            phone: this.username,
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.code === "SUCCESS") {
        } else {
          console.log(response.data.code);
          alert(this.error);
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else {
          this.error = "登录失败，请重试";
        }
        console.log(response.data.code);
        alert(this.error);
      }
        this.timer=setInterval(()=>{
          this.second--
          if(this.second<=0){
            clearInterval(this.timer)
            this.timer=null
            this.second=this.totalSecond
          }
        },1000)
      }
      
    },


    async goChat() {
      try {
        // 向后端发送登录请求
        const response = await axios.post(
          "/user/smsLogin",
          {
            phone: this.username,
            code: this.password,
          },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.data.code === "SUCCESS") {
          // 注册成功，跳转到聊天页面
          localStorage.setItem('token', response.data.data.token);
          this.$store.commit('setToken', response.data.data.token);
          this.$router.push("/chat");
        }
        this.error = response.data.message;
        alert(this.error);
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else {
          this.error = "登录失败，请重试";
        }
        alert(this.error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/src/assets/login_pictures/chat_background.png");
}
.content {
  text-align: center;
  padding: 50px;
  border-radius: 12px;
}
h1 {
  margin-left: 20px;
}
input[type="password"] {
  padding: 10px;
  margin: 10px;
  width: 210px;
  border-radius: 12px;
  border: 2px solid #ccc;
  margin-bottom: 10px;
}
input[type="text"] {
  padding: 10px;
  margin: 10px;
  width: 300px;
  border-radius: 12px;
  border: 2px solid #ccc;
  margin-bottom: 10px;
}
.btn-second {
  padding: 10px 7px;
  background-color: #689afb;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
}
.btn-first {
  margin-top: 10px;
  padding: 10px 30px;
  background-color: #689afb;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
}
.btn-first:hover {
  background-color: #76bdb3;
}
.btn-second:hover {
  background-color: #76bdb3;
}
</style>
