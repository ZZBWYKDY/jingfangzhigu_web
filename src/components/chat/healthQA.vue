<template>
    <el-main class="main">
      <div class="scroll" style="height: 705px; overflow: hidden; overflow-y: scroll">
        </div>
  
        <!-- 聊天框 -->
        <div
          v-if="showChatBox"
          v-for="(msg, index) in messages"
          :key="index"
          class="chat-container"
          ref="chatContainer"
          style="padding: 10px; display: flex; flex-direction: column; align-items: center">
          <!-- 对话框 -->
          <div
            v-if="msg.roleId === 1"
            style="display: flex; justify-content: flex-end; margin-bottom: 10px; margin-left: auto">
            <!-- 用户消息 -->
            <div class="chat-box" style="display: flex; justify-content: flex-end; align-items: center">
              <div
                v-if="msg.imgUrl"
                class="user-bubble last-message"
                style="background-color: #5b93ff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 10px">
                <img width="200px" :src="msg.imgUrl" />
              </div>
              <div
                v-else
                class="bubble user-bubble last-message"
                style="background-color: #5b93ff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 10px">
                {{ msg.content }}
              </div>
              <div class="avatar">
                <img
                  src="@/assets/chat_pictures/icon.png"
                  alt="User Avatar"
                  style="width: 40px; height: 40px; border-radius: 50%" />
              </div>
            </div>
          </div>
          <div
            v-if="msg.roleId === 2"
            style="display: flex; justify-content: flex-end; margin-bottom: 10px; margin-right: auto">
            <!-- 助手消息 -->
            <div
              class="chat-box"
              style="display: flex; justify-content: flex-start; margin-bottom: 10px; align-items: center">
              <div class="avatar" style="align-self: flex-start">
                <img src="@/assets/chat_pictures/icon.png" style="width: 40px; height: 40px; border-radius: 50%" />
              </div>
  
              <div
                class="bubble assistant-bubble last-message"
                style="background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); padding: 10px">
                <a-spin :indicator="indicator" v-if="index === messages.length - 1 && isLoading" />
                <div v-html="renderMessage(msg.content)"></div>
              </div>
            </div>
        </div>
      </div>

    </el-main>
  </template>
  
  <style src="@/components/chat/main.css"></style>
  
  <script setup lang="ts">
  import { Position, Microphone } from '@element-plus/icons-vue';
  import { Monitor } from '@element-plus/icons-vue';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import type { TabsPaneContext } from 'element-plus';
  import {  ElMessage } from 'element-plus';
  import { ref,  onMounted, watch,  onUnmounted, reactive, nextTick,  defineProps,
    defineEmits, toRaw,  PropType, computed,} from 'vue';
  import axios from 'axios';
  import html2canvas from 'html2canvas';
  import { axiosPost, axiosGet, axiosDelete } from '@/utils/http';
  import marked from 'marked/marked.min.js';
  import { useRouter } from 'vue-router';
  import { mapState } from 'vuex';
  const router = useRouter();
  const canSendMessage = ref(true);

 
  computed: {
    ...mapState({
      inputMessage: state => state.inputmessage
    })
  }
  
  const renderMessage = (content) => {
    if (!content) {
      return marked.parse(messageContent.value); // 如果content为空，则返回messageContent
    }
    return marked.parse(content);
  };

  interface Message {
    messageId: string;
    chatId: string;
    roleId: number;
    createTime: string;
    content: string;
  }
  
  const chatId = ref('');
  let isFirstMessageInChat = ref(true); //跟踪是否是当前chatId下的第一次发送消息
  let messages = reactive<Message[]>([]);
  const props = defineProps({
    messageArray: Array as PropType<Message[]>,
    selectedChatId: String,
    chatFlag: Boolean,
  });
  
