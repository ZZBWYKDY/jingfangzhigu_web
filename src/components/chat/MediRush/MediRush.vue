<template>
  
    <div class="scroll" style="height:705px;overflow: auto;"ref="chatContainer">
      <div v-if="showChatBox" class="chat-container" >

        <div v-if="flag" class="chat-box" :style="{ 'align-self':  'flex-start' }">
            <div class="avatar" >
              <img src="@/assets/chat_pictures/icon.png" style="width: 40px; height: 40px; border-radius: 50%;" />
            </div>
            <doucmentComponent></doucmentComponent>  
          </div>

          <div v-if="!flag" class="chat-box" :style="{ 'align-self':  'flex-start' }">
            <div class="avatar" >
              <img src="@/assets/chat_pictures/icon.png" style="width: 40px; height: 40px; border-radius: 50%;" />
            </div>
            
            <ingredientComponent></ingredientComponent>
          </div>

          <payComponent v-if="$store.state.MediRush.ispay"></payComponent>
          <modifyComponent v-if="$store.state.MediRush.ismodify"></modifyComponent>

        
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.roleId === 1 ? 'user-message' : 'assistant-message'"
          :style="msg.roleId === 1 ? { 'justify-content': 'flex-end', 'margin-left': 'auto' } : { 'justify-content': 'flex-start', 'margin-right': 'auto' }"
          >
          <div class="chat-box" :style="{ 'align-self': msg.roleId === 1 ? 'flex-end' : 'flex-start' }">
            <div class="avatar" v-if="msg.roleId === 2">
              <img src="@/assets/chat_pictures/icon.png" style="width: 40px; height: 40px; border-radius: 50%;" />
            </div>
            <div
              class="bubble"
              :class="msg.roleId === 1 ? 'user-bubble' : 'assistant-bubble'"
              :style="{ 'background-color': msg.roleId === 1 ? '#5b93ff' : '#ffffff', 'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)', 'padding': '10px' }">
              <template v-if="msg.imgUrl">
                <img width="200px" :src="msg.imgUrl" />
              </template>
              <template v-else>
                <div v-html="msg.content"></div>
              </template>
            </div>
            <div class="avatar" v-if="msg.roleId === 1">
             <img :src="$store.state.userImg" style="width: 40px; height: 40px; border-radius: 50%;"  />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import doucmentComponent from './document.vue';
  import ingredientComponent from './ingredient.vue';
  import payComponent from './pay.vue';
  import modifyComponent from './modify.vue';
  
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        showChatBox: true, // 是否显示聊天框
        messages: [], // 消息列表
        isLoading: false, // 是否正在加载消息
        indicator: {}, // 加载指示器
        flag:true,
        ismodify:false,
        ispay:false,
      };
    },
    components: {
    doucmentComponent,
    ingredientComponent,
    payComponent,
    modifyComponent,
    },
    methods: {
      // 渲染消息内容
      renderMessage(content) {
        // 可以添加一些特殊处理逻辑
        return content;
      },
      scrollToBottom() {
        const chatContainer = this.$refs.chatContainer;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      },
      saveData() {
          localStorage.setItem('MediRushMessage', this.message);
        },
      loadData() {
        this.loadedData = localStorage.getItem('MediRushMessage');
      }
    },
    watch: {
        '$store.state.inputmessage': {
            handler(newValue, oldValue) {
                this.messages.push({
                    roleId: 1,
                    content:newValue
                });
                this.$nextTick(() => {
                this.scrollToBottom(); // 在DOM更新后滚动到底部
                this.$store.commit('clearIsgenerate')
                this.flag=false
            });
            },
            deep: true 
        }
    },
    created() {
      // 加载数据
      this.loadData();
      // 在页面刷新或关闭之前保存数据到localStorage
      window.addEventListener('beforeunload', this.saveData);
    },

    mounted() {
      // 模拟数据
      this.$store.commit('changeActiveName', 'fifth');
      this.isLoading = true;
      this.scrollToBottom(); // 在加载完成后滚动到底部
      this.$store.commit('clearIsgenerate');

    },
    destroyed() {
        // 在组件销毁之前移除事件监听
        window.removeEventListener('beforeunload', this.saveData);
    },
    computed: {
    ...mapState('MediRush',{
      // 该组件中可以通过 this.user 访问到 Vuex 中的 user 状态
      ismodify: state => state.ismodify,
    })
  }
  };
  </script>
  
  <style scoped>
  .chat-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .user-message {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  
  .assistant-message {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  
  .chat-box {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    align-self: flex-start;
    margin-right: 10px;
  }
  
  .bubble {
    
    display: inline-block;
    background-color: white;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 10px;
    max-width: 30vw;
    text-align: left;
    vertical-align: top; 
    word-wrap: break-word;
  }
  
  .user-bubble {
    background-color: #5b93ff;
  }
  
  .assistant-bubble {
    background-color: #ffffff;
  }
  </style>
  