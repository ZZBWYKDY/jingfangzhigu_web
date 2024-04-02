import { createStore } from 'vuex';

const store = createStore({
  state: {
    // 状态/数据
    token: null
    // firstInputMessage: '',
  },
  mutations: {
    // 同步方法，用于修改状态
    // 设置Token
    setToken(state, token){
        state.token = token
    },
    // setFirstInputMessage(state, newValue) {
    //   state.firstInputMessage = newValue;
    // }
  },
  actions: {
    // updateFirstInputMessage({ commit, state }, newValue) {
    //   // 只有当firstInputMessage为空时才更新，确保只保存第一条消息
    //   if (!state.firstInputMessage) {
    //     commit('setFirstInputMessage', newValue);
    //   }
    // }
    // 异步方法，用于触发 mutations
  },
  getters: {
    // 计算属性，用于获取状态
    // getInputMessage: state => state.inputMessage;
  },
});

export default store;
