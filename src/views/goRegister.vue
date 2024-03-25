<template>
  <div class="body">
    <form @submit.prevent>
      <div class="container">
        <div class="content">
          <h1>开始创建您的个人账户吧！</h1>
          <a>您可以使用手机号作为您的账户</a>
          <p>请输入您的账号和密码</p>
          <div>
            <input
              type="text"
              placeholder="请输入您的账号..."
              v-model="username"
            />

          </div>

          <div>
            <input
              type="password"
              placeholder="请输入您的密码..."
              v-model="password"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder=" 请再次输入您的密码..."
              v-model="re_password"
            />
          </div>
          <div>
            <input
              type="identify"
              placeholder="请输入验证码..."
              v-model="check"
            />
            <button style="width:90px" class="btn-second" @click="sendVerificationCode">
             {{second===totalSecond ? "获取验证码":second+"秒后获取"}}
            </button>
          </div>
          <button class="btn-first" @click="register()">注册患者</button>
          <button class="btn-third">注册医师</button>
          <div>
            ·已注册过账号？<a @click="$router.push('/goLogin')">-点此登录-</a>
          </div>
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
      check: "",
      password: "",
      re_password: "",
      error: "",
      totalSecond:60,
      second:60,
      timer:null,
    };
  },
  destroyed(){
    clearInterval(this.timer)
  },
  methods: {
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.username)) {
        alert('请输入正确的手机号')
        return false
      }
      if (this.password.length < 8) {
      alert('密码需要至少要包含8个字符')
        return false;
      }
      if (!/[a-zA-Z]/.test(this.password) || !/\d/.test(this.password)) {
        alert('密码需要至少要包含字母和数字')
        return false;
      }
      if (this.password!=this.re_password) {
        alert('密码不一致')
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
    async register() {
      try {
        // 向后端发送登录请求
        const response = await axios.post(
          "/user/register",
          {
            phone: this.username,
            code: this.check,
            pwd: this.password,
            role: 1,
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
          alert(response.data.message);
          this.$router.push("/goLogin")
        } else {
          // 注册失败，弹出提示框
          this.error = response.data.message;
          alert(this.error);
        }
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else {
          this.error = "注册失败，请重试";
        }
        alert(this.error);
      }
    },

  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/src/assets/login_pictures/chat_background.png");
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.content {
  text-align: center;
  padding: 50px;
  border-radius: 12px;
}
h1 {
  margin-left: 20px;
}
p {
  color: #000000;
  font-weight: bold;
  font-size: 18px;
}
a {
  font-size: 14px;
}

input[type="identify"] {
  padding: 10px;
  margin: 10px;
  width: 210px;
  border-radius: 12px;
  border: 2px solid #ccc;
  margin-bottom: 10px;
}
input[type="password"] {
  padding: 10px;
  margin: 10px;
  width: 300px;
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
  margin-right: 50px;
  padding: 10px 30px;
  background-color: #689afb;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
}

.btn-third {
  margin-top: 10px;
  padding: 10px 30px;
  background-color: #76bdb3;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
}
.btn-first:hover {
  background-color: #d3d3d3;
  color: #000000;
}
.btn-second:hover {
  background-color: #d3d3d3;
  color: #000000;
}
.btn-third:hover {
  background-color: #d3d3d3;
  color: #000000;
}
</style>
