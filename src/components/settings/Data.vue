<script setup>
import Popup from './popup/popup.vue'; // 引入Popup组件
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const showExportPopup = ref(false);
const showDeleteAccountPopup = ref(false);
const showDeleteConversationPopup = ref(false);
const handleExport = '数据导出';
const handleDeleteAccount = '删除账户';
const handleDeleteConversation = '删除所有对话';

const openExportPopup = () => {
  showExportPopup.value = true;
};

const openDeleteAccountPopup = () => {
  showDeleteAccountPopup.value = true;
};

const openDeleteConversationPopup = () => {
  showDeleteConversationPopup.value = true;
};
</script>
<template>
<div class="content">
    <div class="user-settings">
      <span class="user-name">数据管理</span>
    </div>
   <div class="separator"></div>
	<ul class="list">
		<li class="list-item">数据导出
			<ExclamationCircleOutlined style="color: #1890ff;"/>
			<button class="custom-button" @click="openExportPopup">导出</button>
		</li>
		<li class="list-item">删除账户
			<button class="custom-button" @click="openDeleteAccountPopup" style="left: 500px;">确认</button>
		</li>
        <li class="list-item">删除所有对话
			<button class="custom-button" @click="openDeleteConversationPopup" style="left: 459px;">确认</button>
		</li>
	</ul>
</div>

<Popup v-if="showExportPopup" :content="handleExport" @close="showExportPopup = false" /> 
  <Popup v-if="showDeleteAccountPopup" :content="handleDeleteAccount" @close="showDeleteAccountPopup = false" /> 
  <Popup v-if="showDeleteConversationPopup" :content="handleDeleteConversation" @close="showDeleteConversationPopup = false" /> 

</template>

<style scoped>
.content {
	width: 790px;
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

.custom-button {
  width: 65px;
  height: 29px;
  background: #689AFB;
  border-radius: 20px;
  color: white;
  position: relative;
  left: 480px;
  border: none;
  font-size: 16px;
}

</style>