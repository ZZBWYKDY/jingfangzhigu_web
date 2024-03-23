<template>
  <div class="Mocontainer">
  <div v-if="true" class="mod" style="z-index: 9999;">
    <span v-if="true" class="detail"><b>病历详情</b></span>
    <!-- <span class="label"><b>{{medicalHistories[index].name}}</b></span> -->
    <div class="header">
      <span class="word"><b>姓名：</b>{{medicalHistories[index].name}} </span>
      <span class="word"><b>年龄：</b>{{medicalHistories[index].age}}</span> 
      <span class="word"><b>性别：</b>{{medicalHistories[index].gender}}</span>
      <span class="word"><b>诊断时间：</b>{{medicalHistories[index].createTime.slice(0,10)}}</span>
    </div>
    <div class="body-item-0">
      <span class="summary"><b>主诉：</b>{{medicalHistories[index].symptom}}</span>
    </div>
    <div class="body-item-4">
      <span class="summary"><b>持续时间：</b><br>{{medicalHistories[index].duration}}</span>
      <span class="summary"><b>其他信息：</b><br>{{medicalHistories[index].otherInfo}}</span>
    </div>
    <div class="body-item-0">
      <span class="summary"><b>中医诊断建议：</b><pre>{{medicalHistories[index].recommendation}}</pre></span>
    </div>
    

    <button @click="notifyParent" class="goback">返回</button>
  </div>
</div>
</template>

<script>
export default {
components: {},
props: ['index'],
data() {
  return {
    regex: /我给出的治疗建议如下：([\s\S]+)/,
    constants: {},
    medicalHistories:JSON.parse(localStorage.getItem('showList')),
  }
},
    // medicalHistories: JSON.parse(localStorage.getItem('showList')),

methods: {
  notifyParent() {
    this.$emit('notify', 'Hello from child!');
    console.log(this.medicalHistories[this.index])
  }
},
}
</script>

<style src="./toDetail.css" />
