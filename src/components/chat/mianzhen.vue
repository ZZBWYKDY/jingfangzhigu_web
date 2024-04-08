<template>
  <el-main class="main">
    <div
      class="scroll"
      style="height: 705px; overflow: hidden; overflow-y: scroll"
    >
      <!-- 聊天框 -->
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="chat-container"
        ref="chatContainer"
        style="
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <!-- 对话框 -->
        <div
          v-if="msg.roleId === 1"
          style="
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            margin-left: auto;
            
          "
        >
          <!-- 用户消息 -->
          <div
            class="chat-box"
            style="
              display: flex;
              justify-content: flex-end;
              align-items: normal;
            "
          >
            <div
              v-if="msg.imgUrl"
              class="user-bubble last-message"
              style="
                background-color: #5b93ff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 10px;
              "
            >
              <img width="200px" :src="msg.imgUrl"  @load="imageLoaded"/>
            </div>
            <div
              v-else
              class="bubble user-bubble last-message"
              style="
                background-color: #5b93ff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 10px;
              "
            >
              {{ msg.content }}
            </div>
            <div class="avatar">
              <img
              :src="$store.state.userImg"
                alt="User Avatar"
                style="width: 40px; height: 40px; border-radius: 50%"
              />
            </div>
          </div>
        </div>
        <div
          v-if="msg.roleId === 2"
          style="
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            margin-right: auto;
          "
        >
          <!-- 助手消息 -->
          <div
            class="chat-box"
            style="
              display: flex;
              justify-content: flex-start;
              margin-bottom: 10px;
              align-items: center;
            "
          >
            <div class="avatar" style="align-self: flex-start">
              <img
                src="@/assets/chat_pictures/icon.png"
                style="
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  max-width: 50vw;
                "
              />
            </div>

            <div
              v-if="msg.contentType == 'face'"
              class="bubble bubb assistant-bubble last-message"
            >
              <div id="medical-page" class="medical-box face-box">
                <div class="img-box">
                  <img width="200px" :src="faceDiagnosis.imgUrl" alt="" />
                </div>
                <div
                  class="desc-box"
                  v-html="renderMessage(faceDiagnosis.response)"
                ></div>
              </div>
            </div>

            <div
              class="bubble assistant-bubble last-message"
              v-else
              style="
                background-color: #ffffff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 10px;
              "
            >
              <a-spin
                :indicator="indicator"
                v-if="index === messages.length - 1 && isLoading"
              />
              <div v-html="renderMessage(msg.content)"></div>
              <div
                v-if="isShowMedic"
                style="box-shadow: 0 2px 4px rgba(0, 0, 1, 0.1); padding: 10px"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<style src="@/components/chat/main.css"></style>

<script setup lang="ts">
import { ElLoading, ElMessage } from "element-plus";
import {
  ref,
  onMounted,
  watch,
  onUnmounted,
  reactive,
  nextTick,
  defineProps,
  defineEmits,
  toRaw,
  PropType,
  computed,
} from "vue";
import axios from "axios";
import html2canvas from "html2canvas";
import { axiosPost, axiosGet, axiosDelete } from "@/utils/http";
import marked from "marked/marked.min.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { mapActions } from "vuex";
import { fa } from "element-plus/es/locale";
const router = useRouter();
const canSendMessage = ref(true);
const handleMenuClick = (path) => {
  router.push(path);
};
declare var webkitSpeechRecognition: any;
computed(() => {
  token = this.$store.state.token;
});

const buttons = [
  { text: "我最近头痛伴着流鼻涕,该吃什么药?" },
  { text: "最近中医馆配的酸梅汤很火，请问可以当饮料喝吗？" },
  { text: "胃肠炎可以吃柚子吗？" },
] as const;

const renderMessage = (content) => {
  if (!content) {
    return marked.parse(messageContent.value); // 如果content为空，则返回messageContent
  }
  return marked.parse(content);
};
const activeName = ref("first");

interface Message {
  messageId: string;
  chatId: string;
  roleId: number;
  createTime: string;
  content: string;
}

