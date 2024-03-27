<template>
  <el-container class="background">
  <el-container class="wrapper">
    <el-header class="el-header" >
         <Header />
      </el-header>
    
    <div class="body-body">
      
    <div id="sidebar">
      <SideBar @change-kind="changekind"></SideBar>
    </div>
    <div class="table-case">
      <div class="body-head">
      <div class="carousel-wrapper"><Banner ref="AddBanner" @BannerEvent="handleChangeName"></Banner></div>
    </div>
     <div style="height: 410px;background-color: white;">
        <table class="my-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>病历</th>
              <th>就诊时间</th>
              <th>操作选项</th>
            </tr>
          </thead>
          <tbody >
            <tr  v-for="(history, index) in showList.slice(FirItem, LastItem)" :key="index" >
              
              <td>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                {{FirItem+index+1}}
              </td>
              <td style="position: relative; display: inline-block;">
                <img v-if="history.imgUrl" :src="history.imgUrl" @error="handleImageError"  style=" width: 100px;
  height: 120px;
  object-fit: contain;
  vertical-align: middle;"/>
                <img v-else src="@/assets/DataScouting_pictures/RegularCaseChart.webp" />
                <button v-if="!history.imgUrl"  style="position: absolute; bottom: 10px; right: 0;  color: #ffffff; 
  background-color: #007bff; 
  font-weight: bold; 
  font-size: 12px;  border: none;border-radius: 5px;">经方智谷</button>
              </td>
              <td>{{ history.createTime.slice(0, 10) }}</td>
              <td>
                  <tr class="link-container">
                  <a @click="toPhoto(FirItem+index)"  href="javascript: void(0)">查看详情</a>
                  <a href="javascript: void(0)">下载</a>
                  <a @click="deleteData(this.showList[FirItem+index].id,this.showList[FirItem+index].type)" href="javascript: void(0)">删除</a>
                  </tr>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <div style="display: flex;
  justify-content: center; margin:  auto;margin-top:10px">
        <el-pagination :page-size="3" :hide-on-single-page="value" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" />
        </div>
    </div>

    </div>

    <div class="body-bottom">
      
      <input id="upload-input" class="upload" style="opacity: 0;z-index: 100;" type="file" accept="image/gif, image/jpg, image/png" @change="handleFileChange"/>
      <button class="upload" >上传病历</button>
      <button class="followup" style="text-align: top">我要复诊</button>
    </div>
    <medicalHistoriesModal @notify="handleNotify" :index="selectedItem" v-if="isModalVisible&&kind==='dzbl'&&horj==='h'"></medicalHistoriesModal>
    <faceDiagnosisModal @notify="handleNotify" :index="selectedItem"  v-if="isModalVisible&&kind==='szjl'"></faceDiagnosisModal>
    <jingfangModal @notify="handleNotify" :index="selectedItem" v-if="isModalVisible&&kind==='dzbl'&&horj==='d'"></jingfangModal>

  </el-container></el-container>
