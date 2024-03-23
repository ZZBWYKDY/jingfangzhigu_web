<script setup>
import { ExclamationCircleOutlined,SwitcherOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue';
const notificationStatus = ref(true); // 初始状态为开启
const healthStatus = ref(true); // 初始状态为开启

const toggleNotification = () => {
  notificationStatus.value = !notificationStatus.value;
};

const toggleHealth = () => {
  healthStatus.value = !healthStatus.value;
};
</script>

<template>
<div class="content">
    <div class="user-settings">
      <span class="user-name">界面定制</span>
    </div>
   <div class="separator"></div>
	<ul class="list">
		<li class="list-item">暗色模式
			<img v-if="notificationStatus" src="@/assets/setting_pictures/open.png" alt="开启" class="toggle-icon" @click="toggleNotification" />
      		<img v-else src="@/assets/setting_pictures/off.png" alt="关闭" class="toggle-icon_off" @click="toggleNotification" />
		</li>
		
		<li class="list-item">大字模式
			<img v-if="healthStatus" src="@/assets/setting_pictures/open.png" alt="开启" class="toggle-icon" @click="toggleHealth" />
			<img v-else src="@/assets/setting_pictures/off.png" alt="关闭" class="toggle-icon_off" @click="toggleHealth" />
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
.toggle-icon {
	position: relative;
    left: 450px;
	width: 71px;
}
.toggle-icon_off {
	position: relative;
    left: 470px;
    width: 71px;
}
</style>