const chatId = ref("");
let isFirstMessageInChat = ref(true); //跟踪是否是当前chatId下的第一次发送消息
let messages = reactive<Message[]>([]);
const props = defineProps({
  messageArray: Array as PropType<Message[]>,
  selectedChatId: String,
  chatFlag: Boolean,
});

const store = useStore();

watch(
  () => store.state.inputmessage,
  (newVal, oldVal) => {
    console.log("activeName.value", newVal);
    isFirstMessageInChat.value = true;
    sendMessage(newVal); // 重新订阅新的chatId
  }
);

watch(
  () => store.state.faceImgUrl,
  (newVal, oldVal) => {
    if (newVal) {
      messages.push({
        chatId: chatId.value,
        content: inputMessage.value,
        createTime: "",
        imgUrl: newVal,
        messageId: generateUUID(),
        roleId: 1,
      }); 
      getFaceByImage(newVal);
    }
  }
);
function imageLoaded(){
  scrollToBottom(); 
}
watch(
  () => activeName.value,
  (newVal, oldVal) => {
    console.log("activeName.value", newVal);
    if (newVal !== oldVal && newVal) {
      isFirstMessageInChat.value = true;
      inputMessage.value = newVal;
      sendMessage(newVal); // 重新订阅新的chatId
    } else {
    }
  }
);

watch(
  () => store.state.allMessages,
  (newVal, oldVal) => {
    if (newVal && newVal.length > 0) {
      filterMessages();
      chatId.value = props.selectedChatId as string;
    } else {
    }
  }
);

watch(
  () => props.selectedChatId,
  (newVal, oldVal) => {
    if (newVal !== oldVal && newVal) {
      chatId.value = newVal; // 更新当前chatId
      subscribeToChat(); // 重新订阅新的chatId
      isFirstMessageInChat.value = true;
      canSendMessage.value = true;
      isLoading.value = false;
      store.commit("setCanSendMessage", true);
      store.commit("setIsLoading", false);
    }
  }
);

function filterMessages() {
  messages.splice(0, messages.length);
  let rawMessageArray: any = toRaw(store.state.allMessages);
  if (Array.isArray(rawMessageArray)) {
    rawMessageArray.forEach((item) => {
      // 确保item的属性
      if (item) {
        messages.push({
          messageId: item.messageId,
          chatId: item.chatId,
          roleId: item.roleId,
          createTime: item.createTime,
          content: item.content,
        });
      }
    });
  }
}

const inputMessage = ref("");
const isLoading = ref();
const isShowMedic = ref();
// 语音转文字功能
const recognition = new webkitSpeechRecognition();
recognition.lang = "zh-CN";
const recognitionActive = ref(false);

const jingfang = ref({});
const faceDiagnosis = ref({});

function startRecording() {
  if (!recognitionActive.value) {
    recognition.start();
    recognitionActive.value = true;
  } else {
    recognition.stop();
    recognitionActive.value = false;
  }
}

// 订阅请求
let messageContent = ref("");
let currentEventSource: EventSource | null = null;
const medicineText = `111111`;
const subscribeToChat = () => {
  // 如果已经有一个订阅，先关闭它
  if (currentEventSource) {
    currentEventSource.close();
    currentEventSource = null;
  }
  // 创建新的EventSource订阅
  const eventSource = new EventSource(
    `http://59.110.149.33:8001/api/sse/${chatId.value}`
  );
  currentEventSource = eventSource; // 更新当前订阅
  eventSource.addEventListener("message", function (event) {
    isLoading.value = false;
    canSendMessage.value = false;
    store.commit("setCanSendMessage", false);
    store.commit("setIsLoading", false);
    let data = JSON.parse(event.data);
    if (data["data"] && data["data"]["delta"]) {
      messageContent.value += data["data"]["delta"];
    }
    if (data["data"]["flag"]) {
      let flag = data["data"]["flag"];
      if (flag) {
      }
    }
  });

  eventSource.addEventListener("error", function (event) {
    // let data = JSON.parse(event.data);
    // if (data.data) {
    //   messageContent.value += data.data;
    // }
  });

  eventSource.addEventListener("end", function (event) {
    canSendMessage.value = true;
    store.commit("setCanSendMessage", true);
    let endData = JSON.parse(event.data);
    //1 通过finalDiagnosis判断
    if (endData.data.finalDiagnosis) {
      isShowMedic.value = true;
    }

    if (messageContent.value) {
      let length = messages.length - 1;
      messages[length].content = endData["data"]["totalMessage"];
      messageContent.value = ""; // 重置累积的消息内容
      scrollToBottom();
    }
    currentEventSource.close();
  });
  // 在组件销毁或页面离开时关闭连接
  onUnmounted(() => {
    if (currentEventSource) {
      currentEventSource.close();
    }
  });
};

