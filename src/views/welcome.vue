<script setup>
import { useRouter } from 'vue-router';
import {ref,onMounted} from 'vue'
import store from '@/store/index.js'
const router = useRouter();
function Login(){
    router.push({path:'/login'})
}
const imageUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
onMounted(()=>{
    let headUrl = localStorage.getItem('headimg')
    console.log(store.state.token, '这是我的token')
    if(headUrl){
        imageUrl.value = headUrl
    }
})
</script>

<template>
<div class="body">
  <div class="header">
      <el-button class="search-choice">
          <h4 >功能反馈</h4>
          <img src="@/assets/chat_pictures/remark.png" />
      </el-button> 
      <el-button class="search-choice">
          <h4 >经方智谷小程序</h4>
          <img src="@/assets/chat_pictures/program.png" />
      </el-button> 
      <el-dropdown>
      <el-avatar :src="imageUrl" class='avator' />
    </el-dropdown>           
  </div>
  <div class="main">
    <div class="left">
        <img src="/src/assets/login_pictures/logo.png" alt="Logo" class="logo">
        <h1>欢迎来到<span class="highlight">经方智谷</span></h1>
        <h2>开启您的中医诊疗之旅吧</h2>
        <p>——您的私人ai中医诊疗助手——</p >
    </div>
    <div class="center-bottom"><a @click="Login">开始问询！</a></div >
       <div><img src="/src/assets/login_pictures/arrow_down.png" alt="arrow" class="arrow"></div>
     </div>
</div>
</template>

<style scoped>

.body {  
  background-image: url('/src/assets/login_pictures/welcome_background.png'); 
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;  
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center; 
    }

      .logo {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 90px; /* 设置图片的宽度 */
      height: auto; /* 让高度按比例自动调整 */
    }

    .arrow {
      position: absolute;
      top: 830px;
      left: 760px;
      height: auto; /* 让高度按比例自动调整 */
    }

.header {
  position: fixed;
  width: 930px;
  background-color:#f7f7f7;
  padding: 5px;
  right:20px;
  top:20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius:30px;
  font-size:20px;
  box-shadow: 0px 4px 4px -2px rgba(0, 0, 0, 0.5); /* 添加下阴影 */
}
.search-choice {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0;
      padding: 0px;
      cursor: pointer;
      background-color:rgb(255, 255, 255,0); 
      border-color:rgb(255, 255, 255,0); 
  }
  .search-choice h4{
    color:#7499F4; 
    margin: auto 5px auto 0;
  }
  .search-choice img{
    width: 24px; 
    height:24px; 
    margin: auto 20px auto 0;
  }


.user {
  width: 50px;
  height: 50px;
  border-radius:50%;
  margin-right:10px;
   display: flex;
}

.main {
  display: flex;
  height: 100vh;
}

.left {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top:-200px;

}

h1 {
  text-align: center;
  font-size: 40px;
  color: #689AFB;
  margin-bottom:5px;
}

h2{
font-size: 50px;
color: #689AFB;
margin-top:10px;
margin-bottom:10px;
}

p{
margin-top:10px;
font-size: 16px;
}

a{
text-decoration: none;
color: #689AFB;
font-weight:bold;
margin-right:30px;
}

.center-bottom { 
  width: 40%;
  position: absolute; 
  bottom: 100px;  
  left: 710px; 
  font-size: 50px;
}

.highlight {
  font-size: 60px;
}


.center {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>