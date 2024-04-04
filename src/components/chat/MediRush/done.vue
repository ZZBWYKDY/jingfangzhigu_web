<template>
    <div class="background-color bubble">
        <div class="hi">
            您好，欢迎使用【快捷购药】功能！您可以直接在输入框内发送您的处方文本，也可以在下方上传您的处方文件，小鲸会为您在线抓药！
        </div>
            <div class="img-wrapper">
                <img src="./done.png" >
                <div class="text">
                文件上传已上传！
                </div>
            </div>

    </div>

</template>
<script setup>

</script>


<style scoped>

.background-color {
    display: inline-block;
    background-color: white;
    box-shadow: rgba(0,0,0,0.1) 0px 2px 4px ;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 10px;
    height: 100%;
    width: 430px; 
    max-width: 80%;
    text-align: left;
    vertical-align: top; /* 顶部对齐，确保头像和聊天气泡顶部对齐 */

}
.hi{
    /* color:rgb(88,88,88); */
    font-size: 14px;
}
.img-wrapper{
    width:95%;
    height: 180px;
    border: 2px dashed rgb(104,154,251);
    border-radius: 10px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    background-color: rgb(243,247,255);
}
img{
    width: 40px;
    height: 40px;
}
.text{
    margin-top: 15px;
    font-size: 12px;
}

</style>