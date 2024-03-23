<template>
  <el-main class="main">
    <div
      class="scroll"
      style="height: 420px; overflow: hidden; overflow-y: scroll"
    >
      <div v-if="!showChatBox">
        <el-row class="main">
          <el-row class="main-header1" id="main-header1">
            <h1>经方智谷</h1>
            <h4>—您的私人AI中医诊疗助手—</h4>
          </el-row>

          <!-- 中间部分内容 -->
          <el-row class="content" id="content">
            <el-row :gutter="40" class="custom-row">
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【我想知道】</h4>
                  <p>药物属性是热是凉?这个生病能不能吃?</p>
                  <p>更多您想知道的，我们知无不言。</p>
                </div>
              </el-col>
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【我要治病】</h4>
                  <p>我发现今天头有点晕，我生了什么病吗?</p>
                  <p>我突然开始咳嗽打喷嚏，我要吃什么药治疗?</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="40" class="custom-row">
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【拍照诊疗】</h4>
                  <p>我不会描述病情，我想上传舌苔照片来分析诊治。</p>
                  <p></p>
                </div>
              </el-col>
              <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
                <div class="rectangle">
                  <h4>【其他设备】</h4>
                  <p>我有智能手表可以提供身体健康数据。</p>
                  <p>我想绑定其他可穿戴设备来监测健康情况。</p>
                </div>
              </el-col>
            </el-row>
          </el-row>
          <el-row class="content2">
            <p style="margin: 0 20px; font-size: 14px">你可以问我：</p>
            <div class="content22" style="text-align: left">
              <el-button
                v-for="button in buttons"
                :key="button.text"
                type=""
                text
                bg
                style="text-align: left"
                >{{ button.text }}
              </el-button>
            </div>
          </el-row>
        </el-row>
      </div>

      <!-- 聊天框 -->
      <div
        v-if="showChatBox"
        v-for="(msg, index) in messages"
        :key="index"
        class="chat-container"
        ref="chatContainer"
        style="
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-height: 66%;
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
              align-items: center;
            "
          >
            <div
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
                src="@/assets/chat_pictures/icon.png"
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
            <div class="avatar">
              <img
                src="@/assets/chat_pictures/zsLogo.png"
                style="width: 40px; height: 40px; border-radius: 50%"
              />
            </div>
            <div
              class="bubble assistant-bubble last-message"
              style="
                background-color: #ffffff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                padding: 10px;
              ">
              <a-spin :indicator="indicator"  v-if="index === messages.length - 1 && isLoading"/>
              <div v-html="renderMessage(msg.content)" ></div>
          </div>
            <!--            <div class="bubble bubb assistant-bubble last-message">-->
            <!--              本次问询结果已经自动生成病历，您是否要继续补充个人信息以完善病历？如需要，请问您的姓名、年龄以及性别是？如果不需要，点击下方“保存”按钮即可保存或点击“删除”不进行保存。-->
            <!--              <div class="medical-box">-->
            <!--                <div class="medical-title">病例详情</div>-->
            <!--                <div class="medical-content">-->
            <!--                  <span>姓名：{{ jingfang.name }}</span><span>年龄：{{ jingfang.age }}</span><span>性别：{{ jingfang.gender }}</span>-->
            <!--                  <br/>-->
            <!--                  诊断时间：{{ jingfang.createTime }}-->
            <!--                </div>-->
            <!--                <div class="medical-content">-->
            <!--                  既往病史：{{ jingfang.symptom }}-->
            <!--                </div>-->
            <!--                <div class="medical-content no-border">-->
            <!--                  <div>诊断意见：{{ jingfang.recommendation }}</div>-->
            <!--                  <div>诊断依据：{{ jingfang.recommendation }}</div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div class="medical-btn-group">-->
            <!--                <span>删除</span>-->
            <!--                <span>保存</span>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
        <!-- <div v-if="index === messages.length - 1 && isShowMedic " class="medicRecommed">
            <a-collapse v-model:activeKey="activeKey" ghost>
              <a-collapse-panel key="1" header="药物推荐">
                <p>{{ medicineText }}</p >
              </a-collapse-panel>
            </a-collapse>
        </div> -->
      </div>
    </div>

    <!-- 底部输入框 -->
    <el-row class="foot">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
        :default-active="0"
      >
        <el-tab-pane name="first">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Monitor /></el-icon>
              <span>健康知识问答</span>
            </span>
          </template>
          <template class="bottom">
            <el-input
              v-model="inputMessage"
              :rows="4"
              :resize="'none'"
              type="textarea"
              :autosize="false"
              placeholder="输入任何您想咨询的健康问题，我们即刻为您解答"
              @keyup.enter="sendMessage"
            />
            <div class="button2">
              <el-button
                type="primary"
                :icon="Microphone"
                round
                @click="startRecording"
              />
              <el-button
                type="primary"
                :icon="Position"
                @click="sendMessage"
                round
              />
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane name="second">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><ChatLineSquare /></el-icon>
              <span>查看问答</span>
            </span>
          </template>
          <template class="bottom">
            <el-input
              v-model="inputMessage"
              :rows="4"
              :resize="'none'"
              :autosize="false"
              type="textarea"
              placeholder="输入任何您想咨询的健康问题，我们即刻为您解答"
              @keyup.enter="sendMessage"
            />
            <div class="button2">
              <el-button type="primary" :icon="Microphone" round />
              <el-button
                type="primary"
                :icon="Position"
                @click="sendMessage"
                round
              />
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane name="third">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Camera /></el-icon>
              <span>舌苔问诊</span>
            </span>
          </template>
          <template class="bottom">
            <el-input
              v-model="inputMessage"
              :rows="4"
              type="textarea"
              :resize="'none'"
              :autosize="false"
              placeholder="输入任何您想咨询的健康问题，我们即刻为您解答"
              @keyup.enter="sendMessage"
            />
            <div class="button2">
              <el-upload
                class="upload-demo"
                :action="'/file/tongueImg'"
                :limit="1"
                :accept="'image/*'"
                :show-file-list="false"
                :http-request="uploadImage"
              >
                <el-button type="primary" :icon="Camera" round />
              </el-upload>
              <el-button
                type="primary"
                :icon="Position"
                @click="sendMessage"
                round
              />
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane name="forth">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><DataAnalysis /></el-icon>
              <span>数据侦察</span>
            </span>
          </template>
          <template class="bottom">
            <el-input
              v-model="inputMessage"
              :rows="4"
              type="textarea"
              :resize="'none'"
              :autosize="false"
              placeholder="输入任何您想咨询的健康问题，我们即刻为您解答"
              @keyup.enter="sendMessage"
            />
            <div class="button2">
              <el-button type="primary" :icon="Microphone" round />
              <el-button
                type="primary"
                :icon="Position"
                @click="sendMessage"
                round
              />
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-main>
</template>

