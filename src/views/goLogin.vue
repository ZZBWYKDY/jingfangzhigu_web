<template>
  <div class="body">
    <form @submit.prevent="login">
      <div class="container">
        <div class="content">
          <h1>欢迎回来！</h1>
          <p>登录您的账户</p>
          <input
            type="text"
            placeholder="请输入您的账号..."
            v-model="username"
            required
          />
          <br />
          <input
            type="password"
            placeholder="请输入您的密码..."
            v-model="password"
            required
          />
          <br />
          <button type="submit">登录</button>
          <button @click="goToHomePage" style="margin-left: 40px;">返回</button>
          <p><a @click="$router.push('/check')">验证码登录</a></p>
        </div>
        <div id="result"></div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import { axiosPost } from '@/utils/http';
  import { useRouter } from 'vue-router';
  // const router = useRouter();
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: '',
      };
    },
    methods: {
      goToHomePage() {
      // 使用路由进行跳转
      this.$router.push('/login');
    },
      async login() {
        const response = await axios.post(
          '/user/passwordLogin',
          {
            account: this.username,
            pwd: this.password,
          },
          {
            withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        if (response.data.code === 'SUCCESS') {
          // 登录成功，跳转到聊天页面
          localStorage.setItem('token', response.data.data.token);
          this.$store.commit('setToken', response.data.data.token);
          console.log(response);
          this.$router.push('/switchtab');
        } else {
          // 登录失败，弹出提示框
          // this.error = '登录失败，请重试';
          // console.log(response.data.code);
          // alert(this.error);
        }

        // try {
        //   // 向后端发送登录请求
        //   const response = await axios.post(
        //     '/user/passwordLogin',
        //     {
        //       account: this.username,
        //       pwd: this.password,
        //     },
        //     {
        //       withCredentials: true,
        //       headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //       },
        //     }
        //   );
        //   if (response.data.code === 'SUCCESS') {
        //     localStorage.setItem('token', response.data.data.token);
        //     this.$store.commit('setToken', response.data.data.token);
        //     console.log(response);
        //     this.$router.push('/chat');
        //   } else {
        //     this.error = '登录失败，请重试';
        //     console.log(response.data.code);
        //     alert(this.error);
        //   }
        // } catch (error) {
        //   if (error.response) {
        //     this.error = error.response.data.message;
        //   } else {
        //     this.error = '登录失败，请重试';
        //   }
        //   alert(this.error);
        // }
      },
    },
  };
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('/src/assets/login_pictures/chat_background.png');

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
    font-weight: bold;
  }
  input[type='text'],
  input[type='password'] {
    padding: 10px;
    margin: 10px;
    width: 300px;
    border-radius: 12px;
    border: 2px solid #ccc;
    margin-bottom: 10px;
  }
  button {
    padding: 10px 20px;
    background-color: #689afb;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
  }
  button:hover {
    background-color: #76bdb3;
  }
</style>
