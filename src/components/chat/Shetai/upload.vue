<template>
    <div class="background-color">
        <div class="hi">
            <div>
                您好，欢迎使用经方智谷中医药只能对话AI的特色【舌像问诊】功能！
            </div>
            <div>
                请点击下方按钮，上传或拍摄舌像图片，获得舌像诊断报告。
            </div>
        </div>
            <div class="img-wrapper">
                <el-upload
                :action="'/api/file/tongueImg'"
                :accept="'image/*'"
                :show-file-list="false"
                :http-request="uploadImage"
                style="width"
                :disabled="disabled"
                >
                <!-- 点击后可以调出本地文件 -->
                <el-button class="upload1" ref="upload1" style="display: none;">

                </el-button>
                <el-button  
                class="upload" 
                @click="dialogVisible = true;disabled=true"
                
                >
                    上传
                </el-button>
              </el-upload>
            </div>
            <el-dialog  
                v-model="dialogVisible"  
                width="450"  
                style="border-radius: 30px;"
                @close="handleDialogClose" 
            >  
                <notice/>
             </el-dialog>  
     

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch,computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
import { axiosPost } from '@/utils/http';

const store=useStore()
const showNotice=ref(false)
const isLoading=ref(false)
const uploadImage = (request) => {
    showNotice.value=true;
    isLoading.value = true; 

    const formData = new FormData();
    formData.append('img', request.file);

    axiosPost(`/file/tongueImg`, formData).then((response) => {
    console.log('接口返回的数据:', response.data.data['url']);
    store.commit('setTongueImg', response.data.data['url'])
    });
};


const isNotice=()=>{
  store.commit('SheTai/setisnotice')
}
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)  
//禁止本地弹窗
const disabled=ref(false)

const handleDialogClose=()=>{
    disabled.value=false;
    // 延迟执行 模拟点击upload1按钮
    setTimeout(() => {  
        const uploadButton = document.querySelector(".upload1");  
        if (uploadButton) {  
            uploadButton.click();  
            console.log("isclick");  
        } else {  
            console.error("上传按钮未找到！");  
        }  
    }, 10); 
}

</script>


<style scoped>

.background-color {
    display: inline-block;
    background-color: white;
    box-shadow: rgba(0,0,0,0.1) 0px 2px 4px ;
    padding: 20px 25px;
    margin: 5px;
    border-radius: 10px;
    height: 100%;
    max-width: 80%;
    text-align: left;
    vertical-align: top; /* 顶部对齐，确保头像和聊天气泡顶部对齐 */
}
.hi{
    /* color:rgb(88,88,88); */
    font-size: 14px;
}
.img-wrapper{
    width:95%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px auto 0;
}

.upload{
    background-color: rgb(91,147,255);
    color:white;
    width: 150px;
    padding: 10px 0;
    height: 35px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
}
::v-deep .el-dialog{
       display: flex;
       flex-direction: column;
       margin:0 !important;
       position:absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
       max-height:calc(100% - 30px);
       max-width:calc(100% - 30px);
   }


</style>