const emits = defineEmits(["update-chat-name"]);
const sendMessage = (inputVal) => {
  if (!canSendMessage.value || isLoading.value) {
    ElMessage.error("回复消息正在生成");
    return false;
  }
  if (
    (inputVal.trim() !== "" && store.state.allMessages)
  ) {
    const currentChatId = props.selectedChatId;
    chatId.value = currentChatId || generateUUID();
    // if (
    //   isFirstMessageInChat.value &&
    //   (!store.state.allMessages || store.state.allMessages.length === 0)
    // ) {
    //   // messages.splice(0, messages.length); // 清空当前消息数组
    //   // isFirstMessageInChat.value = false;
    //   // emits("update-chat-name", inputMessage.value, chatId.value);
    //   // updateChatName(chatId.value, inputMessage.value);
    // }
    const requestDataToSend = {
      messageId: generateUUID(),
      text: inputMessage.value,
      messages: toRaw([...messages]),
    };
    setTimeout(() => {
      fetchResponse(requestDataToSend);
      // messages.splice(0, messages.length); // 清空当前消息数组
      messages.push({
        chatId: currentChatId,
        content: inputVal,
        createTime: "",
        messageId: generateUUID(),
        roleId: 1,
      });
      messages.push({
        chatId: currentChatId,
        content: "请直接在输入框右侧上传面部图片",
        createTime: "",
        messageId: generateUUID(),
        roleId: 2,
      });
    }, 500);
  }
};

function formatDateTime(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 将base64图片url转换为Blob对象
const dataURLtoBlob = (dataurl) => {
  var arr = dataurl.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const updateChatName = async (chatId, newChatName) => {
  axiosPost(
    `/chat/name`,
    {
      chatId: chatId,
      chatName: newChatName,
    },
    false,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
};
// 发送问题获取响应
const fetchResponse = async (requestDataToSend) => {
  const response = await axios.post(
    `/sse/chat/${chatId.value}`,
    requestDataToSend,
    // flase,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
};

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 滚动到底部的方法
const scrollToBottom = () => {
  const chatContainer = document.querySelector(".scroll");
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};
// 监听消息数组的变化，自动滚动到底部
onMounted(() => {
  messages.push({
    chatId: props.selectedChatId,
    content: "请直接在输入框右侧上传面部图片",
    createTime: "",
    messageId: generateUUID(),
    roleId: 2,
  });
  scrollToBottom();
});

watch(
  messages,
  async () => {
    console.log("messagesmessagesmessagesmessages变化了");
    await nextTick(); // 等待DOM更新
    scrollToBottom(); // 现在滚动到底部
  },
  {
    immediate: true,
    deep: true,
  }
);

const getFaceByImage = (url) => {
  scrollToBottom(); // 现在滚动到底部
  isLoading.value = true;
  store.commit("setIsLoading", true);
  // url =
  //   "https://jingfang-images-1322234581.cos.ap-beijing.myqcloud.com/faces%2F1710841951364tz.png";
  axiosPost(`/face/diagnosis?img=${url}`).then((response) => {
    console.log(
      "response.data.faceDiagnosis",
      response.data.data.faceDiagnosis
    );
    const faceDiagnosisnoimg = {
      ...response.data.data.faceDiagnosis,
      imgUrl: undefined,
    };
    faceDiagnosis.value = faceDiagnosisnoimg;
    messages.push({
      chatId: chatId.value,
      content: "",
      contentType: "face",
      createTime: "",
      messageId: generateUUID(),
      roleId: 2,
    });
    isLoading.value = false;
    store.commit("setIsLoading", false);
  });
};
</script>
