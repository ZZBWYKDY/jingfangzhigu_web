<script setup>
import {ref, onMounted, computed} from "vue";
import axios from "axios";
const imageUrl = ref("");

let token = ref("")
computed(
    () => {
      token = this.$store.state.token;
    }
);

const getUserInfo = () => {
  axios
    .get("/user/info", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data && res.data.code == "SUCCESS") {
        let userInfo = res.data.data.userInfo;
        if (userInfo.avatar) {
          localStorage.setItem("headimg", userInfo.avatar);
        }
      }
    });
};

onMounted(() => {
  let headUrl = localStorage.getItem("headimg");
  if (headUrl) {
    imageUrl.value = headUrl;
  }
  getUserInfo();
});
</script>

<template>
  <router-view />
</template>

<style scoped></style>
