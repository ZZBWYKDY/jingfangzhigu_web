import { createStore } from 'vuex';
import MediRush from './module/MediRush';
const store = createStore({
  state: {
    // 状态/数据
    token: 'oo',
    inputmessage:'lalalala88888888999',
    isgenerate:false,
    activeName:'first',
    faceImgUrl:'',
  },
  mutations: {
    // 同步方法，用于修改状态
    // 设置Token
    setToken(state, token){
        state.token = token
    },
    changeInput(state,msg){
      state.inputmessage=msg
    },
    changeActiveName(state,msg){
      state.activeName=msg
    },
    setIsgenerate(state){
      state.isgenerate=true
    },
    clearIsgenerate(state){
      state.isgenerate=false
    },



  },
  actions: {
    // 异步方法，用于触发 mutations
  },
  getters: {
    // 计算属性，用于获取状态
  },
  modules:{
    MediRush
  }
});

export default store;
