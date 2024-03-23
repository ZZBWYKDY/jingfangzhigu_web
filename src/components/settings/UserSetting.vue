<script setup>
import { ExclamationCircleOutlined,SwitcherOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue';
const notificationStatus = ref(true); // 初始状态为开启
const healthStatus = ref(true); // 初始状态为开启

const toggleHistory = () => {
  notificationStatus.value = !notificationStatus.value;
};

const toggleAnony = () => {
  healthStatus.value = !healthStatus.value;
};
</script>

<template>
<div class="content">
    <div class="user-settings">
      <span class="user-name">用户设置</span>
    </div>
   <div class="separator"></div>
	<ul class="list">
		<li class="list-item">对话历史记录和AI训练 
			<ExclamationCircleOutlined style="color: #1890ff;"/>
			<img v-if="notificationStatus" src="@/assets/setting_pictures/open.png" alt="开启" class="toggle-icon_open" @click="toggleHistory" />
      		<img v-else src="@/assets/setting_pictures/off.png" alt="关闭" class="toggle-icon_off1" @click="toggleHistory" />
		</li>
		<li class="list-item">对外匿名
			<ExclamationCircleOutlined style="color: #1890ff;"/>
			<img v-if="healthStatus" src="@/assets/setting_pictures/open.png" alt="开启" class="toggle-icon" @click="toggleAnony" />
			<img v-else src="@/assets/setting_pictures/off.png" alt="关闭" class="toggle-icon_off" @click="toggleAnony" />
		</li>
	</ul>
</div>

</template>

<style scoped>
.content {
	width: 500px;
}
.user-settings {
	height: 70px;
	display: flex;
	align-items: center;
	margin-left: 18px;
}
.user-name {
	font-size: 30px;
	font-weight: bold;
	margin-top: 30px;
}
.separator {
  height: 2px;
  width: 450px;
  margin: 15px 0 0 15px;
  background: linear-gradient(to right, #2191f9, #dadfe1); /* 渐变效果 */
}

.list-item {
  height: 50px;
  padding: 25px;
  font-size: 20px;
  margin-bottom: 20px;
  color: #585858;
}
.toggle-icon_open {
	position: relative;
	left: 321px;
	width: 71px;
}
.toggle-icon_off1 {
	position: relative;
    left: 339px;
    width: 71px;
}
.toggle-icon {
	position: relative;
    left: 440px;
	width: 71px;
}
.toggle-icon_off {
	position: relative;
    left: 460px;
	width: 71px;
}
</style>