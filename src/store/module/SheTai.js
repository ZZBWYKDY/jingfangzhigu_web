const state= {
    // 状态/数据
    isnotice:false,

  }
const mutations= {
    setisnotice(state){
      state.isnotice=true
    },
    clearisnotice(state){
      state.isnotice=false
    },

  }
const  actions= {
    // 异步方法，用于触发 mutations
  }
const  getters={
    // 计算属性，用于获取状态
  }

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
    
}
