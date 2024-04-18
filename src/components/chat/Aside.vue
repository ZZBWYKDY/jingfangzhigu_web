<template>
  <el-aside class="aside" style="overflow: hidden">
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
          <el-scrollbar max-height="39vw" style="overflow: auto">
            <!-- 渲染对话列表 -->
            <el-menu-item
              v-for="(dialogue, index) in dialoguesArray"
              :key="index"
              :class="{ selected: dialogue.chatId === selectedChatId }"
            >
              <div class="menu-item-text" @click="selectChat(dialogue.chatId)">
                {{ dialogue.chatName }}
              </div>
              <img
                alt="删除"
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
  watch,
  defineProps,
  defineEmits,
  computed,
} from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import { axiosGet } from "@/utils/http";
import { useStore } from "vuex";

const store = useStore();
let token = ref("");
computed(() => {
  token = this.$store.state.token;
});
const firstMessage = computed(() => store.state.firstInputMessage);

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

watch(
  () => props.newChatName,
  (newVal, oldVal) => {
    console.log("newValnewVal", newVal);
    dialoguesArray.forEach((it) => {
      if (it.chatId == selectedChatId.value) {
        it.chatName = newVal;
      }
    });
  }
);

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
const selectedChatId = ref("");
const selectChat = (chatId) => {
  // 这里可以调用获取对应聊天信息的方法
  selectedChatId.value = chatId;
  getMessagesByChatId(chatId);
  store.commit('selectChat',chatId)
  // 向父组件发出事件
  emits("select-chat", chatId);
};

// 获取某一个 chatId 的所有消息
const getMessagesByChatId = async (chatId) => {
  try {
    const response = await axiosGet(`/chat/${chatId}`);
    // axios.get(`/chat/${chatId}`, {
    //   withCredentials: true,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     Authorization: localStorage.getItem("token"),
    //   },
    // });
    let messageArray = response.data.data.chat.message;
    if (instance) {
      store.commit("setAllMessages", messageArray);
      instance.emit("messages-updated", messageArray);

      store.commit('setChatId', chatId);
    }
  } catch (error) {
    console.error("", error);
    throw error; // 抛出错误以便调用方处理
  }
};
//调用所有对话的函数
getAllDialogues();
console.log('Aside页面');

// TODO根据isFirstMessageInChat的值调用新建对话的函数
watch(
    () => store.state.isFirstMessageInChat,
    (newValue, oldValue) => {
        if (newValue === true) {
          createNewChat();
          store.commit('setIsFirstMessageInChat',false);
        }
      }
  )

// 新建对话
const createNewChat = async () => {
  store.state.allMessages = [];
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
      store.commit('clearChatMessages',newChatId);
      getAllDialogues();
      selectChat(newChatId);
      store.commit('setChatId',newChatId)
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
