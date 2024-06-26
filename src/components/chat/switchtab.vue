<script lang="ts" setup>
// Vue 相关引入
import { ref, onMounted, watch,computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";

// 组件引入
import Aside from "@/components/chat/Aside.vue";
import Header from "@/components/common/header.vue";
import healthQA from "./healthQA.vue";

// Element Plus 组件引入
import { ElMessage } from "element-plus";

// Element Plus 图标引入
import {
  DataAnalysis,
  Monitor,
  Camera,
  ChatLineSquare,
  Management,
  Position,
  Microphone,
} from "@element-plus/icons-vue";

import { axiosPost } from '@/utils/http';

// 路由初始化
const router = useRouter();
const route = useRoute()

// 数据初始化
const tabs = [
  {
    name: "first",
    label: "健康知识问答",
    icon: Monitor,
    path: "/switchtab/underjkzswd",
  },
  {
    name: "second",
    label: "查看问答",
    icon: ChatLineSquare,
    path: "/switchtab/ViewQ&A",
  },
  {
    name: "third",
    label: "面诊",
    icon: Camera,
    path: "/switchtab/face",
  },
  {
    name: "sixth",
    label: "舌苔问诊",
    icon: Camera,
    path: "/switchtab/tongue",
  },
  {
    name: "forth",
    label: "数据侦察",
    icon: DataAnalysis,
    path: "/DataScouting",
  },
  {
    name: "fifth",
    label: "快捷购药",
    icon: Management,
    path: "/switchtab/MediRush",
  },
];

// 语音识别相关
declare var webkitSpeechRecognition: any;
const recognition = new webkitSpeechRecognition();
recognition.lang = "zh-CN";
const recognitionActive = ref(false);

// 其他状态
const store = useStore();
const canSendMessage = computed(()=>store.getters.getCanSendMessage);
const isLoading = computed(()=>store.getters.getIsLoading);
const inputMessage = ref("");
const activeName = ref("");

// 监听语音识别
onMounted(() => {
  console.log(store.state.activeName)
  activeName.value = getActiveNameByPath(route.path);
  recognition.onresult = (event) => {
    inputMessage.value = event.results[0][0].transcript;
  };
});

const getActiveNameByPath = (path)=>{
  return tabs.filter(it=>it.path == path)[0].name
}

// 处理菜单点击事件
const handleMenuClick = (tab) => {
  console.log(tab)
  store.commit("changeActiveName", tab.name);
  router.push(tab.path);
};

// 处理录音开始/结束
function startRecording() {
  if (!recognitionActive.value) {
    recognition.start();
    recognitionActive.value = true;
  } else {
    recognition.stop();
    recognitionActive.value = false;
  }
}

// 发送消息
const sendMessage = () => {
  if (!canSendMessage.value || isLoading.value) {
    ElMessage.error("回复消息正在生成");
    return false;
  }
  if (inputMessage.value.trim() !== "") {
    isLoading.value = true;
    store.commit('setIsgenerate');
    store.commit("changeInput", inputMessage.value.trim());
    inputMessage.value = "";

  }
  // 检查是否是第一次发送消息
  if (store.state.allMessages.length === 0) {
      store.commit('setIsFirstMessageInChat', true);
    } else {
      store.commit('setIsFirstMessageInChat', false);
    }
  
};

const uploadImage = (request) => {
  const formData = new FormData();
  formData.append('img', request.file);

  axiosPost(`/file/faceImg`, formData).then((response) => {
    console.log('接口返回的数据:', response.data.data['url']);
    store.commit('setFaceImg', response.data.data['url'])
  });
};

//其余方式切换tab

watch(
  () => store.state.activeName,
  (newValue, oldValue) => {
    const activeName = newValue;
  
    console.log("inputmessage 值已更改:", newValue);
  }
);
</script>

<template>
  <el-container class="background">
    <el-container class="wrapper">
      <el-header class="el-header">
        <Header />
      </el-header>
      <el-container class="leftandright">
        <Aside
          :dialogues="dialogues"
          @messages-updated="handleMessagesUpdated"
          @select-chat="selectChat"
          :newChatName="newChatName"
        />
        <el-main class="main">
          <div style="height: 705px; overflow: hidden">
            <router-view></router-view>
          </div>
          <!-- 底部输入框 -->
          <el-row class="foot">
            <el-tabs v-model="activeName" class="demo-tabs" :default-active="0">
              <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name">
                <template #label>
                  <span class="custom-tabs-label" @click="handleMenuClick(tab)">
                    <el-icon><component :is="tab.icon"></component></el-icon>
                    <span>{{ tab.label }}</span>
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
                    <el-upload
                      v-if="tab.name == 'third'"
                      class="upload-demo"
                      :action="'/api/file/faceImg'"
                      :accept="'image/*'"
                      :show-file-list="false"
                      :http-request="uploadImage"
                    >
                      <el-button type="primary" :icon="Camera" round />
                    </el-upload>
                    <el-button
                      v-else
                      type="primary"
                      :icon="Microphone"
                      round
                      @click="startRecording"
                    />
                    <el-button
                      type="primary"
                      :icon="Position"
                      @click="sendMessage"
                      :loading="isLoading"
                      round
                    />
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style>
@import "@/views/chat.css";
@import "@/components/chat/main.css";
</style>
