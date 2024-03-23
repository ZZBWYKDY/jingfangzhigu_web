<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined } from '@ant-design/icons-vue';
import { SettingOutlined } from '@ant-design/icons-vue';

const menuData = [
  {
    key: 'user',
    title: '用户设置',
    path: '/setting/user',
  },
  {
    key: 'customization',
    title: '界面定制',
    path: '/setting/customization',
  },
  {
    key: 'notification',
    title: '通知设置',
    path: '/setting/notification',
  },
  {
    key: 'data',
    title: '数据管理',
    path: '/setting/data',
  },
];
const openKeys = ref(['user']); // 更新为匹配 'user' 键
const selectedKeys = ref(['user']); // 更新为匹配 'user' 键

const router = useRouter();

const selectItem = ({ item, key }) => {
  router.push({ path: key });
};
const handleMenuClick = (key) => {
  selectedKeys.value = [key];
  selectItem({ key });
};
</script>

<template>
  <div class="outer-container">
    <div class="center-container">
      <!-- 左侧导航栏 -->
      <div class="sidebar">
        <div class="avatar">
          <div class="avatar-info">
            <a-avatar :size="64">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <span class="user-tag">患者用户</span>
          </div>
          <p class="username">loopy，China,19</p>
        </div>
        <div class="menu">
		  <div class="menu-name">
			<setting-outlined style="color: #1890ff; font-size: 20px; margin-right: 5px;" /> 
			<span style="color:#585858; font-size: 18px;">设置</span>
		</div>
          <a-menu
            v-model:selectedKeys="selectedKeys"
            :open-keys="openKeys"
            @select="selectItem"
            mode="vertical"
            theme="#fff">
            <a-menu-item
              v-for="item in menuData"
              :key="item.key"
              :icon="item.icon"
              @click="() => handleMenuClick(item.key)"
              style="height: 47px; width: 127px; font-size: 18px; margin-left: 15px; color: #585858;">
              {{ item.title }}
            </a-menu-item>
          </a-menu>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content" style="overflow: auto;" v-if="$route.matched.length > 1">
		<router-view></router-view>
	  </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  height: 100vh;
  background-image: url('/src/assets/login_pictures/chat_background.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-container {
  width: 1049px;
  height: 598px;
  display: flex;
  align-items: center; /* 垂直居中 */
}
.avatar {
  display: flex;
  flex-direction: column; /* 垂直方向排列 */
  align-items: center; /* 水平居中 */
  margin-top: 20px;
}

.avatar-info {
  display: flex;
  align-items: center; /* 水平垂直居中 */
}

.user-tag {
	color: white;
    margin-right: -40px;
    padding: 2px;
    background-color: rgb(83, 161, 202);
    border-radius: 5px;
    margin-top: 30px;
}

.username {
  margin-top: 2px;
  height: 30px;
  font-size: 16px;
  line-height: 40px;
  color: white;
  padding: 0 10px;
  border-radius: 5px;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  left: -20px;
  width: 210px;
  height: 447px;
  border-radius: 18px;
  background-color: #fff;
}

.menu-name {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100px;
  width: 170px;
  font-size: 16px;
  font-weight: bold;
  padding: 20px;
}

.sidebar {
  width: 210px;
  background-color: #60a7e9;
  padding: 20px;
  height: 598px;
  border-radius: 18px;
}

.content {
  width: 814px;
  height: 598px;
  margin-left: 15px;
  border-radius: 18px;
  background-color: #fff;
}
</style>
