import { createStore } from "vuex";

const store = createStore({
  state: {
    // 状态/数据
    token: "oo",
    inputmessage: "lalalala88888888999",
    isgenerate: false,
    activeName: "first",
    allMessages: [],
    faceImg: "",
    canSendMessage: true,
    isLoading: false,
  },
  mutations: {
    // 同步方法，用于修改状态
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
      state.faceImg = img;
    },
    setCanSendMessage(state, flag) {
      state.canSendMessage = flag;
    },
    setIsLoading(state, flag) {
      state.isLoading = flag;
    },
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
});

export default store;