<style src="@/components/chat/main.css"></style>
<style scoped>
.medicRecommed{
  background-color: #fffbfb;
  box-shadow: 0 2px 4px rgba(0, 0, 1, 0.1); 
  position: relative;
  top: -15px;
  left: -555px;
}

.medical-box {
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
}

.medical-title {
  text-align: center;
  font-size: 16px;
  color: #000;
  font-weight: bold;
}

.medical-content {
  border-bottom: 1px solid #333;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.medical-content span {
  margin-right: 40px;
}

.medical-content.no-border {
  border: none;
}

.medical-btn-group {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}

.medical-btn-group span {
  border: none;
  border-radius: 5px;
  background-color: #7fa99d;
  color: #fff;
  font-size: 18px;
  line-height: 30px;
  display: inline-block;
  padding: 10px 50px;
  margin: 0 auto;
}

.medical-btn-group span:nth-child(2) {
  background-color: #1980a4;
}

.bubb {
  max-width: 60%;
}
</style>
<script setup lang="ts">
import {
  Position,
  Microphone,
  DataAnalysis,
  ChatLineSquare,
} from "@element-plus/icons-vue";
import { Monitor, Camera } from "@element-plus/icons-vue";
import { LoadingOutlined } from '@ant-design/icons-vue';
import type { TabsPaneContext, } from "element-plus";
import { ElLoading } from "element-plus";
import {
  ref,
  onMounted,
  watch,
  onUnmounted,
  reactive,
  nextTick,
  defineProps,
  toRaw,
  PropType,
  computed,
} from "vue";
import axios from "axios";
import { axiosPost, axiosGet } from "@/config/http";
import marked from "marked/marked.min.js";

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
  // if(messages.length > 11 ){
  //   isShowMedic.value = true;
  // }
  if (!content) {
    // isShowMedic.value = false;
    return marked.parse(messageContent.value); // 如果content为空，则返回messageContent
  }
  return marked.parse(content);
};
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

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
});

