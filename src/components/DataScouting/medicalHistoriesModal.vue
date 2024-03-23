<template>
  <div class="Mocontainer">
  <div v-if="true" class="mod" style="z-index: 9999;">
    <span v-if="true" class="detail"><b>病历详情</b></span>
    <!-- <span class="label"><b>{{medicalHistories[index].name}}</b></span> -->
    <div class="header">
      <span class="word"><b>姓名：</b>{{medicalHistories[index].name}} </span>
      <span class="word"><b>年龄：</b>{{medicalHistories[index].age}}</span> 
      <span class="word"><b>性别：</b>{{medicalHistories[index].gender}}</span>
      <span class="word"><b>诊断时间：</b>{{medicalHistories[index].diagnosticTime}}</span>
    </div>
    <div class="body-item-0">
      <span class="summary"><b>主诉：</b>{{medicalHistories[index].chiefComplaint}}</span>
    </div>
    <div class="body-item-0">
      <span class="summary"><b>中医诊断结果：</b>{{medicalHistories[index].diagnosis}}</span>
    </div>
    <div class="body-item-0">
      <span class="summary"><b>现病史：</b>{{medicalHistories[index].presentHistory}}</span>
      <span class="summary"><b>既往病史：</b>{{medicalHistories[index].previousHistory}}</span>
      <span class="summary"><b>用药史：</b>{{medicalHistories[index].medicationHistory}}</span>
    </div>
    <div class="body-item-2">
      <span class="summary"><b>体格检查：</b>{{medicalHistories[index].physicalExamination}}</span>
      <span class="summary"><b>中医特征：</b>{{medicalHistories[index].tcmFeature}}</span>
    </div>
    <div class="body-item-3">
      <span class="summary">
        <b>既往治疗方案：</b><br>
        {{medicalHistories[index].previousTreatment}}
      </span>
    </div>
    <div class="body-item-4">
      <span class="summary"><b>其他信息：</b><br>{{medicalHistories[index].otherInfo}}</span>
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
    constants: {},
    medicalHistories: JSON.parse(localStorage.getItem('showList')),
  }
},
methods: {
  notifyParent() {
    this.$emit('notify', 'Hello from child!');
    console.log(this.medicalHistories[this.index])
  }
},
}
</script>

<style src="./toDetail.css" />
