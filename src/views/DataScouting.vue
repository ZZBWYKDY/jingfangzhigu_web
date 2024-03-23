<template>
    <el-container class="background">
      <el-header class="el-header" >
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
      </el-header>
      <div class="body-head">

        <img
          class="icon-left"
          src="./images/img_7.png"
        />
        <div class="changebox">
          <div class="namebox">
            <span class="name_inline">Kiandra Lowe</span>
          </div>
          <div class="namebox_checked">
            <span class="name_inline_checked">Kiandra Lowe</span>
          </div>
          <div class="namebox">
            <span class="name_inline">Kiandra Lowe</span>
          </div>
        </div>
        <img
            class="icon-right"
            src="./images/img_8.png"
          />
      </div>

      <div class="body-body">
        <div class="table-case">
          <table class="my-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>病历</th>
                <th>就诊时间</th>
                <th>操作选项</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                  1
                </td>
                <td><img src="./images/img_11.png" /></td>
                <td>2024.05.06</td>
                <td>
                    <tr class="link-container">
                    <a href="">查看详情</a>
                    <a href="">下载</a>
                    <a href="">删除</a>
                    </tr>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                  1
                </td>
                <td><img src="./images/img_11.png" /></td>
                <td>2024.05.06</td>
                <td>
                    <tr class="link-container">
                    <a href="">查看详情</a>
                    <a href="">下载</a>
                    <a href="">删除</a>
                    </tr>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="body-bottom">
        <button class="upload">上传病历</button>
        <button class="followup">我要复诊</button>
      </div>


    </el-container>
  </template>
<script>
import {ref,onMounted} from 'vue'
import { useRouter } from 'vue-router';

let messageArray = ref([]);
// 处理子组件发出的自定义事件
const handleMessagesUpdated = (data) => {
  messageArray.value = data;
};
const router = useRouter();
function goPersonal(){
    router.push({path:'/personal'})
}
function goUser(){
    router.push({path:'/user'})
}

const mainRef = ref(null)
const imageUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
onMounted(()=>{
    let headUrl = localStorage.getItem('headimg')
    if(headUrl){
        imageUrl.value = headUrl
    }
})

</script>
<style>
.body-bottom {
  position: fixed; /* 固定定位，相对于视口 */
  bottom: 0; /* 底部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满整个视口的宽度 */
  height: 15%;
  text-align: center; 
  /* background-color: #fff; */
}
.followup {
  font-family: FZLanTingHeiS-B-GB-Regular;
  font-size: 30px;
  letter-spacing: 3px;
  line-height:3vh;
  text-align: left;
  position: absolute;
  left: 30%;
  width:15%;
  height:6vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  background-color: rgba(118, 189, 179, 1);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 20px;
}
.upload{
  font-family: FZLanTingHeiS-B-GB-Regular;
  font-size: 30px;
  letter-spacing: 3px;
  line-height:3vh;
  text-align: right;
  position: absolute;
  right: 30%;
  width:15%;
  height:6vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  background-color: rgba(104, 154, 251, 1);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  border-radius: 20px;
}




.table-case {
  width: 50vw;
  margin: 50px auto;
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    vertical-align: middle;
  }
}
.link-container {
      display: flex;
      justify-content: space-between;
      width: 300px; /* 或者使用其他宽度 */
      /* background-color: black; */
      margin: auto;
    }
.my-table {
  width: 100%;
  border-spacing: 0;
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    vertical-align: middle;
  }
  th {
    background: white;
    border-bottom: 2px solid #069;
  }
  th {
    text-align: center;
    padding: 10px;
    transition: all .5s;
    &.red {
      color: red;
    }
  }
  tr{
    background: white;
  }
  .none {
    height: 100px;
    line-height: 100px;
    color:white;
    background: white;
  }
}
.my-tag {
  cursor: pointer;
  .input {
    appearance: none;
    outline: none;
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    box-sizing: border-box;
    padding: 10px;
    color: #666;
    &::placeholder {
      color: #666;
    }
  }
}
 






.banner {
  width:55vw;
  height:52vh;
  margin-left: 90px;
  align-self: flex-start;
}
.body-body .body {
  display: flex;
  justify-content: flex-start;
  align-self: center;
  position: relative;
  width:59vw;
  height:52vh;
  background-color: #fff;
}
.body-body {
  position: fixed; /* 固定定位，相对于视口 */
  bottom: 65%; /* 底部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满整个视口的宽度 */
  height: 15%;
  text-align: center; 
  /* background-color: black; */
}
.namebox_checked{
  background-color: rgba(104, 154, 251, 1);
  display: inline-block;
  margin: 1vw;
  justify-content: flex-start;
  align-self: center;
  width:30%;
  padding: 31px 12px 32px;
  border-radius: 8px;
}
.name_inline_checked{
  color: rgba(255, 255, 255, 1);
  font-family: FZLanTingHeiS-B-GB-Regular;
  font-size: 24px;
  line-height:3vh;
  align-self: flex-start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.name_inline {
  color: rgba(104, 154, 251, 1);
  font-family: FZLanTingHeiS-B-GB-Regular;
  font-size: 20px;
  letter-spacing: 2px;
  line-height:2vh;
  margin: auto;
  align-self: flex-start;
  max-width:9vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.namebox {
  background-color: white;
  display: inline-block;
  /* margin:; */
  justify-content: flex-start;
  align-self: center;
  width:30%;
  padding: 31px 12px 32px;
  border-radius: 8px;
  bottom: 1vh;
}
 .icon-left {
  width:1vw;
  height:4vh;
  position: absolute;
  left: 23vw;
  bottom: 1vh;
}
.icon-right {
  width:1vw;
  height:4vh;
  position: absolute;
  right: 23vw;
  bottom: 1vh;
}
.changebox {
  position: absolute;
  left: 30%; 
  right: 30%; 
  height:15vh;
  width:40%;
  /* background-color: black; */
  bottom: -4vh;
}
.body-head {

  position: fixed; /* 固定定位，相对于视口 */
  bottom: 80%; /* 底部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满整个视口的宽度 */
  height: 15%;
  text-align: center; 
}

.background{
    height: 100vh;
    background-image: url('@/assets/chat_pictures/chat_background.png');
    background-size: cover;
  }
  .el-header{
    padding: 20px; 
    height: 90px;      
    display: flex;
    width: 100%;
    align-items: center;
  }

  .logoimg {
      width: auto;
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
  .leftandright{
    padding: 0px 20px 20px 20px;
  }
  .aside {
    background-color:rgba(255,255,255,0.2);
    border-radius: 10px;
    margin: 0 20px 0 0;
    padding: 10px;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .main {
    background-color:rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
</style>