watch(
  () => props.messageArray,
  (newVal, oldVal) => {
    if (newVal && newVal.length > 0) {
      filterMessages();
      // isShowMedic.value = false;
      chatId.value = props.selectedChatId as string;
      showChatBox.value = true;
    } else {
      showChatBox.value = false;
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
      // isShowMedic.value = false;
    }
    
  }
);

function filterMessages() {
  messages.splice(0, messages.length);
  let rawMessageArray: any = toRaw(props.messageArray);
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
// const isShowMedic = ref(false);
const showChatBox = ref(false); // 控制是否展示对话框部分的状态
// 语音转文字功能
const recognition = new webkitSpeechRecognition();
recognition.lang = "zh-CN";
const recognitionActive = ref(false);

const jingfang = ref({});

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
const medicineText = ref("");
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
    let data = JSON.parse(event.data);
    if (data["data"] && data["data"]["delta"]) {
      messageContent.value += data["data"]["delta"];
    }
    if (data["data"]["flag"]) {
      let flag = data["data"]["flag"];
      if (flag) {}
    }
  });

  eventSource.addEventListener("error", function (event) {
    // let data = JSON.parse(event.data);
    // if (data.data) {
    //   messageContent.value += data.data;
    // }
  });

  eventSource.addEventListener("end", function (event) {
    // getMedicalHistory()
    let endData = JSON.parse(event.data);
    if (messageContent.value) {
      let length = messages.length - 1;
      if(endData["data"]["totalMessage"])
      {
        messages[length].content = endData["data"]["totalMessage"];
        messageContent.value = ""; // 重置累积的消息内容
        scrollToBottom();
      }
      if (endData["data"]["finalDiagnosis"])
        messages[length].content = endData["data"]["finalDiagnosis"]["recommendation"]
        messageContent.value = ""; // 重置累积的消息内容
        scrollToBottom();
    }
    // if(endData["data"]["finalDiagnosis"]) {
    //   let medicine = endData["data"]["finalDiagnosis"]["medicine"]
    //   console.log(medicine,'medicine');
      
    //   // isShowMedic.value = true;
    //   // medicineText.value = JSON.parse(medicine["medicine"])
    //   const nameOfDrug1 = medicine.NameOfDrug1;
    //   medicineText.value =  medicine.NameOfDrug1;
    //   console.log('1111',nameOfDrug1);
      
    // }
    currentEventSource.close();
  });
  // 在组件销毁或页面离开时关闭连接
  onUnmounted(() => {
    if (currentEventSource) {
      currentEventSource.close();
    }
  });
};

