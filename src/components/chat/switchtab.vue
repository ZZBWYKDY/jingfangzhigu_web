<template>
  <el-main class="main">
    <!-- 底部输入框 -->
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        :default-active="0"
      >
        <el-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name">
          <template #label>
            <span class="custom-tabs-label" @click="handleMenuClick(tab.path)">
              <el-icon><component :is="tab.icon" ></component></el-icon>
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
                :loading="isLoading"
                round
              />
            </div>
    </template>

        </el-tab-pane>
      </el-tabs>
  </el-main>
</template>

<script setup lang="ts">
import {
  DataAnalysis,
  Monitor,
  Camera,
  ChatLineSquare,
  Position,
  Microphone,
} from '@element-plus/icons-vue';

import {
    ref,
  } from 'vue';
import { ElLoading, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
let activeName = 'first';


const handleMenuClick = (path) => {
  router.push(path);
};

const tabs = [
  {
    name: 'first',
    label: '健康知识问答',
    icon: Monitor,
    // path: '/HealthQA',
  },
  {
    name: 'second',
    label: '查看问答',
    icon: ChatLineSquare,
    // path: '/ViewQA',
  },
  {
    name: 'third',
    label: '面诊',
    icon: Camera,
    // path: '/FaceConsultation',
  },
  {
    name: 'forth',
    label: '数据侦察',
    icon: DataAnalysis,
    path: '/DataScouting',
  },
];

//处理语音转文字
declare var webkitSpeechRecognition: any;
const recognition = new webkitSpeechRecognition();
  recognition.lang = 'zh-CN';
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
  //处理发送信息
  import {watch} from 'vue'
  import {useStore} from 'vuex'
  const store = useStore();
  const canSendMessage = ref(true);
  const isLoading = ref(false);
  const inputMessage = ref();
  const sendMessage = () => {
    if(!canSendMessage.value || isLoading.value){
      ElMessage.error('回复消息正在生成')
      return false
    }
    if (inputMessage.value.trim() !== ''){
          isLoading.value = false;
          store.commit('changeInput',inputMessage.value.trim());
          inputMessage.value = ''; 
    } 
  };
</script>

<style src="@/components/chat/main.css"></style>