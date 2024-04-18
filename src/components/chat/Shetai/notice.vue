<template>
        <div class="wrapper">
        <div class="header">
            <img src="../../../assets/login_pictures/logo.png">
            <p>舌苔问诊</p>
        </div>
        <div class="main">
            <div style="font-size: 18px; color:black; font-weight: bold; margin-bottom:5px;">所上传照片请注意以下几点要求：</div>
            <div class="require">
                <img src="./done.png">将舌头完整放置在拍摄区域内
            </div>
            <div class="require">
                <img src="./done.png">光线充足，不逆光、不曝光、不反光
            </div>
            <div class="require">
                <img src="./done.png">确保舌头无异物、无异色，舌面平展
            </div>


        </div>
    </div>
    
</template>
<script setup>

</script>
<style scoped>

.wrapper{
    width:450px;
    height:280px;
    display:flex;
    align-items: center;
    flex-direction:column;
    margin-left:-10px;
}
.header{
    display:flex;
    flex-direction: row;
    margin-bottom: 20px;
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
}
.require img{
    width:25px;
    margin:5px;
}
</style>