//   watch(
//     () => activeName.value,
//     (newVal, oldVal) => {
//       if (newVal !== oldVal && newVal) {
//         showChatBox.value = true;
//         isFirstMessageInChat.value = true;
//         sendMessage(newVal); // 重新订阅新的chatId
//       } else {
//         showChatBox.value = false;
//       }
//     }
//   );
  
  watch(
    () => props.messageArray,
    (newVal, oldVal) => {
      if (newVal && newVal.length > 0) {
        filterMessages();
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
        canSendMessage.value = true;
        isLoading.value = false;
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
  
  const inputMessage = ref('');
  const isLoading = ref();
  const showChatBox = ref(false); // 控制是否展示对话框部分的状态

  // 订阅请求
  let messageContent = ref('');
  let currentEventSource: EventSource | null = null;
  const medicineText = `111111`;
  const subscribeToChat = () => {
    // 如果已经有一个订阅，先关闭它
    if (currentEventSource) {
      currentEventSource.close();
      currentEventSource = null;
    }
    // 创建新的EventSource订阅
    const eventSource = new EventSource(`http://59.110.149.33:8001/api/sse/${chatId.value}`);
    currentEventSource = eventSource; // 更新当前订阅
    eventSource.addEventListener('message', function (event) {
      isLoading.value = false;
      canSendMessage.value = false;
      let data = JSON.parse(event.data);
      if (data['data'] && data['data']['delta']) {
        messageContent.value += data['data']['delta'];
      }
      if (data['data']['flag']) {
        let flag = data['data']['flag'];
        if (flag) {
        }
      }
    });
  
    eventSource.addEventListener('error', function (event) {
      // let data = JSON.parse(event.data);
      // if (data.data) {
      //   messageContent.value += data.data;
      // }
    });
  
    eventSource.addEventListener('end', function (event) {
      canSendMessage.value = true;
      // getMedicalHistory()
      let endData = JSON.parse(event.data);
      //1 通过finalDiagnosis判断
      if (endData.data.finalDiagnosis) {
        messages.push({
          chatId: props.selectedChatId as string,
          content: '',
          createTime: '',
          messageId: generateUUID(),
          roleId: 2,
        });
      }
  
      //2 通过chatId查询
      // getMedicalByChat();
  
      if (messageContent.value) {
        let length = messages.length - 1;
        messages[length].content = endData['data']['totalMessage'];
        messageContent.value = ''; // 重置累积的消息内容
        scrollToBottom();
      }
      currentEventSource?.close();
    });
    // 在组件销毁或页面离开时关闭连接
    onUnmounted(() => {
      if (currentEventSource) {
        currentEventSource.close();
      }
    });
  };
  
  const emits = defineEmits(['update-chat-name']);
  const sendMessage = (activeTab) => {
    if (!canSendMessage.value || isLoading.value) {
      ElMessage.error('回复消息正在生成');
      return false;
    }
    if (( inputMessage.trim() !== '' && props.messageArray) || activeTab) {
      const currentChatId = props.selectedChatId;
      chatId.value = currentChatId || generateUUID();
      if (isFirstMessageInChat.value && (!props.messageArray || props.messageArray.length === 0)) {
        // if(!props.messageArray || props.messageArray.length === 0){
        messages.splice(0, messages.length); // 清空当前消息数组
        // }
        isFirstMessageInChat.value = false;
        emits('update-chat-name', inputMessage.value, chatId.value);
        updateChatName(chatId.value, inputMessage.value);
      }
      const requestDataToSend = {
        messageId: generateUUID(),
        text: inputMessage.value,
        messages: toRaw([...messages]),
      };
      activeTab != 'third' && subscribeToChat();
      setTimeout(() => {
        fetchResponse(requestDataToSend);
        // 发送消息后触发事件，将第一条消息内容作为参数传递
        messages.push(
        {
            chatId: currentChatId as string,
            content: inputMessage.value,
            createTime: '',
            messageId: generateUUID(),
            roleId: 1,
        },
        {
            chatId: currentChatId as string,
            content: '',
            createTime: '',
            messageId: generateUUID(),
            roleId: 2,
        }
        ); // 将用户输入的消息添加到本地消息数组
        isLoading.value = true;
        inputMessage.value = ''; // 清空输入框
        showChatBox.value = true; // 显示聊天框
      }, 500);
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
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          Authorization: localStorage.getItem('token'),
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
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      }
    );
  };
  
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  
  // 滚动到底部的方法
  const scrollToBottom = () => {
    const chatContainer = document.querySelector('.scroll');
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
      console.log('messagesmessagesmessagesmessages变化了');
      await nextTick(); // 等待DOM更新
      scrollToBottom(); // 现在滚动到底部
    },
    {
      immediate: true,
      deep: true,
    }
  );
  
  </script>
  