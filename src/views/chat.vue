<script lang="ts" setup>
import { ref } from 'vue'
import Aside from '@/components/chat/Aside.vue'
import Main from '@/components/chat/Main.vue'
import Header from "@/components/common/header.vue"

const mainRef = ref(null)
let messageArray = ref([]);
// 处理子组件发出的自定义事件
const handleMessagesUpdated = (data) => {
  messageArray.value = data;
};
const dialogues = ref([]);

let selectedChatId = ref('');
const selectChat = (chatId) => {
  selectedChatId.value = chatId;
};
const newChatName = ref('');
const handleUpdateChatName = (newChatNameValue, chatId) => {
  newChatName.value = newChatNameValue;
  console.log(newChatName,'newChatName');
};
</script>

<template>
    <el-container class="background">
    <el-container class="wrapper">
      <el-header class="el-header" >
         <Header />
      </el-header>
      <el-container class="leftandright">
        <Aside :dialogues="dialogues" @messages-updated="handleMessagesUpdated" @select-chat="selectChat" :newChatName="newChatName"/>
        <Main  :messageArray = "messageArray" :selectedChatId="selectedChatId" @update-chat-name="handleUpdateChatName"/>
      </el-container>
    </el-container>
  </el-container>
  </template>

<style src="@/views/chat.css" >

</style>