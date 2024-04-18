<template>
    <div class="container">
        <div class="wrapper">
            <div class="inn">
                <div class="header">
                <img src="../../../assets/login_pictures/logo.png">
                <p>舌苔问诊</p>
            </div>
            <div class="main">  
            <div style="font-size: 18px; color:black; font-weight: bold; margin-bottom:5px;">舌像分析中...请您耐心等待！</div>  
                <div class="require" v-for="(item, index) in requireItems" :key="index">  
                    <img v-if="item.isDone" src="./done.png">
                    <img v-else src="./circle.png">
                    {{ item.text }}  
                </div>  
                </div>  
            </div>
       
        </div>
    </div>
    

   
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';  
const requireItems = ref([  
      { isDone: false, text: '解析舌色...' },  
      { isDone: false, text: '解析舌苔...' },  
      { isDone: false, text: '解析舌形...' },  
      { isDone: false, text: '分析体质...' }  
    ]);  
    let intervalId;  
  
onMounted(() => {  
    intervalId = setInterval(() => {  
    for (let i = 0; i < requireItems.value.length; i++) {  
        if (!requireItems.value[i].isDone) {  
        requireItems.value[i].isDone = true;  
        break; // 只替换一个图片，然后等待下一个0.5秒  
        }  
    }  
    }, 2000);  
});  

onUnmounted(() => {  
    clearInterval(intervalId);  
});  
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
    display:flex;
    justify-content: center;
    align-content: center;
}
.wrapper{
    width:400px;
    height:330px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
    align-content: center;
    flex-direction:column;
    margin-left: -16px;
    background-color: white;
    border-radius: 30px;
}
.inn{
    display: flex;
    align-content: center;
    flex-direction:column;
    align-items: center;
    justify-items: center;
    
}
.header{
    margin-top: 15px;
    display:flex;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: center;
}
.header img{
    width: 90px;
    height: 60px;
}
.header p{
    font-size: 24px;
    font-weight: bold;
    color:rgb(91,147,255)
}
.require{
    margin: 5px 0;
    font-size:16px;
    line-height: 32px;
    color:black;
    display: flex;
    justify-content: center;
    align-content: center;
}
.require img{
    width:25px;
    margin:5px;
}

</style>