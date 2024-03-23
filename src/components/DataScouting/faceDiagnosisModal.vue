<template>
  <div class="Mocontainer">
  <div v-if="true" class="mod" style="z-index: 9999;">
    <span v-if="true" class="detail"><b>病历详情</b></span>
    <div class="header">
      <div class="header" style="height: 200px; /* 你想要的固定高度 */
  display: flex;
  justify-content: center;
  align-items: center;">
      <img :src="faceDiagnosis[index].imgUrl" alt="" style="max-height: 100%; /* 图片的最大高度 */
  max-width: 100%; /* 图片的最大宽度 */
  height: auto;
  width: auto;">
    </div>
      <span class="word"><b>面部特征：</b>
        <li v-for="(item, index) in faceDiagnosis[index].faceAnalysis.FacialFeatures" :key="index">
      {{ item.type }} (概率: {{ item.probability * 100 }}%)
    </li>
      </span>
    </div>
    <div class="body-item-0">
      <span class="summary"><b>中医诊断结果：</b>{{faceDiagnosis[index].diagnosis}}</span>
      <div v-for="(item, index) in faceDiagnosis[index].faceAnalysis.DiagnosticResults" :key="index">
    <li>{{ item.completion }}</li>
    <p>{{ item.diet }}</p>
  </div>
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
    // index:1,
    constants: {},
    faceDiagnosis: JSON.parse(localStorage.getItem('faceDiagnosis'))
  }
},

methods: {
  notifyParent() {
    this.$emit('notify', 'Hello from child!');
  }
},
}
</script>

<style src="./toDetail.css" />