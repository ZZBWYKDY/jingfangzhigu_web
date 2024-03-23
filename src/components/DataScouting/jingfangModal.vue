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
      <span class="summary"><b>中医诊断建议：</b><pre>{{medicalHistories[index].recommendation.match(regex)[1]}}</pre></span>
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
    index:0,
    regex: /我给出的治疗建议如下：([\s\S]+)/,
    constants: {},
    medicalHistories: [{ "diagnosisId": "2ba78128-354d-4fe2-9a29-de9fb93ae89c",
      "chatId": "d827cbca-288b-430d-a813-e23ad25c87ed",
      "name": "gzx",
      "gender": "男",
      "age": 21,
      "symptom": "主要是在下午久坐之后感到疲劳，肩膀和脖子酸痛，眼睛干涩，注意力不集中",
      "duration": "大约持续了半个月",
      "otherInfo": "生活习惯：饮食偏油腻，喜欢喝咖啡，晚上经常熬夜。最近心理状态：工作压力大，最近几个月一直在加班。用药情况：暂时没有用药。",
      "result": null,
      "recommendation": "作为一名经验丰富的中医医生，我会根据患者的症状和信息来给出治疗建议和推荐的药物。根据患者的病历，他是一名40岁的男性，主要症状是在下午久坐之后感到疲劳、肩膀和脖子酸痛、眼睛干涩、注意力不集中，持续了大约半个月。生活习惯方面，饮食偏油腻，喜欢喝咖啡，晚上经常熬夜。最近心理状态是工作压力大，最近几个月一直在加班。暂时没有用药。\n\n根据这些信息，我给出的治疗建议如下：\n\n1. 中成药推荐：归脾丸。归脾丸由黄芪、党参、白术、茯苓、甘草、当归、川芎、熟地黄等组成，具有补益脾气、养血安神的作用。对于患者疲劳、注意力不集中等症状有较好的改善作用。建议每日2次，每次1丸。\n\n2. 中草药推荐：逍遥散。逍遥散由柴胡、白芍、当归、茯苓、甘草、炒枳壳、炒莱菔子组成，具有疏肝解郁、养血健脾的作用。对于患者情绪压力大、疲劳等症状有较好的缓解作用。建议每日1剂，水煎分早晚两次服用。\n\n3. 药膳食疗方案：红枣枸杞炖瘦肉。红枣、枸杞具有补肝肾、益精血的作用，瘦肉则提供蛋白质和营养。对于患者疲劳、眼睛干涩等症状有较好的改善作用。建议每周2-3次。\n\n4. 推拿按摩、针灸治疗方案：针对患者肩膀和脖子酸痛，可以采用推拿按摩的方法进行缓解。针灸治疗可以调理气血、缓解疲劳。建议每周进行1-2次推拿按摩或针灸治疗。\n\n以上是我根据患者的症状和信息给出的治疗建议和推荐的药物。请注意，以上建议仅供参考，具体治疗还需结合患者实际情况。同时，患者在治疗过程中应保持良好的生活习惯，调整饮食结构，保证充足的睡眠，适当锻炼，以达到更好的治疗效果。",
      "createTime": "2024-03-10T08:00:19.000+00:00",
      "serializeVersionUID": 1006
    }]
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
