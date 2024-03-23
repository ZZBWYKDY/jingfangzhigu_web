<script setup>
import {ref,onMounted} from 'vue'
import store from '@/store/index.js'
import { useRouter } from 'vue-router';
const router = useRouter();
function goPersonal(){
    router.push({path:'/personal'})
}
function goUser(){
    router.push({path:'/user'})
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
    <div class="header">
        <img class='logoimg' src="@/assets/chat_pictures/logo.png"/>
        <div class="search">
          <el-dropdown>
            <el-avatar :src="imageUrl" class='avator' />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goPersonal">个人中心</el-dropdown-item>
                <el-dropdown-item @click="goUser">设置</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
            
            <el-button class="search-choice">
                <h4 >功能反馈</h4>
                <img src="@/assets/chat_pictures/remark.png" />
            </el-button> 
            <el-button class="search-choice">
                <h4 >经方智谷小程序</h4>
                <img src="@/assets/chat_pictures/program.png" />
            </el-button>            
        </div>
    </div>
</template>
<style>
  .header{     
    display: flex;
    width: 100%;
    align-items: center;
  }
  .logoimg {
      width: 100px;
      height: 90%;
      margin: auto 10px;
  }
  .search{
      margin:auto 0px;
      flex: 1; /* 设置矩形的宽度，根据需要调整 */
      height: 100%;/* 设置矩形的高度，根据需要调整 */
      border-radius: 100px;    
      padding-left:20px ;
      background-color: rgb(255, 255, 255,0.5);
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      font-size: 16px;
      line-height: 80%;
  }
  .avator{
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: auto 10px auto 0px;
    cursor: pointer;
  }
  .avator:focus{
    outline: none;
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

</style>