import { createStore } from 'vuex';
import MediRush from './module/MediRush';
const store = createStore({
  state: {
    // 状态/数据
    token: "oo",
    inputmessage: "lalalala88888888999",
    isgenerate: false,
    activeName: "first",
    allMessages: [],
    faceImgUrl: "",
    canSendMessage: true,
    isLoading: false,
    userImg:localStorage.getItem('headimg') || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    chatId: '5555',
    isFirstMessageInChat: false,
  },
  mutations: {
    // 同步方法，用于修改状态
    setChatId(state, chatId) {
      state.chatId = chatId;
    },
    clearChatMessages(state,chatId) {
      state.allMessages = [];
    },
    // 设置Token
    setToken(state, token) {
      state.token = token;
    },
    changeInput(state, msg) {
      state.inputmessage = msg;
    },
    changeActiveName(state, msg) {
      state.activeName = msg;
    },
    setIsgenerate(state) {
      state.isgenerate = true;
    },
    clearIsgenerate(state) {
      state.isgenerate = false;
    },
    setAllMessages(state, messages) {
      state.allMessages = messages;
    },
    setFaceImg(state, img) {
      state.faceImgUrl = img;
    },
    setCanSendMessage(state, flag) {
      state.canSendMessage = flag;
    },
    setIsLoading(state, flag) {
      state.isLoading = flag;
    },
    setIsFirstMessageInChat(state, value) {
      state.isFirstMessageInChat = value;
    }
  },
  actions: {
    // 异步方法，用于触发 mutations
  },
  getters: {
    // 计算属性，用于获取状态
    setAllMessages(state) {
      return state.allMessages;
    },
    getCanSendMessage(state) {
      return state.canSendMessage;
    },
    getIsLoading(state) {
      return state.isLoading;
    },
  },
  modules:{
    MediRush
  }
});

export default store;