</template>
<script>
import axios from "axios";
import {ref,onMounted} from 'vue'
import { useRouter } from 'vue-router';
import medicalHistoriesModal from '@/components/DataScouting/medicalHistoriesModal.vue'
import faceDiagnosisModal from '@/components/DataScouting/faceDiagnosisModal.vue'
import jingfangModal from '@/components/DataScouting/jingfangModal.vue'
import Banner from '@/components/DataScouting/carousel.vue'
import SideBar from '@/components/DataScouting/sidebar-com.vue'
import Header from "@/components/common/header.vue"
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
export default {
data() {
  return {
    name:'lisi',
    page:1,
    FirItem:0, LastItem:3,
    responseData:{},
    username: "",
    password: "",
    error: "",
    selectedFile: null,
    isModalVisible: false,
    medicalHistories: [],
    selectedItem :3,
    total:50,
    kind:'dzbl',
    faceDiagnosis:[],
    jingfang:[],
    showList:[],
    horj:'h',
  };
},
mounted() {
    this.fetchData();
  },
components: {
    faceDiagnosisModal,
    medicalHistoriesModal, 
    jingfangModal,
    Banner,
    SideBar,
    Header
  },
methods: {
  navigateToChat(){
    this.$router.push('/chat');
  },
  changekind(data){
    this.kind=data
    if(data==='szjl'){
      this.$refs.AddBanner.namelist=["YOURS"]
      this.fetchMZData()
    }else if(data==='dzbl'){
      this.$refs.AddBanner.fetchData()
      this.fetchData()
    }
  },
  handleCurrentChange(val){
    this.page=val;
    console.log(this.page)
    this.FirItem=(this.page-1)*3
    this.LastItem=val*3

  },
  handleNotify(message) {
    this.isModalVisible = false;
    },
  toPhoto(index){
    this.isModalVisible = true;
    this.selectedItem = index;
    if(this.kind==='dzbl'){
      this.horj=this.showList[index].type
      console.log(this.showList[index])
      console.log(this.showList[index].type)
    }
  },
  async deleteData(diagnosisId,type) {
    console.log(diagnosisId)
    if(this.kind==='dzbl'&&type==='f'){try {
    const response = await axios.delete(
      "/medicalHistory/jingfang/" + diagnosisId,
      {params: {
      diagnosisId:diagnosisId
    },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    console.log(response)
    this.fetchData()
  } catch (error) {
    console.error("An error occurred while making the request:", error);
    // 根据需要处理错误
  }}else if(this.kind==='dzbl'&&type==='h'){
    try {
    const response = await axios.delete(
      "/medicalHistory/" + diagnosisId,
      {params: {
      diagnosisId:diagnosisId
    },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    console.log(response)
    this.fetchData()
  } catch (error) {
    console.error("An error occurred while making the request:", error);
    // 根据需要处理错误
  }
  }else if(this.kind==='szjl'){
    try {
    const response = await axios.delete(
      "/face/" + diagnosisId,
      {params: {
        historyId:diagnosisId
    },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    console.log(response)
    this.fetchMZData()
  } catch (error) {
    console.error("An error occurred while making the request:", error);
    // 根据需要处理错误
  }
  }
  
},
  handleChangeName(value) {
      // 父组件接收到子组件传递的数值
      this.name = value;
      this.fetchData();
    },
    async fetchMZData() {
    try {
        const response = await axios.get(
          "/face/list",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
             },
            withCredentials: true,
          }
        );
        console.log(response.data);
        localStorage.setItem('faceDiagnosis', JSON.stringify(response.data.data.faceDiagnosis))
        this.faceDiagnosis = JSON.parse(localStorage.getItem('faceDiagnosis'));
        this.showList=this.faceDiagnosis
        this.total=this.showList.length
      } catch (error) {
        console.error("An error occurred while making the request:", error);
      }
    },
    async fetchData() {
    try {
      const response = await axios.get(
  "/medicalHistory/name/list/"+this.name,
  {
    params: {
      name: this.name
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
  }
);
        console.log(response.data);
        localStorage.setItem('diagnosis', JSON.stringify(response.data.data.diagnosis))
        localStorage.setItem('showList', JSON.stringify(response.data.data.diagnosis))
        this.showList = JSON.parse(localStorage.getItem('diagnosis'));
        this.total=this.showList.length
      } catch (error) {
        console.error("An error occurred while making the request:", error);
        this.showList = []
      }
    },
  async handleFileChange(event)  {
    this.selectedFile = event.target.files[0];
    const fd=new FormData()
    fd.append('img',this.selectedFile,'')
    console.log(this.selectedFile)

        
      try {
        const response = await axios.post(
          "/medicalHistory/extractInfo",
          fd,
          {
            withCredentials: true,
            headers: {
              Authorization: localStorage.getItem("token"),
              // Authorization:token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("An error occurred while making the request:", error);
      }

    
  }
  
}
};

</script>
<style>

#sidebar {
  float: left;
  height: 100%; 
  width: 20%; /* Adjust the width as needed */
  background-color: #ffffff; /* White background */
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
 
}

.body-bottom {
  clear: both;
  display: flexbox;
  justify-content:space-around;
  height: 50px; /* Adjust the height as needed */
  margin-top: 20px; /* Add margin above the footer */
  width: 60%;
  margin: auto;
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
border-radius: 10px;
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
border-radius: 10px;
}
/* }
.followup {
  display: block;
float:right;
margin-right: 10vw;
font-family: FZLanTingHeiS-B-GB-Regular;
font-size: 30px;
letter-spacing: 3px;
line-height:3vh;
width:15vw;
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
border-radius: 10px;
}
.upload{
  display: block;
  left:30px;
font-family: FZLanTingHeiS-B-GB-Regular;
font-size: 30px;
letter-spacing: 3px;
line-height:3vh;
width:15vw;
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
border-radius: 10px;
}

 */

.table-case {
  overflow: auto; 
  float: right;
  height: 100%; 
  width: 75%; /* Adjust the width as needed */
  /* padding: 20px; */
  border-radius: 10px; /* Rounded corners */
  /* margin-right: 20px;  */

}
.link-container {
    display: flex;
    justify-content: space-between;
    width: 300px; /* 或者使用其他宽度 */
    margin: auto;
  }
.my-table {
width: 100%;
/* height: 78%; */
background-color: #fff;
img {
  width: 100px;
  height: 120px;
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
  padding: 10px;
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








.body-body {
  display: block;
  width: 60%;
  height: 75%;
  padding: 5px; /* Add padding around the entire container */
  /* background-color: yellow; */
  margin: 0 auto;
}
.carousel-wrapper {
  display: flex;
  /* background-color: black; */
  justify-content: center; 
}
.body-head {
  width: 100%; /* Subtract left and right padding */
  height: 60px; /* Adjust the height as needed */
  /* background-color: white; */
  margin-bottom: 3%; /* Add margin below the header */
}

.background{
  height: 100vh;
  background-image: url('@/assets/chat_pictures/chat_background.png');
  background-size: cover;
  background-attachment: fixed;
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

.wrapper{
  height: 100%;
  overflow: auto;
}
</style>