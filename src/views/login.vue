<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
function goLogin(){
    router.push({path:'/goLogin'})
}
function goRegister(){
    router.push({path:'/goRegister'})
}
</script>

<template>
    <div class="body">
      <div class="container">
        <div class="left-section">
          <h1>经方智谷</h1>
          <h2>——您的私人AI中医药诊疗助手——</h2>
        </div>
        <div class="middle-section">
          <!-- 中间内容区域，可以放置登录表单等 -->
        </div>
        <div class="right-section">
          <div><img src="/src/assets/login_pictures/logo.png" alt="" style="display: inline-block;vertical-align: middle">
          <div class="logo-text">进入使用</div>
          </div>
          <div><buttond @click="goLogin">登录</buttond>
            <buttonz @click="goRegister">注册</buttonz></div>
        </div>
      </div>
    </div>
    </template>
    
    <style scoped>
        .body { 
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;  
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;          
          background-image: url('/src/assets/login_pictures/login_background.png');          
        }
    
        .container {
          display: flex;
          height: 100vh;
        }
    
        .left-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
    
        .middle-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
    
        .right-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
    
        h1 {
          font-size: 60px;
          margin-bottom: 10px;
          text-align: center;
          color: #fff;
          font-weight:bold;
        }
    
        h2 {
          font-size: 13px;
          margin-bottom: 30px;
          text-align: center;
          color: #fff;
          font-weight:bold;
        }
    
        img {
          width: 70px;
          height: 50px;
          margin-bottom: 10px;
        }
    
        buttond {
          display:flex;
          width: 150px;
          height: 40px;
          margin-bottom: 10px;
          margin-right: 10px;
          float:left;
          border-radius: 12px;
          font-size: 16px;
          justify-content: center;
          align-items: center;
          background: #689AFB;
          border: none;
          color: #fff;
          cursor: pointer;
          box-shadow: 0px 4px 4px rgba(0,0,0,0.5);
        }
    
           buttonz {
          display:flex;
          width: 150px;
          height: 40px;
          margin-bottom: 10px;
          margin-left: 10px;
          float:right;
          border-radius: 12px;
          font-size: 16px;
          justify-content: center;
          align-items: center;
          background: #689AFB;
          border: none;
          color: #fff;
          cursor: pointer;
          box-shadow: 0px 4px 4px rgba(0,0,0,0.5);
        }
    
        .logo-text{
        font-size:35px;
        margin-top:5px;
        flex-direction:column;
        align-items:center;
        vertical-align: middle;
        display: inline-block;
        }
    
        buttond:hover {
          background: #76BDB3;
        }
    
        buttonz:hover {
          background: #76BDB3;
        }
    </style>
    