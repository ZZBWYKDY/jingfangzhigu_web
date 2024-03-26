<template>
  <el-aside class="aside">
    <el-row class="newchat">
      <el-button class="newchat" type="primary" plain @click="createNewChat"
        >新建对话</el-button
      >
    </el-row>
    <el-row class="search-history">
      <el-input
        v-model="input2"
        class="search-history"
        placeholder="搜索历史记录"
        :prefix-icon="Search"
        style="color: white"
      />
    </el-row>
    <el-row class="history">
      <el-menu class="el-menu-vertical-demo" :default-opened="true">
        <el-sub-menu index="1" popper-class="custom-sub-menu">
          <template #title>
            <span>网页历史对话</span>
          </template>
          <el-scrollbar max-height="60vh">
            <!-- 渲染对话列表 -->
            <el-menu-item
              v-for="(dialogue, index) in dialoguesArray"
              :key="index"
              :class="{ 'selected': dialogue.chatId === selectedChatId }"
            >
              <div class="menu-item-text" @click="selectChat(dialogue.chatId)">
                {{ dialogue.chatName }}
              </div>
              <img
                src="@/assets/chat_pictures/delete.png"
                style="display: inline-block; height: 18px; width: 18px"
                @click.stop="deleteChat(dialogue.chatId)"
              />
            </el-menu-item>
          </el-scrollbar>
        </el-sub-menu>
      </el-menu>
    </el-row>
  </el-aside>
</template>

<script lang="ts" setup>
import {
  ref,
  getCurrentInstance,
  reactive,
  defineProps,
  defineEmits, computed,
} from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";

let token = ref("")
computed(
    () => {
      token = this.$store.state.token;
    }
);


const input2 = ref("");
const instance = getCurrentInstance();

let dialoguesArray = reactive([
  {
    chatId: "1",
    userId: "1",
    chatName: "",
    createTime: "2023-11-17T11:58:58.000+00:00",
    updateTime: "2023-11-17T11:59:02.000+00:00",
    is_delete: 0,
    message: null,
  },
]);
const newChatNameValue = ref("");
const props = defineProps({
  newChatName: String,
});

// 获取所有对话
const getAllDialogues = async () => {
  try {
    const response = await axios.get("/chat/", {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("token"),
      },
    });
    // 返回是一个数组里面多个对象
    dialoguesArray.length = 0;
    response.data.data.chats.forEach((chat) => dialoguesArray.push(chat));
  } catch (error) {
    console.error("获取所有对话失败:", error);
  }
};
const emits = defineEmits(["select-chat", "message-updated"]);
const selectedChatId = ref('')
const selectChat = (chatId) => {
  // 这里可以调用获取对应聊天信息的方法
  selectedChatId.value = chatId;
  getMessagesByChatId(chatId);
  // 向父组件发出事件
  emits("select-chat", chatId);
};

// 获取某一个 chatId 的所有消息
const getMessagesByChatId = async (chatId) => {
  try {
    const response = await axios.get(`/chat/${chatId}`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("token"),
      },
    });
    let messageArray = response.data.data.chat.message;
    if (instance) {
      instance.emit("messages-updated", messageArray);
    }
  } catch (error) {
    console.error("", error);
    throw error; // 抛出错误以便调用方处理
  }
};
//调用所有对话的函数
getAllDialogues();

const createNewChat = async () => {
  try {
    const newChatId = generateUUID();
    const response = await axios.post(
      "/chat/",
      {
        chatId: newChatId,
        chatName: "新建对话",
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (response.data && response.data.data) {
      getAllDialogues();
      selectChat(newChatId);
    }
  } catch (error) {
    console.error("创建对话失败:", error);
  }
};

// 删除某一个对话
const deleteChat = async (chatId) => {
  try {
    const currentIndex = dialoguesArray.findIndex(
      (dialogue) => dialogue.chatId === chatId
    );
    const response = await axios.delete(`/chat/${chatId}`, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("token"),
      },
    });
    // 删除对话成功后直接更新对话列表
    dialoguesArray.splice(currentIndex, 1);
    if (dialoguesArray.length > 0) {
      const nextChatId = dialoguesArray[0].chatId;
      selectChat(nextChatId);
    }
  } catch (error) {
    console.error("删除对话失败:", error);
  }
};

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
</script>

<style src="@/components/chat/aside.css"></style>
