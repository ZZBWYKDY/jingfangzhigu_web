<template>
  <el-carousel :autoplay="false" type="card" height="60px" @change="handleCarouselChange" indicator-position="none">
    <el-carousel-item v-for="(item, index) in namelist" :key="item" :class="{ 'active-slide': currentIndex === index }">
      <div class="wrapper">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentIndex: 0,
      namelist:["NONE"],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    handleCarouselChange(index) {
      this.currentIndex = index;
      this.$emit('BannerEvent', this.namelist[index]);
    },
    async fetchData() {
      try {
        const response = await axios.get(
          "/medicalHistory/nameList",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
              // Authorization:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxYWVmNjQ1MS0yZjBlLTQ4Y2YtYjI2Ny1iM2EzMWI4Mjg4MzkiLCJleHAiOjE3MTExODUwMTl9.U7PoS1VoIWliypSEjtSkdq6op0_tngr5AGkcEGqubmk"
            },
            withCredentials: true,
          }
        );
        localStorage.setItem('nameList', JSON.stringify(response.data.data.names))
        this.namelist = JSON.parse(localStorage.getItem('nameList'));
if (this.namelist && this.namelist.length > 0) {
  // 如果 namelist 不为空，则执行相应逻辑
  this.$emit('BannerEvent', this.namelist[this.currentIndex]);
} else {
  // 如果 namelist 为空，则执行其他逻辑，或者什么都不做
  // 可以在这里添加逻辑来处理 namelist 为空的情况
  this.namelist =['NONE']
}



        
        
      } catch (error) {
        console.error("An error occurred while making the request:", error);
      }
    },
  }
};
</script>

<style scoped>
.active-slide .wrapper h3 {
  color: rgba(255, 255, 255, 1);
  font-size: 25px;
  align-self: center; /* 垂直居中 */
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-carousel__item  h3 {
  color: rgba(104, 154, 251, 1);
  font-size: 25px;
  align-self: center; /* 垂直居中 */
  overflow: hidden;
  text-overflow: ellipsis;
}
.wrapper{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 设置高度为视窗高度 */
}
.el-carousel .el-carousel__item.active-slide {
  background-color: rgba(104, 154, 251, 1); /* 示例：修改为红色背景 */
}

.el-carousel__item {
  background-color: white;
  border-radius: 8px;
}

.el-carousel {
  width: 60%;
}
</style>
