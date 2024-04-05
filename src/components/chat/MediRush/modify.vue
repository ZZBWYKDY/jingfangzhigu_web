<template>
  <div class='container'></div>
    <div class="background-color bubble">
      <el-row class="ingredient line">
          处方编辑
      </el-row>
        <el-scrollbar max-height="400px" class="line ">
          <div class="form-wrapper ">
            <el-form
              v-for="item in medicineList"
              :key="item.id"
              class="form "
            >
              <el-row class="row">
                <el-col :span="4"><el-button>移除</el-button></el-col>
                <el-col :span="4">
                    <img :src="item.image" alt="Medicine Image">
                </el-col>
                <el-col :span="3">
                    <div class="name">{{ item.name }}</div>
                </el-col>
                <el-col class="num"  :span="9">
                    <p style=" color: rgb(163,163,163); ">{{item.units}}数：</p>
                    <el-input-number class="num "v-model="num" :min="1" :max="10" @change="handleChange" />
                </el-col>
                <el-col :span="4">
                    <div style="font-size: 14px;" >单价：{{ item.price }}/{{item.units}}</div>
                </el-col>
            </el-row>
            </el-form>
  
          </div>
        </el-scrollbar>
          <el-row class="btn">
            <el-button style=" background-color: rgb(118,189,179)"@click='goback'>取消编辑</el-button>
            <el-button style=" background-color:rgb(104,154,251);"@click='goback'>确认修改</el-button>
          </el-row>
  
    </div>
  </template>
  <script setup>
  import { ref,computed,watch} from 'vue'
  import medicineList from './medicineList'
  import { useStore } from 'vuex';
  const store = useStore();
  // 修改分数
  const num = ref(1)
  const handleChange = () => {
    console.log(value)
  }
  

  
  // 监听num的变化
  watch(num, (newValue, oldValue) => {
    console.log('num changed from', oldValue, 'to', newValue);
  });
  
  const goback=()=>{
    store.commit('MediRush/clearismodify')
  }

  </script>
  <style scoped>
  .container{
    position: fixed;
    top: 0%;
    left: 0%;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.5);
    z-index: 998;
}
  .background-color {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  z-index: 999;
      background-color: white;
      box-shadow: rgba(0,0,0,0.1) 0px 2px 4px ;
      padding: 15px 30px;
      margin: 5px;
      border-radius: 10px;
      width: 700px; 
      max-width: 80%;
      text-align: left;
      vertical-align: top; /* 顶部对齐，确保头像和聊天气泡顶部对齐 */
      }

  .ingredient{
     justify-content: center;
     font-size: 20px;
     font-weight:bold;
     color: rgb(104,154,251);
  }
  .modify{
    background-color:rgb(104,154,251);
    color:white;
    padding:3px 20px;
    border-radius: 7px;
  }
  
 .el-input-number{
  width:100px;
  height:30px;
}

  .line{
    padding-bottom: 15px;
    border-bottom:1.5px solid rgb(104,154,251);
  }
  .form {  
    display: flex;  
    flex-wrap: wrap; /* 允许子项换行 */  
    margin:10px 0;
  }  
    
  .form-wrapper {  
    display: flex;
    flex-direction: column;
    justify-content: center; 
      padding: 7px 15px;
  }  
    
  .form .row {  
    display: flex;  
    flex-direction: row;  
    align-items: center;  
    /* justify-content: space-between;   */
    margin: 0 15px;
    width:100%;
  }  
    
  .row img {  
    margin-right: 10px; 
    max-width: 100%; 
    height: auto; 
    border-radius: 5px;
  }
  .row div
  {
    /* margin: 0 15px; */
    font-size: 16px;
  }
  .price{
    margin: 5px 0;
  display: flex;
  justify-content: end;
  font-size: 18px;
  height: 40px;
  }
  .btn {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .btn .el-button{
  width: 160px;
  border-radius: 5px;
  color:white;
  }
  .num{
    display: flex;
    text-align: center;
  }
  .num p{
   margin: auto 0;
  }
  .row .el-button{
    background-color:rgb(104,154,251);
    color: white;
    width:65px;
  }
  </style>