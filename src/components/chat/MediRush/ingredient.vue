<template>
  <div class="background-color bubble">
    <el-row class="ingredient">
        抓药配方
    </el-row>
        <el-row class="line">
        <el-col :span="14">
            <el-button class="modify">编辑</el-button>
        </el-col>
        <el-col :span='10' class="input-wrapper">
            <p style="color: rgb(163,163,163);">数量:</p>
            <el-input-number class="num "v-model="num" :min="1" :max="10" @change="handleChange" />
        </el-col>
      </el-row>
      <!-- <el-scrollbar style="height: 250px"> -->
        <div class="form-wrapper line">
                    <el-form
            v-for="item in medicineList"
            :key="item.id"
            class="form "
          >
            <div class="row">
              <img :src="item.image" alt="Medicine Image">
              <div class="name">{{ item.name }}</div>
              <div class="amount">{{ item.amount }}</div>
            </div>
          </el-form>

        </div>
      <!-- </el-scrollbar> -->
        <el-row class="price line">
          <p>总价：￥</p>
         {{total}}
        </el-row>
        <el-row class="btn">
          <el-button style=" background-color: rgb(118,189,179)" @click="isModify">修改处方</el-button>
          <el-button style=" background-color:rgb(104,154,251);" @click="isPay">确认支付</el-button>
        </el-row>

  </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { ref,computed,watch} from 'vue'
import medicineList from './medicineList'
const store = useStore();
// 修改分数
const num = ref(1)
const handleChange = () => {
  console.log(value)
}

const total = computed(() => {
  const totalPrice = medicineList.reduce((acc, curr) => {
    return acc + parseFloat(curr.price); // 将价格转换为浮点数并累加
  }, 0);

  return totalPrice*num.value;
});

// 监听num的变化
watch(num, (newValue, oldValue) => {
  console.log('num changed from', oldValue, 'to', newValue);
});

const isModify=()=>{
  store.commit('MediRush/setismodify')
}
const isPay=()=>{
  store.commit('MediRush/setispay')
}
</script>
<style scoped>
.background-color {
    display: inline-block;
    background-color: white;
    box-shadow: rgba(0,0,0,0.1) 0px 2px 4px ;
    padding: 15px 30px;
    margin: 5px;
    border-radius: 10px;
    height: 100%;
    width: 650px; 
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


.input-wrapper{
  display:flex;
  justify-content: end;
  align-items: end;

}
.input-wrapper p{
  line-height:30px;
  margin:0 10px;
  font-size:14px;
}
.input-wrapper .el-input-number{
  width:100px;
}
.line{
  padding-bottom: 15px;
  border-bottom:1.5px solid rgb(104,154,251);
}
.form {  
  display: flex;  
  flex-wrap: wrap; /* 允许子项换行 */  
  margin: 5px;  
}  
  
.form-wrapper {  
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 自动填充，最小宽度200px */
    grid-gap: 10px; 
    padding: 15px;
}  
  
.form .row {  
  display: flex;  
  flex-direction: row;  
  align-items: center;  
  justify-content: space-between;  
  margin: 0 20px;
}  
  
.row img {  
  margin-right: 10px; 
  max-width: 100%; 
  height: auto; 
  border-radius: 5px;
}
.row div
{
  margin: 0 15px;
  font-size: 16px;
}
.price{
  margin: 5px 0;
display: flex;
justify-content: end !important;
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

</style>