const emit = defineEmits(["update-chat-name"]);
const sendMessage = () => {
  if (inputMessage.value.trim() !== "" && props.messageArray) {
    if (
      props.selectedChatId !== undefined &&
      chatId.value === props.selectedChatId
    ) {
      if (
        isFirstMessageInChat.value &&
        (!props.messageArray || props.messageArray.length === 0)
      ) {
        // isShowMedic.value = false;
        messages.splice(0, messages.length); // 清空当前消息数组
        isFirstMessageInChat.value = false;
        emit("update-chat-name", inputMessage.value, chatId.value);
        updateChatName(chatId.value, inputMessage.value);
        
      }
      const currentChatId = props.selectedChatId;
      chatId.value = currentChatId;
      const requestDataToSend = {
        messageId: generateUUID(),
        text: inputMessage.value,
        messages: toRaw([...messages]),
      };
      subscribeToChat();
      setTimeout(() => {
        fetchResponse(requestDataToSend);
        // 发送消息后触发事件，将第一条消息内容作为参数传递
        messages.push(
          {
            chatId: currentChatId,
            content: inputMessage.value,
            createTime: "",
            messageId: generateUUID(),
            roleId: 1,
          },
          {
            chatId: currentChatId,
            content: "",
            createTime: "",
            messageId: generateUUID(),
            roleId: 2,
          }
        ); // 将用户输入的消息添加到本地消息数组
        inputMessage.value = ""; // 清空输入框
        showChatBox.value = true; // 显示聊天框
        isLoading.value = true;
      }, 500);
    }
  }
};

const getMedicalHistory = async () => {
  // let chatId = 'd827cbca-288b-430d-a813-e23ad25c87ed'
  // let chatId = '2ba78128-354d-4fe2-9a29-de9fb93ae89c'
  // try {
  //   const response = await axios.get(`/medicalHistory/jingfang/${chatId}`, {
  //     withCredentials: true,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       Authorization: localStorage.getItem('token'),
  //     },
  //   });
  //   const { data, code } = response.data;
  //   if (code === 'SUCCESS') {
  //     jingfang.value = data.jingfang || {};
  //   }
  //   console.log('根据chatId获取经方智谷诊断病历成功', response);
  // } catch (error) {
  //   console.log('根据chatId获取经方智谷诊断病历成功', error);
  // }
  const response = await axiosGet(`/medicalHistory/jingfang/${chatId}`);
  const { data, code } = response.data;
  if (code === "SUCCESS") {
    jingfang.value = data.jingfang || {};
  }
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
  getAllDialogues();
  // try {
  //   const response = await axios.post(
  //     `/chat/name`,
  //     {
  //       chatId: chatId,
  //       chatName: newChatName,
  //     },
  //     {
  //       withCredentials: true,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         Authorization: localStorage.getItem('token'),
  //       },
  //     }
  //   );
  //   console.log('Chat name updated successfully:', response);
  //   getAllDialogues();
  // } catch (error) {
  //   console.error('Failed to update chat name:', error);
  // }
};
// const token =
//     "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzEwNjY2MjMyfQ.CrvoJcs7M4JU7nF67VhRPNx6Pi4O1h_Hk971tuSmgZs";
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
    },
   
  );
  // try {
  //   const response = await axios.post(
  //     `/sse/chat/${chatId.value}`,
  //     requestData,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: localStorage.getItem('token'),
  //       },
  //     }
  //   );
  // } catch (error) {
  //   console.error(error);
  // }
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

const uploadImage = (request) => {
  const formData = new FormData();
  formData.append("img", request.file);

  axiosPost(`/chat/image/${chatId.value}`, formData).then((response) => {
    console.log("接口返回的数据:", response.data.data["url"]);
    let imgUrl = response.data.data["url"];
    inputMessage.value = imgUrl;
  });

  // axios
  //   .post(request.action, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //   .then((response) => {
  //     console.log('接口返回的数据:', response.data.data['url']);
  //     let imgUrl = response.data.data['url'];
  //     inputMessage.value = imgUrl;
  //   });
};
</script>
