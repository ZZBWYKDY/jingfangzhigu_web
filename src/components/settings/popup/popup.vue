  
<script setup>
  import { defineProps } from 'vue';
  const props = defineProps(['content']);
</script>

<template>
    <div class="popup" @click="$emit('close')">
      <img src="@/assets/setting_pictures/tap.png" class="tap-picture">
      <div class="popup-name">
        <span style="font-size: 20px; color: #689AFB;">{{ props.content }}</span>
      </div>
      <div class="popup-content"  v-if="props.content === '数据导出'">
        <span style="margin-left: 20px;">经方智谷助手将把您与助手的对话</span>
        <span style="margin-left: 40px;">记录和您的健康数据发送到</span> 
        <p style="margin: 5px 0px 5px 70px; color: #689AFB;">*******@***.com邮箱</p>
        <span style="margin-left: 75px;">请您确认信息无误！</span>
        <button style="margin:20px 42px ;">修改</button>
        <button style="margin:20px 35px;">确认</button>
      </div>
      <div class="popup-content"  v-if="props.content === '删除账户'">
        <span style="margin: 0px 60px;; color: #689AFB;">经方智谷助手提醒您：</span>
        <span style="margin-left: 20px;">经方智谷助手为您的健康保驾护航，</span> 
        <span style="margin: 0px 40px"> 您的账户一经删除无法找回！</span>
        <span style="margin-left: 75px;">请确认是否删除！</span>
        <button style="margin:20px 42px ;">再想想</button>
        <button style="margin:20px 35px;">确认</button>
      </div>
      <div class="popup-content" style="width: 361px;"  v-if="props.content === '删除所有对话'">
        <span style="margin: 0px 80px;; color: #689AFB;">经方智谷助手提醒您：</span>
        <span style="margin:  0px 10px;"> 每一次诊疗对话记录都是您独特而宝贵的</span> 
        <span style="margin: 0px 10px"> 健康财富，对话记录一经删除无法恢复！</span>
        <span style="margin-left: 75px;">请确认是否删除！</span>
        <button style="margin:20px 42px ;">再想想</button>
        <button style="margin:20px 35px;">确认</button>
      </div>
    </div>
  </template>

  <style scoped>
.popup {
    position: fixed;
    width: 500px;
    height: 421px;
    top: 50%;
    left: 53%;
    transform: translate(-50%, -50%);
    background-image: url('@/assets/setting_pictures/popup.png');
}

  .tap-picture {
    position: relative;
    left: 473px;
    top: 86px;

  }
  .popup-name {
    position: absolute;
    width: 120px;
    height: 29px;
    top: 115px;
    left: 210px;
  }

  .popup-content {
    position: absolute;
    width: 333px;
    height: 123px;
    left: 110px;
    top: 200px;
    font-size: 18px;
    button{
        width: 78px;
        height: 40px;
        background-color: #689AFB;
        color: #fff;
        border-radius: 10px;
        border: none;
        font-size: 20px;
    }
  }
  
  </style>