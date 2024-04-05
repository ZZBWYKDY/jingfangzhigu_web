<template>
<div class="container">
    <div class="background-color bubble">
        <el-row class="ingredient line">
        确认支付
        <img src="./delete.png">
        </el-row>
        <el-row class="img-wrapper">
            <div class="img-background">
                 <img src="../../assets/chat_pictures/icon.png" >
            </div>
            <p style="margin-top: 15px; color: rgb(163,163,163);">请于5分钟之内支付！</p>
            <p style="color:rgb(104,154,251) ;">使用微信/支付宝扫码支付</p>
        </el-row>

    </div>
</div>
</template>

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
padding: 15px 40px;
margin: 5px;
border-radius: 10px;
/* height: 350px; */
width: 400px; 
max-width: 80%;
text-align: left;
vertical-align: top; /* 顶部对齐，确保头像和聊天气泡顶部对齐 */
}

.ingredient{
justify-content: center;
font-size: 20px;
font-weight:bold;
color: rgb(104,154,251);
position: relative;
}
.line{
    padding-bottom: 15px;
    border-bottom:1.5px solid rgb(104,154,251);
  }
.img-wrapper{
height:95%;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
.img-wrapper img{
    width: 140px;
    height: 140px;
    border-radius: 15px;
}
.img-background{
    background-color: rgb(225,235,254);
    padding: 15px;
    border-radius: 10px;
    box-shadow: rgba(0,0,0,0.3) 0px 2px 4px ;
}
.ingredient img{
    height: 30px;
    width: 30px;
    position: absolute;
    right: -28px;
    top: -5px;
    border-radius: 8px;
}
</style>