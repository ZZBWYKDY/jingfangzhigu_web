import { createStore } from 'vuex';

const store = createStore({
  state: {
    // 状态/数据
    token: null
  },
  mutations: {
    // 同步方法，用于修改状态
    // 设置Token
    setToken(state, token){
        state.token = token
    }
  },
  actions: {
    // 异步方法，用于触发 mutations
  },
  getters: {
    // 计算属性，用于获取状态
  },
});

export default store;
